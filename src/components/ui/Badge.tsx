import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "crimson" | "gold" | "green" | "neutral" | "chocolate";
  children: React.ReactNode;
}

export function Badge({
  variant = "neutral",
  className,
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    crimson: "bg-brand-crimson/10 dark:bg-brand-crimson/25 text-brand-crimson dark:text-[#FFAAB5] border-brand-crimson/25 dark:border-brand-crimson/40 shadow-tactile-sm",
    gold: "metallic-gold-surface text-brand-chocolate font-bold border-brand-gold/60 shadow-tactile-sm",
    green: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800 font-medium shadow-tactile-sm",
    neutral: "bg-brand-cream-warm dark:bg-[#25130C] text-brand-chocolate/80 dark:text-brand-cream/80 border-brand-border dark:border-brand-gold/20 shadow-tactile-sm",
    chocolate: "bg-brand-chocolate dark:bg-[#2A160F] text-white dark:text-brand-gold border-transparent dark:border-brand-gold/30 shadow-tactile-sm",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs border tracking-wide select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

/**
 * Standard Indian FSSAI-style green dot badge for 100% Pure Veg / Eggless indicator
 */
export function VegIndicator({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-4 h-4 border-2 border-emerald-600 p-[2px] rounded-[3px] bg-white",
        className
      )}
      title="100% Pure Vegetarian / Eggless"
      aria-label="100% Pure Vegetarian"
    >
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 block" />
    </span>
  );
}
