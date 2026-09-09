import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let isRegistered = false;

/**
 * Registers GSAP plugins safely on client-side only.
 */
export function registerGSAP() {
  if (typeof window !== "undefined" && !isRegistered) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
    isRegistered = true;
  }
  return { gsap, ScrollTrigger, ScrollToPlugin };
}

/**
 * Checks if the user prefers reduced motion.
 */
export function shouldReduceMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Animates a section heading with a cinematic masked/staggered reveal:
 * - badge fades and scales gently
 * - title translates up smoothly
 * - subtitle follows
 * - accent line expands smoothly from center (scaleX 0 -> 1)
 */
export function animateHeadingReveal(
  container: HTMLElement,
  trigger?: HTMLElement | null
) {
  if (typeof window === "undefined" || shouldReduceMotion()) return null;

  const { gsap } = registerGSAP();
  const triggerTarget = trigger || container;

  const title = container.querySelector("h2");
  const subtitle = container.querySelector("p");
  const divider = container.querySelector('[class*="bg-gradient-to-r"]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerTarget,
      start: "top 90%",
      toggleActions: "play none none none",
      fastScrollEnd: true,
      onEnter: () => {
        gsap.to([title, subtitle, divider].filter(Boolean), {
          opacity: 1,
          y: 0,
          scaleX: 1,
          duration: 0.5,
          clearProps: "all",
        });
      },
    },
    onComplete: () => {
      gsap.set([title, subtitle, divider].filter(Boolean), { clearProps: "all" });
    },
  });

  if (title) {
    tl.from(title, { opacity: 0, y: 18, duration: 0.6, ease: "power2.out", clearProps: "all" });
  }

  if (subtitle) {
    tl.from(subtitle, { opacity: 0, y: 14, duration: 0.5, ease: "power2.out", clearProps: "all" }, "-=0.35");
  }

  if (divider) {
    tl.from(divider, { scaleX: 0, opacity: 0, duration: 0.55, ease: "power2.out", clearProps: "all" }, "-=0.3");
  }

  // Safety guarantee: under no circumstances should heading text be permanently hidden
  setTimeout(() => {
    gsap.set([title, subtitle, divider].filter(Boolean), { clearProps: "all" });
  }, 1000);

  return tl;
}

/**
 * Desktop-only scroll parallax layer. Inactive on mobile/reduced-motion.
 */
export function animateScrollParallax(
  element: HTMLElement | null,
  yPercent: number,
  trigger: HTMLElement | null,
  scrub: number | boolean = 0.6
) {
  if (
    typeof window === "undefined" ||
    shouldReduceMotion() ||
    window.innerWidth < 768 ||
    !element ||
    !trigger
  ) {
    return null;
  }

  const { gsap } = registerGSAP();
  return gsap.fromTo(
    element,
    { yPercent: -yPercent / 2 },
    {
      yPercent: yPercent / 2,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    }
  );
}

/**
 * Smoothly scrolls to a target section by ID, fully compatible with GSAP ScrollTrigger pins.
 */
export function smoothScrollTo(targetId: string, offset = 88) {
  if (typeof window === "undefined" || !targetId) return;

  const targetElement = document.getElementById(targetId);
  if (!targetElement) return;

  // Unconditionally force-reveal any opacity:0 elements in target section
  targetElement.querySelectorAll<HTMLElement>("*").forEach((child) => {
    if (child.style && child.style.opacity === "0") {
      child.style.opacity = "1";
    }
  });

  const { gsap } = registerGSAP();

  // Compute absolute target scroll Y
  const rect = targetElement.getBoundingClientRect();
  const targetY = Math.max(0, window.scrollY + rect.top - offset);

  try {
    gsap.to(window, {
      duration: 0.85,
      scrollTo: { y: targetY, autoKill: false },
      ease: "power2.inOut",
      onComplete: () => {
        // Correct for any minor sub-pixel delta after unpinning
        const finalRect = targetElement.getBoundingClientRect();
        if (Math.abs(finalRect.top - offset) > 15) {
          window.scrollTo({
            top: Math.max(0, window.scrollY + finalRect.top - offset),
            behavior: "auto",
          });
        }
      },
    });
  } catch {
    window.scrollTo({
      top: targetY,
      behavior: "smooth",
    });
  }
}

export { gsap, ScrollTrigger, ScrollToPlugin };
