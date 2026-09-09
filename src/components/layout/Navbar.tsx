"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon, CakeStudioIcon } from "@/components/icons";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { smoothScrollTo } from "@/lib/motion";
import { MobileNav } from "./MobileNav";

const NAV_LINKS = [
  { name: "Signature Cakes", href: "#signature-cakes" },
  { name: "Categories", href: "#categories" },
  { name: "Design My Cake", href: "#custom-cakes" },
  { name: "Our Story", href: "#our-story" },
  { name: "Visit Us", href: "#visit-us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const isLinkActive = useCallback(
    (href: string) => {
      const sectionId = href.split("#")[1] || "";
      return pathname === "/design-my-cake"
        ? sectionId === "custom-cakes"
        : activeSection === sectionId;
    },
    [pathname, activeSection]
  );

  const navLinks = NAV_LINKS.map((link) => ({
    ...link,
    href: pathname === "/" ? link.href : `/${link.href}`,
  }));

  useEffect(() => {
    let frame = 0;

    const syncHash = () => {
      if (typeof window === "undefined") return;
      const hash = window.location.hash.replace("#", "");
      if (hash) {
        setActiveSection(hash);
      }
    };

    const updateNavigation = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 16);

      if (pathname === "/design-my-cake") {
        setActiveSection("custom-cakes");
        return;
      }

      if (scrollY < 180) {
        // At the top hero, clear section active
        setActiveSection("");
        return;
      }

      const sectionIds = ["signature-cakes", "categories", "custom-cakes", "our-story", "visit-us"];
      let current = "";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 280 && rect.bottom >= 120) {
            current = id;
            break;
          }
        }
      }
      if (current) {
        setActiveSection(current);
      }
    };

    const onScroll = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          updateNavigation();
          frame = 0;
        });
      }
    };

    syncHash();
    updateNavigation();

    // If opened directly with an anchor hash in URL, smoothly scroll to it
    if (typeof window !== "undefined" && window.location.hash) {
      const initialTarget = window.location.hash.replace("#", "");
      if (initialTarget) {
        setTimeout(() => {
          smoothScrollTo(initialTarget);
        }, 500);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    window.addEventListener("hashchange", syncHash, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("hashchange", syncHash);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4">
        <div
          className={`glass-navbar mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-2.5 sm:px-6 transition-[max-width,padding,box-shadow] duration-300 ${
            isScrolled ? "max-w-6xl py-2" : ""
          }`}
        >
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5 rounded-full p-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            aria-label="KidOld Bakers Home"
          >
            <div className="medallion-convex-3d relative h-10 w-10 sm:h-11 sm:w-11 shrink-0 overflow-hidden p-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/images/brand/kidold-logo-clean.png"
                alt="KidOld Bakers Logo"
                fill
                priority
                sizes="48px"
                className="object-cover select-none pointer-events-none"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-sans text-lg font-extrabold tracking-tight text-brand-chocolate-dark dark:metallic-gold-text sm:text-xl transition-colors">
                KidOld Bakers
              </span>
              <span className="-mt-0.5 hidden text-[10px] font-bold uppercase tracking-[0.13em] text-brand-chocolate-light/70 dark:text-brand-gold/80 sm:inline-block transition-colors">
                Jaunpur, Uttar Pradesh
              </span>
            </div>
          </Link>

          <nav
            className="hidden shrink-0 items-center gap-1 xl:gap-1.5 2xl:gap-2 rounded-full border border-brand-gold/30 dark:border-brand-gold/35 bg-white/35 dark:bg-black/40 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] xl:flex backdrop-blur-md"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              const targetId = link.href.split("#")[1] || "";
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    if (targetId && pathname === "/") {
                      e.preventDefault();
                      setActiveSection(targetId);
                      if (typeof window !== "undefined") {
                        window.history.pushState(null, "", `#${targetId}`);
                      }
                      if (targetId === "signature-cakes" && typeof window !== "undefined") {
                        window.dispatchEvent(new CustomEvent("reset-signature-filter"));
                      }
                      smoothScrollTo(targetId);
                    } else {
                      setActiveSection(targetId);
                    }
                  }}
                  className={`btn-3d-tactile rounded-full h-8 2xl:h-9 px-3 xl:px-3.5 2xl:px-4 text-xs 2xl:text-sm font-bold whitespace-nowrap leading-none inline-flex items-center justify-center tracking-tight transition-all duration-200 ${
                    isActive
                      ? "bg-[#2C1810] text-[#FFFDF7] border border-[#2C1810] shadow-tactile dark:metallic-gold-surface dark:text-[#1A0A04] dark:font-black dark:border-brand-gold/80"
                      : "border border-transparent text-brand-chocolate/85 dark:text-brand-cream/85 hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20 hover:text-brand-chocolate-dark dark:hover:text-brand-gold-sparkle"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          <div className="hidden shrink-0 items-center gap-2 xl:gap-2.5 xl:flex">
            <ThemeToggle />
            <Button
              variant="whatsapp"
              size="sm"
              href={getWhatsAppInquiryUrl()}
              isExternal
              leftIcon={<WhatsAppIcon className="h-4 w-4 text-brand-gold" />}
              className="text-xs whitespace-nowrap"
            >
              WhatsApp Order
            </Button>
            <Button
              variant="primary"
              size="sm"
              href="#custom-cakes"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  smoothScrollTo("custom-cakes");
                }
              }}
              leftIcon={<CakeStudioIcon className="h-4 w-4 text-brand-gold" />}
              className="text-xs whitespace-nowrap"
            >
              Design My Cake
            </Button>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <ThemeToggle />
            <Button
              variant="whatsapp"
              size="sm"
              href={getWhatsAppInquiryUrl()}
              isExternal
              className="min-h-[36px] px-2.5"
              aria-label="Order on WhatsApp"
            >
              <WhatsAppIcon className="h-4 w-4 text-brand-gold" />
            </Button>
            <button
              type="button"
              onClick={() => setIsMobileOpen(true)}
              className="btn-3d-tactile rounded-full border border-white/60 dark:border-brand-gold/30 bg-white/40 dark:bg-black/40 p-2 text-brand-chocolate dark:text-brand-cream shadow-[inset_0_1px_0_rgba(255,255,255,0.85),0_2px_8px_rgba(44,24,16,0.08)] dark:shadow-[inset_0_1px_0_rgba(200,157,60,0.2),0_2px_8px_rgba(0,0,0,0.5)] transition-colors hover:bg-white/65 dark:hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileOpen}
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navLinks={navLinks}
        activeSection={activeSection}
      />
    </>
  );
}
