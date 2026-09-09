"use client";

import React, { useState, useRef, useEffect } from "react";
import { WhatsAppIcon } from "@/components/icons";
import { OldBakerChefAvatar } from "./OldBakerChefAvatar";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { getISTScheduleStatus, OFFLINE_MESSAGE } from "@/lib/ai/baking-buddy-schedule";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  isError?: boolean;
}

export interface BakingBuddyChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUICK_SUGGESTIONS = [
  { label: "🎂 Birthday Cakes", query: "What signature cakes do you recommend for a birthday celebration?" },
  { label: "🌿 100% Eggless", query: "Can you confirm if all your cakes and treats are 100% pure veg and eggless?" },
  { label: "🎨 Custom Tiers", query: "How does the 4-step custom cake design studio work?" },
  { label: "📍 Location & Hours", query: "Where is KidOld Bakers located in Jaunpur and what are your counter pickup hours?" },
];

function createGreetingMessage(isOnline: boolean): ChatMessage {
  if (!isOnline) {
    return {
      id: "greeting",
      role: "assistant",
      content: OFFLINE_MESSAGE,
      timestamp: "Just now",
    };
  }

  return {
    id: "greeting",
    role: "assistant",
    content: `Namaste! I am Baking Buddy, your confectionery assistant at KidOld Bakers in Jaunpur. 🍰✨\n\nEvery cake and treat from our ovens is **100% pure vegetarian and eggless**.\n\nHow can I help with your celebration today? Ask about flavors, custom tier ideas, or pickup details!`,
    timestamp: "Just now",
  };
}

