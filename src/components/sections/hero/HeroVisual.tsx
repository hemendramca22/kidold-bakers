import React from "react";
import Image from "next/image";
import { FreshBakerIcon, HeartSparkleIcon } from "@/components/icons";
import { VegIndicator } from "@/components/ui/Badge";
import { heroMediaConfig } from "@/data/business";

interface HeroVisualProps {
  className?: string;
}

/**
 * Reusable HeroMedia / HeroVisual Component.
 * 
 * Replaces the enlarged duplicate logo with a dedicated, photograph-ready
 * bakery visual composition designed around the KidOld brand palette.
 * 
 * Designed to seamlessly receive authentic KidOld Bakers photography
 * (via `heroMediaConfig.authenticPhotoSrc` in `src/data/business.ts`)
 * without requiring any layout or structural changes.
 */
export function HeroVisual({ className = "" }: HeroVisualProps) {
  const hasAuthenticPhoto = Boolean(heroMediaConfig.authenticPhotoSrc);

  return (
    <div
      className={`relative w-full max-w-[500px] mx-auto select-none ${className}`}
      data-component="hero-visual-frame"
    >
      {/* Ambient warm brand lighting (gold & crimson undertone) */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-brand-gold/20 via-brand-crimson/10 to-brand-gold-sparkle/25 blur-2xl -z-10 pointer-events-none" />

      {/* Main Photographic Bakery Composition Frame */}
      <div className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-white via-brand-cream to-brand-cream-warm dark:from-brand-chocolate-dark dark:via-brand-chocolate dark:to-brand-chocolate-light/40 border-2 border-brand-gold/45 dark:border-brand-gold/40 shadow-tactile-hover overflow-hidden">
        
        {/* Inner Platter / Display Surface */}
        <div className="relative aspect-[4/4.2] sm:aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#FFFDF7] via-[#FAF4EA] to-[#F5EAD7] dark:from-[#1E0F0A] dark:via-[#170C07] dark:to-[#120703] border border-brand-border/70 dark:border-brand-gold/30">
          <Image
            src={heroMediaConfig.authenticPhotoSrc}
            alt={heroMediaConfig.altText}
            fill
            priority
            sizes="(max-width: 640px) 90vw, 500px"
            className="object-cover rounded-xl transition-transform duration-700 hover:scale-105"
          />
          {/* Subtle warm rim light overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-chocolate/40 via-transparent to-black/10 rounded-xl pointer-events-none" />
        </div>

        {/* Floating Tactile Badges */}
        <div className="absolute top-6 right-6 bg-white/95 dark:bg-brand-chocolate/95 backdrop-blur-xs metallic-gold-surface border border-brand-gold/50 shadow-tactile px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-bold text-brand-chocolate">
          <FreshBakerIcon className="w-3.5 h-3.5 text-brand-chocolate" />
          <span>100% Handcrafted</span>
        </div>

        <div className="absolute bottom-6 left-6 bg-brand-chocolate/95 dark:bg-[#120703]/95 backdrop-blur-xs text-brand-cream border border-brand-gold/30 shadow-chocolate-tactile px-3.5 py-1.5 rounded-full flex items-center gap-2 text-xs font-semibold">
          <VegIndicator className="w-3.5 h-3.5" />
          <span>100% Pure Veg</span>
        </div>

        {heroMediaConfig.isConceptAsset && (
          <div className="absolute bottom-6 right-6 bg-white/95 dark:bg-brand-chocolate-light/70 text-brand-chocolate dark:text-brand-cream border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile-sm px-2.5 py-1 rounded-full text-[10px] font-semibold">
            Concept Showcase
          </div>
        )}
      </div>
    </div>
  );
}

