"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge, VegIndicator } from "@/components/ui/Badge";
import { WhatsAppIcon, CakeStudioIcon, HeartSparkleIcon } from "@/components/icons";
import { getWhatsAppInquiryUrl, CustomCakeBrief } from "@/lib/whatsapp";
import {
  CakeReferenceSection,
  CakeReferenceData,
} from "@/components/features/cake-customizer/CakeReferenceSection";

export interface CustomOption {
  id: string;
  name: string;
  description: string;
  badge?: string;
}

export const SPONGE_OPTIONS: CustomOption[] = [
  { id: "belgian-truffle", name: "Belgian Dark Chocolate", description: "Rich, moist Dutch cocoa sponge baked with premium melted chocolate.", badge: "Bestseller" },
  { id: "vanilla-chiffon", name: "Vanilla Chiffon", description: "Featherlight, airy dairy sponge infused with Madagascar vanilla bean.", badge: "Classic" },
  { id: "red-velvet", name: "Crimson Red Velvet", description: "Velvety cocoa crumb with a tender, moist buttermilk texture.", badge: "Romantic" },
  { id: "royal-butterscotch", name: "Royal Butterscotch", description: "Golden vanilla sponge infused with slow-caramelized brown sugar.", badge: "Kids' Favorite" },
];

export const FILLING_OPTIONS: CustomOption[] = [
  { id: "dark-ganache", name: "55% Dark Chocolate Ganache", description: "Velvety Belgian dark fudge made with rich dairy cream.", badge: "Rich & Silky" },
  { id: "fruit-compote", name: "Fresh Seasonal Fruit Compote", description: "Handmade fruit reduction with natural sweetness and citrus zing.", badge: "Refreshing" },
  { id: "caramel-praline", name: "Salted Caramel & Nut Praline", description: "Buttery caramel layers loaded with crunchy roasted cashews.", badge: "Crunchy" },
  { id: "cream-cheese", name: "Philadelphia Cream Cheese Frosting", description: "Fluffy, lightly tangy cream cheese whipped to cloud-like perfection.", badge: "Decadent" },
];

export const THEME_OPTIONS: CustomOption[] = [
  { id: "birthday-milestone", name: "Birthday Milestone & Spark", description: "Festive artisan piping, celebratory crown or topper, and tailored age spark.", badge: "Birthdays" },
  { id: "anniversary-gold", name: "Anniversary & Edible Gold Foil", description: "Minimalist two-tier or single-tier elegance with edible gold leaf and delicate swirls.", badge: "Anniversaries" },
  { id: "kids-playful", name: "Kids' Playful Theme", description: "Vibrant custom themes, chocolate figures, sprinkles, and personalized motifs.", badge: "Kids" },
  { id: "botanical-floral", name: "Hand-piped Floral Botanicals", description: "Artistic buttercream blooms, foliage, and delicate pastel gradients.", badge: "Artisan" },
];

export const WEIGHT_OPTIONS = [
  { label: "500g (Approx 4–6 Servings)", value: "500g (Approx 4–6 servings)" },
  { label: "1.0kg (Approx 8–12 Servings)", value: "1kg (Approx 8–12 servings)" },
  { label: "1.5kg (Approx 12–16 Servings)", value: "1.5kg (Approx 12–16 servings)" },
  { label: "2.0kg+ (Grand Celebration / Tiered)", value: "2kg+ (Multi-tier or party size)" },
];