export function BakingBuddyChat({ isOpen, onClose }: BakingBuddyChatProps) {
  const [schedule, setSchedule] = useState(() => getISTScheduleStatus());
  const [messages, setMessages] = useState<ChatMessage[]>(() => [createGreetingMessage(schedule.isOnline)]);
  const [inputQuery, setInputQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Keep IST schedule updated on open
  useEffect(() => {
    const current = getISTScheduleStatus();
    setSchedule(current);
  }, [isOpen]);

  // Auto-scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isLoading]);

  // Lock body scroll ONLY on mobile (< 640px); desktop remains fully scrollable
  useEffect(() => {
    if (isOpen && typeof window !== "undefined") {
      const isMobileViewport = window.innerWidth < 640;
      if (isMobileViewport) {
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = originalOverflow;
        };
      }
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputQuery).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputQuery("");
    setIsLoading(true);

    try {
      // Format messages payload for server API (exclude client greeting & errors, last 6 turns)
      const payloadMessages = updatedMessages
        .filter((m) => !m.isError && m.id !== "greeting")
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }));

      const response = await fetch("/api/baking-buddy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to consult Baking Buddy right now.");
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong.";
      const errorChatBubble: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        content: `🍰 ${errorMessage} You can also connect with our master chefs directly on WhatsApp (+91 93109 71535) or call our Jaunpur counter!`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      };
      setMessages((prev) => [...prev, errorChatBubble]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Mobile-Only Backdrop (sm:hidden) - Dismisses on touch. On desktop, NO backdrop renders so page remains interactive */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs sm:hidden animate-in fade-in duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Floating Chat Container: Bottom sheet on mobile, Bottom-Right floating widget on desktop */}
      <div
        role="dialog"
        aria-modal={typeof window !== "undefined" && window.innerWidth < 640}
        aria-label="Baking Buddy AI Chatbot"
        className="fixed bottom-0 inset-x-0 sm:inset-x-auto sm:bottom-6 sm:right-6 z-50 w-full sm:w-[390px] h-[88vh] sm:h-[570px] max-h-[92vh] sm:max-h-[calc(100vh-3.5rem)] flex flex-col rounded-t-2xl sm:rounded-2xl bg-[#FFFDF9] dark:bg-[#1A0E08] border-t sm:border border-[#EADBCC] dark:border-[#382014] shadow-[0_-12px_40px_rgba(0,0,0,0.25)] sm:shadow-[0_12px_40px_rgba(44,24,16,0.18)] dark:sm:shadow-[0_16px_48px_rgba(0,0,0,0.7)] overflow-hidden animate-in slide-in-from-bottom duration-250 pointer-events-auto"
      >
        {/* Simplified, Clean Header */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-[#EADBCC]/80 dark:border-[#382014] bg-[#FAF5EB] dark:bg-[#20110A] shrink-0">
          <div className="flex items-center gap-2.5">
            <OldBakerChefAvatar
              size={36}
              isSleeping={!schedule.isOnline}
              className="drop-shadow-xs"
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-brand-chocolate dark:text-brand-cream leading-tight">
                Baking Buddy
              </span>
              <span className="text-[10px] text-brand-chocolate/70 dark:text-brand-cream/60 flex items-center gap-1.5 leading-none mt-0.5">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    schedule.isOnline ? "bg-emerald-500 animate-pulse" : "bg-amber-400"
                  }`}
                />
                {schedule.isOnline ? "Online • 100% Eggless" : "Resting (Back at 10 AM IST)"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct WhatsApp Action Link */}
            <a
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] dark:text-[#25D366] border border-[#25D366]/30 transition-colors"
              title="Chat directly with Bakery on WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-[#25D366]" />
              <span>WhatsApp</span>
            </a>

            {/* Clean Close Button */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close Baking Buddy"
              className="w-7 h-7 rounded-full flex items-center justify-center text-brand-chocolate/60 hover:text-brand-chocolate dark:text-brand-cream/60 dark:hover:text-brand-cream hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Message Stream Area - Reduced Visual Noise */}
        <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-3 text-xs sm:text-[13px]">
          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <div
                key={msg.id}
                className={`flex gap-2 items-end ${isUser ? "justify-end" : "justify-start"} animate-in fade-in duration-150`}
              >
                {!isUser && (
                  <div className="shrink-0 mb-0.5">
                    <OldBakerChefAvatar
                      size={26}
                      isSleeping={!schedule.isOnline}
                    />
                  </div>
                )}

                <div
                  className={`rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-wrap ${
                    isUser
                      ? "rounded-tr-xs bg-brand-chocolate text-white dark:bg-[#2C160D] dark:text-[#FFFDF7] dark:border dark:border-brand-gold/30 max-w-[82%]"
                      : msg.isError
                      ? "rounded-tl-xs bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-900/50 max-w-[85%]"
                      : "rounded-tl-xs bg-[#F7F2EC] dark:bg-[#23140C] text-brand-chocolate dark:text-[#F5EDE4] border border-[#E8DCCF] dark:border-[#382014] max-w-[85%]"
                  }`}
                >
                  <p className="font-sans leading-relaxed">{msg.content}</p>
                  <div
                    className={`text-[9px] mt-1 text-right font-mono ${
                      isUser ? "text-white/60" : "text-brand-chocolate/40 dark:text-brand-cream/40"
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Assistant Typing Indicator */}
          {isLoading && (
            <div className="flex gap-2 items-end justify-start animate-in fade-in duration-150">
              <div className="shrink-0 mb-0.5">
                <OldBakerChefAvatar size={26} isSleeping={false} />
              </div>
              <div className="rounded-2xl rounded-tl-xs bg-[#F7F2EC] dark:bg-[#23140C] border border-[#E8DCCF] dark:border-[#382014] px-3 py-2 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson animate-bounce" />
                <span className="text-[11px] text-brand-chocolate/60 dark:text-brand-cream/60 ml-1">
                  Thinking...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Question Chips - Sits cleanly directly above input with NO blank strip below */}
        {messages.length <= 2 && !isLoading && (
          <div className="px-3.5 py-2 border-t border-[#EADBCC]/60 dark:border-[#382014]/60 bg-[#FAF6EE]/50 dark:bg-[#1C0F08]/50 shrink-0">
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar">
              {QUICK_SUGGESTIONS.map((chip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSendMessage(chip.query)}
                  className="px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap bg-white dark:bg-[#24130A] border border-[#DFCEBD] dark:border-[#422518] text-brand-chocolate dark:text-brand-cream hover:border-brand-crimson hover:text-brand-crimson dark:hover:text-brand-gold transition-colors shrink-0 shadow-2xs"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Simplified Input Form */}
        <div className="p-3 bg-white dark:bg-[#1A0E08] border-t border-[#EADBCC]/80 dark:border-[#382014] shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={
                  schedule.isOnline
                    ? "Ask about cakes, flavors, custom tiers..."
                    : "Resting (10 PM–10 AM IST). Tap WhatsApp for orders!"
                }
                maxLength={500}
                disabled={isLoading}
                className="w-full h-10 pl-3.5 pr-8 rounded-full bg-[#FAF5EB]/90 dark:bg-[#23120A] border border-[#DDCBC0] dark:border-[#3E2316] text-brand-chocolate dark:text-brand-cream placeholder-brand-chocolate/40 dark:placeholder-brand-cream/40 text-xs sm:text-sm focus:outline-none focus:border-brand-crimson dark:focus:border-brand-gold shadow-inner transition-colors disabled:opacity-50"
              />
              {inputQuery.length > 0 && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-brand-chocolate/40 dark:text-brand-cream/40 font-mono">
                  {500 - inputQuery.length}
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              aria-label="Send message"
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-brand-crimson hover:bg-brand-crimson/90 text-white disabled:opacity-40 disabled:pointer-events-none active:scale-95 transition-all shadow-xs"
            >
              <svg className="w-4 h-4 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>

          <div className="flex items-center justify-between text-[9px] text-brand-chocolate/45 dark:text-brand-cream/40 mt-1 px-1">
            <span>100% Pure Veg &amp; Eggless</span>
            <span>Online 10 AM – 10 PM IST</span>
          </div>
        </div>
      </div>
    </>
  );
}
