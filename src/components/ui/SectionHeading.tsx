import React from "react";
import { cn } from "@/lib/utils";
import { CakeStudioIcon } from "@/components/icons";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
    >
      {badge && (
        <div
          className={cn(
            "inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-brand-chocolate dark:text-brand-cream bg-white/90 dark:bg-[#1E100A]/90 border border-brand-gold/60 shadow-tactile-sm mb-3.5 transition-colors",
            align === "center" && "mx-auto"
          )}
        >
          <CakeStudioIcon className="w-3.5 h-3.5 text-brand-gold" />
          <span className="metallic-gold-text">{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-brand-chocolate dark:text-brand-cream tracking-tight leading-tight transition-colors">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3.5 text-base sm:text-lg text-brand-chocolate/75 dark:text-brand-cream/80 font-sans leading-relaxed transition-colors">
          {subtitle}
        </p>
      )}
      <div
        className={cn(
          "w-24 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent rounded-full mt-4 shadow-[0_0_8px_rgba(212,160,23,0.4)]",
          align === "center" ? "mx-auto" : "ml-0"
        )}
      />
    </div>
  );
}
