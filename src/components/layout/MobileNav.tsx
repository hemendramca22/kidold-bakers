"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon, PhoneIcon } from "@/components/icons";
import { businessData } from "@/data/business";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { smoothScrollTo } from "@/lib/motion";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: Array<{ name: string; href: string }>;
  activeSection?: string;
}

export function MobileNav({ isOpen, onClose, navLinks, activeSection }: MobileNavProps) {
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

  return (
    <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-brand-chocolate/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-brand-cream dark:bg-[#1A0E09] border-l border-brand-border dark:border-brand-gold/30 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200">
        <div>
          {/* Header & Close */}
          <div className="flex items-center justify-between pb-5 border-b border-brand-border/60 dark:border-brand-gold/20">
            <div className="flex items-center gap-2.5">
              <div className="medallion-convex-3d relative w-9 h-9 shrink-0 overflow-hidden p-0">
                <Image
                  src="/images/brand/kidold-logo-clean.png"
                  alt="KidOld Bakers"
                  fill
                  sizes="36px"
                  className="object-cover select-none pointer-events-none"
                />
              </div>
              <span className="font-bold text-lg text-brand-chocolate dark:text-brand-cream">KidOld Bakers</span>
            </div>
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

          {/* Links */}
          <nav className="mt-6 flex flex-col gap-2">
            {navLinks.map((link) => {
              const targetId = link.href.replace("#", "").replace("/", "");
              const isActive = activeSection === targetId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    onClose();
                    if (targetId) {
                      e.preventDefault();
                      if (typeof window !== "undefined") {
                        window.history.pushState(null, "", `#${targetId}`);
                      }
                      setTimeout(() => {
                        smoothScrollTo(targetId);
                      }, 120);
                    }
                  }}
                  className={`px-4 py-3 rounded-2xl text-base font-bold transition-all border ${
                    isActive
                      ? "bg-[#2C1810] text-[#FFFDF7] border-[#2C1810] shadow-tactile dark:bg-[#F5C542] dark:text-[#1A0D08] dark:font-black dark:border-[#F5C542] dark:shadow-gold-tactile"
                      : "text-brand-chocolate dark:text-brand-cream/80 hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20 hover:text-brand-chocolate-dark dark:hover:text-brand-gold-sparkle border-transparent"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
        </div>

        {/* Bottom Contact Actions */}
        <div className="pt-6 border-t border-brand-border/60 flex flex-col gap-3">
          <Button

            variant="whatsapp"
            href={getWhatsAppInquiryUrl()}
            isExternal
            leftIcon={<WhatsAppIcon className="w-5 h-5 text-brand-gold" />}
            className="w-full"
          >
            Order via WhatsApp
          </Button>
          <Button
            variant="outline"
            href={`tel:${businessData.phoneRaw}`}
            leftIcon={<PhoneIcon className="w-5 h-5" />}
            className="w-full"
          >
            Call {businessData.phoneDisplay}
          </Button>
          <p className="text-center text-xs text-brand-chocolate-light mt-2">
            Dev Palace, Line Bazaar Rd, Jaunpur 222002
          </p>

        </div>
      </div>
    </div>
  );
}
