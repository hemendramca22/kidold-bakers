"use client";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  variant?: "surface" | "cream" | "gradient" | "tray" | "glass";
}

export function Card({
  interactive = false,
  variant = "surface",
  className,
  children,
  ...props
}: CardProps) {
  const variantStyles = {
    surface:
      "bg-white/95 dark:bg-[#1D0F0A]/90 backdrop-blur-xs border border-brand-border/80 dark:border-brand-gold/25 shadow-tactile dark:shadow-[0_12px_36px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(245,197,66,0.2)] hover:border-brand-gold/50 dark:hover:border-brand-gold/60",
    cream:
      "bg-gradient-to-b from-brand-cream to-brand-cream-warm dark:from-[#24130C] dark:to-[#1A0E08] border border-brand-border dark:border-brand-gold/25 shadow-tactile dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)]",
    gradient:
      "bg-gradient-to-b from-white via-brand-cream to-brand-cream-warm dark:from-[#2A160F] dark:via-[#1E100A] dark:to-[#150A06] border border-brand-gold/35 dark:border-brand-gold/40 shadow-tactile dark:shadow-[0_14px_38px_rgba(0,0,0,0.7)]",
    glass:
      "bg-white/75 dark:bg-[#1A0E09]/75 backdrop-blur-md border border-white/80 dark:border-brand-gold/30 shadow-[0_12px_32px_rgba(44,24,16,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] dark:shadow-[0_14px_38px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(245,197,66,0.25)]",
    tray:
      "bg-brand-cream-warm/90 dark:bg-[#180C07]/90 border-2 border-dashed border-brand-border dark:border-brand-gold/30 shadow-inner",
  };

  return (
    <div
      className={cn(
        "rounded-2xl sm:rounded-3xl overflow-hidden transition-all duration-300",
        variantStyles[variant],
        interactive &&
          "cursor-pointer hover:-translate-y-1.5 hover:shadow-tactile-hover hover:border-brand-gold/60 active:translate-y-0 active:shadow-tactile",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
