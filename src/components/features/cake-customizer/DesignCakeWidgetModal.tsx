"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  CustomOption,
  SPONGE_OPTIONS,
  FILLING_OPTIONS,
  THEME_OPTIONS,
  WEIGHT_OPTIONS,
} from "@/components/sections/CustomCakeTeaser";
import {
  CakeReferenceSection,
  CakeReferenceData,
} from "./CakeReferenceSection";
import { getWhatsAppInquiryUrl, CustomCakeBrief } from "@/lib/whatsapp";
import { SparklesIcon, WhatsAppIcon } from "@/components/icons";
import { VegIndicator } from "@/components/ui/Badge";
import { businessData } from "@/data/business";

interface DesignCakeWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DesignCakeWidgetModal({ isOpen, onClose }: DesignCakeWidgetModalProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedSpongeId, setSelectedSpongeId] = useState<string>(SPONGE_OPTIONS[0].id);
  const [selectedFillingId, setSelectedFillingId] = useState<string>(FILLING_OPTIONS[0].id);
  const [selectedThemeId, setSelectedThemeId] = useState<string>(THEME_OPTIONS[0].id);
  const [selectedWeight, setSelectedWeight] = useState<string>(WEIGHT_OPTIONS[1].value);
  const [customWeightValue, setCustomWeightValue] = useState<string>("");
  const [customNote, setCustomNote] = useState<string>("");
  const [referenceData, setReferenceData] = useState<CakeReferenceData | null>(null);
  const [isReferenceReady, setIsReferenceReady] = useState<boolean>(false);

  // Highest step reached by the user (ensures strict step-by-step gating)
  const [maxCompletedStep, setMaxCompletedStep] = useState<number>(1);

  // When modal opens, strictly reset to Step 1
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setIsReferenceReady(false);
    }
  }, [isOpen]);

  // Lock body scroll when widget modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const selectedSponge = SPONGE_OPTIONS.find((s) => s.id === selectedSpongeId) || SPONGE_OPTIONS[0];
  const selectedFilling = FILLING_OPTIONS.find((f) => f.id === selectedFillingId) || FILLING_OPTIONS[0];
  const selectedTheme = THEME_OPTIONS.find((t) => t.id === selectedThemeId) || THEME_OPTIONS[0];

  const handleNext = () => {
    if (currentStep < 4) {
      const next = (currentStep + 1) as 1 | 2 | 3 | 4;
      setCurrentStep(next);
      if (next > maxCompletedStep) {
        setMaxCompletedStep(next);
      }
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleStepClick = (stepNum: 1 | 2 | 3 | 4) => {
    // Only allow navigating to steps that have been reached or completed
    if (stepNum <= maxCompletedStep) {
      setCurrentStep(stepNum);
    }
  };

  const resolvedWeight = selectedWeight === "custom"
    ? (customWeightValue.trim() ? `${customWeightValue.trim()} (Custom Weight)` : "Custom Weight (Customer to confirm)")
    : selectedWeight;

  const cakeBrief: CustomCakeBrief = {
    sponge: selectedSponge.name,
    filling: selectedFilling.name,
    theme: selectedTheme.name,
    weight: resolvedWeight,
    dietary: "100% Pure Vegetarian / Eggless",
    customNote: customNote,
    hasReferenceImage: Boolean(referenceData),
    referenceImageName: referenceData?.fileName,
    aiConceptPrompt: referenceData?.aiPrompt,
  };

  const whatsappUrl = getWhatsAppInquiryUrl({ customCake: cakeBrief });

  const handleChefHelp = (type: "whatsapp" | "call") => {
    if (type === "whatsapp") {
      const chefUrl = getWhatsAppInquiryUrl({
        customMessage: "Hello KidOld Bakers! 👋 I am in the middle of designing a custom cake and would love some direct guidance from your chef.",
      });
      window.open(chefUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = `tel:${businessData.phoneRaw}`;
    }

    // Treat session as finished: reset form to initial state, return to step 1/4, and close modal
    setCurrentStep(1);
    setMaxCompletedStep(1);
    setSelectedSpongeId(SPONGE_OPTIONS[0].id);
    setSelectedFillingId(FILLING_OPTIONS[0].id);
    setSelectedThemeId(THEME_OPTIONS[0].id);
    setSelectedWeight(WEIGHT_OPTIONS[1].value);
    setCustomWeightValue("");
    setCustomNote("");
    setReferenceData(null);
    setIsReferenceReady(false);
    onClose();
  };

  const STEPS = [
    { num: 1 as const, title: "Sponge Base" },
    { num: 2 as const, title: "Filling" },
    { num: 3 as const, title: "Occasion" },
    { num: 4 as const, title: "Blueprint" },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Design My Cake Interactive Studio Widget"
      className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
    >
      {/* Backdrop click to dismiss */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Main Studio Card / Drawer */}
      <div className="relative w-full max-w-lg max-h-[92vh] flex flex-col rounded-t-[28px] sm:rounded-[28px] bg-[#FFFDF9] dark:bg-[#1A0E08] border-t sm:border metallic-border shadow-[0_-16px_48px_rgba(0,0,0,0.3)] dark:shadow-[0_24px_64px_rgba(0,0,0,0.8)] overflow-hidden animate-in slide-in-from-bottom duration-300">
        {/* Top Header with KidOld Branding & Tactile Close Button */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-brand-border/60 dark:border-brand-gold/20 bg-gradient-to-r from-[#FAF5EB] via-[#FFFDF7] to-[#FAF5EB] dark:from-[#20100A] dark:via-[#1A0E08] dark:to-[#20100A]">
          <div className="flex items-center gap-2.5">
            <div className="medallion-convex-3d relative w-8 h-8 rounded-full overflow-hidden shrink-0 p-0">
              <Image
                src="/images/brand/kidold-logo-clean.png"
                alt="KidOld Bakers"
                fill
                sizes="32px"
                className="object-cover select-none pointer-events-none"
              />
            </div>
            <div>
              <div className="text-xs font-black tracking-tight text-brand-chocolate-dark dark:metallic-gold-text">
                KidOld Bakers Studio
              </div>
              <div className="text-[10px] text-brand-gold-rich dark:text-brand-gold font-bold uppercase tracking-wider">
                Step {currentStep} of 4: {STEPS[currentStep - 1].title}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close Studio"
            className="btn-3d-tactile w-8 h-8 rounded-full flex items-center justify-center bg-white dark:bg-[#25130C] border border-brand-border/80 dark:border-brand-gold/30 text-brand-chocolate dark:text-brand-gold shadow-tactile-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* 4-Step Gated Indicator Ribbon */}
        <div className="px-5 py-2.5 bg-[#F9F3E8]/80 dark:bg-[#150B06]/80 border-b border-brand-border/50 dark:border-brand-gold/15">
          <div className="grid grid-cols-4 gap-2">
            {STEPS.map((step) => {
              const isActive = currentStep === step.num;
              const isCompleted = currentStep > step.num;
              const isAccessible = step.num <= maxCompletedStep;

              return (
                <button
                  key={step.num}
                  type="button"
                  disabled={!isAccessible}
                  onClick={() => handleStepClick(step.num)}
                  className={`relative py-1.5 px-2 rounded-xl text-center text-xs font-extrabold transition-all ${
                    isActive
                      ? "btn-3d-tactile bg-brand-crimson text-white border border-brand-gold/40 shadow-crimson-tactile scale-[1.02]"
                      : isCompleted
                      ? "btn-3d-tactile metallic-gold-surface text-brand-chocolate border border-brand-gold/60 shadow-tactile-sm font-black"
                      : "bg-white/40 dark:bg-[#1A0E08]/40 text-brand-chocolate/40 dark:text-brand-cream/30 border border-brand-border/40 cursor-not-allowed opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    {isCompleted ? (
                      <span className="text-emerald-600 dark:text-emerald-400">✓</span>
                    ) : (
                      <span>0{step.num}</span>
                    )}
                  </div>
                  <div className="text-[9px] font-medium truncate opacity-90 hidden xs:block">
                    {step.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Step Content Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* STEP 1: SPONGE BASE */}
          {currentStep === 1 && (
            <div className="space-y-3">
              <div className="text-left">
                <h3 className="font-serif text-lg font-bold text-brand-chocolate-dark dark:text-brand-cream">
                  Select Your Sponge Base
                </h3>
                <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/75 mt-0.5">
                  The tender, moist foundation baked fresh with 100% pure vegetarian ingredients.
                </p>
              </div>

              <div className="space-y-2.5">
                {SPONGE_OPTIONS.map((sponge) => {
                  const isSelected = selectedSpongeId === sponge.id;
                  return (
                    <button
                      key={sponge.id}
                      type="button"
                      onClick={() => setSelectedSpongeId(sponge.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-start justify-between transition-all ${
                        isSelected
                          ? "card-3d-tactile bg-[#FFFDF7] dark:bg-[#23120B] border-brand-crimson dark:border-brand-gold ring-2 ring-brand-crimson/20 dark:ring-brand-gold/30 shadow-tactile"
                          : "btn-3d-tactile bg-white/70 dark:bg-[#1C0E08]/70 border-brand-border/80 dark:border-brand-gold/20 hover:border-brand-gold"
                      }`}
                    >
                      <div className="pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-brand-chocolate dark:text-brand-cream">
                            {sponge.name}
                          </span>
                          {sponge.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-chocolate-dark dark:text-brand-gold border border-brand-gold/30">
                              {sponge.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-brand-chocolate/70 dark:text-brand-cream/70 leading-relaxed">
                          {sponge.description}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                          isSelected
                            ? "bg-brand-crimson text-white border-brand-crimson shadow-xs"
                            : "border-brand-border dark:border-brand-gold/30"
                        }`}
                      >
                        {isSelected && <span className="text-[10px] font-bold">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 2: FILLING & GANACHE */}
          {currentStep === 2 && (
            <div className="space-y-3">
              <div className="text-left">
                <h3 className="font-serif text-lg font-bold text-brand-chocolate-dark dark:text-brand-cream">
                  Choose Luscious Interior Filling
                </h3>
                <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/75 mt-0.5">
                  Silky ganache, fruit compote, or whipped cream layered between sponge tiers.
                </p>
              </div>

              <div className="space-y-2.5">
                {FILLING_OPTIONS.map((filling) => {
                  const isSelected = selectedFillingId === filling.id;
                  return (
                    <button
                      key={filling.id}
                      type="button"
                      onClick={() => setSelectedFillingId(filling.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left flex items-start justify-between transition-all ${
                        isSelected
                          ? "card-3d-tactile bg-[#FFFDF7] dark:bg-[#23120B] border-brand-crimson dark:border-brand-gold ring-2 ring-brand-crimson/20 dark:ring-brand-gold/30 shadow-tactile"
                          : "btn-3d-tactile bg-white/70 dark:bg-[#1C0E08]/70 border-brand-border/80 dark:border-brand-gold/20 hover:border-brand-gold"
                      }`}
                    >
                      <div className="pr-3">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-brand-chocolate dark:text-brand-cream">
                            {filling.name}
                          </span>
                          {filling.badge && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-chocolate-dark dark:text-brand-gold border border-brand-gold/30">
                              {filling.badge}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-xs text-brand-chocolate/70 dark:text-brand-cream/70 leading-relaxed">
                          {filling.description}
                        </p>
                      </div>
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border ${
                          isSelected
                            ? "bg-brand-crimson text-white border-brand-crimson shadow-xs"
                            : "border-brand-border dark:border-brand-gold/30"
                        }`}
                      >
                        {isSelected && <span className="text-[10px] font-bold">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* STEP 3: OCCASION THEME & WEIGHT */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div className="text-left">
                <h3 className="font-serif text-lg font-bold text-brand-chocolate-dark dark:text-brand-cream">
                  Occasion Theme & Weight
                </h3>
                <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/75 mt-0.5">
                  Tailored finish and ideal serving size for your celebration in Jaunpur.
                </p>
              </div>

              {/* Theme Options */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-brand-chocolate dark:text-brand-gold uppercase tracking-wider block text-left">
                  Occasion Decor Style
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {THEME_OPTIONS.map((theme) => {
                    const isSelected = selectedThemeId === theme.id;
                    return (
                      <button
                        key={theme.id}
                        type="button"
                        onClick={() => setSelectedThemeId(theme.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? "card-3d-tactile bg-[#FFFDF7] dark:bg-[#23120B] border-brand-crimson dark:border-brand-gold ring-1 ring-brand-crimson/30 shadow-tactile"
                            : "btn-3d-tactile bg-white/70 dark:bg-[#1C0E08]/70 border-brand-border/80 dark:border-brand-gold/20"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-brand-chocolate dark:text-brand-cream">
                            {theme.name}
                          </span>
                          {isSelected && <span className="text-xs text-brand-crimson font-bold">✓</span>}
                        </div>
                        <p className="text-[10px] text-brand-chocolate/70 dark:text-brand-cream/70 mt-1 line-clamp-2">
                          {theme.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Weight Options */}
              <div className="space-y-1.5 pt-1 text-left">
                <label className="text-xs font-bold text-brand-chocolate dark:text-brand-gold uppercase tracking-wider block">
                  Select Weight / Portion Size
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {WEIGHT_OPTIONS.map((w) => {
                    const isSelected = selectedWeight === w.value;
                    const isFullWidth = w.value === "custom";
                    return (
                      <button
                        key={w.value}
                        type="button"
                        onClick={() => setSelectedWeight(w.value)}
                        className={`p-2.5 rounded-xl border text-center text-xs font-bold transition-all ${isFullWidth ? "col-span-2" : ""} ${
                          isSelected
                            ? "btn-3d-tactile bg-brand-chocolate dark:bg-brand-gold text-white dark:text-brand-chocolate border-brand-gold shadow-tactile-sm"
                            : "btn-3d-tactile bg-white/70 dark:bg-[#1C0E08]/70 border-brand-border/80 dark:border-brand-gold/20 text-brand-chocolate/80 dark:text-brand-cream/80"
                        }`}
                      >
                        {w.label}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Weight Input */}
                {selectedWeight === "custom" && (
                  <div className="mt-2.5 space-y-1 text-left animate-in fade-in duration-200">
                    <label
                      htmlFor="modal-custom-weight-input"
                      className="text-[11px] font-bold text-brand-crimson dark:text-brand-gold uppercase tracking-wider block"
                    >
                      Specify Your Required Cake Weight:
                    </label>
                    <input
                      id="modal-custom-weight-input"
                      type="text"
                      placeholder="e.g. 2.5kg, 3kg 2-tier, or 750g"
                      value={customWeightValue}
                      onChange={(e) => setCustomWeightValue(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-white dark:bg-[#1E0F0A] border border-brand-gold/70 text-xs text-brand-chocolate dark:text-brand-cream placeholder:text-brand-chocolate/40 dark:placeholder:text-brand-cream/40 focus:outline-none focus:ring-2 focus:ring-brand-gold shadow-2xs"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: BLUEPRINT SUMMARY & WHATSAPP SUBMIT */}
          {currentStep === 4 && (
            <div className="space-y-4 text-left">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 text-[10px] font-bold mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 block" />
                  100% Pure Veg Guaranteed
                </div>
                <h3 className="font-serif text-lg font-bold text-brand-chocolate-dark dark:text-brand-cream">
                  Your Custom Cake Blueprint
                </h3>
                <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/75 mt-0.5">
                  Review your selections below. Attach an inspiration photo or note, then chat directly with our Jaunpur chef.
                </p>
              </div>

              {/* Blueprint Summary Card */}
              <div className="p-4 rounded-2xl bg-white/80 dark:bg-[#20100A] border border-brand-gold/30 shadow-tactile-sm space-y-2 text-xs">
                <div className="flex justify-between items-center py-1 border-b border-brand-border/40 dark:border-brand-gold/15">
                  <span className="text-brand-chocolate-light dark:text-brand-cream/60">Sponge Base:</span>
                  <span className="font-bold text-brand-chocolate dark:text-brand-cream">{selectedSponge.name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-brand-border/40 dark:border-brand-gold/15">
                  <span className="text-brand-chocolate-light dark:text-brand-cream/60">Filling:</span>
                  <span className="font-bold text-brand-chocolate dark:text-brand-cream">{selectedFilling.name}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-brand-border/40 dark:border-brand-gold/15">
                  <span className="text-brand-chocolate-light dark:text-brand-cream/60">Occasion Theme:</span>
                  <span className="font-bold text-brand-chocolate dark:text-brand-cream">{selectedTheme.name}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-brand-chocolate-light dark:text-brand-cream/60">Portion Size:</span>
                  <span className="font-bold text-brand-chocolate dark:text-brand-cream">{resolvedWeight}</span>
                </div>
              </div>

              {/* Redesigned Balanced Cake Reference Selector */}
              <div className="pt-1">
                <CakeReferenceSection
                  referenceData={referenceData}
                  onReferenceChange={setReferenceData}
                  onReadyChange={setIsReferenceReady}
                />
              </div>

              {/* Personalized Name or Message on Cake */}
              <div className="space-y-1">
                <label className="text-xs font-bold text-brand-chocolate dark:text-brand-gold uppercase tracking-wider block">
                  Name / Message on Cake (Optional)
                </label>
                <input
                  type="text"
                  value={customNote}
                  onChange={(e) => setCustomNote(e.target.value)}
                  placeholder="e.g., Happy 25th Anniversary Papa & Mummy"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/90 dark:bg-[#1E0F0A] border border-brand-border/80 dark:border-brand-gold/30 text-xs text-brand-chocolate dark:text-brand-cream placeholder:text-brand-chocolate/40 dark:placeholder:text-brand-cream/40 focus:outline-none focus:ring-2 focus:ring-brand-gold shadow-2xs"
                />
              </div>

              {/* Direct WhatsApp Ordering Button */}
              <div className="pt-2">
                {isReferenceReady ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="btn-3d-tactile metallic-gold-surface w-full py-3.5 px-5 rounded-2xl flex items-center justify-center text-center gap-2.5 text-[#1A0A04] text-xs sm:text-sm font-black tracking-wide border border-brand-gold/80 shadow-gold-tactile hover:brightness-105 active:translate-y-[2px]"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0 text-[#1A0A04]" />
                    <span className="text-center">Send Blueprint to KidOld Bakers on WhatsApp</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="btn-3d-tactile w-full py-3.5 px-5 rounded-2xl flex items-center justify-center text-center gap-2.5 bg-brand-cream-warm/70 dark:bg-[#22120B] text-brand-chocolate/40 dark:text-brand-cream/40 border border-brand-border/80 dark:border-brand-gold/20 cursor-not-allowed opacity-60 text-xs sm:text-sm font-black shadow-tactile-sm"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0 opacity-40 text-brand-chocolate dark:text-brand-cream" />
                    <span className="text-center">Send Blueprint to KidOld Bakers on WhatsApp</span>
                  </button>
                )}
                {!isReferenceReady ? (
                  <p className="text-[10px] text-center text-brand-crimson dark:text-brand-gold font-bold mt-1.5 animate-pulse">
                    👆 Please select Option A (photo) or Option B above to proceed
                  </p>
                ) : (
                  <p className="text-[10px] text-center text-brand-chocolate/65 dark:text-brand-cream/60 mt-1.5">
                    Your cake details will be sent as text. Please attach this reference photo manually in the WhatsApp chat.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Confused? Talk to our chef Help Option */}
          <div className="rounded-2xl p-3.5 bg-white/95 dark:bg-[#20100A]/95 border border-brand-gold/35 dark:border-brand-gold/25 shadow-tactile-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-gold/15 dark:bg-brand-gold/25 border border-brand-gold/30 flex items-center justify-center shrink-0">
                <SparklesIcon className="w-4 h-4 text-brand-gold" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-brand-chocolate-dark dark:text-brand-cream">
                  Confused? Talk to our chef
                </h4>
                <p className="text-[10px] text-brand-chocolate/70 dark:text-brand-cream/65">
                  Get instant suggestions on sponge, flavors &amp; weights.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => handleChefHelp("whatsapp")}
                className="btn-3d-tactile flex-1 sm:flex-initial py-1.5 px-3 rounded-xl text-xs font-bold bg-[#25D366]/15 hover:bg-[#25D366]/25 dark:bg-[#25D366]/20 text-emerald-800 dark:text-emerald-300 border border-emerald-500/40 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => handleChefHelp("call")}
                className="btn-3d-tactile flex-1 sm:flex-initial py-1.5 px-3 rounded-xl text-xs font-bold bg-brand-chocolate/10 hover:bg-brand-chocolate/15 dark:bg-brand-gold/15 text-brand-chocolate dark:text-brand-gold border border-brand-border dark:border-brand-gold/30 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Navigation Buttons (Step Gating Controls) */}
        <div className="px-5 py-3 border-t border-brand-border/60 dark:border-brand-gold/20 bg-gradient-to-r from-[#FAF5EB] via-[#FFFDF7] to-[#FAF5EB] dark:from-[#20100A] dark:via-[#1A0E08] dark:to-[#20100A] flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="btn-3d-tactile py-2.5 px-4 rounded-xl text-xs font-bold bg-white dark:bg-[#25130C] border border-brand-border/80 dark:border-brand-gold/30 text-brand-chocolate dark:text-brand-gold shadow-tactile-sm"
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="btn-3d-tactile flex-1 py-2.5 px-5 rounded-xl text-xs font-black text-white bg-gradient-to-b from-[#A31D33] via-[#8B1528] to-[#6E0F1E] border border-brand-gold/30 shadow-crimson-tactile flex items-center justify-center gap-1.5"
            >
              <span>Continue to Step {currentStep + 1}</span>
              <span>→</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="btn-3d-tactile py-2.5 px-4 rounded-xl text-xs font-bold bg-white/80 dark:bg-[#25130C] border border-brand-border/80 dark:border-brand-gold/30 text-brand-chocolate/75 dark:text-brand-cream/75 shadow-tactile-sm"
            >
              Close Studio
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DesignCakeWidgetModal;
