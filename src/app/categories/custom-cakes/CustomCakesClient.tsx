"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge, VegIndicator } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { CardTiltWrapper } from "@/components/ui/CardTiltWrapper";
import { WhatsAppIcon, CakeStudioIcon, FreshBakerIcon } from "@/components/icons";
import { Product } from "@/types/product";
import { resolveCatalogImage } from "@/types/category";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

interface CustomCakesClientProps {
  products: Product[];
}

export function CustomCakesClient({ products }: CustomCakesClientProps) {
  const [activeTag, setActiveTag] = useState<string>("all");

  const styleTags = [
    { id: "all", label: "All 10 Styles" },
    { id: "Birthday Cakes", label: "Birthday" },
    { id: "Anniversary Cakes", label: "Anniversary" },
    { id: "Kids Themes", label: "Kids & Cartoon" },
    { id: "Wedding Tiers", label: "Wedding Tiers" },
    { id: "Floral Cakes", label: "Floral" },
    { id: "Photo Cakes", label: "Photo Print" },
    { id: "Minimalist / Vintage", label: "Vintage Lambeth" },
    { id: "3D Character", label: "3D Sculpted" },
  ];

  const filteredProducts = activeTag === "all"
    ? products
    : products.filter((p) => p.customStyleCategory === activeTag);

  return (
    <div>
      {/* 3D Studio Hero Launch Banner */}
      <div className="mb-12 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1D0F0A] via-[#2A150D] to-[#120905] text-white metallic-card-rim border border-brand-gold/50 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-12 -bottom-12 w-64 h-64 rounded-full bg-brand-gold/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4">
            <CakeStudioIcon className="w-4 h-4" />
            <span>Interactive 3D Cake Customizer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-cream">
            Bring Your Dream Cake to Life in 3D
          </h2>
          <p className="text-sm text-brand-cream/80 mt-3 leading-relaxed">
            Select your tiers, experiment with artisanal palettes, add chocolate drips, and attach reference photos. Get an instant blueprint delivered directly to our master decorators.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/design-my-cake"
              className="btn-3d-tactile inline-flex items-center px-7 py-3.5 rounded-full bg-brand-gold text-brand-chocolate font-bold text-xs uppercase tracking-wider hover:bg-brand-gold-sparkle transition-all shadow-tactile"
            >
              <CakeStudioIcon className="w-4 h-4 mr-2" />
              Launch 3D Cake Studio Now
            </Link>
            <a
              href={getWhatsAppInquiryUrl({
                categoryName: "Custom Cakes",
                cakeName: "Bespoke Custom Cake Consultation",
              })}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d-tactile inline-flex items-center px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-tactile"
            >
              <WhatsAppIcon className="w-4 h-4 mr-2" />
              Direct Decorator Chat
            </a>
          </div>
        </div>
      </div>

      {/* Style Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {styleTags.map((tab) => {
          const isActive = activeTag === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTag(tab.id)}
              className={`btn-3d-tactile px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all shadow-tactile-sm ${
                isActive
                  ? "bg-brand-chocolate text-white dark:bg-brand-gold dark:text-brand-chocolate ring-2 ring-brand-gold/60"
                  : "bg-white/80 dark:bg-[#1D0F0A]/80 text-brand-chocolate/80 dark:text-brand-cream/80 hover:bg-white dark:hover:bg-[#2A150D] border border-brand-border/60 dark:border-brand-gold/20"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 10 Styles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((style) => {
          const imageAsset = resolveCatalogImage(style.image, style.name);
          const customUrl = getWhatsAppInquiryUrl({
            cakeName: style.name,
            categoryName: `Custom Cakes (${style.customStyleCategory || "Bespoke Style"})`,
          });

          return (
            <CardTiltWrapper key={style.id} className="h-full">
              <Card className="group flex flex-col h-full bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(245,197,66,0.2)] hover:border-brand-gold/60 dark:hover:border-brand-gold transition-all duration-300">
                {/* Image */}
                <div className="relative h-64 w-full overflow-hidden bg-brand-cream-warm dark:bg-[#150A06]">
                  <SafeImage
                    src={imageAsset.src}
                    alt={imageAsset.alt}
                    fallbackLabel={style.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                    <VegIndicator />
                    {style.customStyleCategory && (
                      <Badge variant="gold" className="font-bold text-[10px] shadow-tactile-sm">
                        {style.customStyleCategory}
                      </Badge>
                    )}
                  </div>

                  {style.servingGuidance && (
                    <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                      <span className="text-[11px] font-semibold tracking-wide bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-white/90">
                        {style.servingGuidance}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-brand-chocolate dark:text-brand-cream group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
                      {style.name}
                    </h3>
                    <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/80 mt-2 leading-relaxed">
                      {style.shortDescription}
                    </p>

                    {/* Features */}
                    {style.flavorNotes && style.flavorNotes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {style.flavorNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-brand-cream dark:bg-[#2A150D] text-brand-chocolate/80 dark:text-brand-cream/80 border border-brand-border/40 dark:border-brand-gold/15"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}

                    {style.bakerNote && (
                      <p className="text-[11px] italic text-brand-apricot dark:text-brand-gold mt-3 font-medium">
                        💡 {style.bakerNote}
                      </p>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="pt-4 border-t border-brand-border/50 dark:border-brand-gold/20 flex flex-col gap-2">
                    <a
                      href={customUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-3d-tactile w-full py-2.5 px-4 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-tactile-sm flex items-center justify-center space-x-2"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Consult on This Style</span>
                    </a>
                    <Link
                      href="/design-my-cake"
                      className="btn-3d-tactile w-full py-2 px-4 rounded-full bg-brand-cream dark:bg-[#2A150D] text-brand-chocolate dark:text-brand-gold border border-brand-border/50 dark:border-brand-gold/30 font-bold text-xs uppercase tracking-wider hover:bg-white dark:hover:bg-[#351B11] transition-colors shadow-tactile-sm flex items-center justify-center space-x-1.5"
                    >
                      <CakeStudioIcon className="w-3.5 h-3.5" />
                      <span>Customize in 3D Studio →</span>
                    </Link>
                  </div>
                </div>
              </Card>
            </CardTiltWrapper>
          );
        })}
      </div>
    </div>
  );
}
