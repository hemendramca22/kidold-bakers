"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { businessData } from "@/data/business";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import dynamic from "next/dynamic";
import { PhoneIcon, WhatsAppIcon, MapPinIcon, CakeStudioIcon } from "@/components/icons";

const DesignCakeWidgetModal = dynamic(
  () =>
    import("@/components/features/cake-customizer/DesignCakeWidgetModal").then(
      (mod) => mod.DesignCakeWidgetModal
    ),
  { ssr: false }
);

/**
 * Mobile-Only Sticky Customer Action Dock
 * Fixed near bottom-left with safe-area padding.
 * Always visible from initial page load to guarantee instant call access.
 * Primary action: Call in Phone Dialer Green (+91 93109 71535)
 * Direct Circles: WhatsApp, Design My Cake Studio, Directions
 * Dock Medallion: KidOld Bakers 3D convex domed circular logo.
 * Rightmost: Expandable Menu Toggle Arrow.
 * Hidden on desktop (md:hidden).
 */
export function MobileActionDock() {
  const [isOpen, setIsOpen] = useState(false);
  const [isStudioOpen, setIsStudioOpen] = useState(false);
  const dockRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <aside
        ref={dockRef}
        aria-label="Mobile Quick Contact Dock"
        className="pointer-events-none fixed bottom-4 left-4 z-40 md:hidden select-none pb-[env(safe-area-inset-bottom,0)]"
      >
        {/* Expanded Actions Tray (Slides Up) */}
        {isOpen && (
          <div
            role="menu"
            aria-label="Quick Actions"
            className="pointer-events-auto mb-2.5 p-2 rounded-2xl bg-[#FFFDF9]/95 dark:bg-[#1D0F0A]/95 backdrop-blur-md metallic-border flex flex-col gap-2 min-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            {/* Action 1: Design My Cake Studio Widget */}
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setIsOpen(false);
                setIsStudioOpen(true);
              }}
              className="btn-3d-tactile flex items-center gap-2.5 px-3 py-2 rounded-xl bg-gradient-to-r from-brand-gold/20 via-brand-gold/10 to-brand-crimson/15 dark:from-brand-gold/25 dark:via-brand-gold/15 dark:to-brand-crimson/25 hover:from-brand-gold/30 hover:to-brand-crimson/30 border border-brand-gold/60 text-brand-chocolate dark:text-brand-cream hover:text-brand-crimson dark:hover:text-brand-gold transition-colors shadow-2xs text-xs font-bold text-left"
            >
              <span className="w-7 h-7 rounded-full metallic-gold-surface text-brand-chocolate flex items-center justify-center shrink-0 shadow-tactile-sm">
                <CakeStudioIcon className="w-4 h-4 text-brand-chocolate" />
              </span>
              <div className="flex flex-col text-left">
                <span className="flex items-center gap-1.5">
                  Design My Cake
                  <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-brand-crimson text-white">
                    Studio
                  </span>
                </span>
                <span className="text-[10px] text-brand-chocolate-light dark:text-brand-cream/60 font-normal">
                  4-Step Interactive Customizer
                </span>
              </div>
            </button>

            {/* Action 2: WhatsApp */}
            <a
              role="menuitem"
              href={getWhatsAppInquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="btn-3d-tactile flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 dark:bg-brand-chocolate-light/40 hover:bg-white dark:hover:bg-brand-chocolate-light/60 border border-brand-border/60 dark:border-brand-gold/25 text-brand-chocolate dark:text-brand-cream hover:text-brand-crimson dark:hover:text-brand-gold transition-colors shadow-2xs text-xs font-bold"
            >
              <span className="w-7 h-7 rounded-full bg-brand-chocolate dark:bg-[#120703] text-[#25D366] flex items-center justify-center shrink-0 shadow-2xs border border-[#25D366]/30">
                <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
              </span>
              <div className="flex flex-col text-left">
                <span>Chat on WhatsApp</span>
                <span className="text-[10px] text-brand-chocolate-light dark:text-brand-cream/60 font-normal">
                  Direct Baker Consultation
                </span>
              </div>
            </a>

            {/* Action 3: Navigate to Shop */}
            <a
              role="menuitem"
              href={businessData.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="btn-3d-tactile flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/90 dark:bg-brand-chocolate-light/40 hover:bg-white dark:hover:bg-brand-chocolate-light/60 border border-brand-border/60 dark:border-brand-gold/25 text-brand-chocolate dark:text-brand-cream hover:text-brand-crimson dark:hover:text-brand-gold transition-colors shadow-2xs text-xs font-bold"
            >
              <span className="w-7 h-7 rounded-full bg-brand-crimson/15 dark:bg-brand-crimson/25 text-brand-crimson dark:text-brand-crimson-light flex items-center justify-center shrink-0 shadow-2xs border border-brand-crimson/30">
                <MapPinIcon className="w-4 h-4 text-brand-crimson dark:text-brand-crimson-light" />
              </span>
              <div className="flex flex-col text-left">
                <span>Directions / Shop</span>
                <span className="text-[10px] text-brand-chocolate-light dark:text-brand-cream/60 font-normal">
                  Line Bazaar, Jaunpur
                </span>
              </div>
            </a>
          </div>
        )}

        {/* Main Dock Bar - Strictly 3 Sleek Action Controls */}
        <div className="pointer-events-auto flex items-center gap-2 p-1.5 rounded-full bg-[#FFFDF9]/95 dark:bg-[#1D0F0A]/95 backdrop-blur-md border border-brand-gold/60 dark:border-brand-gold/50 shadow-[0_8px_24px_rgba(44,24,16,0.18)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
          {/* 1. Call Button in Dialer Green */}
          <a
            href={`tel:${businessData.phoneRaw}`}
            className="btn-dialer-green flex h-10 w-10 items-center justify-center rounded-full text-white shadow-tactile transition-all shrink-0"
            aria-label={`Call KidOld Bakers at ${businessData.phoneDisplay}`}
            title="Call Bakery Directly"
          >
            <PhoneIcon className="w-4 h-4 text-white shrink-0 fill-current" />
            <span className="sr-only">Call Bakery</span>
          </a>

          {/* 2. KidOld Bakers 3D Medallion Logo (Center) */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="medallion-convex-3d relative w-10 h-10 rounded-full shrink-0 flex items-center justify-center p-0 overflow-hidden cursor-pointer"
            title="KidOld Bakers - Scroll to Top"
            aria-label="KidOld Bakers - Scroll to Top"
          >
            <Image
              src="/images/brand/kidold-logo-clean.png"
              alt="KidOld Bakers Logo"
              fill
              sizes="40px"
              className="object-cover select-none pointer-events-none"
            />
          </button>

          {/* 3. Up Arrow Menu Toggle Button (Rightmost) */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`btn-3d-tactile w-10 h-10 rounded-full flex items-center justify-center transition-all border shrink-0 ${
              isOpen
                ? "bg-brand-chocolate dark:bg-brand-gold text-brand-gold dark:text-brand-chocolate border-brand-gold rotate-180 shadow-tactile-sm"
                : "bg-white dark:bg-brand-chocolate-light/40 text-brand-chocolate dark:text-brand-gold border-brand-border/80 dark:border-brand-gold/30 hover:border-brand-gold shadow-2xs"
            }`}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close quick menu" : "Open quick contact menu"}
            title={isOpen ? "Close Menu" : "More Actions"}
          >
            <svg
              className="w-4 h-4 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M5 15l7-7 7 7"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* 4-Step Interactive Studio Drawer Widget Modal (Rendered on demand) */}
      {isStudioOpen && (
        <DesignCakeWidgetModal
          isOpen={isStudioOpen}
          onClose={() => setIsStudioOpen(false)}
        />
      )}
    </>
  );
}
