import { NextRequest, NextResponse } from "next/server";
import { getBakeryKnowledgeContext } from "@/lib/ai/baking-buddy-context";
import { buildBakingBuddySystemPrompt } from "@/lib/ai/baking-buddy-prompts";
import { getISTScheduleStatus, OFFLINE_MESSAGE } from "@/lib/ai/baking-buddy-schedule";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// In-memory sliding window rate limiter: Max 10 requests per 60 seconds per IP
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();

function isRateLimited(ip: string, limit = 10, windowMs = 60000): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  // Clean up expired entries if map gets large
  if (rateLimitMap.size > 1000) {
    rateLimitMap.forEach((val, key) => {
      if (val.resetTime < now) {
        rateLimitMap.delete(key);
      }
    });
  }

  if (!entry || entry.resetTime < now) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return false;
  }

  if (entry.count >= limit) {
    return true;
  }

  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    // 0. Offline Hours Enforcement (10:00 PM to 10:00 AM IST)
    // Business rule: Baking Buddy is ONLINE only from 10:00 AM to 10:00 PM IST.
    // Zero calls to OpenRouter are made during offline hours.
    let ist = getISTScheduleStatus();
    const testHourHeader = req.headers.get("x-test-ist-hour");
    if (process.env.NODE_ENV !== "production" && testHourHeader !== null) {
      const mockHour = parseInt(testHourHeader, 10);
      if (!isNaN(mockHour)) {
        const isOnline = mockHour >= 10 && mockHour < 22;
        ist = {
          hour: mockHour,
          minute: 0,
          isOnline,
          formattedTime: `${String(mockHour).padStart(2, "0")}:00 IST`,
          statusLabel: isOnline ? "Online • 100% Eggless Guidance" : "Resting • Back at 10:00 AM IST",
        };
      }
    }

    if (!ist.isOnline) {
      console.log(
        `[Baking Buddy Offline] Request intercepted at ${ist.formattedTime}. Returned local offline message. Zero OpenRouter calls dispatched.`
      );
      return NextResponse.json(
        {
          reply: OFFLINE_MESSAGE,
          isOffline: true,
          istTime: ist.formattedTime,
        },
        {
          status: 200,
          headers: {
            "Cache-Control": "no-store, max-age=0",
          },
        }
      );
    }

    // 1. Check API Key presence (Server-side ONLY)
    const apiKey = process.env.OPENROUTER_API_KEY?.trim();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "Baking Buddy is currently resting. The OpenRouter API key is not configured on the server. Please add OPENROUTER_API_KEY to .env.local or Vercel environment variables.",
        },
        { status: 503, headers: { "Cache-Control": "no-store" } }
      );
    }

    // 2. Client IP extraction & Abuse Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const realIp = req.headers.get("x-real-ip");
    const ip = forwardedFor?.split(",")[0]?.trim() || realIp || "127.0.0.1";

    if (isRateLimited(ip, 10, 60000)) {
      return NextResponse.json(
        {
          error:
            "You are sending messages too quickly. Please wait a minute before asking Baking Buddy again! 🍰",
        },
        {
          status: 429,
          headers: {
            "Retry-After": "60",
            "Cache-Control": "no-store",
          },
        }
      );
    }

    // 3. Request Body Parsing & Strict Input Validation
    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload in request body." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    if (!body || typeof body !== "object" || !("messages" in body)) {
      return NextResponse.json(
        { error: "Missing required 'messages' array in request body." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const { messages } = body as { messages: unknown };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "'messages' must be a non-empty array of message objects." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Limit conversation depth to prevent context stuffing (max 15 messages)
    if (messages.length > 15) {
      return NextResponse.json(
        { error: "Conversation history is too long. Please start a fresh chat." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // Validate individual messages
    const validatedMessages: ChatMessage[] = [];
    for (const msg of messages) {
      if (
        !msg ||
        typeof msg !== "object" ||
        !("role" in msg) ||
        !("content" in msg) ||
        typeof (msg as ChatMessage).content !== "string"
      ) {
        return NextResponse.json(
          { error: "Each message must have 'role' ('user' | 'assistant') and string 'content'." },
          { status: 400, headers: { "Cache-Control": "no-store" } }
        );
      }

      const role = (msg as ChatMessage).role;
      const content = (msg as ChatMessage).content.trim();

      if (role !== "user" && role !== "assistant") {
        return NextResponse.json(
          { error: "Only 'user' and 'assistant' roles are permitted from the client." },
          { status: 400, headers: { "Cache-Control": "no-store" } }
        );
      }

      // Validate based on role:
      // User questions must be non-empty and under 500 characters.
      // Assistant history messages can be longer and must NEVER block the user's turn.
      if (role === "user") {
        if (content.length === 0) {
          return NextResponse.json(
            { error: "Message content cannot be empty." },
            { status: 400, headers: { "Cache-Control": "no-store" } }
          );
        }

        if (content.length > 500) {
          return NextResponse.json(
            { error: "Message is too long (maximum 500 characters per question)." },
            { status: 400, headers: { "Cache-Control": "no-store" } }
          );
        }

        validatedMessages.push({ role, content });
      } else if (role === "assistant") {
        if (content.length > 0) {
          // Bounded assistant history to preserve token efficiency
          const safeContent = content.length > 2500 ? content.slice(0, 2500) : content;
          validatedMessages.push({ role, content: safeContent });
        }
      }
    }

    // The conversation must have at least one user message and the most recent must be from the user
    if (validatedMessages.length === 0) {
      return NextResponse.json(
        { error: "No valid messages found in conversation." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    const lastMessage = validatedMessages[validatedMessages.length - 1];
    if (lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "The latest message in the conversation must be from the user." },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      );
    }

    // 4. Build Factual Knowledge Context & System Prompt
    const bakeryContext = await getBakeryKnowledgeContext();
    const systemPrompt = buildBakingBuddySystemPrompt(bakeryContext);

    // Keep recent history (last 6 messages) for compact latency and low token usage
    const recentHistory = validatedMessages.slice(-6);

    const fullMessages = [
      { role: "system", content: systemPrompt },
      ...recentHistory,
    ];

    // 5. OpenRouter API Dispatch (Initial model route: openrouter/free)
    const model = process.env.OPENROUTER_MODEL?.trim() || "openrouter/free";

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://kidold-bakers.vercel.app",
        "X-Title": "KidOld Bakers Baking Buddy",
      },
      body: JSON.stringify({
        model,
        messages: fullMessages,
        max_tokens: 850,
        temperature: 0.7,
      }),
    });

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text().catch(() => "");
      console.error(
        `[Baking Buddy API Error] Status: ${openRouterResponse.status}, Details: ${errorText}`
      );

      if (openRouterResponse.status === 429) {
        return NextResponse.json(
          {
            error:
              "Baking Buddy's oven is super busy right now with celebrations! 🎂 Please try asking again in a moment, or tap WhatsApp to speak with our chef directly.",
          },
          { status: 429, headers: { "Cache-Control": "no-store" } }
        );
      }

      return NextResponse.json(
        {
          error:
            "Baking Buddy had a temporary hiccup connecting to the kitchen. Please try again shortly or chat with us on WhatsApp!",
        },
        { status: 502, headers: { "Cache-Control": "no-store" } }
      );
    }

    const data = await openRouterResponse.json();
    let reply = data?.choices?.[0]?.message?.content?.trim() || "";

    // Clean up any internal reasoning tags (<think>...</think>) if a free reasoning model is selected
    if (reply.includes("<think>")) {
      reply = reply.replace(/<think>[\s\S]*?(?:<\/think>|$)/gi, "").trim();
    }

    if (!reply) {
      reply =
        "I'm here to help you choose the best artisan cake! What kind of celebration are you planning? You can also reach our master bakers directly on WhatsApp (+91 93109 71535).";
    }

    // Server-side guarantee: Append mandatory disclaimer if answering about customization, ingredients, bulk, or pricing
    const MANDATORY_DISCLAIMER =
      "*Final availability, pricing and customization must be confirmed directly with KidOld Bakers by phone/WhatsApp.*";
    const userQueryLower = lastMessage.content.toLowerCase();
    const needsDisclaimer =
      userQueryLower.includes("gold") ||
      userQueryLower.includes("foil") ||
      userQueryLower.includes("1000") ||
      userQueryLower.includes("guest") ||
      userQueryLower.includes("custom") ||
      userQueryLower.includes("price") ||
      userQueryLower.includes("rate") ||
      userQueryLower.includes("cost") ||
      userQueryLower.includes("deliver") ||
      userQueryLower.includes("tier");

    if (needsDisclaimer && !reply.includes("Final availability, pricing and customization must be confirmed")) {
      reply = `${reply}\n\n${MANDATORY_DISCLAIMER}`;
    }

    return NextResponse.json(
      {
        reply,
        model,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      }
    );
  } catch (error) {
    console.error("[Baking Buddy Unhandled Error]:", error);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred while consulting Baking Buddy. Please reach us on WhatsApp or call our bakery counter directly!",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}
