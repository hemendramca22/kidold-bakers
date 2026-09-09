"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "./ThemeProvider";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Exact dimensions to prevent layout shift and guarantee instant visibility
    return (
      <div
        className={`relative inline-flex h-9 w-[72px] shrink-0 items-center rounded-full p-1 bg-gradient-to-r from-[#FAF5EB] to-[#F3E9DC] dark:bg-[#1E100A] border border-brand-border dark:border-brand-gold/40 shadow-tactile-sm ${className}`}
        aria-hidden="true"
      >
        <span className="relative flex h-7 w-7 transform items-center justify-center rounded-full bg-gradient-to-b from-[#FFFDF7] to-[#F6EDE0] border border-brand-gold/40 shadow-sm">
          <svg className="h-4 w-4 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
            <circle cx="12" cy="12" r="4" fill="#F5C542" fillOpacity="0.25" />
          </svg>
        </span>
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`group relative inline-flex h-9 w-[72px] shrink-0 cursor-pointer items-center rounded-full p-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 select-none ${
        isDark
          ? "bg-[#1E100A] border border-brand-gold/40 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_1px_0_rgba(200,157,60,0.2)]"
          : "bg-gradient-to-r from-[#FAF5EB] to-[#F3E9DC] border border-brand-border shadow-[inset_0_2px_4px_rgba(44,24,16,0.12),0_1px_0_rgba(255,255,255,0.9)]"
      } ${className}`}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
    >
      {/* Background track icons */}
      <div className="absolute inset-0 flex items-center justify-between px-2.5 pointer-events-none">
        {/* Luminous Sun symbol in track (bright & glowing in dark mode to clearly signal switching to light theme) */}
        <div className={`relative flex items-center justify-center transition-opacity duration-200 ${isDark ? "opacity-100" : "opacity-0"}`}>
          <span className="absolute -inset-1 rounded-full bg-amber-400/25 blur-[3px]" />
          <svg
            className="relative h-4 w-4 text-[#FFE28A] drop-shadow-[0_0_6px_rgba(255,215,80,0.85)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <circle cx="12" cy="12" r="4.5" fill="#FFE28A" fillOpacity="0.35" />
            <path strokeLinecap="round" d="M12 1v2.5M12 20.5v2.5M4.22 4.22l1.77 1.77M18.01 18.01l1.77 1.77M1 12h2.5M20.5 12h2.5M4.22 19.78l1.77-1.77M18.01 5.99l1.77-1.77" />
          </svg>
        </div>

        {/* Moon symbol in track */}
        <svg
          className={`h-3.5 w-3.5 transition-opacity duration-200 ${
            isDark ? "opacity-0" : "opacity-30 text-brand-chocolate/50"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
        </svg>
      </div>

      {/* Tactile Skeuomorphic Thumb Slider */}
      <span
        className={`pointer-events-none relative flex h-7 w-7 transform items-center justify-center rounded-full transition-transform duration-300 ease-spring ${
          isDark
            ? "translate-x-[36px] bg-gradient-to-b from-[#2E160D] via-[#1D0E08] to-[#120703] text-brand-gold-sparkle border border-brand-gold/60 shadow-[0_3px_8px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(245,197,66,0.5)]"
            : "translate-x-0 bg-gradient-to-b from-[#FFFDF7] via-[#FFF9ED] to-[#F6EDE0] text-brand-crimson border border-brand-gold/40 shadow-[0_3px_8px_rgba(44,24,16,0.18),inset_0_1px_1px_rgba(255,255,255,0.95)]"
        }`}
      >
        {isDark ? (
          /* Moon Icon on Thumb */
          <svg
            className="h-3.5 w-3.5 text-brand-gold-sparkle drop-shadow-[0_0_4px_rgba(245,197,66,0.5)]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
        ) : (
          /* Sun Icon on Thumb */
          <svg
            className="h-4 w-4 text-brand-gold drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <circle cx="12" cy="12" r="4" fill="#F5C542" fillOpacity="0.25" />
            <path strokeLinecap="round" d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        )}
      </span>
    </button>
  );
}
