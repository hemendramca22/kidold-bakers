"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge, VegIndicator } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { CardTiltWrapper } from "@/components/ui/CardTiltWrapper";
import { WhatsAppIcon, CakeStudioIcon } from "@/components/icons";
import { catalogService } from "@/services/catalogService";
import { resolveCatalogImage } from "@/types/category";
import { ProductOccasion } from "@/types/product";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { registerGSAP, shouldReduceMotion, animateHeadingReveal } from "@/lib/motion";

type OccasionFilter = "all" | ProductOccasion;

const FILTER_TABS: Array<{ id: OccasionFilter; label: string }> = [
  { id: "all", label: "All Cakes" },
  { id: "birthdays", label: "Birthday" },
  { id: "anniversaries", label: "Anniversary" },
  { id: "kids", label: "Kids" },
  { id: "celebrations", label: "Celebration" },
  { id: "teatime", label: "Tea-Time / Desserts" },
];

/**
 * Deterministic pseudo-random array shuffle with seed
 * Guarantees fresh card presentation variety on every tab click without hydration issues
 */
function shuffleArray<T>(array: T[], seed: number): T[] {
  const arr = [...array];
  if (arr.length <= 1) return arr;
  let s = seed;
  const random = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function SignatureSection() {
  const [activeFilter, setActiveFilter] = useState<OccasionFilter>("all");
  const [shuffleCount, setShuffleCount] = useState<number>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const reassuranceRef = useRef<HTMLDivElement>(null);

  // Synchronous catalog fetch - strictly cakes only for the Signature Cakes section
  const allProducts = catalogService.getProductsSync().filter(
    (p) => p.categoryId === "pre-made-cakes" || p.categoryId === "celebration-cakes"
  );
  const baseFilteredProducts =
    activeFilter === "all"
      ? allProducts
      : allProducts.filter((p) => p.occasions.includes(activeFilter));

  // Shuffle products dynamically on tab clicks so catalog feels lively and distinct
  const displayedProducts = useMemo(() => {
    if (shuffleCount === 0) return baseFilteredProducts;
    return shuffleArray(
      baseFilteredProducts,
      shuffleCount * 7919 + activeFilter.charCodeAt(0) * 31
    );
  }, [baseFilteredProducts, shuffleCount, activeFilter]);

  const handleTabClick = (tabId: OccasionFilter) => {
    setActiveFilter(tabId);
    setShuffleCount((prev) => prev + 1);

    if (typeof window !== "undefined" && !shouldReduceMotion()) {
      const { gsap } = registerGSAP();
      gsap.fromTo(
        ".product-card-item",
        { opacity: 0.35, y: 12, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.32,
          stagger: 0.03,
          ease: "power2.out",
          clearProps: "all",
        }
      );
    }
  };

  // When user clicks Navbar 'Signature Cakes' (#signature-cakes), always reset active tab to "All Cakes"
  useEffect(() => {
    const handleReset = () => {
      setActiveFilter("all");
    };

    const handleHashCheck = () => {
      if (typeof window !== "undefined" && window.location.hash === "#signature-cakes") {
        setActiveFilter("all");
      }
    };

    window.addEventListener("reset-signature-filter", handleReset);
    window.addEventListener("hashchange", handleHashCheck);
    handleHashCheck();
    return () => {
      window.removeEventListener("reset-signature-filter", handleReset);
      window.removeEventListener("hashchange", handleHashCheck);
    };
  }, []);

  // Entrance animations for heading and tabs only (cards remain visible with no blank screens)
  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion()) return;

    const { gsap } = registerGSAP();
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        animateHeadingReveal(headingRef.current);
      }

      if (tabsRef.current) {
        gsap.fromTo(
          tabsRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: tabsRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      if (reassuranceRef.current) {
        gsap.fromTo(
          reassuranceRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: reassuranceRef.current,
              start: "top 92%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="signature-cakes"
      className="scroll-mt-28 py-16 sm:py-20 bg-brand-cream-warm dark:bg-[#120905] transition-colors duration-300"
    >
      <Container>
        <div ref={headingRef}>
          <SectionHeading
            badge="Signature Cakes"
            title="Signature Cakes & Handcrafted Bakes"
            subtitle="Celebration centerpieces crafted for birthdays, anniversaries, and family milestones in Jaunpur. 100% pure vegetarian / eggless options available."
            align="center"
          />
        </div>

        {/* Primary Occasion Filter Tabs */}
        <div
          ref={tabsRef}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-3xl mx-auto"
        >
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  handleTabClick(tab.id);
                }}
                className={`btn-3d-tactile inline-flex items-center px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 border cursor-pointer select-none ${
                  isActive
                    ? "metallic-gold-surface text-brand-chocolate dark:text-[#1A0A04] font-black border-brand-gold/80 scale-[1.03]"
                    : "bg-white/85 dark:bg-[#1E100A]/85 text-brand-chocolate/80 dark:text-brand-cream/80 border-brand-border/80 dark:border-brand-gold/30 hover:bg-[#FDFBF7] dark:hover:bg-[#28150D] hover:border-brand-gold/60 hover:text-brand-chocolate dark:hover:text-brand-gold"
                }`}
                aria-pressed={isActive}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Responsive, Balanced CSS Grid with Equal-Height Luxury Cards */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-items-stretch">
          {displayedProducts.map((product) => {
            const imageAsset = resolveCatalogImage(
              product.image,
              `${product.name} - Handcrafted Cake at KidOld Bakers Jaunpur`
            );

            return (
              <CardTiltWrapper
                key={product.id}
                className="product-card-item h-full flex flex-col"
              >
                <Card className="group flex flex-col h-full bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(245,197,66,0.2)] hover:shadow-tactile-hover hover:border-brand-gold/60 dark:hover:border-brand-gold transition-all duration-300 rounded-2xl overflow-hidden">
                  {/* Uniform Aspect-Ratio Image Frame (4:3) */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-cream dark:bg-[#150A06] shrink-0">
                    <div className="card-parallax-image w-full h-full relative">
                      <SafeImage
                        src={imageAsset.src}
                        alt={imageAsset.alt}
                        fallbackLabel={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="product-scale-image object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center pointer-events-none z-10">
                      {product.isPureVeg && (
                        <div className="bg-white/95 dark:bg-[#1E100A]/95 backdrop-blur-xs px-2.5 py-1 rounded-full shadow-tactile-sm flex items-center gap-1.5 text-[11px] font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <VegIndicator />
                          <span>Pure Veg</span>
                        </div>
                      )}
                      {product.isSignature && (
                        <Badge variant="crimson" className="font-bold text-[10px] py-0.5 px-2 shadow-tactile-sm">
                          Signature
                        </Badge>
                      )}
                    </div>

                    {/* Tactile Action Tag */}
                    <div className="absolute bottom-3 right-3 bg-brand-chocolate/95 dark:bg-[#2A160F]/95 backdrop-blur-xs text-brand-gold-sparkle px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-chocolate-tactile border border-brand-gold/40 pointer-events-none z-10">
                      {product.enquiryActionText || "Enquire on WhatsApp"}
                    </div>
                  </div>

                  {/* Standardized Card Content (Strict Equal Heights) */}
                  <div className="p-5 flex flex-col flex-1 justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="text-[10px] font-bold text-brand-crimson dark:text-brand-gold uppercase tracking-wider">
                        {product.categoryName}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-brand-chocolate dark:text-brand-cream font-sans group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-brand-chocolate/75 dark:text-brand-cream/80 leading-relaxed line-clamp-2">
                        {product.shortDescription}
                      </p>

                      {/* Flavor Notes Chips (Max 2 concise badges) */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {product.flavorNotes.slice(0, 2).map((note) => (
                          <span
                            key={note}
                            className="text-[10px] bg-brand-cream dark:bg-[#25130C] text-brand-chocolate/80 dark:text-brand-cream/80 font-medium px-2 py-0.5 rounded-md border border-brand-border/70 dark:border-brand-gold/20 shadow-2xs"
                          >
                            {note}
                          </span>
                        ))}
                      </div>

                      {/* Weight Options Summary */}
                      {product.weightOptions && product.weightOptions.length > 0 && (
                        <div className="text-[11px] text-brand-chocolate-light dark:text-brand-cream/70 pt-1">
                          <span className="font-semibold text-brand-chocolate dark:text-brand-gold">Sizes:</span>{" "}
                          {product.weightOptions.slice(0, 3).join(" • ")}
                        </div>
                      )}
                    </div>

                    {/* Uniform Tactile Order Action */}
                    <div className="pt-3 border-t border-brand-border/60 dark:border-brand-gold/20">
                      <div className="card-tilt-cta transition-transform duration-200">
                        <Button
                          variant="whatsapp"
                          size="sm"
                          href={getWhatsAppInquiryUrl({
                            productName: product.name,
                            categoryName: product.categoryName,
                          })}
                          isExternal
                          leftIcon={<WhatsAppIcon className="w-4 h-4 text-brand-gold" />}
                          className="w-full text-xs shadow-tactile-sm"
                        >
                          {product.enquiryActionText ? `${product.enquiryActionText}` : "Inquire via WhatsApp"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </CardTiltWrapper>
            );
          })}
        </div>

        {/* Reassurance Banner */}
        <div
          ref={reassuranceRef}
          className="mt-12 p-6 rounded-2xl bg-white/80 dark:bg-[#1D0F0A]/85 metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile-sm dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-colors"
        >
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-brand-chocolate dark:text-brand-cream flex items-center justify-center sm:justify-start gap-2">
              <CakeStudioIcon className="w-4 h-4 text-brand-gold shrink-0" />
              <span>Looking for a custom weight, tiered stand, or specific dietary recipe?</span>
            </h4>
            <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/80">
              Our Jaunpur bakers specialize in custom designs. Please confirm availability, custom weights, and advance booking timing with our bakery team on WhatsApp.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            href={getWhatsAppInquiryUrl({ isCustomCake: true })}
            isExternal
            className="text-xs shrink-0"
          >
            Ask Chef on WhatsApp →
          </Button>
        </div>
      </Container>
    </section>
  );
}
