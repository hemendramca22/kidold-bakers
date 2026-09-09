"use client";

import React, { forwardRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { heroMediaConfig } from "@/data/business";
import { SparklesIcon } from "@/components/icons";

// Preload the 3D Scene chunk immediately at client module evaluation time
const loadHeroCakeScene = () =>
  import("./HeroCakeScene").then((mod) => mod.HeroCakeScene);

if (typeof window !== "undefined") {
  // Trigger chunk download concurrently with hydration
  loadHeroCakeScene();
}

const HeroCakeScene = dynamic(loadHeroCakeScene, {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
      <div className="w-12 h-12 rounded-full border-2 border-brand-gold/25 border-t-brand-gold animate-spin" />
      <span className="text-[11px] font-bold tracking-widest uppercase text-brand-chocolate-light/70 dark:text-brand-gold/80">
        Loading 3D Craft...
      </span>
    </div>
  ),
});

export interface HeroProductStageProps {
  className?: string;
  scrollProgress?: number | React.RefObject<number> | { current: number };
}

/**
 * HeroProductStage
 * Flagship interactive 3D stage featuring the scroll-driven celebration cake.
 */
export const HeroProductStage = forwardRef<HTMLDivElement, HeroProductStageProps>(
  function HeroProductStage({ className = "", scrollProgress = 0 }, ref) {
    const [hasWebGL, setHasWebGL] = useState(true);

    useEffect(() => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        setHasWebGL(Boolean(gl));
      } catch {
        setHasWebGL(false);
      }
    }, []);

    return (
      <div
        ref={ref}
        className={`hero-product-stage relative w-full h-full select-none ${className}`}
        data-component="hero-product-stage"
        data-product-scene-boundary
      >
        {/* Ambient Halo & Aura Glow */}
        <div
          className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,rgba(238,204,142,0.4)_0%,rgba(246,223,182,0.18)_42%,transparent_72%)] dark:bg-[radial-gradient(circle,rgba(200,157,60,0.22)_0%,rgba(139,21,40,0.16)_45%,transparent_72%)] blur-3xl pointer-events-none transition-colors duration-500"
          aria-hidden="true"
        />

        {/* 3D Visual Stage Container */}
        <div className="hero-stage-visual relative w-full h-full overflow-hidden">
          {hasWebGL ? (
            <div className="relative w-full h-full">
              <HeroCakeScene scrollProgress={scrollProgress} className="h-full w-full" />
            </div>
          ) : (
            /* Elegant Branded 3D Loading State */
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none">
              <div className="w-12 h-12 rounded-full border-2 border-brand-gold/25 border-t-brand-gold animate-spin" />
              <span className="text-[11px] font-bold tracking-widest uppercase text-brand-chocolate-light/70 dark:text-brand-gold/80">
                Loading 3D Craft...
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
);
