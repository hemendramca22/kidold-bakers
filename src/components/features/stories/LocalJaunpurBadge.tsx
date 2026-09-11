import React from "react";
import { businessData } from "@/data/business";
import {
  MapPinIcon,
  ClockIcon,
  PhoneIcon,
  WhatsAppIcon,
  GoogleMapsIcon,
  GoogleReviewIcon,
} from "@/components/icons";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

export function LocalJaunpurBadge() {
  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-brand-cream to-brand-cream-warm dark:from-[#24130C] dark:to-[#1A0E08] border-2 border-brand-gold/40 dark:border-brand-gold/50 shadow-tactile space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-brand-border/60 dark:border-brand-gold/20">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-crimson dark:text-brand-gold block">
            Jaunpur Hub Landmark
          </span>
          <h4 className="font-serif text-xl font-bold text-brand-chocolate dark:text-brand-cream">
            KidOld Bakers Counter &amp; Pickups
          </h4>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          Open Daily 10 AM – 10:30 PM
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-brand-chocolate/85 dark:text-brand-cream/85">
        <div className="flex items-start gap-2.5">
          <MapPinIcon className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-brand-chocolate dark:text-brand-cream">
              Verified Address:
            </span>
            <span>
              {businessData.addressLine}, {businessData.landmark}, {businessData.area}, {businessData.city} {businessData.pincode}
            </span>
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <PhoneIcon className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
          <div>
            <span className="font-bold block text-brand-chocolate dark:text-brand-cream">
              Direct Phone &amp; Orders:
            </span>
            <a
              href={`tel:${businessData.phoneRaw}`}
              className="text-brand-crimson dark:text-brand-gold font-bold hover:underline"
            >
              {businessData.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-2 flex flex-wrap items-center gap-3">
        <a
          href={businessData.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-3d-tactile inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-brand-gold text-brand-chocolate hover:bg-brand-gold-sparkle transition-all shadow-tactile-sm"
        >
          <GoogleMapsIcon className="w-4 h-4 text-brand-chocolate" />
          <span>Get Directions on Google Maps</span>
        </a>

        <a
          href={businessData.socials.googleReviews}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-3d-tactile inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-white dark:bg-black/40 border border-amber-400/50 text-amber-500 hover:bg-amber-400/15 transition-all shadow-tactile-sm"
        >
          <GoogleReviewIcon className="w-4 h-4 text-amber-500" />
          <span>Review us on Google ★★★★★</span>
        </a>

        <a
          href={getWhatsAppInquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-3d-tactile inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 transition-all shadow-tactile-sm"
        >
          <WhatsAppIcon className="w-4 h-4" />
          <span>WhatsApp Baker</span>
        </a>
      </div>
    </div>
  );
}
