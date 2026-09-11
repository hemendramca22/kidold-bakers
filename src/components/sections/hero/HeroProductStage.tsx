"use client";

import React, { forwardRef, useState, useEffect, useRef } from "react";
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

const CAKE_SLIDES = [
  {
    id: 0,
    name: "Signature Masterpiece",
    tagline: "24K Bullion & Belgian Truffle",
    ariaLabel: "Cake 1 of 3: KidOld Signature Masterpiece Cake",
  },
  {
    id: 1,
    name: "Kids Celebration Cake",
    tagline: "Marshmallow Clouds & Flying Explorer",
    ariaLabel: "Cake 2 of 3: Kids Celebration Cake with Flying Explorer",
  },
  {
    id: 2,
    name: "Luxury Anniversary Cake",
    tagline: "Velvet Burgundy, Sculpted Couple & Love Motifs",
    ariaLabel: "Cake 3 of 3: Luxury Anniversary Celebration Cake",
  },
];

/**
 * HeroProductStage
 * Flagship interactive 3D stage featuring the 3-cake carousel with 360° turntable rotation.
 */
export const HeroProductStage = forwardRef<HTMLDivElement, HeroProductStageProps>(
  function HeroProductStage({ className = "", scrollProgress = 0 }, ref) {
    const [hasWebGL, setHasWebGL] = useState(true);
    const [activeCakeIndex, setActiveCakeIndex] = useState(0);
    const lastNavTime = useRef(0);

    useEffect(() => {
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        setHasWebGL(Boolean(gl));
      } catch {
        setHasWebGL(false);
      }
    }, []);

    const handlePrevCake = () => {
      const now = Date.now();
      if (now - lastNavTime.current < 220) return;
      lastNavTime.current = now;
      setActiveCakeIndex((prev) => (prev - 1 + 3) % 3);
    };

    const handleNextCake = () => {
      const now = Date.now();
      if (now - lastNavTime.current < 220) return;
      lastNavTime.current = now;
      setActiveCakeIndex((prev) => (prev + 1) % 3);
    };

    const handleSelectCake = (index: number) => {
      const now = Date.now();
      if (now - lastNavTime.current < 220) return;
      lastNavTime.current = now;
      setActiveCakeIndex(index);
    };

    return (
      <div
        ref={ref}
        className={`hero-product-stage relative w-full h-full select-none -translate-y-28 sm:translate-y-0 ${className}`}
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
              <HeroCakeScene
                scrollProgress={scrollProgress}
                activeCakeIndex={activeCakeIndex}
                className="h-full w-full"
              />
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

        {/* Left Circular Carousel Navigation Button */}
        <button
          type="button"
          onClick={handlePrevCake}
          aria-label={`Previous Cake: ${CAKE_SLIDES[(activeCakeIndex - 1 + 3) % 3].name}`}
          className="hero-carousel-control absolute left-3 sm:left-6 lg:left-10 top-[48%] -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/85 dark:bg-[#180C07]/85 backdrop-blur-md border border-brand-gold/40 shadow-tactile text-brand-chocolate-dark dark:text-brand-gold hover:border-brand-gold hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 -translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Right Circular Carousel Navigation Button */}
        <button
          type="button"
          onClick={handleNextCake}
          aria-label={`Next Cake: ${CAKE_SLIDES[(activeCakeIndex + 1) % 3].name}`}
          className="hero-carousel-control absolute right-3 sm:right-6 lg:right-10 top-[48%] -translate-y-1/2 z-30 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/85 dark:bg-[#180C07]/85 backdrop-blur-md border border-brand-gold/40 shadow-tactile text-brand-chocolate-dark dark:text-brand-gold hover:border-brand-gold hover:scale-105 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Pagination Dots & Active Cake Badge Underneath Cake */}
        <div className="hero-carousel-control absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 pointer-events-auto">
          {/* Subtle Cake Name Indicator Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/75 dark:bg-black/60 backdrop-blur-sm border border-brand-gold/35 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-brand-chocolate-light/90 dark:text-brand-gold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            <span>{CAKE_SLIDES[activeCakeIndex].name}</span>
          </div>

          {/* 3 Interactive Pagination Dots */}
          <div
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/50 dark:bg-black/40 backdrop-blur-xs border border-brand-gold/25 shadow-2xs"
            role="tablist"
            aria-label="3D Cake Selection"
          >
            {CAKE_SLIDES.map((cake, idx) => {
              const isActive = activeCakeIndex === idx;
              return (
                <button
                  key={cake.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={cake.ariaLabel}
                  onClick={() => handleSelectCake(idx)}
                  className={`relative transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold cursor-pointer ${
                    isActive
                      ? "w-7 h-2.5 rounded-full bg-gradient-to-r from-brand-gold via-[#FFE28A] to-brand-gold shadow-[0_0_8px_rgba(245,197,66,0.6)]"
                      : "w-2.5 h-2.5 rounded-full bg-brand-chocolate/30 dark:bg-white/30 hover:bg-brand-gold/70 hover:scale-125"
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
);
