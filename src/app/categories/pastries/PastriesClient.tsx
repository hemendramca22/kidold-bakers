"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge, VegIndicator } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { CardTiltWrapper } from "@/components/ui/CardTiltWrapper";
import { WhatsAppIcon, FreshBakerIcon, CakeStudioIcon } from "@/components/icons";
import { Product } from "@/types/product";
import { resolveCatalogImage } from "@/types/category";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

interface PastriesClientProps {
  products: Product[];
}

export function PastriesClient({ products }: PastriesClientProps) {
  const [selectedPackSizes, setSelectedPackSizes] = useState<Record<string, string>>({});

  const handlePackSelect = (productId: string, pack: string) => {
    setSelectedPackSizes((prev) => ({ ...prev, [productId]: pack }));
  };

  return (
    <div>
      {/* Intro Patisserie Reassurance Banner */}
      <div className="mb-10 p-6 rounded-2xl bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-gold/30 shadow-tactile flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-brand-apricot/20 dark:bg-brand-gold/20 flex items-center justify-center text-brand-chocolate dark:text-brand-gold flex-shrink-0">
            <FreshBakerIcon className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-base text-brand-chocolate dark:text-brand-cream">
              Fresh Daily Morning Bake • Pure Eggless Patisserie
            </h3>
            <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/80 mt-0.5">
              Individual single-portion slices baked in small morning batches to preserve velvet texture and clean chocolate shine.
            </p>
          </div>
        </div>
        <div className="flex-shrink-0">
          <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-brand-cream dark:bg-[#2A150D] text-brand-crimson dark:text-brand-gold border border-brand-border/40 dark:border-brand-gold/20">
            Counter Pickup & Delivery
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {products.map((item) => {
          const imageAsset = resolveCatalogImage(item.image, item.name);
          const currentPack = selectedPackSizes[item.id] || item.weightOptions?.[0] || "1 Slice";
          const inquiryUrl = getWhatsAppInquiryUrl({
            cakeName: `${item.name} (${currentPack})`,
            categoryName: "Artisan Pastries",
          });

          return (
            <CardTiltWrapper key={item.id} className="h-full">
              <Card className="group flex flex-col h-full bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(245,197,66,0.2)] hover:border-brand-gold/60 dark:hover:border-brand-gold transition-all duration-300">
                {/* Single Isolated Pastry Slice Image */}
                <div className="relative h-60 w-full overflow-hidden bg-brand-cream-warm dark:bg-[#150A06]">
                  <SafeImage
                    src={imageAsset.src}
                    alt={imageAsset.alt}
                    fallbackLabel={item.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                    <VegIndicator />
                    {item.isSignature && (
                      <Badge variant="gold" className="font-bold text-[10px] shadow-tactile-sm">
                        Artisan Pick
                      </Badge>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                    <span className="text-[11px] font-semibold tracking-wide bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-white/90">
                      {item.servingGuidance || "Single portion"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-brand-chocolate dark:text-brand-cream group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/80 mt-2 leading-relaxed">
                      {item.shortDescription}
                    </p>

                    {/* Flavor Notes */}
                    {item.flavorNotes && item.flavorNotes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {item.flavorNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-brand-cream dark:bg-[#2A150D] text-brand-chocolate/80 dark:text-brand-cream/80 border border-brand-border/40 dark:border-brand-gold/15"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Pack Options */}
                    {item.weightOptions && item.weightOptions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-brand-border/40 dark:border-brand-gold/15">
                        <span className="text-[11px] font-bold text-brand-chocolate/70 dark:text-brand-cream/70 uppercase tracking-wider block mb-1.5">
                          Portion Size:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {item.weightOptions.map((pack) => {
                            const isChosen = currentPack === pack;
                            return (
                              <button
                                key={pack}
                                type="button"
                                onClick={() => handlePackSelect(item.id, pack)}
                                className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                                  isChosen
                                    ? "bg-brand-chocolate text-white dark:bg-brand-gold dark:text-brand-chocolate ring-1 ring-brand-gold"
                                    : "bg-brand-cream/60 dark:bg-[#2A150D]/60 text-brand-chocolate/80 dark:text-brand-cream/70 hover:bg-brand-cream border border-brand-border/50 dark:border-brand-gold/20"
                                }`}
                              >
                                {pack}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* WhatsApp CTA */}
                  <div className="pt-4 border-t border-brand-border/50 dark:border-brand-gold/20">
                    <a
                      href={inquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-3d-tactile w-full py-2.5 px-4 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-tactile-sm flex items-center justify-center space-x-2"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Order {currentPack} on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </Card>
            </CardTiltWrapper>
          );
        })}
      </div>

      {/* Bottom Bridge to Full Cakes */}
      <div className="mt-16 p-8 rounded-2xl bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-gold/40 text-center max-w-3xl mx-auto shadow-tactile">
        <h3 className="text-2xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
          Looking for a Full Whole Celebration Cake?
        </h3>
        <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-2 max-w-xl mx-auto">
          Every one of our signature pastry flavors is also available as full 500g, 1kg, and 2kg+ celebration tiers.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/categories/pre-made-cakes"
            className="btn-3d-tactile inline-flex items-center px-6 py-3 rounded-full bg-brand-chocolate text-white dark:bg-brand-gold dark:text-brand-chocolate font-bold text-xs uppercase tracking-wider hover:bg-brand-crimson transition-colors shadow-tactile-sm"
          >
            Explore Full Pre-Made Cakes →
          </Link>
          <Link
            href="/design-my-cake"
            className="btn-3d-tactile inline-flex items-center px-6 py-3 rounded-full bg-brand-crimson text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-tactile-sm"
          >
            <CakeStudioIcon className="w-4 h-4 mr-2" />
            3D Custom Cake Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
