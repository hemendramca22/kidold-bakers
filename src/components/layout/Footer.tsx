import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { businessData } from "@/data/business";
import {
  WhatsAppIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  InstagramIcon,
  FacebookIcon,
  GoogleIcon,
  GoogleReviewIcon,
  GoogleMapsIcon,
} from "@/components/icons";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="bg-brand-chocolate dark:bg-[#120703] text-brand-cream-warm pt-16 pb-12 border-t-4 border-brand-gold/70 dark:border-brand-gold/50 shadow-2xl transition-colors duration-300">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-brand-chocolate-light/40 dark:border-brand-gold/15">
          {/* Column 1: Brand, Philosophy & Social Icons */}
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

            {/* Social Channels Row */}
            <div className="pt-2 flex items-center gap-2">
              <a
                href={businessData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E1306C] text-white flex items-center justify-center transition-colors shadow-tactile-sm"
                aria-label="KidOld Bakers on Instagram"
                title="Follow on Instagram"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={businessData.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#1877F2] text-white flex items-center justify-center transition-colors shadow-tactile-sm"
                aria-label="KidOld Bakers on Facebook"
                title="Follow on Facebook"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href={businessData.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#25D366] text-white flex items-center justify-center transition-colors shadow-tactile-sm"
                aria-label="Chat with KidOld Bakers on WhatsApp"
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
              <a
                href={businessData.socials.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-brand-gold text-white flex items-center justify-center transition-colors shadow-tactile-sm"
                aria-label="KidOld Bakers on Google"
                title="Google Business Profile"
              >
                <GoogleIcon className="w-4 h-4" />
              </a>
            </div>

            <div>
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
                <a href="/#hero" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  Home &amp; Specials
                </a>
              </li>
              <li>
                <a href="/#signature-cakes" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  Signature Cakes
                </a>
              </li>
              <li>
                <a href="/#categories" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  Bakery Categories
                </a>
              </li>
              <li>
                <Link href="/design-my-cake" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  Design My Cake (Customizer)
                </Link>
              </li>
              <li>
                <a href="/#our-story" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
                  The KidOld Story
                </a>
              </li>
              <li>
                <Link href="/stories" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors flex items-center gap-1.5 font-medium text-brand-gold">
                  <span>Bakery Journal</span>
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full bg-brand-gold/20 text-brand-gold">
                    Blog
                  </span>
                </Link>
              </li>
              <li>
                <a href="/#visit-us" className="hover:text-brand-gold dark:hover:text-brand-gold-sparkle transition-colors">
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

          {/* Column 4: Local Contact, Hours & Google Actions */}
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

            {/* Google Reviews & Maps Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={businessData.socials.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors"
              >
                <GoogleReviewIcon className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Review us on Google ★★★★★</span>
              </a>

              <a
                href={businessData.socials.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-brand-gold-sparkle hover:text-white transition-colors"
              >
                <GoogleMapsIcon className="w-4 h-4 text-brand-gold shrink-0" />
                <span>Find us / Directions</span>
              </a>

              <div className="pt-1">
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
