"use client";

import React, { useState } from "react";
import {
  WhatsAppIcon,
  FacebookIcon,
  TwitterXIcon,
  ShareIcon,
  LinkIcon,
  CheckIcon,
} from "@/components/icons";

interface SocialShareBarProps {
  title: string;
  url: string;
}

export function SocialShareBar({ title, url }: SocialShareBarProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch {
      // Fallback
    }
  };

  return (
    <div className="py-6 border-y border-brand-border/60 dark:border-brand-gold/20 flex flex-wrap items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <ShareIcon className="w-4 h-4 text-brand-gold" />
        <span className="text-xs font-bold uppercase tracking-wider text-brand-chocolate-light dark:text-brand-cream/75">
          Share this article:
        </span>
      </div>

      <div className="flex items-center gap-2">
        {/* WhatsApp Share */}
        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-3d-tactile inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-all shadow-tactile-sm"
          aria-label="Share story on WhatsApp"
        >
          <WhatsAppIcon className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>

        {/* Facebook Share */}
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-3d-tactile inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#1877F2]/15 hover:bg-[#1877F2]/25 text-[#1877F2] border border-[#1877F2]/30 transition-all shadow-tactile-sm"
          aria-label="Share story on Facebook"
        >
          <FacebookIcon className="w-3.5 h-3.5" />
          <span>Facebook</span>
        </a>

        {/* Twitter/X Share */}
        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-3d-tactile inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-black/10 dark:bg-white/10 hover:bg-black/20 text-brand-chocolate dark:text-brand-cream border border-brand-border/80 dark:border-brand-gold/30 transition-all shadow-tactile-sm"
          aria-label="Share story on X"
        >
          <TwitterXIcon className="w-3.5 h-3.5" />
          <span>Post</span>
        </a>

        {/* Copy Link */}
        <button
          type="button"
          onClick={handleCopy}
          className="btn-3d-tactile inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-brand-gold/15 hover:bg-brand-gold/25 text-brand-chocolate dark:text-brand-gold-sparkle border border-brand-gold/40 transition-all shadow-tactile-sm"
          aria-label="Copy story URL link"
        >
          {copied ? (
            <>
              <CheckIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-emerald-700 dark:text-emerald-300">Copied!</span>
            </>
          ) : (
            <>
              <LinkIcon className="w-3.5 h-3.5 text-brand-gold" />
              <span>Copy Link</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
