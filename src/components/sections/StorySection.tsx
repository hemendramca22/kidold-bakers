"use client";

import React, { useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { SafeImage } from "@/components/ui/SafeImage";
import { HeartSparkleIcon, FreshBakerIcon, MapPinIcon } from "@/components/icons";
import { registerGSAP, shouldReduceMotion, animateHeadingReveal } from "@/lib/motion";

export function StorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion()) return;

    const { gsap, ScrollTrigger } = registerGSAP();
    const ctx = gsap.context(() => {
      // 1. Left Column: Editorial Photo Frame Entrance
      if (photoRef.current) {
        gsap.from(photoRef.current, {
          opacity: 0,
          scale: 0.96,
          y: 24,
          duration: 0.7,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        // Floating quote badge subtle entrance
        if (quoteRef.current) {
          gsap.from(quoteRef.current, {
            opacity: 0,
            y: 12,
            duration: 0.5,
            delay: 0.2,
            ease: "power2.out",
            clearProps: "all",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          });
        }
      }

      // 2. Right Column: Masked Heading Reveal
      if (headingRef.current) {
        animateHeadingReveal(headingRef.current);
      }

      // 3. Narrative Paragraphs Reveal
      gsap.from(".story-paragraph", {
        opacity: 0,
        y: 16,
        duration: 0.55,
        stagger: 0.1,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: headingRef.current || sectionRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });

      // 4. Staggered Values Pillars Cascade
      if (valuesRef.current) {
        const valueCards = valuesRef.current.querySelectorAll(".story-value-card");
        gsap.from(valueCards, {
          opacity: 0,
          y: 20,
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }

      // Safety guarantee for anchor jumps or layout shifts
      const forceVisible = () => {
        if (photoRef.current) gsap.set(photoRef.current, { clearProps: "opacity,transform" });
        if (quoteRef.current) gsap.set(quoteRef.current, { clearProps: "opacity,transform" });
        gsap.set(".story-paragraph", { clearProps: "opacity,transform" });
        if (valuesRef.current) {
          const cards = valuesRef.current.querySelectorAll(".story-value-card");
          gsap.set(cards, { clearProps: "opacity,transform" });
        }
        ScrollTrigger?.refresh();
      };

      const timer = setTimeout(forceVisible, 800);
      window.addEventListener("hashchange", forceVisible);
      if (window.location.hash === "#our-story") {
        forceVisible();
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="our-story"
      className="scroll-mt-28 py-16 sm:py-24 bg-brand-cream-warm dark:bg-[#120905] transition-colors duration-300 relative overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Intergenerational Editorial Photography Frame */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center h-full">
            <div
              ref={photoRef}
              className="relative w-full h-full min-h-[460px] p-3 sm:p-4 rounded-3xl bg-gradient-to-b from-brand-gold/25 via-brand-cream to-brand-crimson/15 dark:from-brand-gold/20 dark:via-[#1E100A] dark:to-brand-crimson/20 shadow-tactile-hover dark:shadow-[0_14px_40px_rgba(0,0,0,0.7)] border-2 border-brand-gold/40 dark:border-brand-gold/50 flex flex-col items-center justify-center overflow-hidden transition-colors"
            >
              {/* Warm Intergenerational Photograph */}
              <div className="relative w-full h-full min-h-[390px] rounded-2xl overflow-hidden shadow-inner">
                <SafeImage
                  src="/images/story/story-generations.jpg"
                  alt="Indian grandfather and grandson sharing a warm celebration cake moment in Jaunpur, Uttar Pradesh"
                  fallbackLabel="KidOld Intergenerational Bakery Story"
                  fill
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-brand-chocolate/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Floating Quote Badge */}
              <div
                ref={quoteRef}
                className="absolute bottom-5 bg-white/95 dark:bg-[#1E100A]/95 backdrop-blur-xs px-4 sm:px-5 py-2 rounded-full shadow-tactile border border-brand-gold/50 flex items-center gap-2 text-xs font-bold text-brand-chocolate dark:text-brand-gold-sparkle pointer-events-none transition-colors"
              >
                <HeartSparkleIcon className="w-4 h-4 text-brand-crimson dark:text-brand-crimson-light shrink-0" />
                <span>Where Legacy Meets Indulgence</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & Values */}
          <div className="lg:col-span-7 space-y-6 text-left flex flex-col justify-between">
            <div>
              <div ref={headingRef}>
                <SectionHeading
                  badge="Our Story"
                  title="Our Story: A Child's Wonder. A Grandparent's Warmth."
                  subtitle="The story of KidOld Bakers begins with a simple truth: the purest joy is found when generations come together over something sweet."
                  align="left"
                />
              </div>

              <div className="space-y-4 text-sm sm:text-base text-brand-chocolate/80 dark:text-brand-cream/80 leading-relaxed font-sans transition-colors mt-6">
                <p className="story-paragraph">
                  Look closely at the soul of our bakery. It was born from the timeless companionship of a grandfather sharing his treasured treats with a wide-eyed grandson.
                </p>
                <p className="story-paragraph">
                  That is the promise behind <strong>KidOld Bakers</strong> in Jaunpur. We bake to turn everyday tea-time conversations and milestone family birthdays into lifelong memories. Every recipe is crafted with honest, wholesome ingredients and patience.
                </p>
              </div>
            </div>

            {/* Core Values Pillars */}
            <div ref={valuesRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <Card className="story-value-card p-5 bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile hover:shadow-tactile-hover dark:shadow-[0_10px_28px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[160px] transition-all">
                <div>
                  <div className="w-11 h-11 rounded-full medallion-convex-3d metallic-gold-surface flex items-center justify-center mb-3.5 shadow-gold-tactile border border-brand-gold/80 shrink-0">
                    <HeartSparkleIcon className="w-5 h-5 text-brand-crimson dark:text-brand-crimson drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  </div>
                  <h4 className="text-sm font-bold text-brand-chocolate dark:text-brand-cream font-sans">Family First</h4>
                  <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/75 mt-1.5 leading-relaxed">
                    Recipes crafted to delight grandparents and toddlers equally across every generation.
                  </p>
                </div>
              </Card>

              <Card className="story-value-card p-5 bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile hover:shadow-tactile-hover dark:shadow-[0_10px_28px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[160px] transition-all">
                <div>
                  <div className="w-11 h-11 rounded-full medallion-convex-3d metallic-gold-surface flex items-center justify-center mb-3.5 shadow-gold-tactile border border-brand-gold/80 shrink-0">
                    <FreshBakerIcon className="w-5 h-5 text-brand-chocolate-dark dark:text-brand-chocolate drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]" />
                  </div>
                  <h4 className="text-sm font-bold text-brand-chocolate dark:text-brand-cream font-sans">Pure &amp; Honest</h4>
                  <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/75 mt-1.5 leading-relaxed">
                    100% pure vegetarian recipes, fresh dairy cream, and zero artificial shortcuts.
                  </p>
                </div>
              </Card>

              <Card className="story-value-card p-5 bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile hover:shadow-tactile-hover dark:shadow-[0_10px_28px_rgba(0,0,0,0.6)] flex flex-col justify-between min-h-[160px] transition-all">
                <div>
                  <div className="w-11 h-11 rounded-full medallion-convex-3d metallic-gold-surface flex items-center justify-center mb-3.5 shadow-gold-tactile border border-brand-gold/80 shrink-0">
                    <MapPinIcon className="w-5 h-5 text-brand-crimson dark:text-brand-crimson drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]" />
                  </div>
                  <h4 className="text-sm font-bold text-brand-chocolate dark:text-brand-cream font-sans">Jaunpur Heart</h4>
                  <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/75 mt-1.5 leading-relaxed">
                    Proudly rooted at Line Bazaar, Dev Palace, serving our city with genuine warmth.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
