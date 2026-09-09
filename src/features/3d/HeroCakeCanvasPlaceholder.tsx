import React from "react";
import Image from "next/image";
import { FreshBakerIcon, HeartSparkleIcon } from "@/components/icons";

interface HeroCakeCanvasPlaceholderProps {
  className?: string;
}

/**
 * Phase-1 Architectural 3D Boundary Component.
 * 
 * In Phase 1, this renders an optimized, responsive showcase of the KidOld emblem
 * and handcrafted cake centerpiece with ambient warm glow and subtle hover reaction.
 * 
 * In Phase 3, this container seamlessly mounts the Three.js / React Three Fiber canvas
 * without requiring layout changes to the Hero Section.
 */
export function HeroCakeCanvasPlaceholder({ className = "" }: HeroCakeCanvasPlaceholderProps) {
  return (
    <div
      className={`relative w-full max-w-[480px] aspect-square mx-auto flex items-center justify-center select-none ${className}`}
      data-feature="hero-3d-boundary"
    >
      {/* Ambient background glow matching warm gold and crimson tones */}
      <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-brand-gold/25 via-brand-crimson/15 to-brand-gold-sparkle/20 blur-2xl -z-10 animate-pulse" />

      {/* Outer decorative ring simulating confectioner's turntable */}
      <div className="absolute inset-0 rounded-full border-2 border-dashed border-brand-gold/40 animate-[spin_60s_linear_infinite]" />
      <div className="absolute inset-3 rounded-full border border-brand-border/60" />

      {/* Central Emblem & Cake Presentation */}
      <div className="relative w-[86%] h-[86%] rounded-full p-2 bg-gradient-to-b from-brand-cream via-white to-brand-cream-warm shadow-bakery-lg border-2 border-brand-gold/40 flex items-center justify-center overflow-hidden group">
        <Image
          src="/images/brand/kidold Logo.jpeg"
          alt="KidOld Bakers - Handcrafted Cake and Family Bond"
          width={420}
          height={420}
          priority
          className="object-contain w-full h-full drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
        />

        {/* Floating Accent Badges */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm border border-brand-gold/40 shadow-bakery px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold text-brand-chocolate">
          <HeartSparkleIcon className="w-3.5 h-3.5 text-brand-crimson" />
          <span>Handcrafted with Love</span>
        </div>

        <div className="absolute bottom-4 left-4 bg-brand-chocolate/90 backdrop-blur-sm text-brand-cream border border-brand-gold/30 shadow-bakery px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-medium">
          <FreshBakerIcon className="w-3.5 h-3.5 text-brand-gold-sparkle" />
          <span>Fresh Daily in Jaunpur</span>
        </div>
      </div>
    </div>
  );
}
