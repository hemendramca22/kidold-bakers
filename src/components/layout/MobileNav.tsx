"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  WhatsAppIcon,
  PhoneIcon,
  InstagramIcon,
  FacebookIcon,
  GoogleIcon,
  GoogleMapsIcon,
  GoogleReviewIcon,
  HeartSparkleIcon,
  BookOpenIcon,
  ChevronDownIcon,
  CakeStudioIcon,
} from "@/components/icons";
import { businessData } from "@/data/business";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { smoothScrollTo } from "@/lib/motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection?: string;
}

export function MobileNav({ isOpen, onClose, activeSection }: MobileNavProps) {
  const pathname = usePathname();
  const [isStoriesExpanded, setIsStoriesExpanded] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAnchorClick = (targetId: string) => {
    onClose();
    if (pathname === "/") {
      if (typeof window !== "undefined") {
        window.history.pushState(null, "", `#${targetId}`);
      }
      setTimeout(() => {
        smoothScrollTo(targetId);
      }, 120);
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-chocolate/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-brand-cream dark:bg-[#1A0E09] border-l border-brand-border dark:border-brand-gold/30 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          {/* Header & Close */}
          <div className="flex items-center justify-between pb-5 border-b border-brand-border/60 dark:border-brand-gold/20">
            <Link href="/" onClick={onClose} className="flex items-center gap-2.5">
              <div className="medallion-convex-3d relative w-9 h-9 shrink-0 overflow-hidden p-0">
                <Image
                  src="/images/brand/kidold-logo-clean.png"
                  alt="KidOld Bakers"
                  fill
                  sizes="36px"
                  className="object-cover select-none pointer-events-none"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg text-brand-chocolate dark:text-brand-cream leading-tight">
                  KidOld Bakers
                </span>
                <span className="text-[10px] uppercase tracking-wider text-brand-chocolate-light/70 dark:text-brand-gold/80 font-bold">
                  Jaunpur, UP
                </span>
              </div>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-full text-brand-chocolate dark:text-brand-cream hover:bg-brand-cream-warm dark:hover:bg-brand-gold/15 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav className="mt-5 flex flex-col gap-1.5">
            {/* Signature Cakes */}
            <button
              type="button"
              onClick={() => handleAnchorClick("signature-cakes")}
              className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
                activeSection === "signature-cakes"
                  ? "bg-[#2C1810] text-[#FFFDF7] border-[#2C1810] shadow-tactile dark:bg-[#F5C542] dark:text-[#1A0D08] dark:font-black dark:border-[#F5C542] dark:shadow-gold-tactile"
                  : "text-brand-chocolate dark:text-brand-cream/80 hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20 hover:text-brand-chocolate-dark dark:hover:text-brand-gold-sparkle border-transparent"
              }`}
            >
              Signature Cakes
            </button>

            {/* Categories */}
            <button
              type="button"
              onClick={() => handleAnchorClick("categories")}
              className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
                activeSection === "categories"
                  ? "bg-[#2C1810] text-[#FFFDF7] border-[#2C1810] shadow-tactile dark:bg-[#F5C542] dark:text-[#1A0D08] dark:font-black dark:border-[#F5C542] dark:shadow-gold-tactile"
                  : "text-brand-chocolate dark:text-brand-cream/80 hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20 hover:text-brand-chocolate-dark dark:hover:text-brand-gold-sparkle border-transparent"
              }`}
            >
              Categories
            </button>

            {/* Design My Cake */}
            <button
              type="button"
              onClick={() => handleAnchorClick("custom-cakes")}
              className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all border flex items-center justify-between ${
                activeSection === "custom-cakes" || pathname === "/design-my-cake"
                  ? "bg-[#2C1810] text-[#FFFDF7] border-[#2C1810] shadow-tactile dark:bg-[#F5C542] dark:text-[#1A0D08] dark:font-black dark:border-[#F5C542] dark:shadow-gold-tactile"
                  : "text-brand-chocolate dark:text-brand-cream/80 hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20 hover:text-brand-chocolate-dark dark:hover:text-brand-gold-sparkle border-transparent"
              }`}
            >
              <span className="flex items-center gap-2">
                <CakeStudioIcon className="w-4 h-4 text-brand-gold" />
                Design My Cake
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-crimson text-white">
                Studio
              </span>
            </button>

            {/* Stories Accordion */}
            <div className="rounded-2xl border border-brand-border/60 dark:border-brand-gold/20 overflow-hidden">
              <button
                type="button"
                onClick={() => setIsStoriesExpanded((prev) => !prev)}
                className={`w-full text-left px-4 py-2.5 text-sm font-bold flex items-center justify-between transition-colors ${
                  activeSection === "our-story" || pathname.startsWith("/stories")
                    ? "bg-brand-gold/15 text-brand-chocolate dark:text-brand-gold-sparkle"
                    : "text-brand-chocolate dark:text-brand-cream/85 hover:bg-brand-gold/10"
                }`}
                aria-expanded={isStoriesExpanded}
              >
                <span>Stories</span>
                <ChevronDownIcon
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isStoriesExpanded ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isStoriesExpanded && (
                <div className="px-3 py-2 bg-brand-gold/5 dark:bg-black/20 flex flex-col gap-1 border-t border-brand-border/40 dark:border-brand-gold/15 animate-in fade-in duration-150">
                  {/* Our Story */}
                  <button
                    type="button"
                    onClick={() => handleAnchorClick("our-story")}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-brand-chocolate dark:text-brand-cream/90 hover:bg-brand-gold/20 transition-all text-left"
                  >
                    <HeartSparkleIcon className="w-4 h-4 text-brand-crimson dark:text-brand-crimson-light shrink-0" />
                    <div>
                      <span className="block font-bold">Our Story</span>
                      <span className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60">
                        Heritage &amp; bakery heart
                      </span>
                    </div>
                  </button>

                  {/* Bakery Journal */}
                  <Link
                    href="/stories"
                    onClick={onClose}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all text-left ${
                      pathname.startsWith("/stories")
                        ? "bg-brand-gold/25 text-brand-chocolate font-bold"
                        : "text-brand-chocolate dark:text-brand-cream/90 hover:bg-brand-gold/20"
                    }`}
                  >
                    <BookOpenIcon className="w-4 h-4 text-brand-gold shrink-0" />
                    <div>
                      <span className="font-bold flex items-center gap-1.5">
                        Bakery Journal
                        <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-chocolate dark:text-brand-gold">
                          New
                        </span>
                      </span>
                      <span className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60">
                        Guides, trends &amp; recipes
                      </span>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Visit Us */}
            <button
              type="button"
              onClick={() => handleAnchorClick("visit-us")}
              className={`w-full text-left px-4 py-2.5 rounded-2xl text-sm font-bold transition-all border ${
                activeSection === "visit-us"
                  ? "bg-[#2C1810] text-[#FFFDF7] border-[#2C1810] shadow-tactile dark:bg-[#F5C542] dark:text-[#1A0D08] dark:font-black dark:border-[#F5C542] dark:shadow-gold-tactile"
                  : "text-brand-chocolate dark:text-brand-cream/80 hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20 hover:text-brand-chocolate-dark dark:hover:text-brand-gold-sparkle border-transparent"
              }`}
            >
              Visit Us
            </button>
          </nav>
        </div>

        {/* Bottom Connect & Social Controls */}
        <div className="pt-5 border-t border-brand-border/60 dark:border-brand-gold/20 flex flex-col gap-3">
          {/* Social Channels Strip */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-chocolate-light dark:text-brand-gold/80 block mb-2">
              Connect &amp; Follow
            </span>
            <div className="grid grid-cols-3 gap-2">
              {/* WhatsApp */}
              <a
                href={businessData.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/90 dark:bg-black/40 border border-brand-border/80 dark:border-brand-gold/20 hover:border-[#25D366]/40 text-[#25D366] transition-all shadow-tactile-sm text-center"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-1 text-brand-chocolate dark:text-brand-cream">
                  WhatsApp
                </span>
              </a>

              {/* Instagram */}
              <a
                href={businessData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/90 dark:bg-black/40 border border-brand-border/80 dark:border-brand-gold/20 hover:border-[#E1306C]/40 text-[#E1306C] transition-all shadow-tactile-sm text-center"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-1 text-brand-chocolate dark:text-brand-cream">
                  Instagram
                </span>
              </a>

              {/* Facebook */}
              <a
                href={businessData.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/90 dark:bg-black/40 border border-brand-border/80 dark:border-brand-gold/20 hover:border-[#1877F2]/40 text-[#1877F2] transition-all shadow-tactile-sm text-center"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-1 text-brand-chocolate dark:text-brand-cream">
                  Facebook
                </span>
              </a>

              {/* Google Maps / Directions */}
              <a
                href={businessData.socials.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/90 dark:bg-black/40 border border-brand-border/80 dark:border-brand-gold/20 hover:border-brand-crimson/40 text-brand-crimson dark:text-brand-gold transition-all shadow-tactile-sm text-center"
                aria-label="Directions on Google Maps"
              >
                <GoogleMapsIcon className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-1 text-brand-chocolate dark:text-brand-cream">
                  Directions
                </span>
              </a>

              {/* Google Reviews */}
              <a
                href={businessData.socials.googleReviews}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/90 dark:bg-black/40 border border-brand-border/80 dark:border-brand-gold/20 hover:border-amber-400/40 text-amber-500 transition-all shadow-tactile-sm text-center"
                aria-label="Review on Google"
              >
                <GoogleReviewIcon className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-1 text-brand-chocolate dark:text-brand-cream">
                  Reviews
                </span>
              </a>

              {/* Google Business Profile */}
              <a
                href={businessData.socials.googleBusiness}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-2 rounded-xl bg-white/90 dark:bg-black/40 border border-brand-border/80 dark:border-brand-gold/20 hover:border-brand-gold/40 text-brand-gold transition-all shadow-tactile-sm text-center"
                aria-label="Google Business Profile"
              >
                <GoogleIcon className="w-5 h-5" />
                <span className="text-[10px] font-bold mt-1 text-brand-chocolate dark:text-brand-cream">
                  Profile
                </span>
              </a>
            </div>
          </div>

          {/* Action Buttons */}
          <Button
            variant="whatsapp"
            href={getWhatsAppInquiryUrl()}
            isExternal
            leftIcon={<WhatsAppIcon className="w-4 h-4 text-brand-gold" />}
            className="w-full text-xs"
          >
            Order via WhatsApp
          </Button>
          <Button
            variant="outline"
            href={`tel:${businessData.phoneRaw}`}
            leftIcon={<PhoneIcon className="w-4 h-4" />}
            className="w-full text-xs"
          >
            Call {businessData.phoneDisplay}
          </Button>

          <p className="text-center text-[11px] text-brand-chocolate-light/80 dark:text-brand-cream/60">
            Dev Palace, Line Bazaar Rd, Jaunpur 222002
          </p>
        </div>
      </div>
    </div>
  );
}
