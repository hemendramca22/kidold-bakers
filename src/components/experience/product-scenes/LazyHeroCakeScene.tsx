"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const ProceduralHeroCakeScene = dynamic(
  () =>
    import("@/components/sections/hero/HeroCakeScene").then(
      (module) => module.HeroCakeScene
    ),
  { ssr: false, loading: () => null }
);

interface LazyHeroCakeSceneProps {
  enabled?: boolean;
  fallback: React.ReactNode;
  className?: string;
  scrollProgress?: number | React.RefObject<number> | { current: number };
}

/**
 * Opt-in WebGL boundary. The stable HTML/image fallback renders by default,
 * and the Three.js bundle is requested only near the viewport.
 */
export function LazyHeroCakeScene({
  enabled = false,
  fallback,
  className = "",
  scrollProgress = 0,
}: LazyHeroCakeSceneProps) {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShouldMount(false);
      return;
    }

    const boundary = boundaryRef.current;
    if (!boundary) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldMount(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" }
    );

    observer.observe(boundary);
    return () => observer.disconnect();
  }, [enabled]);

  return (
    <div ref={boundaryRef} className={className} data-product-scene-boundary>
      {shouldMount ? (
        <ProceduralHeroCakeScene scrollProgress={scrollProgress} className="h-full w-full" />
      ) : (
        fallback
      )}
    </div>
  );
}
