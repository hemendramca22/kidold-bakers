import React from "react";
import { Container } from "@/components/ui/Container";
import { businessData } from "@/data/business";
import { FreshBakerIcon, CakeStudioIcon, HeartSparkleIcon } from "@/components/icons";

export function TrustBadges() {
  const getIcon = (type: string) => {
    switch (type) {
      case "fresh":
        return (
          <span className="medallion-convex-3d metallic-gold-surface w-12 h-12 flex items-center justify-center shrink-0 border-2 border-[#D4AF37] shadow-metallic-bezel text-brand-chocolate">
            <FreshBakerIcon className="w-6 h-6 text-brand-chocolate" />
          </span>
        );
      case "eggless":
        return (
          <span className="medallion-convex-3d w-12 h-12 flex items-center justify-center shrink-0 bg-gradient-to-b from-[#10B981] via-[#059669] to-[#064E3B] border-2 border-[#D4AF37] shadow-metallic-bezel text-white">
            <span className="w-5 h-5 rounded-[4px] border-2 border-white bg-white flex items-center justify-center shadow-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 block shadow-2xs" />
            </span>
          </span>
        );
      case "handcrafted":
        return (
          <span className="medallion-convex-3d w-12 h-12 flex items-center justify-center shrink-0 bg-gradient-to-b from-[#D92644] via-[#8B1528] to-[#4C0519] border-2 border-[#D4AF37] shadow-metallic-bezel text-brand-gold-sparkle">
            <HeartSparkleIcon className="w-6 h-6 text-brand-gold-sparkle drop-shadow-xs" />
          </span>
        );
      default:
        return (
          <span className="medallion-convex-3d metallic-gold-surface w-12 h-12 flex items-center justify-center shrink-0 border-2 border-[#D4AF37] shadow-metallic-bezel text-brand-chocolate">
            <CakeStudioIcon className="w-6 h-6 text-brand-chocolate" />
          </span>
        );
    }
  };

  return (
    <section className="relative py-10 sm:py-14 bg-[#FFFDF7] dark:bg-[#120905] transition-colors duration-300 overflow-hidden">
      <Container>
        {/* Symmetrical Luxury Gold Filigree Divider */}
        <div className="flex items-center justify-center gap-4 mb-8 sm:mb-10">
          <div className="h-px flex-1 max-w-[120px] sm:max-w-xs bg-gradient-to-r from-transparent to-brand-gold/50 dark:to-brand-gold/60" />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full metallic-gold-surface text-[10px] sm:text-[11px] font-black uppercase tracking-[0.2em] text-brand-chocolate border border-[#D4AF37] shadow-metallic-gold">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-chocolate animate-pulse" />
            The KidOld Promise
            <span className="w-1.5 h-1.5 rounded-full bg-brand-chocolate animate-pulse" />
          </div>
          <div className="h-px flex-1 max-w-[120px] sm:max-w-xs bg-gradient-to-l from-transparent to-brand-gold/50 dark:to-brand-gold/60" />
        </div>

        {/* 4 Harmonious Symmetrical Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {businessData.promises.map((promise) => (
            <div
              key={promise.id}
              className="group relative flex flex-col items-center text-center p-5 sm:p-6 rounded-2xl metallic-card-rim metallic-border backdrop-blur-md shadow-[0_8px_24px_rgba(44,24,16,0.08)] dark:shadow-[0_12px_32px_rgba(0,0,0,0.65)] hover:shadow-metallic-gold hover:-translate-y-1 transition-all duration-300"
            >
              <div className="mb-3.5 transform transition-transform duration-300 group-hover:scale-110">
                {getIcon(promise.icon)}
              </div>
              <h3 className="font-serif text-base font-black text-brand-chocolate-dark dark:metallic-gold-text tracking-tight transition-colors">
                {promise.title}
              </h3>
              <p className="mt-1.5 text-xs text-brand-chocolate/75 dark:text-brand-cream/70 leading-relaxed max-w-[240px] transition-colors font-medium">
                {promise.description}
              </p>
              <div className="mt-3.5 w-6 h-0.5 rounded-full bg-transparent group-hover:bg-brand-gold/80 transition-colors duration-300" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
