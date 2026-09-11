"use client";

import React, { useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { businessData } from "@/data/business";
import { MapPinIcon, PhoneIcon, WhatsAppIcon, ClockIcon, GoogleReviewIcon, GoogleMapsIcon } from "@/components/icons";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { registerGSAP, shouldReduceMotion, animateHeadingReveal } from "@/lib/motion";

export function LocalBusinessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || shouldReduceMotion()) return;

    const { gsap, ScrollTrigger } = registerGSAP();
    const ctx = gsap.context(() => {
      // 1. Masked Heading Reveal
      if (headingRef.current) {
        animateHeadingReveal(headingRef.current);
      }

      // 2. Left Column: Store Details Entrance
      if (leftColRef.current) {
        gsap.from(leftColRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // 3. Right Column: Planning & Map Card Entrance
      if (rightColRef.current) {
        gsap.from(rightColRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          delay: 0.1,
          ease: "power2.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }

      // Safety guarantee for anchor jumps or layout shifts
      const forceVisible = () => {
        if (leftColRef.current) gsap.set(leftColRef.current, { clearProps: "opacity,transform" });
        if (rightColRef.current) gsap.set(rightColRef.current, { clearProps: "opacity,transform" });
        ScrollTrigger?.refresh();
      };

      const timer = setTimeout(forceVisible, 800);
      window.addEventListener("hashchange", forceVisible);
      if (window.location.hash === "#visit-us") {
        forceVisible();
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="visit-us" className="scroll-mt-28 py-16 sm:py-24 bg-brand-cream dark:bg-[#120905] transition-colors duration-300 relative">
      <Container>
        <div ref={headingRef}>
          <SectionHeading
            badge="Visit Us"
            title="Visit Us at Line Bazaar, Jaunpur"
            subtitle="Stop by our bakery counter for warm evening pastries, or get your celebratory cakes delivered safely across Jaunpur city."
            align="center"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Business & Store Details */}
          <div ref={leftColRef} className="lg:col-span-6 flex flex-col h-full">
            <Card className="p-6 sm:p-8 bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)] flex flex-col justify-between h-full space-y-6 transition-colors">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-brand-border/60 dark:border-brand-gold/20">
                  <h3 className="text-2xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
                    Bakery Counter &amp; Pickups
                  </h3>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                    Baking Daily
                  </span>
                </div>

                <div className="space-y-4 text-sm text-brand-chocolate/85 dark:text-brand-cream/85">
                  {/* Verified Address */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-brand-gold/15 dark:bg-brand-gold/25 text-brand-gold flex items-center justify-center shrink-0 mt-0.5 shadow-tactile-sm border border-brand-gold/30">
                      <MapPinIcon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-chocolate dark:text-brand-cream">Bakery Counter Address</div>
                      <div className="text-brand-chocolate/85 dark:text-brand-cream/85 leading-relaxed mt-0.5 font-medium">
                        {businessData.addressLine}
                      </div>
                      <div className="text-xs text-brand-chocolate/75 dark:text-brand-cream/70 mt-0.5">
                        {businessData.landmark}, {businessData.area}
                      </div>
                      <div className="text-xs text-brand-crimson dark:text-brand-gold mt-1 font-semibold">
                        {businessData.city}, {businessData.state}, India — PIN {businessData.pincode}
                      </div>
                    </div>
                  </div>

                  {/* Operating & Contact Status */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-brand-crimson/10 dark:bg-brand-crimson/25 text-brand-crimson dark:text-[#FFAAB5] flex items-center justify-center shrink-0 mt-0.5 shadow-tactile-sm border border-brand-crimson/20">
                      <ClockIcon className="w-5 h-5 text-brand-crimson dark:text-brand-crimson-light" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-chocolate dark:text-brand-cream">Counter Pickups &amp; Enquiries</div>
                      <div className="text-brand-chocolate/75 dark:text-brand-cream/75 mt-0.5 text-xs sm:text-sm">
                        {businessData.openingHoursDisplay}
                      </div>
                    </div>
                  </div>

                  {/* Direct Telephone & Email */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-full bg-brand-cream dark:bg-[#2A160F] text-brand-chocolate dark:text-brand-gold flex items-center justify-center shrink-0 mt-0.5 border border-brand-border dark:border-brand-gold/30 shadow-tactile-sm">
                      <PhoneIcon className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <div className="font-semibold text-brand-chocolate dark:text-brand-cream">Direct Phone &amp; Email</div>
                      <div className="mt-0.5">
                        <a
                          href={`tel:${businessData.phoneRaw}`}
                          className="text-brand-crimson dark:text-brand-gold font-bold text-sm hover:underline"
                        >
                          {businessData.phoneDisplay}
                        </a>
                      </div>
                      <div className="text-xs text-brand-chocolate/75 dark:text-brand-cream/75 mt-0.5">
                        <a href={`mailto:${businessData.email}`} className="hover:underline text-brand-chocolate/80 dark:text-brand-cream/80">
                          {businessData.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="pt-4 border-t border-brand-border/60 dark:border-brand-gold/20 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="whatsapp"
                  size="md"
                  href={getWhatsAppInquiryUrl()}
                  isExternal
                  leftIcon={<WhatsAppIcon className="w-4 h-4 text-brand-gold" />}
                  className="flex-1 shadow-tactile-sm"
                >
                  WhatsApp Consultation
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  href={`tel:${businessData.phoneRaw}`}
                  leftIcon={<PhoneIcon className="w-4 h-4" />}
                  className="flex-1"
                >
                  Call Bakery Counter
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column: Interactive Map Placeholder & Guidance */}
          <div ref={rightColRef} className="lg:col-span-6 flex flex-col h-full">
            <Card className="p-6 sm:p-8 bg-gradient-to-b from-brand-cream to-brand-cream-warm dark:from-[#24130C] dark:to-[#1A0E08] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile flex flex-col justify-between h-full space-y-6 transition-colors">
              <div>
                <h4 className="text-xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
                  Planning Your Celebration in Jaunpur?
                </h4>
                <p className="text-sm text-brand-chocolate/80 dark:text-brand-cream/80 mt-2 leading-relaxed">
                  We recommend reserving multi-tier celebration cakes <strong>24 to 48 hours in advance</strong> so our master decorators can sculpt your vision with perfection.
                </p>

                {/* Map Graphic Card */}
                <div className="local-map-card mt-6 rounded-2xl overflow-hidden border border-brand-gold/40 dark:border-brand-gold/50 relative bg-gradient-to-b from-brand-chocolate to-brand-chocolate-dark dark:from-[#28140C] dark:to-[#160A05] p-6 text-center text-white space-y-3 shadow-chocolate-tactile transition-transform duration-300">
                  <div className="w-12 h-12 rounded-full bg-brand-crimson text-white mx-auto flex items-center justify-center shadow-lg">
                    <MapPinIcon className="w-6 h-6" />
                  </div>
                  <h5 className="font-bold text-base text-brand-cream font-serif">
                    KidOld Bakers — Jaunpur Hub
                  </h5>
                  <p className="text-xs text-brand-cream/70 max-w-sm mx-auto">
                    Dev Palace, Line Bazaar Rd (beside S.P Aawas / Front Police Line Gate), Husainabad, Jaunpur 222002
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                    <Button
                      variant="gold"
                      size="sm"
                      href={businessData.googleMapsUrl}
                      isExternal
                      leftIcon={<GoogleMapsIcon className="w-4 h-4 text-brand-chocolate" />}
                    >
                      Find us / Directions
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      href={businessData.socials.googleReviews}
                      isExternal
                      leftIcon={<GoogleReviewIcon className="w-4 h-4 text-amber-400" />}
                      className="border-amber-400/40 text-amber-300 hover:bg-amber-400/15"
                    >
                      Review us on Google
                    </Button>
                  </div>
                </div>
              </div>

              {/* Order Tip */}
              <div className="p-4 rounded-xl bg-white/90 dark:bg-[#25130C] border border-brand-border/80 dark:border-brand-gold/20 text-xs text-brand-chocolate/80 dark:text-brand-cream/80 shadow-tactile-sm transition-colors">
                <span className="font-bold text-brand-crimson dark:text-brand-gold">💡 Baker&apos;s Tip:</span> Planning a celebration or looking for same-day options? Message us directly on WhatsApp to confirm fresh ready-to-decorate tiers available today!
              </div>
            </Card>
          </div>
        </div>
      </Container>
    </section>
  );
}
