"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { CakeStudioIcon } from "@/components/icons";

export interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackLabel?: string;
  fallbackIcon?: React.ReactNode;
}

/**
 * SafeImage Component
 * Prevents broken image states from ever destroying card layouts.
 * Gracefully displays a warm branded placeholder on load failure or missing source.
 */
export function SafeImage({
  src,
  alt,
  fallbackLabel,
  fallbackIcon,
  className = "",
  ...props
}: SafeImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br from-[#FFFDF9] via-brand-cream to-[#EADBCC] text-brand-chocolate/70 select-none border border-brand-border/40 ${className}`}
        role="img"
        aria-label={alt || fallbackLabel || "KidOld Bakery Showcase"}
      >
        <div className="w-10 h-10 rounded-full bg-brand-gold/20 text-brand-gold flex items-center justify-center mb-2 shadow-tactile-sm">
          {fallbackIcon || <CakeStudioIcon className="w-5 h-5 text-brand-gold" />}
        </div>
        <span className="text-xs font-bold text-brand-chocolate font-serif line-clamp-1">
          {fallbackLabel || alt || "KidOld Artisanal Special"}
        </span>
        <span className="text-[10px] text-brand-chocolate/60 mt-0.5 font-medium">
          Fresh From Our Jaunpur Oven
        </span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "KidOld Bakers Showcase"}
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
}
