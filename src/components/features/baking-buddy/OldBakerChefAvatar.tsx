"use client";

import React from "react";

export interface OldBakerChefAvatarProps {
  className?: string;
  size?: number;
  isSleeping?: boolean;
}

/**
 * Premium, High-Contrast Master Baker Chef Avatar for Baking Buddy.
 * Designed with bold silhouettes, crisp linework, and vibrant fills to guarantee
 * razor-sharp visibility on BOTH light cream and dark espresso themes.
 *
 * Scalable from 24px (mobile menus, chat bubbles) to 56px (desktop launcher).
 */
export function OldBakerChefAvatar({
  className = "",
  size = 40,
  isSleeping = false,
}: OldBakerChefAvatarProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Crisp Base Badge with Dual-Tone Rim (High visibility on Light and Dark) */}
        <circle
          cx="32"
          cy="32"
          r="30"
          className="fill-[#FFF9F2] dark:fill-[#2A160E] stroke-[#D5BDA8] dark:stroke-[#8C5D3D]"
          strokeWidth="2.5"
        />

        {/* Chef Coat & Artisanal Crimson Neck Scarf */}
        <g id="baker-coat">
          {/* White Coat Base */}
          <path
            d="M13 58 C16 48, 24 45, 32 45 C40 45, 48 48, 51 58 Z"
            fill="#FFFFFF"
            stroke="#3D2014"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          {/* Signature Crimson Ascot / Neckerchief */}
          <path
            d="M26 46 C30 50, 34 50, 38 46 C36 53, 33 55, 32 55 C31 55, 28 53, 26 46 Z"
            fill="#8B1528"
            stroke="#5E0B1A"
            strokeWidth="1.2"
          />
          {/* Knot */}
          <circle cx="32" cy="48" r="2.2" fill="#A81D34" />
        </g>

        {/* Friendly Face */}
        <g id="baker-head">
          {/* Warm Apricot Skin */}
          <circle cx="32" cy="34" r="14" fill="#FDD7C2" stroke="#3D2014" strokeWidth="1.8" />

          {/* Rosy Cheeks */}
          <circle cx="21.5" cy="36" r="3.2" fill="#F28B82" opacity="0.85" />
          <circle cx="42.5" cy="36" r="3.2" fill="#F28B82" opacity="0.85" />

          {/* Eyes (Sleeping vs Smiling) */}
          {isSleeping ? (
            <g stroke="#3D2014" strokeWidth="2" strokeLinecap="round">
              <path d="M23 31 C25 34, 28 34, 29 31" />
              <path d="M35 31 C36 34, 39 34, 41 31" />
            </g>
          ) : (
            <g>
              {/* Happy Arc Eyes */}
              <path
                d="M23 32 C24.5 28.5, 28.5 28.5, 30 32"
                stroke="#3D2014"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              <path
                d="M34 32 C35.5 28.5, 39.5 28.5, 41 32"
                stroke="#3D2014"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
              {/* Sparkle twinkles */}
              <circle cx="26.5" cy="30" r="0.8" fill="#3D2014" />
              <circle cx="37.5" cy="30" r="0.8" fill="#3D2014" />
            </g>
          )}

          {/* Friendly Button Nose */}
          <ellipse cx="32" cy="33.5" rx="1.8" ry="1.2" fill="#EFA78F" />

          {/* Warm Smile Mouth */}
          <path
            d="M28 39.5 C29.5 43, 34.5 43, 36 39.5"
            fill="#8B1528"
            stroke="#3D2014"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Crisp White Handlebar Baker's Mustache (High Visibility) */}
          <g id="mustache">
            {/* Left Wing */}
            <path
              d="M32 36.5 C27 34.5, 20 36, 18 39.5 C20 42, 27 42, 32 38 Z"
              fill="#FFFFFF"
              stroke="#3D2014"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Right Wing */}
            <path
              d="M32 36.5 C37 34.5, 44 36, 46 39.5 C44 42, 37 42, 32 38 Z"
              fill="#FFFFFF"
              stroke="#3D2014"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            {/* Center Bridge */}
            <circle cx="32" cy="37" r="1.8" fill="#FFFFFF" stroke="#3D2014" strokeWidth="1.4" />
          </g>
        </g>

        {/* Tall Puffy Baker's Chef Toque (High-Contrast White with Clean Pleats) */}
        <g id="baker-toque">
          {/* Main Puffy Cloud Silhouette */}
          <path
            d="M17 24 C14 16, 21 7, 29 8 C31 4, 37 4, 39 8 C47 7, 51 16, 47 24 Z"
            fill="#FFFFFF"
            stroke="#3D2014"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Toque Vertical Pleat Creases */}
          <path d="M26 10 C27 15, 26 19, 25 24" stroke="#D1C0B0" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M33 7 C34 13, 34 18, 33 24" stroke="#D1C0B0" strokeWidth="1.4" strokeLinecap="round" />
          <path d="M40 10 C39 15, 40 19, 41 24" stroke="#D1C0B0" strokeWidth="1.4" strokeLinecap="round" />

          {/* Hat Band / Folded Brim */}
          <rect
            x="18"
            y="23"
            width="28"
            height="6"
            rx="2.5"
            fill="#FFFFFF"
            stroke="#3D2014"
            strokeWidth="1.8"
          />
          {/* Golden Ribbon Accent on Brim */}
          <line
            x1="20"
            y1="26"
            x2="44"
            y2="26"
            stroke="#D4AF37"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </g>
      </svg>

      {/* Sleeping Badge (Moon & Zzz) */}
      {isSleeping && (
        <span
          className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-[#2C1810] text-[9px] text-amber-300 font-bold border border-amber-400/70 shadow-xs"
          title="Resting till 10:00 AM IST"
        >
          🌙
        </span>
      )}
    </div>
  );
}
