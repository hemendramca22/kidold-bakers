"use client";

import React from "react";
import { FreshBakerIcon, CakeStudioIcon, HeartSparkleIcon } from "@/components/icons";

interface HeroProductCalloutsProps {
  className?: string;
  visible?: boolean;
}

export const CALLOUT_DATA = [
  {
    id: "flavour",
    label: "Flavour",
    title: "Belgian Cocoa & Vanilla Chiffon",
    desc: "Dual-tier moist sponge infused with pure dairy",
    icon: <FreshBakerIcon className="w-3.5 h-3.5 text-brand-gold shrink-0" />,
    positionClass: "top-4 left-2 sm:left-4",
  },
  {
    id: "filling",
    label: "Filling",
    title: "55% Dark Ganache & Berry Compote",
    desc: "Rich fudge reduction with citrus zing",
    icon: <HeartSparkleIcon className="w-3.5 h-3.5 text-brand-crimson shrink-0" />,
    positionClass: "bottom-16 left-2 sm:left-4",
  },
  {
    id: "decoration",
    label: "Decoration",
    title: "Hand-Piped & 24k Edible Gold Leaf",
    desc: "Fresh wild raspberries and artisanal swirls",
    icon: <CakeStudioIcon className="w-3.5 h-3.5 text-brand-gold shrink-0" />,
    positionClass: "top-1/3 right-2 sm:right-4",
  },
];

/**
 * HeroProductCallouts
 *
 * Tactile glassmorphic callout tags positioned in the foreground
 * during State 4 of the scroll-scrubbed product progression.
 */
export function HeroProductCallouts({ className = "", visible = false }: HeroProductCalloutsProps) {
  return (
    <div
      className={`hero-callouts-container absolute inset-0 pointer-events-none z-30 transition-opacity duration-500 ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-hidden={!visible}
    >
      {CALLOUT_DATA.map((item) => (
        <div
          key={item.id}
          className={`hero-callout-item absolute ${item.positionClass} max-w-[210px] sm:max-w-[240px] p-2.5 sm:p-3 rounded-2xl bg-white/95 dark:bg-[#1D0F0A]/95 backdrop-blur-md metallic-card-rim border border-brand-gold/50 dark:border-brand-gold/40 shadow-tactile-lg dark:shadow-[0_12px_32px_rgba(0,0,0,0.5)] transform transition-all duration-500 ${
            visible ? "translate-y-0 opacity-100 scale-100" : "translate-y-3 opacity-0 scale-95"
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1">
            {item.icon}
            <span className="text-[10px] font-bold tracking-wider uppercase text-brand-crimson dark:text-brand-crimson-light">
              {item.label}
            </span>
          </div>
          <h5 className="text-xs sm:text-sm font-bold text-brand-chocolate dark:text-brand-cream leading-snug">
            {item.title}
          </h5>
          <p className="text-[11px] text-brand-chocolate-light dark:text-brand-cream/70 leading-tight mt-0.5 hidden sm:block">
            {item.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
