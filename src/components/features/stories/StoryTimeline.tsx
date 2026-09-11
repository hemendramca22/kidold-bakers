import React from "react";
import { HeartSparkleIcon, FreshBakerIcon, CakeStudioIcon, MapPinIcon } from "@/components/icons";

export function StoryTimeline() {
  const milestones = [
    {
      era: "The Origin",
      title: "Intergenerational Bond",
      desc: "Conceived from the special warmth between a grandfather and grandson sharing sweet treats, uniting wonder with nostalgia.",
      icon: <HeartSparkleIcon className="w-4 h-4 text-brand-crimson" />,
    },
    {
      era: "The Foundation",
      title: "100% Pure Vegetarian Kitchen",
      desc: "Setting up at Dev Palace, Line Bazaar with a non-negotiable dedication to 100% eggless, gelatine-free confectionery artistry.",
      icon: <FreshBakerIcon className="w-4 h-4 text-brand-gold" />,
    },
    {
      era: "The Innovation",
      title: "'You Imagine. We Bake.'",
      desc: "Pioneering bespoke tiered celebration cakes in Jaunpur, turning customer Pinterest sketches and blueprints into edible centerpieces.",
      icon: <CakeStudioIcon className="w-4 h-4 text-brand-crimson" />,
    },
    {
      era: "Today & Beyond",
      title: "Jaunpur's Sweet Heart",
      desc: "Serving thousands of family milestones with a 4.9-star rating, morning tea biscuits, and seamless WhatsApp & online customizer ordering.",
      icon: <MapPinIcon className="w-4 h-4 text-brand-gold" />,
    },
  ];

  return (
    <div className="my-10 p-6 sm:p-8 rounded-3xl bg-brand-gold/10 dark:bg-black/30 border border-brand-gold/30 dark:border-brand-gold/40 shadow-tactile">
      <div className="text-center max-w-md mx-auto mb-6">
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gold dark:text-brand-gold-sparkle block">
          Visual Story Progression
        </span>
        <h4 className="font-serif text-lg sm:text-xl font-bold text-brand-chocolate dark:text-brand-cream">
          The Journey of KidOld Bakers
        </h4>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {milestones.map((m, idx) => (
          <div
            key={m.title}
            className="p-4 rounded-2xl bg-white/90 dark:bg-[#1D0F0A] border border-brand-border/80 dark:border-brand-gold/25 shadow-tactile-sm flex flex-col justify-between space-y-2 relative"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-gold/20 text-brand-chocolate dark:text-brand-gold">
                {m.era}
              </span>
              <div className="w-7 h-7 rounded-full bg-brand-gold/15 flex items-center justify-center">
                {m.icon}
              </div>
            </div>
            <div>
              <h5 className="font-bold text-sm text-brand-chocolate dark:text-brand-cream leading-tight">
                {m.title}
              </h5>
              <p className="text-[11px] text-brand-chocolate/75 dark:text-brand-cream/70 mt-1 leading-relaxed">
                {m.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
