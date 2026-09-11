"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Badge, VegIndicator } from "@/components/ui/Badge";
import { SafeImage } from "@/components/ui/SafeImage";
import { CardTiltWrapper } from "@/components/ui/CardTiltWrapper";
import { WhatsAppIcon, CakeStudioIcon } from "@/components/icons";
import { Product, CakeFlavorType } from "@/types/product";
import { resolveCatalogImage } from "@/types/category";
import { getWhatsAppInquiryUrl } from "@/lib/whatsapp";

interface PreMadeCakesClientProps {
  products: Product[];
}

const FLAVOR_TABS: Array<{ id: CakeFlavorType; label: string }> = [
  { id: "all", label: "All Celebration Cakes" },
  { id: "chocolate", label: "Chocolate & Truffle" },
  { id: "fruity", label: "Fruit & Berry" },
  { id: "caramel", label: "Butterscotch & Biscoff" },
  { id: "fusion", label: "Royal Fusion" },
  { id: "classic", label: "Classic & Red Velvet" },
];

export function PreMadeCakesClient({ products }: PreMadeCakesClientProps) {
  const [selectedFlavor, setSelectedFlavor] = useState<CakeFlavorType>("all");
  const [selectedWeights, setSelectedWeights] = useState<Record<string, string>>({});

  const filteredProducts = useMemo(() => {
    if (selectedFlavor === "all") return products;
    return products.filter((p) => p.flavorType === selectedFlavor);
  }, [products, selectedFlavor]);

  const handleWeightSelect = (productId: string, weight: string) => {
    setSelectedWeights((prev) => ({ ...prev, [productId]: weight }));
  };

  return (
    <div>
      {/* Flavor Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {FLAVOR_TABS.map((tab) => {
          const isActive = selectedFlavor === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFlavor(tab.id)}
              className={`btn-3d-tactile px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide transition-all shadow-tactile-sm ${
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

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProducts.map((product) => {
          const imageAsset = resolveCatalogImage(product.image, product.name);
          const currentWeight = selectedWeights[product.id] || product.weightOptions?.[0] || "1kg";
          const inquiryUrl = getWhatsAppInquiryUrl({
            cakeName: `${product.name} (${currentWeight})`,
            categoryName: "Pre-Made Cakes",
          });

          return (
            <CardTiltWrapper key={product.id} className="h-full">
              <Card className="group flex flex-col h-full bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-border/80 dark:border-brand-gold/30 shadow-tactile dark:shadow-[0_12px_32px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(245,197,66,0.2)] hover:border-brand-gold/60 dark:hover:border-brand-gold transition-all duration-300">
                {/* Product Image */}
                <div className="relative h-60 w-full overflow-hidden bg-brand-cream-warm dark:bg-[#150A06]">
                  <SafeImage
                    src={imageAsset.src}
                    alt={imageAsset.alt}
                    fallbackLabel={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 pointer-events-none">
                    <VegIndicator />
                    {product.isSignature && (
                      <Badge variant="crimson" className="font-bold text-[11px] shadow-tactile-sm">
                        Signature
                      </Badge>
                    )}
                  </div>

                  {product.servingGuidance && (
                    <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
                      <span className="text-[11px] font-semibold tracking-wide bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-white/90">
                        {product.servingGuidance}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-brand-chocolate dark:text-brand-cream group-hover:text-brand-crimson dark:group-hover:text-brand-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-brand-chocolate/75 dark:text-brand-cream/80 mt-2 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Flavor Notes */}
                    {product.flavorNotes && product.flavorNotes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {product.flavorNotes.map((note, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-2 py-0.5 rounded-md bg-brand-cream dark:bg-[#2A150D] text-brand-chocolate/80 dark:text-brand-cream/80 border border-brand-border/40 dark:border-brand-gold/15"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Weight Selection Pills */}
                    {product.weightOptions && product.weightOptions.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-brand-border/40 dark:border-brand-gold/15">
                        <span className="text-[11px] font-bold text-brand-chocolate/70 dark:text-brand-cream/70 uppercase tracking-wider block mb-1.5">
                          Select Size:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {product.weightOptions.map((weight) => {
                            const isChosen = currentWeight === weight;
                            return (
                              <button
                                key={weight}
                                type="button"
                                onClick={() => handleWeightSelect(product.id, weight)}
                                className={`text-xs px-2.5 py-1 rounded-full font-bold transition-all ${
                                  isChosen
                                    ? "bg-brand-chocolate text-white dark:bg-brand-gold dark:text-brand-chocolate ring-1 ring-brand-gold"
                                    : "bg-brand-cream/60 dark:bg-[#2A150D]/60 text-brand-chocolate/80 dark:text-brand-cream/70 hover:bg-brand-cream border border-brand-border/50 dark:border-brand-gold/20"
                                }`}
                              >
                                {weight}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order CTA */}
                  <div className="pt-4 border-t border-brand-border/50 dark:border-brand-gold/20">
                    <a
                      href={inquiryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-3d-tactile w-full py-2.5 px-4 rounded-full bg-[#25D366] text-white font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-opacity shadow-tactile-sm flex items-center justify-center space-x-2"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Order {currentWeight} on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </Card>
            </CardTiltWrapper>
          );
        })}
      </div>

      {/* Bridge to Custom Cake Studio */}
      <div className="mt-16 p-8 rounded-2xl bg-white dark:bg-[#1D0F0A] metallic-card-rim border border-brand-gold/40 text-center max-w-3xl mx-auto shadow-tactile">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-brand-crimson/10 dark:bg-brand-gold/10 text-brand-crimson dark:text-brand-gold mb-3">
          <CakeStudioIcon className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold font-serif text-brand-chocolate dark:text-brand-cream">
          Looking for a Bespoke Custom Masterpiece?
        </h3>
        <p className="text-sm text-brand-chocolate/75 dark:text-brand-cream/80 mt-2 max-w-xl mx-auto">
          Need a multi-tier wedding banquet cake, cartoon sculpture, floral arrangement, or edible photo memory? Use our interactive 3D studio to create your custom design.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link
            href="/categories/custom-cakes"
            className="btn-3d-tactile inline-flex items-center px-6 py-3 rounded-full bg-brand-chocolate text-white dark:bg-brand-gold dark:text-brand-chocolate font-bold text-xs uppercase tracking-wider hover:bg-brand-crimson transition-colors shadow-tactile-sm"
          >
            Explore 10 Custom Styles →
          </Link>
          <Link
            href="/design-my-cake"
            className="btn-3d-tactile inline-flex items-center px-6 py-3 rounded-full bg-brand-crimson text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-tactile-sm"
          >
            <CakeStudioIcon className="w-4 h-4 mr-2" />
            Launch 3D Cake Studio
          </Link>
        </div>
      </div>
    </div>
  );
}
