import type { RefObject } from "react";
import { registerGSAP } from "@/lib/motion";

type MotionRuntime = ReturnType<typeof registerGSAP>;
type SceneSetup = (runtime: MotionRuntime) => void;

interface CinematicSceneOptions {
  minWidth?: number;
}

/**
 * Creates a scoped, reversible GSAP scene for motion-capable viewports.
 * The returned cleanup removes the timeline, ScrollTriggers, and media query.
 */
export function createCinematicScrollScene(
  scope: RefObject<HTMLElement>,
  setup: SceneSetup,
  { minWidth = 768 }: CinematicSceneOptions = {}
) {
  const runtime = registerGSAP();
  const media = runtime.gsap.matchMedia();

  media.add(
    `(min-width: ${minWidth}px) and (prefers-reduced-motion: no-preference)`,
    () => {
      const context = runtime.gsap.context(() => setup(runtime), scope);
      return () => context.revert();
    }
  );

  return () => media.revert();
}
