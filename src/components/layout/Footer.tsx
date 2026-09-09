import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { businessData } from "@/data/business";
import { WhatsAppIcon, PhoneIcon, MapPinIcon, ClockIcon } from "@/components/icons";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-brand-chocolate dark:bg-[#120703] text-brand-cream-warm pt-16 pb-12 border-t-4 border-brand-gold/70 dark:border-brand-gold/50 shadow-2xl transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-brand-chocolate-light/40 dark:border-brand-gold/15">
          {/* Column 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 shrink-0 drop-shadow-md">
                <Image
                  src="/images/brand/kidold-logo-clean.png"
                  alt="KidOld Bakers Logo"
                  fill
                  sizes="48px"
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-tight">KidOld Bakers</h3>
                <p className="text-xs text-brand-gold-sparkle italic font-serif">
                  &ldquo;{businessData.motto}&rdquo;
                </p>
              </div>
            </div>
            <p className="text-sm text-brand-cream/80 leading-relaxed">
              Crafting joyous moments and warm memories across generations in Jaunpur. From custom birthday tiers to daily tea bakes, baked fresh with pure ingredients.
            </p>
            <div className="pt-2">
              <span className="inline-block text-xs bg-brand-chocolate-light/60 dark:bg-brand-chocolate-light/40 text-brand-gold px-3 py-1 rounded-full border border-brand-gold/30 shadow-tactile-sm">
                You Imagine. We Bake.
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-base font-semibold text-white tracking-wide uppercase text-sm mb-4 border-l-2 border-brand-crimson pl-2.5">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-cream/80">
              <li>
                <a href="#hero" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  Home &amp; Specials
                </a>
              </li>
              <li>
                <a href="#signature-cakes" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  Signature Cakes
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  Bakery Categories
                </a>
              </li>
              <li>
                <a href="#custom-cakes" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  Design My Cake (Customizer)
                </a>
              </li>
              <li>
                <a href="#our-story" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  The KidOld Story
                </a>
              </li>
              <li>
                <a href="#visit-us" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  Visit Bakery &amp; Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Bakery Lines */}
          <div>
            <h4 className="text-base font-semibold text-white tracking-wide uppercase text-sm mb-4 border-l-2 border-brand-gold pl-2.5">
              Bakery Lines
            </h4>
            <ul className="space-y-2.5 text-sm text-brand-cream/80">
              <li>Birthday &amp; Celebration Tiers</li>
              <li>100% Pure Veg &amp; Eggless Cakes</li>
              <li>Belgian Dark Chocolate Truffles</li>
              <li>Artisanal Morning Breads &amp; Loaves</li>
              <li>Warm Jaunpur Evening Patties</li>
              <li>Handcrafted Almond Tea Biscuits</li>
            </ul>
          </div>

          {/* Column 4: Local Contact & Hours */}
          <div className="space-y-3.5">
            <h4 className="text-base font-semibold text-white tracking-wide uppercase text-sm mb-4 border-l-2 border-brand-gold/80 pl-2.5">
              Jaunpur Bakery Hub
            </h4>
            <div className="flex items-start gap-2.5 text-xs sm:text-sm text-brand-cream/80">
              <MapPinIcon className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
              <span>
                {businessData.addressLine}, {businessData.landmark}, {businessData.area}, {businessData.city} {businessData.pincode}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-brand-cream/80">
              <ClockIcon className="w-5 h-5 text-brand-gold shrink-0" />
              <span>{businessData.openingHoursDisplay}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-brand-cream/80">
              <PhoneIcon className="w-5 h-5 text-brand-gold shrink-0" />
              <a href={`tel:${businessData.phoneRaw}`} className="hover:text-white transition-colors font-semibold">
                {businessData.phoneDisplay}
              </a>
            </div>
            <div className="text-xs text-brand-cream/75 pl-7">
              <a href={`mailto:${businessData.email}`} className="hover:text-brand-gold transition-colors">
                {businessData.email}
              </a>
            </div>
            <div className="pt-2">
              <a
                href={getWhatsAppInquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-gold/15 dark:bg-brand-gold/25 border border-brand-gold/40 text-brand-gold-sparkle text-xs font-semibold hover:bg-brand-gold hover:text-brand-chocolate transition-all shadow-tactile-sm active:scale-95"
              >
                <WhatsAppIcon className="w-4 h-4 text-brand-gold" />
                <span>Chat with Baker on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream/60">
          <p>© {new Date().getFullYear()} KidOld Bakers. Handcrafted in Jaunpur, Uttar Pradesh.</p>
          <p className="flex items-center gap-2">
            <span>Little moments to big smiles</span>
            <span>•</span>
            <span>100% Fresh Daily Commitment</span>
          </p>
        </div>
      </Container>
    </footer>
  );
}
