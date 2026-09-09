"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "gold" | "outline" | "ghost" | "whatsapp";
  size?: "sm" | "md" | "lg";
  href?: string;
  isExternal?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  isExternal,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative overflow-hidden inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 active:scale-[0.97] active:translate-y-0.5 active:shadow-tactile-pressed disabled:opacity-50 disabled:pointer-events-none select-none cursor-pointer before:absolute before:inset-x-0 before:top-0 before:h-[45%] before:bg-gradient-to-b before:from-white/25 before:to-transparent before:pointer-events-none before:rounded-t-full";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 min-h-[38px] gap-1.5",
    md: "text-sm px-5 py-2.5 min-h-[44px] gap-2 font-semibold",
    lg: "text-base px-7 py-3.5 min-h-[50px] gap-2.5 font-bold tracking-wide",
  };

  const variantStyles = {
    primary:
      "bg-[#8B1528] bg-gradient-to-b from-[#A31D33] via-[#8B1528] to-[#6E0F1E] text-white shadow-crimson-tactile hover:brightness-105 hover:-translate-y-0.5 border border-brand-crimson/40 isolate transform-gpu",
    secondary:
      "bg-gradient-to-b from-[#3B2218] via-[#2C1810] to-[#1E100A] text-white shadow-chocolate-tactile hover:brightness-110 hover:-translate-y-0.5 border border-brand-chocolate/40",
    gold:
      "metallic-gold-surface text-brand-chocolate shadow-metallic-gold hover:brightness-105 hover:-translate-y-0.5 border border-brand-gold/80 font-bold",
    outline:
      "border-2 border-brand-chocolate/20 dark:border-brand-gold/40 text-brand-chocolate dark:text-brand-cream bg-white/80 dark:bg-[#1E100A]/80 hover:border-brand-chocolate dark:hover:border-brand-gold hover:bg-white dark:hover:bg-[#2A160F] shadow-tactile-sm hover:shadow-tactile hover:-translate-y-0.5",
    ghost:
      "text-brand-chocolate dark:text-brand-cream hover:bg-brand-cream-warm/80 dark:hover:bg-brand-gold/15 hover:text-brand-crimson dark:hover:text-brand-gold before:hidden",
    whatsapp:
      "bg-gradient-to-b from-[#3B2218] via-[#2A160F] to-[#1D0E09] dark:from-[#2A150E] dark:via-[#1B0C06] dark:to-[#120603] text-brand-cream-warm shadow-chocolate-tactile hover:brightness-110 hover:-translate-y-0.5 border border-brand-gold/40 dark:border-brand-gold/60 hover:border-brand-gold font-semibold",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <span className="inline-flex items-center gap-1.5 pointer-events-none">
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </span>
  );

  if (href) {
    if (isExternal || href.startsWith("http") || href.startsWith("https://wa.me") || href.startsWith("tel:")) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={props.type || "button"}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
