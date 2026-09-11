"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { CardTiltWrapper } from "@/components/ui/CardTiltWrapper";
import { catalogService } from "@/services/catalogService";
import { resolveCatalogImage } from "@/types/category";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { registerGSAP, shouldReduceMotion, animateHeadingReveal } from "@/lib/motion";

export function CategorySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories = catalogService.getCategoriesSync();

  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion()) return;

    const { gsap } = registerGSAP();
    const ctx = gsap.context(() => {
      // 1. Masked/Staggered Heading Reveal
      if (headingRef.current) {
        animateHeadingReveal(headingRef.current);
      }

      // 2. Staggered Card Entrance
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".category-card-item");
        gsap.fromTo(
          cards,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );

        // 3. Subtle image scale-on-scroll parallax (Desktop only)
        if (window.innerWidth >= 768) {
          cards.forEach((card) => {
            const img = card.querySelector(".category-scale-image");
            if (img) {
              gsap.fromTo(
                img,
                { scale: 1.0 },
                {
                  scale: 1.05,
                  ease: "none",
                  scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.6,
                  },
                }
              );
            }
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="scroll-mt-28 py-16 sm:py-20 bg-brand-cream dark:bg-[#120905] transition-colors duration-300 overflow-hidden"
    >
      <Container>
        <div ref={headingRef}>
          <SectionHeading
            badge="Categories"
            title="Explore Our Categories"
            subtitle="Explore Our Fresh Daily Bakes — from grand multi-tier celebration cakes to warm evening patties and traditional tea biscuits, every item is crafted with patience and love."
            align="center"
          />
        </div>

        <div
          ref={gridRef}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {categories.map((cat) => {
            const imageAsset = resolveCatalogImage(cat.image, cat.name);

            return (
              <CardTiltWrapper key={cat.id} className="category-card-item">
                <Card className="group flex flex-col h-full bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(245,197,66,0.2)] hover:shadow-tactile-hover hover:border-brand-gold/60 dark:hover:border-brand-gold transition-all duration-300">
                  <Link
                    href={cat.routeHref || `/categories/${cat.slug}`}
                    className="flex flex-col h-full"
                    aria-label={`Explore ${cat.name} catalog`}
                  >
                    {/* Category Image */}
                    <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-brand-cream-warm dark:bg-[#150A06]">
                      <div className="card-parallax-image w-full h-full relative">
                        <SafeImage
                          src={imageAsset.src}
                          alt={imageAsset.alt}
                          fallbackLabel={cat.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="category-scale-image object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 pointer-events-none" />

                      {/* Optional Badge */}
                      {cat.badge && (
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <Badge variant="crimson" className="font-bold shadow-tactile-sm">
                            {cat.badge}
                          </Badge>
                        </div>
                      )}

                      {/* Floating Item Count */}
                      <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                        <span className="text-xs uppercase tracking-wider font-bold metallic-gold-text">
                          {cat.itemCountDescription}
                        </span>
                      </div>
                    </div>

                    {/* Category Content */}
                    <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                      <div>
                        <h3 className="text-xl font-bold text-brand-chocolate dark:text-brand-cream font-sans group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
                          {cat.name}
                        </h3>
                        <p className="text-xs font-semibold text-brand-apricot dark:text-brand-gold mt-1">
                          {cat.tagline}
                        </p>
                        <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-2.5 leading-relaxed">
                          {cat.description}
                        </p>
                      </div>

                      <div className="card-tilt-cta pt-3 border-t border-brand-border/50 dark:border-brand-gold/20 flex items-center justify-between text-xs font-bold text-brand-chocolate dark:text-brand-gold group-hover:text-brand-crimson dark:group-hover:text-brand-gold-sparkle transition-colors duration-200">
                        <span>Explore {cat.name}</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1 text-brand-crimson dark:text-brand-gold">
                          →
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              </CardTiltWrapper>
            );
          })}
        </div>

        {/* Explore All Hub Link */}
        <div className="mt-12 text-center">
          <Link
            href="/categories"
            className="btn-3d-tactile inline-flex items-center px-8 py-3.5 rounded-full bg-brand-chocolate text-white dark:bg-brand-gold dark:text-brand-chocolate font-bold text-xs uppercase tracking-wider hover:bg-brand-crimson dark:hover:bg-brand-gold-sparkle transition-all shadow-tactile"
          >
            <span>Explore Complete Categories Hub (Cakes, Pastries & More)</span>
            <span className="ml-2">→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
