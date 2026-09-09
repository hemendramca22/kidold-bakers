/**
 * IST (Asia/Kolkata) Schedule Guard for KidOld Bakers "Baking Buddy" AI Assistant.
 *
 * Business Rules:
 * - ONLINE Hours: 10:00 AM IST to 10:00 PM IST (10:00 to 22:00)
 * - OFFLINE Hours: 10:00 PM IST to 10:00 AM IST (22:00 to 10:00 next day)
 *
 * Guarantees that no LLM API calls are dispatched during offline hours,
 * protecting server token limits and presenting a friendly sleeping baker persona.
 */

export const BAKING_BUDDY_ONLINE_START_HOUR = 10; // 10:00 AM IST
export const BAKING_BUDDY_ONLINE_END_HOUR = 22; // 10:00 PM IST (22:00)

export const OFFLINE_MESSAGE =
  "Baking Buddy is sleeping right now after a busy day by the ovens! 🌙💤\n\nI'll be back at 10:00 AM IST to help you choose and design wonderful celebration cakes.\n\nYou can still reach KidOld Bakers directly on WhatsApp at +91 93109 71535 or visit our counter at Dev Palace, Line Bazaar, Jaunpur for urgent cake orders and pickups!";

export interface ISTScheduleStatus {
  hour: number;
  minute: number;
  isOnline: boolean;
  formattedTime: string;
  statusLabel: string;
}

/**
 * Computes current India Standard Time (IST - Asia/Kolkata) and online availability.
 * Uses explicit Intl.DateTimeFormat timezone "Asia/Kolkata" to be completely independent
 * of the host OS / server environment clock timezone (e.g. UTC on Vercel).
 */
export function getISTScheduleStatus(date: Date = new Date()): ISTScheduleStatus {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    });

    const parts = formatter.formatToParts(date);
    const hourPart = parts.find((p) => p.type === "hour");
    const minutePart = parts.find((p) => p.type === "minute");

    const hour = hourPart ? parseInt(hourPart.value, 10) : 0;
    const minute = minutePart ? parseInt(minutePart.value, 10) : 0;

    // Online strictly between 10:00:00 and 21:59:59 IST
    const isOnline = hour >= BAKING_BUDDY_ONLINE_START_HOUR && hour < BAKING_BUDDY_ONLINE_END_HOUR;

    const formattedTime = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} IST`;
    const statusLabel = isOnline ? "Online • 100% Eggless Guidance" : "Resting • Back at 10:00 AM IST";

    return {
      hour,
      minute,
      isOnline,
      formattedTime,
      statusLabel,
    };
  } catch {
    // Fallback in environments lacking full Intl support
    const utcHours = date.getUTCHours();
    const utcMinutes = date.getUTCMinutes();
    const istMinutesTotal = utcHours * 60 + utcMinutes + 330; // UTC + 5:30
    const hour = Math.floor((istMinutesTotal / 60) % 24);
    const minute = istMinutesTotal % 60;
    const isOnline = hour >= BAKING_BUDDY_ONLINE_START_HOUR && hour < BAKING_BUDDY_ONLINE_END_HOUR;

    return {
      hour,
      minute,
      isOnline,
      formattedTime: `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} IST`,
      statusLabel: isOnline ? "Online • 100% Eggless Guidance" : "Resting • Back at 10:00 AM IST",
    };
  }
}
