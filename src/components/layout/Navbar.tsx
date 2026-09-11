"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CakeStudioIcon,
  HeartSparkleIcon,
  BookOpenIcon,
  ChevronDownIcon,
  ShareIcon,
  WhatsAppIcon,
  InstagramIcon,
  FacebookIcon,
  GoogleIcon,
  GoogleMapsIcon,
  GoogleReviewIcon,
} from "@/components/icons";
import { businessData } from "@/data/business";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { smoothScrollTo } from "@/lib/motion";
import { MobileNav } from "./MobileNav";

const BASE_NAV_LINKS = [
  { name: "Signature Cakes", href: "#signature-cakes" },
  { name: "Categories", href: "#categories", isDropdown: true, dropdownType: "categories" },
  { name: "Design My Cake", href: "#custom-cakes" },
  { name: "Stories", href: "#stories", isDropdown: true, dropdownType: "stories" },
  { name: "Visit Us", href: "#visit-us" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isStoriesOpen, setIsStoriesOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);

  const categoriesRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);
  const connectRef = useRef<HTMLDivElement>(null);

  const isLinkActive = useCallback(
    (href: string) => {
      const sectionId = href.split("#")[1] || "";
      if (pathname === "/design-my-cake") {
        return sectionId === "custom-cakes";
      }
      if (pathname.startsWith("/categories")) {
        return sectionId === "categories";
      }
      if (pathname.startsWith("/stories")) {
        return sectionId === "stories" || sectionId === "our-story";
      }
      if (sectionId === "stories") {
        return activeSection === "our-story";
      }
      return activeSection === sectionId;
    },
    [pathname, activeSection]
  );

  const navLinks = BASE_NAV_LINKS.map((link) => ({
    ...link,
    href: pathname === "/" ? link.href : `/${link.href}`,
  }));

  // Close dropdowns on outside click or escape
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) {
        setIsCategoriesOpen(false);
      }
      if (storiesRef.current && !storiesRef.current.contains(e.target as Node)) {
        setIsStoriesOpen(false);
      }
      if (connectRef.current && !connectRef.current.contains(e.target as Node)) {
        setIsConnectOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsCategoriesOpen(false);
        setIsStoriesOpen(false);
        setIsConnectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

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
      if (pathname.startsWith("/stories")) {
        setActiveSection("stories");
        return;
      }

      if (scrollY < 180) {
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
      <header className="fixed top-0 inset-x-0 z-40 px-3 sm:px-6 pt-3 sm:pt-4">
        <div
          className={`glass-navbar mx-auto flex max-w-7xl items-center justify-between rounded-full px-5 py-2.5 sm:px-6 transition-[max-width,padding,box-shadow] duration-300 ${
            isScrolled ? "max-w-6xl py-2" : ""
          }`}
        >
          {/* Brand Identity */}
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

          {/* Center Navigation Pill - Balanced with Natural Spacing */}
          <nav
            className="hidden shrink-0 items-center gap-1.5 lg:gap-2 xl:gap-2.5 rounded-full border border-brand-gold/30 dark:border-brand-gold/35 bg-white/35 dark:bg-black/40 p-1.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.5)] lg:flex backdrop-blur-md"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => {
              const isActive = isLinkActive(link.href);
              const targetId = link.href.split("#")[1] || "";

              // Categories Dropdown Item
              if (link.isDropdown && link.dropdownType === "categories") {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    ref={categoriesRef}
                    onMouseEnter={() => setIsCategoriesOpen(true)}
                    onMouseLeave={() => setIsCategoriesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsCategoriesOpen((prev) => !prev)}
                      className={`btn-3d-tactile rounded-full h-8 2xl:h-9 px-3 xl:px-3.5 2xl:px-4 text-xs 2xl:text-sm font-bold whitespace-nowrap leading-none inline-flex items-center justify-center gap-1 tracking-tight transition-all duration-200 ${
                        isActive
                          ? "bg-[#2C1810] text-[#FFFDF7] border border-[#2C1810] shadow-tactile dark:metallic-gold-surface dark:text-[#1A0A04] dark:font-black dark:border-brand-gold/80"
                          : "border border-transparent text-brand-chocolate/85 dark:text-brand-cream/85 hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20 hover:text-brand-chocolate-dark dark:hover:text-brand-gold-sparkle"
                      }`}
                      aria-expanded={isCategoriesOpen}
                      aria-haspopup="true"
                      aria-label="Product categories menu"
                    >
                      <span>Categories</span>
                      <ChevronDownIcon
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isCategoriesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isCategoriesOpen && (
                      <div
                        role="menu"
                        aria-label="Categories Menu"
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 w-[580px] xl:w-[620px]"
                      >
                        <div className="rounded-3xl border border-brand-gold/40 dark:border-brand-gold/50 bg-white/95 dark:bg-[#1D0F0A]/95 backdrop-blur-2xl p-4 shadow-tactile dark:shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col gap-3 animate-in fade-in zoom-in-95 duration-150">
                          {/* 3-Column Hierarchy Grid */}
                          <div className="grid grid-cols-12 gap-3 text-left">
                            {/* Col 1: Cakes (Hero Priority) */}
                            <div className="col-span-5 flex flex-col gap-1.5 p-2.5 rounded-2xl bg-brand-cream/60 dark:bg-black/30 border border-brand-border/40 dark:border-brand-gold/20">
                              <span className="text-[11px] font-black uppercase tracking-wider text-brand-crimson dark:text-brand-gold flex items-center gap-1.5 px-1">
                                <span className="w-2 h-2 rounded-full bg-brand-crimson animate-pulse" />
                                Cakes (Hero)
                              </span>

                              <Link
                                href="/categories/pre-made-cakes"
                                onClick={() => setIsCategoriesOpen(false)}
                                className="group flex flex-col p-2 rounded-xl hover:bg-white dark:hover:bg-brand-gold/15 transition-all"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-brand-chocolate dark:text-brand-cream group-hover:text-brand-crimson dark:group-hover:text-brand-gold">
                                    Pre-Made Cakes
                                  </span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-crimson/15 text-brand-crimson dark:text-brand-gold">
                                    Daily Ready
                                  </span>
                                </div>
                                <span className="text-[10px] text-brand-chocolate/70 dark:text-brand-cream/60 mt-0.5">
                                  14+ celebration tiers
                                </span>
                              </Link>

                              <Link
                                href="/categories/custom-cakes"
                                onClick={() => setIsCategoriesOpen(false)}
                                className="group flex flex-col p-2 rounded-xl hover:bg-white dark:hover:bg-brand-gold/15 transition-all"
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-brand-chocolate dark:text-brand-cream group-hover:text-brand-gold">
                                    Custom Cakes
                                  </span>
                                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-brand-gold/20 text-brand-chocolate dark:text-brand-gold">
                                    Studio
                                  </span>
                                </div>
                                <span className="text-[10px] text-brand-chocolate/70 dark:text-brand-cream/60 mt-0.5">
                                  10 celebration styles &amp; 3D tool
                                </span>
                              </Link>
                            </div>

                            {/* Col 2: Pastries (Primary Priority) */}
                            <div className="col-span-3 flex flex-col gap-1.5 p-2.5 rounded-2xl bg-brand-cream/60 dark:bg-black/30 border border-brand-border/40 dark:border-brand-gold/20">
                              <span className="text-[11px] font-black uppercase tracking-wider text-brand-apricot dark:text-brand-gold flex items-center gap-1.5 px-1">
                                <span className="w-2 h-2 rounded-full bg-brand-gold" />
                                Pastries
                              </span>

                              <Link
                                href="/categories/pastries"
                                onClick={() => setIsCategoriesOpen(false)}
                                className="group flex flex-col p-2 rounded-xl hover:bg-white dark:hover:bg-brand-gold/15 transition-all"
                              >
                                <span className="text-xs font-bold text-brand-chocolate dark:text-brand-cream group-hover:text-brand-gold">
                                  Artisan Pastries
                                </span>
                                <span className="text-[10px] text-brand-chocolate/70 dark:text-brand-cream/60 mt-0.5">
                                  Single-portion dessert slices
                                </span>
                              </Link>
                            </div>

                            {/* Col 3: Food & Beverages (Supporting) */}
                            <div className="col-span-4 flex flex-col gap-1 p-2.5 rounded-2xl bg-brand-cream/60 dark:bg-black/30 border border-brand-border/40 dark:border-brand-gold/20">
                              <span className="text-[11px] font-black uppercase tracking-wider text-brand-chocolate/70 dark:text-brand-cream/70 px-1">
                                Food &amp; Drinks
                              </span>

                              <div className="grid grid-cols-2 gap-1 text-[11px] font-semibold">
                                <Link
                                  href="/categories/pizza"
                                  onClick={() => setIsCategoriesOpen(false)}
                                  className="px-1.5 py-1 rounded-lg text-brand-chocolate/85 dark:text-brand-cream/85 hover:bg-white dark:hover:bg-brand-gold/15 hover:text-brand-crimson dark:hover:text-brand-gold transition-all"
                                >
                                  Pizza
                                </Link>
                                <Link
                                  href="/categories/burgers"
                                  onClick={() => setIsCategoriesOpen(false)}
                                  className="px-1.5 py-1 rounded-lg text-brand-chocolate/85 dark:text-brand-cream/85 hover:bg-white dark:hover:bg-brand-gold/15 hover:text-brand-crimson dark:hover:text-brand-gold transition-all"
                                >
                                  Burgers
                                </Link>
                                <Link
                                  href="/categories/sandwiches"
                                  onClick={() => setIsCategoriesOpen(false)}
                                  className="px-1.5 py-1 rounded-lg text-brand-chocolate/85 dark:text-brand-cream/85 hover:bg-white dark:hover:bg-brand-gold/15 hover:text-brand-crimson dark:hover:text-brand-gold transition-all"
                                >
                                  Sandwiches
                                </Link>
                                <Link
                                  href="/categories/patties-snacks"
                                  onClick={() => setIsCategoriesOpen(false)}
                                  className="px-1.5 py-1 rounded-lg text-brand-chocolate/85 dark:text-brand-cream/85 hover:bg-white dark:hover:bg-brand-gold/15 hover:text-brand-crimson dark:hover:text-brand-gold transition-all"
                                >
                                  Patties
                                </Link>
                                <Link
                                  href="/categories/hot-beverages"
                                  onClick={() => setIsCategoriesOpen(false)}
                                  className="px-1.5 py-1 rounded-lg text-brand-chocolate/85 dark:text-brand-cream/85 hover:bg-white dark:hover:bg-brand-gold/15 hover:text-brand-crimson dark:hover:text-brand-gold transition-all"
                                >
                                  Hot Sips
                                </Link>
                                <Link
                                  href="/categories/cold-beverages"
                                  onClick={() => setIsCategoriesOpen(false)}
                                  className="px-1.5 py-1 rounded-lg text-brand-chocolate/85 dark:text-brand-cream/85 hover:bg-white dark:hover:bg-brand-gold/15 hover:text-brand-crimson dark:hover:text-brand-gold transition-all"
                                >
                                  Cold Shakes
                                </Link>
                              </div>
                            </div>
                          </div>

                          {/* Bottom Hub Link */}
                          <div className="pt-2 border-t border-brand-border/40 dark:border-brand-gold/20 flex items-center justify-between px-2">
                            <span className="text-[10px] text-brand-chocolate/70 dark:text-brand-cream/60">
                              100% Pure Veg • Line Bazaar, Jaunpur
                            </span>
                            <Link
                              href="/categories"
                              onClick={() => setIsCategoriesOpen(false)}
                              className="text-xs font-bold text-brand-crimson dark:text-brand-gold hover:underline flex items-center gap-1"
                            >
                              <span>Explore All Categories</span>
                              <span>→</span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Stories Dropdown Item
              if (link.isDropdown && link.dropdownType === "stories") {
                return (
                  <div
                    key={link.name}
                    className="relative"
                    ref={storiesRef}
                    onMouseEnter={() => setIsStoriesOpen(true)}
                    onMouseLeave={() => setIsStoriesOpen(false)}
                  >
                    <button
                      type="button"
                      onClick={() => setIsStoriesOpen((prev) => !prev)}
                      className={`btn-3d-tactile rounded-full h-8 2xl:h-9 px-3 xl:px-3.5 2xl:px-4 text-xs 2xl:text-sm font-bold whitespace-nowrap leading-none inline-flex items-center justify-center gap-1 tracking-tight transition-all duration-200 ${
                        isActive
                          ? "bg-[#2C1810] text-[#FFFDF7] border border-[#2C1810] shadow-tactile dark:metallic-gold-surface dark:text-[#1A0A04] dark:font-black dark:border-brand-gold/80"
                          : "border border-transparent text-brand-chocolate/85 dark:text-brand-cream/85 hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20 hover:text-brand-chocolate-dark dark:hover:text-brand-gold-sparkle"
                      }`}
                      aria-expanded={isStoriesOpen}
                      aria-haspopup="true"
                      aria-label="Stories and Journal menu"
                    >
                      <span>Stories</span>
                      <ChevronDownIcon
                        className={`w-3 h-3 transition-transform duration-200 ${
                          isStoriesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isStoriesOpen && (
                      <div
                        role="menu"
                        aria-label="Stories Menu"
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[240px]"
                      >
                        <div className="rounded-2xl border border-brand-gold/30 dark:border-brand-gold/40 bg-white/95 dark:bg-[#1D0F0A]/95 backdrop-blur-xl p-2 shadow-tactile dark:shadow-[0_16px_40px_rgba(0,0,0,0.85)] flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150">
                          {/* Item 1: Our Story (Homepage Section) */}
                          <a
                            href={pathname === "/" ? "#our-story" : "/#our-story"}
                            onClick={(e) => {
                              setIsStoriesOpen(false);
                              if (pathname === "/") {
                                e.preventDefault();
                                setActiveSection("our-story");
                                if (typeof window !== "undefined") {
                                  window.history.pushState(null, "", "#our-story");
                                }
                                smoothScrollTo("our-story");
                              }
                            }}
                            role="menuitem"
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20 transition-all text-left group"
                          >
                            <span className="w-8 h-8 rounded-full bg-brand-crimson/15 dark:bg-brand-crimson/25 text-brand-crimson dark:text-brand-crimson-light flex items-center justify-center shrink-0 border border-brand-crimson/20">
                              <HeartSparkleIcon className="w-4 h-4" />
                            </span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-brand-chocolate dark:text-brand-cream group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
                                Our Story
                              </span>
                              <span className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60">
                                Heritage, family &amp; bakery craft
                              </span>
                            </div>
                          </a>

                          {/* Item 2: Bakery Journal (Dedicated Page) */}
                          <Link
                            href="/stories"
                            onClick={() => setIsStoriesOpen(false)}
                            role="menuitem"
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-brand-gold/15 dark:hover:bg-brand-gold/20 transition-all text-left group ${
                              pathname.startsWith("/stories")
                                ? "bg-brand-gold/20 dark:bg-brand-gold/25"
                                : ""
                            }`}
                          >
                            <span className="w-8 h-8 rounded-full bg-brand-gold/15 dark:bg-brand-gold/25 text-brand-gold flex items-center justify-center shrink-0 border border-brand-gold/30">
                              <BookOpenIcon className="w-4 h-4" />
                            </span>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-brand-chocolate dark:text-brand-cream group-hover:text-brand-gold transition-colors flex items-center gap-1.5">
                                Bakery Journal
                                <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full bg-brand-gold/25 text-brand-chocolate dark:text-brand-gold border border-brand-gold/40">
                                  New
                                </span>
                              </span>
                              <span className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60">
                                Guides, trends &amp; celebration ideas
                              </span>
                            </div>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Standard Navigation Items
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
                  {link.name === "Design My Cake" && (
                    <CakeStudioIcon className="w-3.5 h-3.5 text-brand-gold mr-1.5 inline-block shrink-0" />
                  )}
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Area: Theme Toggle & Compact Connect Popover */}
          <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
            <ThemeToggle />

            {/* Compact Connect Control & Popover */}
            <div
              className="relative"
              ref={connectRef}
              onMouseEnter={() => setIsConnectOpen(true)}
              onMouseLeave={() => setIsConnectOpen(false)}
            >
              <button
                type="button"
                onClick={() => setIsConnectOpen((prev) => !prev)}
                className="btn-3d-tactile rounded-full h-8 2xl:h-9 px-3 xl:px-3.5 text-xs 2xl:text-sm font-bold inline-flex items-center gap-1.5 border border-brand-gold/40 dark:border-brand-gold/40 bg-brand-gold/10 dark:bg-brand-gold/15 text-brand-chocolate dark:text-brand-gold-sparkle hover:bg-brand-gold/25 dark:hover:bg-brand-gold/25 transition-all shadow-tactile-sm"
                aria-expanded={isConnectOpen}
                aria-haspopup="true"
                aria-label="Connect with KidOld Bakers"
              >
                <ShareIcon className="w-3.5 h-3.5 text-brand-gold" />
                <span>Connect</span>
                <ChevronDownIcon
                  className={`w-3 h-3 text-brand-gold transition-transform duration-200 ${
                    isConnectOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isConnectOpen && (
                <div
                  role="menu"
                  aria-label="Connect channels"
                  className="absolute top-full right-0 pt-2 z-50 w-72 sm:w-80"
                >
                  <div className="rounded-2xl border border-brand-gold/30 dark:border-brand-gold/40 bg-white/95 dark:bg-[#1D0F0A]/95 backdrop-blur-xl p-3 shadow-tactile dark:shadow-[0_16px_40px_rgba(0,0,0,0.85)] animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-2 py-1 mb-2 border-b border-brand-border/60 dark:border-brand-gold/20 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-chocolate-light dark:text-brand-gold/80">
                        Connect &amp; Follow
                      </span>
                      <span className="text-[10px] text-brand-chocolate/60 dark:text-brand-cream/60">
                        Jaunpur Hub
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {/* WhatsApp */}
                      <a
                        href={businessData.socials.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center gap-2 p-2 rounded-xl border border-transparent hover:border-[#25D366]/30 hover:bg-[#25D366]/10 text-brand-chocolate dark:text-brand-cream transition-all group"
                        title="Chat directly with our bakers on WhatsApp"
                      >
                        <span className="w-7 h-7 rounded-full bg-[#25D366]/15 text-[#25D366] flex items-center justify-center shrink-0">
                          <WhatsAppIcon className="w-4 h-4 text-[#25D366]" />
                        </span>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-bold truncate group-hover:text-[#25D366] transition-colors">
                            WhatsApp
                          </span>
                          <span className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60 truncate">
                            Direct Order
                          </span>
                        </div>
                      </a>

                      {/* Instagram */}
                      <a
                        href={businessData.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center gap-2 p-2 rounded-xl border border-transparent hover:border-[#E1306C]/30 hover:bg-[#E1306C]/10 text-brand-chocolate dark:text-brand-cream transition-all group"
                        title="Follow @kidoldbakers on Instagram"
                      >
                        <span className="w-7 h-7 rounded-full bg-[#E1306C]/15 text-[#E1306C] flex items-center justify-center shrink-0">
                          <InstagramIcon className="w-4 h-4 text-[#E1306C]" />
                        </span>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-bold truncate group-hover:text-[#E1306C] transition-colors">
                            Instagram
                          </span>
                          <span className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60 truncate">
                            @kidoldbakers
                          </span>
                        </div>
                      </a>

                      {/* Facebook */}
                      <a
                        href={businessData.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center gap-2 p-2 rounded-xl border border-transparent hover:border-[#1877F2]/30 hover:bg-[#1877F2]/10 text-brand-chocolate dark:text-brand-cream transition-all group"
                        title="KidOld Bakers Official Facebook Page"
                      >
                        <span className="w-7 h-7 rounded-full bg-[#1877F2]/15 text-[#1877F2] flex items-center justify-center shrink-0">
                          <FacebookIcon className="w-4 h-4 text-[#1877F2]" />
                        </span>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-bold truncate group-hover:text-[#1877F2] transition-colors">
                            Facebook
                          </span>
                          <span className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60 truncate">
                            Official Page
                          </span>
                        </div>
                      </a>

                      {/* Google Business Profile */}
                      <a
                        href={businessData.socials.googleBusiness}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center gap-2 p-2 rounded-xl border border-transparent hover:border-brand-gold/40 hover:bg-brand-gold/10 text-brand-chocolate dark:text-brand-cream transition-all group"
                        title="KidOld Bakers Verified Google Business Profile"
                      >
                        <span className="w-7 h-7 rounded-full bg-brand-gold/15 text-brand-gold flex items-center justify-center shrink-0">
                          <GoogleIcon className="w-4 h-4 text-brand-gold" />
                        </span>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-bold truncate group-hover:text-brand-gold transition-colors">
                            Google Profile
                          </span>
                          <span className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60 truncate">
                            Business Info
                          </span>
                        </div>
                      </a>

                      {/* Google Maps / Directions */}
                      <a
                        href={businessData.socials.googleMaps}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center gap-2 p-2 rounded-xl border border-transparent hover:border-brand-crimson/30 hover:bg-brand-crimson/10 text-brand-chocolate dark:text-brand-cream transition-all group"
                        title="Directions to KidOld Bakers on Google Maps"
                      >
                        <span className="w-7 h-7 rounded-full bg-brand-crimson/15 text-brand-crimson dark:text-brand-gold flex items-center justify-center shrink-0">
                          <GoogleMapsIcon className="w-4 h-4 text-brand-crimson dark:text-brand-gold" />
                        </span>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-bold truncate group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
                            Find us / Directions
                          </span>
                          <span className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60 truncate">
                            Line Bazaar Rd
                          </span>
                        </div>
                      </a>

                      {/* Google Reviews */}
                      <a
                        href={businessData.socials.googleReviews}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="flex items-center gap-2 p-2 rounded-xl border border-transparent hover:border-amber-400/40 hover:bg-amber-400/10 text-brand-chocolate dark:text-brand-cream transition-all group"
                        title="Review KidOld Bakers on Google"
                      >
                        <span className="w-7 h-7 rounded-full bg-amber-400/15 text-amber-500 flex items-center justify-center shrink-0">
                          <GoogleReviewIcon className="w-4 h-4 text-amber-500" />
                        </span>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-xs font-bold truncate group-hover:text-amber-500 transition-colors">
                            Review us on Google
                          </span>
                          <span className="text-[10px] text-brand-chocolate-light/70 dark:text-brand-cream/60 truncate">
                            5-Star Rating
                          </span>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Menu Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
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

      {/* Mobile Drawer Navigation */}
      <MobileNav
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        activeSection={activeSection}
      />
    </>
  );
}
