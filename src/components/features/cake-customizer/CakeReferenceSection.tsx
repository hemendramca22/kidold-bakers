"use client";

import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/Badge";
import { CakeStudioIcon } from "@/components/icons";

export interface CakeReferenceData {
  type: "upload" | "ai_concept";
  file?: File;
  previewUrl: string;
  fileName: string;
  fileSizeFormatted: string;
  aiPrompt?: string;
}

interface CakeReferenceSectionProps {
  referenceData: CakeReferenceData | null;
  onReferenceChange: (data: CakeReferenceData | null) => void;
  onReadyChange?: (isReady: boolean) => void;
}

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"];

export function CakeReferenceSection({
  referenceData,
  onReferenceChange,
  onReadyChange,
}: CakeReferenceSectionProps) {
  const [activeTab, setActiveTab] = useState<"upload" | "ai" | null>(null);
  const [proceedWithoutPhoto, setProceedWithoutPhoto] = useState<boolean>(false);
  const [aiAcknowledged, setAiAcknowledged] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Notify parent of readiness to send
  useEffect(() => {
    let ready = false;
    if (activeTab === "upload") {
      ready = Boolean(referenceData) || proceedWithoutPhoto;
    } else if (activeTab === "ai") {
      ready = aiAcknowledged;
    }
    onReadyChange?.(ready);
  }, [activeTab, referenceData, proceedWithoutPhoto, aiAcknowledged, onReadyChange]);

  // Cleanup object URL on unmount or replace
  useEffect(() => {
    return () => {
      if (referenceData?.previewUrl && referenceData.previewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(referenceData.previewUrl);
      }
    };
  }, [referenceData?.previewUrl]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate mime type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      setErrorMsg("Please select a standard image format (JPEG, PNG, or WebP).");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMsg("Image size exceeds 5MB limit. Please choose a smaller photo.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    const sizeInMb = (file.size / (1024 * 1024)).toFixed(2);

    setProceedWithoutPhoto(false);
    onReferenceChange({
      type: "upload",
      file,
      previewUrl,
      fileName: file.name,
      fileSizeFormatted: `${sizeInMb} MB`,
    });
  };

  const handleRemove = () => {
    if (referenceData?.previewUrl && referenceData.previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(referenceData.previewUrl);
    }
    if (fileInputRef.current) fileInputRef.current.value = "";
    setErrorMsg(null);
    onReferenceChange(null);
  };

  const handleTriggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-brand-chocolate dark:text-brand-cream uppercase tracking-wider">
            Add a Cake Reference (Optional)
          </h4>
          <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/70 mt-0.5">
            Share an inspiration photo or design reference with our Jaunpur decorators.
          </p>
        </div>
      </div>

      {/* Symmetrical Choice Cards: Option A (Upload) vs Option B (AI - Coming Soon) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pb-2">
        {/* Option A: Upload Reference */}
        <button
          type="button"
          onClick={() => setActiveTab((prev) => (prev === "upload" ? null : "upload"))}
          className={`btn-3d-tactile flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
            activeTab === "upload"
              ? "bg-[#2C1810] dark:metallic-gold-surface text-white dark:text-[#1A0D08] border-brand-gold shadow-tactile"
              : "bg-white/80 dark:bg-[#1C0D07]/80 text-brand-chocolate dark:text-brand-cream border-brand-border/70 dark:border-brand-gold/30 hover:border-brand-gold"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                activeTab === "upload"
                  ? "bg-white/15 dark:bg-black/15 border-white/20 dark:border-black/20 text-brand-gold-sparkle dark:text-brand-chocolate"
                  : "bg-brand-gold/10 dark:bg-brand-gold/20 border-brand-gold/30 text-brand-gold"
              }`}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            <div>
              <div className="text-xs font-bold leading-tight">Option A: Photo Reference</div>
              <div className="text-[10px] opacity-75 mt-0.5">Upload cake image from gallery</div>
            </div>
          </div>
          {activeTab === "upload" && (
            <span className="w-2 h-2 rounded-full bg-brand-gold dark:bg-brand-chocolate shrink-0 animate-pulse" />
          )}
        </button>

        {/* Option B: AI Concept */}
        <button
          type="button"
          onClick={() => setActiveTab((prev) => (prev === "ai" ? null : "ai"))}
          className={`btn-3d-tactile flex items-center justify-between p-3 rounded-xl border text-left transition-all ${
            activeTab === "ai"
              ? "bg-[#2C1810] dark:metallic-gold-surface text-white dark:text-[#1A0D08] border-brand-gold shadow-tactile"
              : "bg-white/80 dark:bg-[#1C0D07]/80 text-brand-chocolate dark:text-brand-cream border-brand-border/70 dark:border-brand-gold/30 hover:border-brand-gold"
          }`}
        >
          <div className="flex items-center gap-2.5">
            <span
              className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border ${
                activeTab === "ai"
                  ? "bg-white/15 dark:bg-black/15 border-white/20 dark:border-black/20 text-brand-gold-sparkle dark:text-brand-chocolate"
                  : "bg-brand-gold/10 dark:bg-brand-gold/20 border-brand-gold/30 text-brand-gold"
              }`}
            >
              <CakeStudioIcon className="w-4 h-4" />
            </span>
            <div>
              <div className="text-xs font-bold leading-tight">Option B: AI Concept</div>
              <div className="text-[10px] opacity-75 mt-0.5">Custom prompt Jaunpur AI</div>
            </div>
          </div>
          <span className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-crimson/15 dark:bg-brand-crimson/30 text-brand-crimson dark:text-[#FFAAB5] border border-brand-crimson/30 shrink-0">
            Coming Soon
          </span>
        </button>
      </div>

      {/* TAB A: UPLOAD FROM DEVICE */}
      {activeTab === "upload" && (
        <div className="rounded-2xl p-4 sm:p-5 bg-white/90 dark:bg-brand-chocolate-light/20 border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile-sm space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            aria-label="Upload cake reference image"
          />

          {!referenceData ? (
            /* Empty State / Upload Dropzone Trigger */
            <div className="space-y-3">
              <div
                onClick={handleTriggerUpload}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleTriggerUpload();
                  }
                }}
                role="button"
                tabIndex={0}
                className="border-2 border-dashed border-brand-gold/50 dark:border-brand-gold/40 hover:border-brand-gold dark:hover:border-brand-gold-sparkle rounded-2xl p-6 text-center cursor-pointer transition-colors bg-brand-cream/40 dark:bg-brand-chocolate-light/30 hover:bg-brand-cream/70 dark:hover:bg-brand-chocolate-light/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
              >
                <div className="w-12 h-12 rounded-full bg-brand-gold/20 dark:bg-brand-gold/30 text-brand-gold flex items-center justify-center mx-auto mb-3 shadow-tactile-sm">
                  <svg
                    className="w-6 h-6 text-brand-chocolate dark:text-brand-gold"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-xs sm:text-sm font-bold text-brand-chocolate dark:text-brand-cream">
                  Click to choose an inspiration photo from your device
                </p>
                <p className="text-[11px] text-brand-chocolate/65 dark:text-brand-cream/60 mt-1">
                  Supports JPEG, PNG, WebP up to 5MB
                </p>
              </div>

              {/* Direct "Proceed without Photo" Option */}
              <div className="pt-2 border-t border-brand-border/40 dark:border-brand-gold/20 flex flex-col sm:flex-row items-center justify-between gap-2 p-2.5 rounded-xl bg-brand-cream-warm/50 dark:bg-brand-chocolate-light/30 border border-brand-border/60 dark:border-brand-gold/15">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-bold text-brand-chocolate dark:text-brand-cream select-none">
                  <input
                    type="checkbox"
                    checked={proceedWithoutPhoto}
                    onChange={(e) => setProceedWithoutPhoto(e.target.checked)}
                    className="w-4 h-4 rounded border-brand-gold text-brand-crimson dark:text-brand-gold focus:ring-brand-gold cursor-pointer"
                  />
                  <span>I don&apos;t have a photo — Send flavor blueprint text only</span>
                </label>
                {proceedWithoutPhoto && (
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-300 dark:border-emerald-700">
                    ✓ Ready to Send
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* Selected Image Preview State */
            <div className="flex flex-col sm:flex-row items-center gap-4 p-3 bg-brand-cream-warm/70 dark:bg-brand-chocolate-light/40 rounded-xl border border-brand-gold/40">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-brand-border dark:border-brand-gold/30 bg-white dark:bg-brand-chocolate shrink-0 shadow-tactile-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={referenceData.previewUrl}
                  alt="Customer Cake Reference Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="text-xs font-bold text-brand-chocolate dark:text-brand-cream font-serif line-clamp-1">
                    {referenceData.fileName}
                  </span>
                  <Badge variant="gold" className="text-[9px] py-0 px-1.5">
                    {referenceData.fileSizeFormatted}
                  </Badge>
                </div>
                <p className="text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold flex items-center justify-center sm:justify-start gap-1">
                  <span>✓</span> Reference selected for WhatsApp brief
                </p>

                <div className="flex items-center justify-center sm:justify-start gap-2 pt-2">
                  <button
                    type="button"
                    onClick={handleTriggerUpload}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-white dark:bg-brand-chocolate-light/60 border border-brand-border dark:border-brand-gold/30 text-brand-chocolate dark:text-brand-cream hover:bg-brand-cream dark:hover:bg-brand-chocolate transition-colors shadow-2xs"
                  >
                    Change Image
                  </button>
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-white dark:bg-brand-chocolate-light/60 border border-rose-200 dark:border-rose-900 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors shadow-2xs"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          )}

          {errorMsg && (
            <p className="text-xs text-rose-700 dark:text-rose-400 font-semibold bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 px-3 py-1.5 rounded-lg">
              ⚠️ {errorMsg}
            </p>
          )}

          {/* Privacy & WhatsApp Attachment Guidance Note */}
          <div className="space-y-1 text-[11px] text-brand-chocolate/75 dark:text-brand-cream/70 border-t border-brand-border/40 dark:border-brand-gold/20 pt-3">
            <p className="flex items-start gap-1.5">
              <span className="text-brand-gold shrink-0">🔒</span>
              <span>
                <strong>Privacy Protected:</strong> We do not permanently store your photos. Your preview stays local in your browser.
              </span>
            </p>
            <p className="flex items-start gap-1.5">
              <span className="text-brand-crimson dark:text-brand-crimson-light shrink-0">💬</span>
              <span>
                <strong>WhatsApp Ordering:</strong> Your cake preferences will be prepared for WhatsApp. You can attach this reference image directly in WhatsApp before sending.
              </span>
            </p>
          </div>
        </div>
      )}

      {/* TAB B: AI CONCEPT GENERATOR (COMING SOON BOUNDARY) */}
      {activeTab === "ai" && (
        <div className="rounded-2xl p-5 sm:p-6 bg-white/80 dark:bg-brand-chocolate-light/20 border border-brand-gold/40 shadow-tactile-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-gold/20 dark:bg-brand-gold/30 text-brand-gold flex items-center justify-center shadow-2xs">
                <CakeStudioIcon className="w-4 h-4 text-brand-gold" />
              </div>
              <h5 className="font-bold text-sm text-brand-chocolate dark:text-brand-cream font-serif">
                Generate My Cake Concept with AI
              </h5>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-crimson/10 dark:bg-brand-crimson/20 text-brand-crimson dark:text-brand-crimson-light px-2.5 py-1 rounded-full border border-brand-crimson/20">
              Coming Soon
            </span>
          </div>

          <p className="text-xs text-brand-chocolate/80 dark:text-brand-cream/80 leading-relaxed">
            Describe your celebration idea and we&apos;ll generate an artisan visual cake concept before you order.
          </p>

          <div className="space-y-2">
            <label
              htmlFor="ai-concept-prompt"
              className="text-[11px] font-bold text-brand-chocolate/70 dark:text-brand-cream/70 block"
            >
              Dream Cake Description:
            </label>
            <textarea
              id="ai-concept-prompt"
              disabled
              rows={2}
              placeholder='e.g., "Two-tier pastel peach and gold vintage cake with delicate piped roses and golden pearl beads"'
              className="w-full px-3.5 py-2.5 rounded-xl bg-brand-cream/50 dark:bg-brand-chocolate-light/30 border border-brand-border dark:border-brand-gold/20 text-xs text-brand-chocolate/60 dark:text-brand-cream/60 placeholder:text-brand-chocolate/40 dark:placeholder:text-brand-cream/40 cursor-not-allowed resize-none opacity-80"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-brand-border/40 dark:border-brand-gold/20">
            <span className="text-[11px] text-brand-chocolate/70 dark:text-brand-cream/70 italic text-center sm:text-left">
              AI studio generation pipeline is coming soon in an upcoming update.
            </span>
            <button
              type="button"
              onClick={() => setAiAcknowledged(true)}
              className={`btn-3d-tactile px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                aiAcknowledged
                  ? "metallic-gold-surface text-[#1A0A04] font-black border border-brand-gold/80 shadow-tactile-sm"
                  : "bg-white dark:bg-[#25130C] text-brand-chocolate dark:text-brand-gold border border-brand-gold/50 hover:border-brand-gold shadow-tactile-sm"
              }`}
            >
              {aiAcknowledged ? "✓ Ready to Send on WhatsApp" : "Proceed with Text Blueprint →"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