export function CustomCakeTeaser() {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState<number>(1);
  const [selectedSpongeId, setSelectedSpongeId] = useState<string>(SPONGE_OPTIONS[0].id);
  const [selectedFillingId, setSelectedFillingId] = useState<string>(FILLING_OPTIONS[0].id);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(THEME_OPTIONS[0].id);
  const [selectedWeight, setSelectedWeight] = useState<string>(WEIGHT_OPTIONS[1].value);
  const [customNote, setCustomNote] = useState<string>("");
  const [referenceData, setReferenceData] = useState<CakeReferenceData | null>(null);
  const [isReferenceReady, setIsReferenceReady] = useState<boolean>(false);

  const selectedSponge = SPONGE_OPTIONS.find((s) => s.id === selectedSpongeId) || SPONGE_OPTIONS[0];
  const selectedFilling = FILLING_OPTIONS.find((f) => f.id === selectedFillingId) || FILLING_OPTIONS[0];
  const selectedTheme = THEME_OPTIONS.find((t) => t.id === selectedThemeId) || THEME_OPTIONS[0];

  const cakeBrief: CustomCakeBrief = {
    sponge: selectedSponge.name,
    filling: selectedFilling.name,
    theme: selectedTheme.name,
    weight: selectedWeight,
    dietary: "100% Pure Vegetarian / Eggless",
    customNote: customNote,
    hasReferenceImage: Boolean(referenceData),
    referenceImageName: referenceData?.fileName,
    aiConceptPrompt: referenceData?.aiPrompt,
  };

  const whatsappUrl = getWhatsAppInquiryUrl({ customCake: cakeBrief });

  const STEPS = [
    { num: 1, title: "Sponge Base", subtitle: "Choose Foundation" },
    { num: 2, title: "Luscious Filling", subtitle: "Choose Interior" },
    { num: 3, title: "Theme & Decor", subtitle: "Choose Occasion" },
    { num: 4, title: "Review & Order", subtitle: "Send Brief to Chef" },
  ];

  return (
    <section id="custom-cakes" className="scroll-mt-28 py-16 sm:py-24 bg-brand-cream dark:bg-[#120905] transition-colors duration-300 relative overflow-hidden">
      {/* Ambient decorative background glows */}
      <div className="absolute top-1/3 left-0 -translate-y-1/2 w-80 h-80 bg-brand-gold/15 dark:bg-brand-gold/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-brand-crimson/10 dark:bg-brand-crimson/15 rounded-full blur-3xl -z-10 pointer-events-none" />

      <Container>
        <SectionHeading
          badge="Design My Cake"
          title="Design My Cake — Interactive Studio"
          subtitle="You Imagine. We Bake. Follow our 4-step artisan wizard to design your dream celebration cake. Review your blueprint and chat directly with our Jaunpur bakers on WhatsApp."
          align="center"
        />

        {/* 4-Step Progressive Wizard Step Indicator */}
        <div className="mt-10 max-w-3xl mx-auto">
          <div className="grid grid-cols-4 gap-2 sm:gap-4 relative">
            {STEPS.map((step) => {
              const isActive = currentStep === step.num;
              const isPassed = currentStep > step.num;
              const isAccessible = step.num <= maxCompletedStep;

              return (
                <button
                  key={step.num}
                  type="button"
                  disabled={!isAccessible}
                  onClick={(e) => {
                    e.preventDefault();
                    if (isAccessible) {
                      setCurrentStep(step.num as 1 | 2 | 3 | 4);
                    }
                  }}
                  className={`btn-3d-tactile flex flex-col items-center text-center p-2 sm:p-3 rounded-2xl border transition-all duration-200 ${
                    isActive
                      ? "bg-brand-crimson text-white border-brand-crimson shadow-crimson-tactile scale-[1.03]"
                      : isPassed
                      ? "bg-white/90 dark:bg-[#25130C] text-brand-chocolate dark:text-brand-gold border-brand-gold/50 shadow-tactile-sm hover:bg-white dark:hover:bg-[#2E1810]"
                      : "bg-white/40 dark:bg-[#1E100A]/40 text-brand-chocolate/40 dark:text-brand-cream/30 border-brand-border/40 cursor-not-allowed opacity-60"
                  }`}
                  aria-current={isActive ? "step" : undefined}
                >
                  <div className="pointer-events-none flex flex-col items-center">
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-colors ${
                        isActive
                          ? "bg-white text-brand-crimson"
                          : isPassed
                          ? "metallic-gold-surface text-brand-chocolate font-black shadow-tactile-sm"
                          : "bg-brand-cream dark:bg-[#1A0E08] text-brand-chocolate/60 dark:text-brand-cream/60"
                      }`}
                    >
                      {isPassed ? "✓" : `0${step.num}`}
                    </div>
                    <span className="text-xs font-bold hidden sm:inline-block">
                      {step.title}
                    </span>
                    <span
                      className={`text-[10px] hidden md:inline-block ${
                        isActive ? "text-white/80" : "text-brand-chocolate/60 dark:text-brand-cream/60"
                      }`}
                    >
                      {step.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Step Content Area */}
        <div className="mt-10 max-w-3xl mx-auto">
          {/* STEP 1: SPONGE BASE */}
          {currentStep === 1 && (
            <Card className="p-6 sm:p-8 bg-white dark:bg-[#1D0F0A] metallic-border shadow-tactile dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)] space-y-6 transition-colors">
              <div className="flex items-center justify-between border-b border-brand-border/60 dark:border-brand-gold/20 pb-4">
                <div>
                  <div className="text-xs font-bold text-brand-crimson dark:text-brand-gold uppercase tracking-wider">
                    Step 1 of 4
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
                    Select Your Sponge Base
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-1">
                    The tender, moist crumb that forms the heart of your celebration cake.
                  </p>
                </div>
                <Badge variant="gold" className="hidden sm:inline-flex text-xs font-bold">
                  100% Pure Veg
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {SPONGE_OPTIONS.map((opt) => {
                  const isSelected = selectedSpongeId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedSpongeId(opt.id);
                      }}
                      className={`p-4 rounded-2xl text-left border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "bg-white dark:bg-[#2A150D] border-brand-crimson shadow-crimson-tactile scale-[1.02] ring-4 ring-brand-crimson/15"
                          : "bg-white/80 dark:bg-[#22120B] border-brand-border/80 dark:border-brand-gold/25 hover:bg-white dark:hover:bg-[#28150D] hover:border-brand-gold/60 shadow-tactile-sm"
                      }`}
                    >
                      <div className="pointer-events-none w-full">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-sm font-bold ${isSelected ? "text-brand-crimson dark:text-brand-gold" : "text-brand-chocolate dark:text-brand-cream"}`}>
                            {opt.name}
                          </span>
                          {opt.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-gold/15 dark:bg-brand-gold/25 text-brand-chocolate dark:text-brand-gold font-semibold">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-brand-chocolate/70 dark:text-brand-cream/75 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-brand-border/50 dark:border-brand-gold/20 flex items-center justify-between text-xs pointer-events-none">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-brand-crimson px-2.5 py-0.5 rounded-full shadow-2xs">
                            <span>✓</span> Selected Base
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-brand-chocolate-light dark:text-brand-gold/60">
                            Click to select
                          </span>
                        )}
                        {isSelected && <span className="font-bold text-brand-crimson dark:text-brand-gold text-sm">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step 1 Navigation */}
              <div className="pt-4 border-t border-brand-border/60 dark:border-brand-gold/20 flex items-center justify-between">
                <div className="text-xs text-brand-chocolate/70 dark:text-brand-cream/75">
                  Current Selection: <strong className="text-brand-chocolate dark:text-brand-cream">{selectedSponge.name}</strong>
                </div>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep(2);
                    setMaxCompletedStep((prev) => Math.max(prev, 2));
                  }}
                  rightIcon={<span>→</span>}
                >
                  Continue to Filling
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 2: FILLINGS & LAYERS */}
          {currentStep === 2 && (
            <Card className="p-6 sm:p-8 bg-white dark:bg-[#1D0F0A] metallic-border shadow-tactile dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)] space-y-6 transition-colors">
              <div className="flex items-center justify-between border-b border-brand-border/60 dark:border-brand-gold/20 pb-4">
                <div>
                  <div className="text-xs font-bold text-brand-crimson dark:text-brand-gold uppercase tracking-wider">
                    Step 2 of 4
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
                    Select Your Luscious Filling
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-1">
                    Silky chocolate ganache, hand-cooked fruit compote, or rich caramel praline.
                  </p>
                </div>
                <Badge variant="crimson" className="hidden sm:inline-flex text-xs font-bold">
                  Artisanal Fillings
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {FILLING_OPTIONS.map((opt) => {
                  const isSelected = selectedFillingId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedFillingId(opt.id);
                      }}
                      className={`p-4 rounded-2xl text-left border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "bg-white dark:bg-[#2A150D] border-brand-crimson shadow-crimson-tactile scale-[1.02] ring-4 ring-brand-crimson/15"
                          : "bg-white/80 dark:bg-[#22120B] border-brand-border/80 dark:border-brand-gold/25 hover:bg-white dark:hover:bg-[#28150D] hover:border-brand-crimson/40 shadow-tactile-sm"
                      }`}
                    >
                      <div className="pointer-events-none w-full">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-sm font-bold ${isSelected ? "text-brand-crimson dark:text-brand-gold" : "text-brand-chocolate dark:text-brand-cream"}`}>
                            {opt.name}
                          </span>
                          {opt.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-crimson/10 dark:bg-brand-crimson/25 text-brand-crimson dark:text-[#FFAAB5] font-semibold">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-brand-chocolate/70 dark:text-brand-cream/75 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-brand-border/50 dark:border-brand-gold/20 flex items-center justify-between text-xs pointer-events-none">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-brand-crimson px-2.5 py-0.5 rounded-full shadow-2xs">
                            <span>✓</span> Selected Filling
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-brand-chocolate-light dark:text-brand-gold/60">
                            Click to select
                          </span>
                        )}
                        {isSelected && <span className="font-bold text-brand-crimson dark:text-brand-gold text-sm">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step 2 Navigation */}
              <div className="pt-4 border-t border-brand-border/60 dark:border-brand-gold/20 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep(1);
                  }}
                  leftIcon={<span>←</span>}
                >
                  Back to Sponge
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep(3);
                    setMaxCompletedStep((prev) => Math.max(prev, 3));
                  }}
                  rightIcon={<span>→</span>}
                >
                  Continue to Theme
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 3: THEME & DECOR */}
          {currentStep === 3 && (
            <Card className="p-6 sm:p-8 bg-white dark:bg-[#1D0F0A] metallic-border shadow-tactile dark:shadow-[0_12px_36px_rgba(0,0,0,0.65)] space-y-6 transition-colors">
              <div className="flex items-center justify-between border-b border-brand-border/60 dark:border-brand-gold/20 pb-4">
                <div>
                  <div className="text-xs font-bold text-brand-crimson dark:text-brand-gold uppercase tracking-wider">
                    Step 3 of 4
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-brand-chocolate dark:text-brand-cream mt-0.5">
                    Select Your Occasion Theme &amp; Decor
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-1">
                    Bespoke visual styling tailored for birthdays, romantic anniversaries, or kids parties.
                  </p>
                </div>
                <Badge variant="gold" className="hidden sm:inline-flex text-xs font-bold">
                  Bespoke Decor
                </Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {THEME_OPTIONS.map((opt) => {
                  const isSelected = selectedThemeId === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedThemeId(opt.id);
                      }}
                      className={`btn-3d-tactile p-4 rounded-2xl text-left border-2 transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                        isSelected
                          ? "bg-white dark:bg-[#2A150D] border-brand-crimson shadow-crimson-tactile scale-[1.02] ring-4 ring-brand-crimson/15"
                          : "bg-white/80 dark:bg-[#22120B] border-brand-border/80 dark:border-brand-gold/25 hover:bg-white dark:hover:bg-[#28150D] hover:border-brand-gold/60 shadow-tactile-sm"
                      }`}
                    >
                      <div className="pointer-events-none w-full">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className={`text-sm font-bold ${isSelected ? "text-brand-crimson dark:text-brand-gold" : "text-brand-chocolate dark:text-brand-cream"}`}>
                            {opt.name}
                          </span>
                          {opt.badge && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-brand-gold/15 dark:bg-brand-gold/25 text-brand-chocolate dark:text-brand-gold font-semibold">
                              {opt.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-brand-chocolate/70 dark:text-brand-cream/75 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>
                      <div className="mt-3 pt-2 border-t border-brand-border/50 dark:border-brand-gold/20 flex items-center justify-between text-xs pointer-events-none">
                        {isSelected ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-brand-crimson px-2.5 py-0.5 rounded-full shadow-2xs">
                            <span>✓</span> Selected Theme
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-brand-chocolate-light dark:text-brand-gold/60">
                            Click to select
                          </span>
                        )}
                        {isSelected && <span className="font-bold text-brand-crimson dark:text-brand-gold text-sm">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step 3 Navigation */}
              <div className="pt-4 border-t border-brand-border/60 dark:border-brand-gold/20 flex items-center justify-between gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep(2);
                  }}
                  leftIcon={<span>←</span>}
                >
                  Back to Filling
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep(4);
                    setMaxCompletedStep((prev) => Math.max(prev, 4));
                  }}
                  rightIcon={<span>→</span>}
                >
                  Review Cake Blueprint
                </Button>
              </div>
            </Card>
          )}

          {/* STEP 4: BLUEPRINT REVIEW & WHATSAPP BRIEF */}
          {currentStep === 4 && (
            <Card className="p-6 sm:p-8 bg-white dark:bg-[#1D0F0A] metallic-border shadow-tactile-hover dark:shadow-[0_14px_40px_rgba(0,0,0,0.7)] space-y-6 transition-colors">
              <div className="flex items-center justify-between border-b border-brand-border/60 dark:border-brand-gold/20 pb-4">
                <div>
                  <div className="text-xs font-bold text-brand-crimson dark:text-brand-gold uppercase tracking-wider">
                    Step 4 of 4: Final Step
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
                    Your Custom Cake Blueprint
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-1">
                    Review your configured combination below, specify size and optional message, then send directly to our chef.
                  </p>
                </div>
                <div className="bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border border-emerald-200 dark:border-emerald-800">
                  <VegIndicator />
                  <span>100% Pure Veg Guaranteed</span>
                </div>
              </div>

              {/* Layer Summary Box */}
              <div className="rounded-2xl p-5 bg-gradient-to-b from-brand-cream to-brand-cream-warm dark:from-[#24130C] dark:to-[#1A0E08] border border-brand-gold/40 dark:border-brand-gold/30 shadow-tactile-sm space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-white/90 dark:bg-[#1E100A]/90 rounded-xl border border-brand-border/70 dark:border-brand-gold/20">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-brand-chocolate-light dark:text-brand-gold/75 block">
                      01 Sponge Base
                    </span>
                    <strong className="text-sm text-brand-chocolate dark:text-brand-cream font-sans block mt-1">
                      {selectedSponge.name}
                    </strong>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentStep(1);
                      }}
                      className="text-xs font-bold text-brand-crimson dark:text-brand-gold underline mt-1.5 inline-block cursor-pointer hover:text-brand-crimson/80"
                    >
                      Change Sponge →
                    </button>
                  </div>

                  <div className="p-3 bg-white/90 dark:bg-[#1E100A]/90 rounded-xl border border-brand-border/70 dark:border-brand-gold/20">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-brand-chocolate-light dark:text-brand-gold/75 block">
                      02 Luscious Filling
                    </span>
                    <strong className="text-sm text-brand-chocolate dark:text-brand-cream font-sans block mt-1">
                      {selectedFilling.name}
                    </strong>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentStep(2);
                      }}
                      className="text-xs font-bold text-brand-crimson dark:text-brand-gold underline mt-1.5 inline-block cursor-pointer hover:text-brand-crimson/80"
                    >
                      Change Filling →
                    </button>
                  </div>

                  <div className="p-3 bg-white/90 dark:bg-[#1E100A]/90 rounded-xl border border-brand-border/70 dark:border-brand-gold/20">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-brand-chocolate-light dark:text-brand-gold/75 block">
                      03 Occasion Theme
                    </span>
                    <strong className="text-sm text-brand-chocolate dark:text-brand-cream font-sans block mt-1">
                      {selectedTheme.name}
                    </strong>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentStep(3);
                      }}
                      className="text-xs font-bold text-brand-crimson dark:text-brand-gold underline mt-1.5 inline-block cursor-pointer hover:text-brand-crimson/80"
                    >
                      Change Theme →
                    </button>
                  </div>
                </div>
              </div>

              {/* Weight & Message Customization Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                <div>
                  <label htmlFor="cake-weight" className="text-xs font-bold text-brand-chocolate dark:text-brand-cream uppercase tracking-wider block mb-2">
                    Preferred Weight / Portions:
                  </label>
                  <select
                    id="cake-weight"
                    value={selectedWeight}
                    onChange={(e) => setSelectedWeight(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream-warm/70 dark:bg-[#25130C] border border-brand-border dark:border-brand-gold/30 text-xs sm:text-sm font-semibold text-brand-chocolate dark:text-brand-cream focus:outline-none focus:ring-2 focus:ring-brand-gold cursor-pointer"
                  >
                    {WEIGHT_OPTIONS.map((w) => (
                      <option key={w.label} value={w.value} className="dark:bg-[#1E100A] dark:text-brand-cream">
                        {w.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="cake-msg" className="text-xs font-bold text-brand-chocolate dark:text-brand-cream uppercase tracking-wider block mb-2">
                    Piped Message on Cake (Optional):
                  </label>
                  <input
                    id="cake-msg"
                    type="text"
                    placeholder='e.g. "Happy 25th Anniversary Papa & Maa"'
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream-warm/70 dark:bg-[#25130C] border border-brand-border dark:border-brand-gold/30 text-xs sm:text-sm text-brand-chocolate dark:text-brand-cream placeholder:text-brand-chocolate/40 dark:placeholder:text-brand-cream/40 focus:outline-none focus:ring-2 focus:ring-brand-gold"
                  />
                </div>
              </div>

              {/* Step 4: Add a Cake Reference Section */}
              <CakeReferenceSection
                referenceData={referenceData}
                onReferenceChange={setReferenceData}
                onReadyChange={setIsReferenceReady}
              />

              {/* Chef Consultation Tray (Brand Palette) */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-brand-chocolate via-[#2C1810] to-[#1E100A] dark:from-[#25120A] dark:via-[#1D0E07] dark:to-[#120703] text-white border border-brand-gold/40 shadow-chocolate-tactile flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-brand-gold-sparkle text-xs font-bold uppercase tracking-wider flex items-center justify-center sm:justify-start gap-1.5">
                    <CakeStudioIcon className="w-4 h-4 text-brand-gold" />
                    <span>Confirm With Our Bakery Team</span>
                  </div>
                  <p className="text-xs text-brand-cream/80 max-w-md leading-relaxed">
                    Custom cakes are baked fresh at our Line Bazaar counter. 24–48 hours advance notice recommended. Exact pricing, feasibility, and final delivery details will be confirmed directly on WhatsApp.
                  </p>
                </div>

                {isReferenceReady ? (
                  <Button
                    variant="gold"
                    size="lg"
                    href={whatsappUrl}
                    isExternal
                    leftIcon={<WhatsAppIcon className="w-5 h-5 text-brand-chocolate" />}
                    className="w-full sm:w-auto text-xs sm:text-sm font-bold shadow-gold-tactile shrink-0"
                  >
                    Send Cake Brief to KidOld Bakers →
                  </Button>
                ) : (
                  <Button
                    variant="ghost"
                    size="lg"
                    disabled
                    leftIcon={<WhatsAppIcon className="w-5 h-5 opacity-40 text-brand-chocolate dark:text-brand-gold" />}
                    className="w-full sm:w-auto text-xs sm:text-sm font-bold opacity-60 cursor-not-allowed shrink-0 bg-brand-cream/20 text-brand-cream/60 border border-brand-gold/20"
                  >
                    Select Option Above to Send
                  </Button>
                )}
              </div>

              {/* Step 4 Navigation */}
              <div className="pt-2 flex items-center justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep(3);
                  }}
                  leftIcon={<span>←</span>}
                  className="text-xs font-semibold cursor-pointer"
                >
                  Modify Theme
                </Button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep(1);
                    setSelectedSpongeId(SPONGE_OPTIONS[0].id);
                    setSelectedFillingId(FILLING_OPTIONS[0].id);
                    setSelectedThemeId(THEME_OPTIONS[0].id);
                    setSelectedWeight(WEIGHT_OPTIONS[1].value);
                    setCustomNote("");
                    setReferenceData(null);
                  }}
                  className="text-xs text-brand-chocolate-light dark:text-brand-gold/75 hover:text-brand-crimson dark:hover:text-brand-gold underline transition-colors cursor-pointer"
                >
                  Start Over
                </button>
              </div>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
}
