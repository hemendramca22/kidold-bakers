"use client";

import React, { useEffect, useRef } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { HeroAtmosphere } from "@/components/sections/hero/HeroAtmosphere";
import { HeroProductStage } from "@/components/sections/hero/HeroProductStage";
import { CakeStudioIcon } from "@/components/icons";
import { registerGSAP, shouldReduceMotion, smoothScrollTo } from "@/lib/motion";

/**
 * Flagship Full-Viewport 3D Hero Section
 * Features:
 * - Full-area 3D artisan celebration cake stage
 * - GSAP ScrollTrigger pinning for seamless 360° cake rotation
 * - Floating skeuomorphic & glassmorphic brand overlay with interactive CTAs
 * - Restrained scroll hint that fades out on scroll scrub
 */
export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  // Fallback scroll progress tracking for reduced motion or non-GSAP environments
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (shouldReduceMotion()) {
        const scrollY = window.scrollY;
        const heroHeight = sectionRef.current?.offsetHeight || 800;
        const progress = Math.min(1, Math.max(0, scrollY / (heroHeight * 1.2)));
        scrollProgressRef.current = progress;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP ScrollTrigger pinning & 3D scrub synchronization with delayed card reveal
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (shouldReduceMotion()) {
      // In reduced motion mode, show card statically
      const card = sectionRef.current?.querySelector<HTMLElement>(".hero-overlay-card");
      if (card) {
        card.style.opacity = "1";
        card.style.transform = "none";
        card.style.pointerEvents = "auto";
      }
      return;
    }

    const { gsap, ScrollTrigger } = registerGSAP();
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Master GSAP Timeline bound to a single pinning ScrollTrigger
      // 0.00 to 0.70: Pure, unobstructed 360° 3D cake rotation with no overlay blocking the view
      // 0.70 to 1.00: Overlay card gracefully slides up and reveals during the final 1-2 scroll downs
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: 0.2,
          anticipatePin: 1,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      // Refresh pin calculations after layout mounts and on complete asset load
      ScrollTrigger.refresh();
      const rafId = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
      const timerId = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 350);

      const handleWindowLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", handleWindowLoad);

      // 1. Fade out scroll hint immediately in first 15% of scroll
      tl.to(".hero-scroll-indicator", { opacity: 0, y: 14, duration: 0.15, ease: "power1.out" }, 0);

      // 2. Delayed card reveal: Appears strictly during the last 1-2 scroll downs (progress 0.70 to 1.0)
      tl.fromTo(
        ".hero-overlay-card",
        {
          opacity: 0,
          y: 45,
          scale: 0.92,
          pointerEvents: "none",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          pointerEvents: "auto",
          duration: 0.25,
          ease: "power2.out",
        },
        0.70
      );

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timerId);
        window.removeEventListener("load", handleWindowLoad);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative isolate overflow-hidden -mt-[74px] sm:-mt-[82px] pt-[74px] sm:pt-[82px] w-full h-screen min-h-[540px] sm:min-h-[580px] lg:min-h-[640px] max-h-[1080px] bg-[#FFFDF8] dark:bg-[#120905] transition-colors duration-300 flex flex-col justify-between [touch-action:pan-y]"
    >
      <HeroAtmosphere />

      {/* Full-viewport 3D Cake Canvas Stage - pointer-events-none ensures zero touch gesture interference */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
        <HeroProductStage ref={stageRef} scrollProgress={scrollProgressRef} />
      </div>

      {/* Floating Skeuomorphic & Glassmorphic Brand & CTA Overlay (Revealed on final turn, centered at lower cake layer) */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-end pb-6 sm:pb-8 lg:pb-10">
        <Container className="w-full flex justify-center items-end">
          <div className="hero-overlay-card opacity-0 pointer-events-none w-full max-w-xl mx-auto text-center rounded-3xl bg-white/85 dark:bg-[#180C07]/85 backdrop-blur-xl metallic-border metallic-card-rim shadow-[0_20px_50px_rgba(44,24,16,0.18),inset_0_1.5px_0_rgba(255,255,255,0.9)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.75),inset_0_1.5px_0_rgba(245,197,66,0.35)] p-5 sm:p-7 transition-shadow isolate">
            <div className="hero-eyebrow mb-2.5 inline-flex items-center justify-center gap-2 px-3.5 py-1 rounded-full bg-brand-gold/15 border border-brand-gold/40 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-chocolate-dark dark:metallic-gold-text sm:text-[11px] transition-colors shadow-2xs">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
              KidOld Bakers · Jaunpur
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-[-0.03em] text-brand-chocolate-dark dark:text-brand-cream transition-colors">
              <span className="hero-anim-title-line inline">A celebration, </span>
              <span className="hero-anim-title-line inline metallic-gold-text">made personal.</span>
            </h1>
            <div className="hero-copy-block mt-3">
              <p className="hero-anim-copy text-xs sm:text-sm leading-relaxed text-brand-chocolate/75 dark:text-brand-cream/80 max-w-md mx-auto transition-colors">
                Hand-finished artisan cakes crafted for the moments you cherish in Jaunpur.
              </p>
              <div className="hero-anim-cta mt-4 flex flex-wrap items-center justify-center gap-3">
                <Button
                  variant="primary"
                  size="md"
                  href="#custom-cakes"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("custom-cakes");
                  }}
                  leftIcon={<CakeStudioIcon className="h-4 w-4 text-brand-gold" />}
                  className="min-w-[150px] sm:min-w-[165px] bg-[#8B1528] text-white shadow-crimson-tactile isolate"
                >
                  Design My Cake
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href="#signature-cakes"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollTo("signature-cakes");
                  }}
                  className="min-w-[150px] sm:min-w-[165px] bg-white/70 dark:bg-black/40 dark:text-brand-cream dark:border-brand-gold/40"
                >
                  Explore Cakes
                </Button>
              </div>
            </div>
          </div>
        </Container>

        {/* Skeuomorphic Scroll Hint Indicator */}
        <div className="hero-scroll-indicator mx-auto text-center pointer-events-none pt-3 transition-all">
          <div className="inline-flex flex-col items-center gap-1 text-[10px] sm:text-[11px] font-bold tracking-widest uppercase text-brand-chocolate-light/75 dark:text-brand-gold/80">
            <span>Scroll to Rotate 360°</span>
            <div className="w-5 h-7 rounded-full border border-brand-gold/50 flex items-start justify-center p-1 bg-white/50 dark:bg-black/30 backdrop-blur-sm shadow-sm">
              <div className="w-1.5 h-2 rounded-full bg-brand-gold animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
