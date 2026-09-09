"use client";

import React, { useRef, useEffect } from "react";
import { registerGSAP, shouldReduceMotion } from "@/lib/motion";

interface CardTiltWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default 3.5 deg for restrained luxury feel)
}

export function CardTiltWrapper({
  children,
  className = "",
  maxTilt = 3.5,
  ...props
}: CardTiltWrapperProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only apply on desktop with fine pointer and no reduced-motion preference
    if (typeof window === "undefined") return;
    if (shouldReduceMotion()) return;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!isFinePointer) return;

    const { gsap } = registerGSAP();
    const card = cardRef.current;
    if (!card) return;

    let bounds: DOMRect | null = null;

    // Fast dampened spring controllers using gsap.quickTo
    const setRotateX = gsap.quickTo(card, "rotationX", {
      duration: 0.35,
      ease: "power2.out",
    });
    const setRotateY = gsap.quickTo(card, "rotationY", {
      duration: 0.35,
      ease: "power2.out",
    });
    const setY = gsap.quickTo(card, "y", {
      duration: 0.35,
      ease: "power2.out",
    });

    // Image depth target if present inside the card
    const imageEl = card.querySelector<HTMLElement>(".card-parallax-image");
    const setImageX = imageEl
      ? gsap.quickTo(imageEl, "x", { duration: 0.4, ease: "power2.out" })
      : null;
    const setImageY = imageEl
      ? gsap.quickTo(imageEl, "y", { duration: 0.4, ease: "power2.out" })
      : null;

    // CTA target if present
    const ctaEl = card.querySelector<HTMLElement>(".card-tilt-cta");

    const onMouseEnter = () => {
      bounds = card.getBoundingClientRect();
      setY(-5); // Restrained lift
      if (ctaEl) {
        gsap.to(ctaEl, { scale: 1.02, duration: 0.3, ease: "power2.out" });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      // Normalized coordinates: -1 to 1
      const normX = (mouseX / bounds.width - 0.5) * 2;
      const normY = (mouseY / bounds.height - 0.5) * 2;

      // Restrained 3D rotation angles
      const rotY = normX * maxTilt;
      const rotX = -normY * maxTilt;

      setRotateX(rotX);
      setRotateY(rotY);

      // Subtle image depth shift (2-3px)
      if (setImageX && setImageY) {
        setImageX(normX * 3);
        setImageY(normY * 2.5);
      }
    };

    const onMouseLeave = () => {
      bounds = null;
      // Smooth reset back to flat neutral state
      gsap.to(card, {
        rotationX: 0,
        rotationY: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      if (imageEl) {
        gsap.to(imageEl, { x: 0, y: 0, duration: 0.5, ease: "power2.out" });
      }

      if (ctaEl) {
        gsap.to(ctaEl, { scale: 1, duration: 0.4, ease: "power2.out" });
      }
    };

    card.addEventListener("mouseenter", onMouseEnter, { passive: true });
    card.addEventListener("mousemove", onMouseMove, { passive: true });
    card.addEventListener("mouseleave", onMouseLeave, { passive: true });

    return () => {
      card.removeEventListener("mouseenter", onMouseEnter);
      card.removeEventListener("mousemove", onMouseMove);
      card.removeEventListener("mouseleave", onMouseLeave);
      gsap.killTweensOf(card);
      if (imageEl) gsap.killTweensOf(imageEl);
      if (ctaEl) gsap.killTweensOf(ctaEl);
    };
  }, [maxTilt]);

  return (
    <div
      ref={cardRef}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
        willChange: "transform",
      }}
      className={`relative h-full transition-[box-shadow,border-color] duration-300 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
