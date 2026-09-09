"use client";

import React, { useState, useEffect } from "react";
import { OldBakerChefAvatar } from "./OldBakerChefAvatar";
import { BakingBuddyChat } from "./BakingBuddyChat";
import { getISTScheduleStatus } from "@/lib/ai/baking-buddy-schedule";

export interface BakingBuddyLauncherProps {
  className?: string;
}

/**
 * Desktop Floating Character Chat Agent Launcher for Baking Buddy.
 * Features an inviting elderly master baker character with an interactive speech bubble,
 * warm bakery pastry tones (vanilla cream, cacao, strawberry rose), and live IST status.
 *
 * Positioned unobtrusively at bottom-right on desktop (hidden on mobile md:flex).
 * Listens for "open-baking-buddy" window custom events to allow external triggers.
 */
export function BakingBuddyLauncher({ className = "" }: BakingBuddyLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(true);
  const [schedule, setSchedule] = useState(() => getISTScheduleStatus());

  // Periodically refresh schedule status (every 60 seconds)
  useEffect(() => {
    const checkSchedule = () => setSchedule(getISTScheduleStatus());
    const interval = setInterval(checkSchedule, 60000);
    return () => clearInterval(interval);
  }, []);

  // Allow other components (e.g. mobile drawer or customizer buttons) to trigger the chat
  useEffect(() => {
    const handleOpenEvent = () => setIsOpen(true);
    window.addEventListener("open-baking-buddy", handleOpenEvent);
    return () => window.removeEventListener("open-baking-buddy", handleOpenEvent);
  }, []);

  return (
    <>
      {/* Desktop Floating Action Launcher (hidden on mobile md:flex) */}
      <aside
        aria-label="Baking Buddy AI Assistant"
        className={`fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-2.5 pointer-events-none select-none ${className}`}
      >
        {/* Interactive Speech Bubble Invitation (Clickable) */}
        {!isOpen && hasPrompted && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label={schedule.isOnline ? "Ask Chef Baking Buddy for cake ideas" : "Baking Buddy is resting till 10 AM IST"}
            className="pointer-events-auto cursor-pointer group relative flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#1E0F0A]/95 backdrop-blur-md border border-[#EADBCC] dark:border-[#3D2216] shadow-[0_8px_24px_rgba(44,24,16,0.14)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.55)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 text-left"
          >
            {/* Online / Sleeping Indicator */}
            {schedule.isOnline ? (
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
            ) : (
              <span className="text-[12px] leading-none shrink-0" title="Resting till 10 AM">
                🌙
              </span>
            )}

            <div className="flex flex-col">
              <span className="text-xs font-black tracking-tight text-brand-chocolate dark:text-brand-cream flex items-center gap-1.5 leading-tight">
                Ask Chef <span className="text-brand-crimson dark:text-brand-gold font-bold">• Cake Guidance</span>
                <span className="text-sm">🍰</span>
              </span>
              <span className="text-[10px] font-medium text-brand-chocolate/75 dark:text-brand-cream/70 leading-none mt-0.5">
                {schedule.isOnline ? "Baking Buddy is online to assist you" : "Resting • Back at 10:00 AM IST"}
              </span>
            </div>

            {/* Speech Bubble Downward Tail pointing to Chef Avatar */}
            <span
              className="absolute -bottom-1.5 right-6 w-3 h-3 bg-[#FFFDF9] dark:bg-[#1E0F0A] border-r border-b border-[#EADBCC] dark:border-[#3D2216] rotate-45"
              aria-hidden="true"
            />
          </button>
        )}

        {/* Charismatic Old Baker Chef Avatar Button */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close Baking Buddy" : "Open Baking Buddy AI Assistant"}
          className="pointer-events-auto relative group flex items-center gap-2 p-1.5 rounded-full bg-gradient-to-b from-[#FFFDF9] via-[#FAF3E8] to-[#F5E6D3] dark:from-[#26130B] dark:via-[#1E0F0A] dark:to-[#170B06] border-2 border-[#D9BEA7] dark:border-[#522E1F] shadow-[0_10px_28px_rgba(44,24,16,0.22)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.7)] hover:shadow-[0_14px_36px_rgba(44,24,16,0.28)] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {/* Elderly Baker Chef Avatar */}
          <div className="relative rounded-full overflow-visible">
            <OldBakerChefAvatar
              size={54}
              isSleeping={!schedule.isOnline}
              className="group-hover:rotate-3 transition-transform duration-200"
            />

            {/* Online Status Dot on Avatar Rim */}
            {schedule.isOnline ? (
              <span
                className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#1E0F0A] shadow-xs"
                title="Online Now"
              />
            ) : (
              <span
                className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-amber-400 border-2 border-white dark:border-[#1E0F0A] shadow-xs flex items-center justify-center text-[7px]"
                title="Resting till 10 AM"
              >
                💤
              </span>
            )}
          </div>

          {/* Compact Label Tag: Baking Buddy */}
          <div className="flex flex-col text-left pr-3 pl-1">
            <span className="text-xs font-black tracking-tight text-brand-chocolate dark:text-brand-cream leading-tight flex items-center gap-1">
              Baking Buddy
            </span>
            <span className="text-[10px] font-semibold text-brand-crimson dark:text-brand-gold leading-none mt-0.5">
              {isOpen ? "Close Chat ✕" : "Talk to Chef 👋"}
            </span>
          </div>
        </button>
      </aside>

      {/* Floating Interactive Chat Window */}
      {isOpen && (
        <BakingBuddyChat isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}
    </>
  );
}
