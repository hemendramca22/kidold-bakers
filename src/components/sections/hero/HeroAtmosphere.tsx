import React, { forwardRef } from "react";

export interface HeroAtmosphereProps {
  className?: string;
}

/** Soft, light product-canvas lighting for the hero. */
export const HeroAtmosphere = forwardRef<HTMLDivElement, HeroAtmosphereProps>(
  function HeroAtmosphere({ className = "" }, ref) {
    return (
      <div
        ref={ref}
        className={`absolute inset-0 pointer-events-none overflow-hidden select-none -z-10 ${className}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-[#FFFDF7] dark:bg-[#120905] transition-colors duration-300" />
        <div className="absolute inset-x-0 top-0 h-52 bg-[linear-gradient(180deg,rgba(255,247,233,0.94),transparent)] dark:bg-[linear-gradient(180deg,rgba(26,13,8,0.95),transparent)]" />
        <div className="absolute -right-24 -top-28 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(240,205,144,0.32)_0%,rgba(240,205,144,0.08)_52%,transparent_72%)] dark:bg-[radial-gradient(circle,rgba(200,157,60,0.18)_0%,transparent_70%)] blur-3xl lg:h-[750px] lg:w-[750px]" />
        <div className="absolute -left-32 top-32 h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(240,219,193,0.5)_0%,rgba(240,219,193,0.1)_54%,transparent_76%)] dark:bg-[radial-gradient(circle,rgba(139,21,40,0.14)_0%,transparent_70%)] blur-3xl lg:h-[680px] lg:w-[680px]" />
        <div className="absolute right-[-4%] top-[52%] h-[440px] w-[440px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,250,239,0.98)_0%,rgba(245,220,172,0.3)_42%,rgba(255,253,248,0)_74%)] dark:bg-[radial-gradient(circle_at_center,rgba(36,18,11,0.9)_0%,rgba(200,157,60,0.15)_40%,transparent_70%)] blur-3xl sm:h-[640px] sm:w-[640px] lg:h-[760px] lg:w-[760px]" />
        <div className="absolute -bottom-24 right-[3%] h-[300px] w-[720px] rounded-full bg-[radial-gradient(ellipse_at_bottom,rgba(194,150,83,0.12)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_bottom,rgba(139,21,40,0.15)_0%,transparent_70%)] blur-2xl" />
        <div
          className="absolute inset-0 opacity-[0.025] mix-blend-multiply"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(#d9bc82_0.65px,transparent_0.65px)] [background-size:32px_32px] opacity-[0.035]" />
      </div>
    );
  }
);
