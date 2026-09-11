"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { HeroCakeMesh } from "./HeroCakeMesh";
import { KidsCakeMesh } from "./KidsCakeMesh";
import { AnniversaryCakeMesh } from "./AnniversaryCakeMesh";

// Pre-warm the logo texture so HeroCakeMesh renders without suspension delay
if (typeof window !== "undefined") {
  try {
    useLoader.preload(THREE.TextureLoader, "/images/brand/kidold-logo-clean.png");
  } catch {}
}

export interface HeroCakeSceneProps {
  scrollProgress?: number | React.RefObject<number> | { current: number }; // 0 to 1
  className?: string;
  activeCakeIndex?: number;
}

function getProgress(val: number | React.RefObject<number> | { current: number } | undefined): number {
  if (val === undefined) return 0;
  if (typeof val === "number") return val;
  return val.current ?? 0;
}

/**
 * Responsive Camera Controller
 * Manages macro zoom during State 3 (progress 0.35 - 0.55),
 * full continuous 3D camera arc from direct Front View (mouse at bottom)
 * to overhead Top View (mouse at top), and subtle horizontal parallax.
 */
function CameraRig({
  scrollProgress = 0,
  touchT,
  isTouchActive,
}: {
  scrollProgress?: number | React.RefObject<number> | { current: number };
  touchT?: React.MutableRefObject<number> | { current: number };
  isTouchActive?: React.MutableRefObject<boolean> | { current: boolean };
}) {
  const { camera, size } = useThree();
  const mouseTarget = useRef({ x: 0, t: 0.35 });
  const mouseCurrent = useRef({ x: 0, t: 0.35 });
  const lookAtCurrent = useRef(0.70);
  const isInteractive = useRef(false);
  const [deviceProfile, setDeviceProfile] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const updateProfile = () => {
      const w = window.innerWidth;
      const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
      if (w < 640) {
        setDeviceProfile("mobile");
        isInteractive.current = hasFinePointer;
      } else if (w < 1024) {
        setDeviceProfile("tablet");
        isInteractive.current = hasFinePointer || w >= 768;
      } else {
        setDeviceProfile("desktop");
        isInteractive.current = true;
      }
    };

    updateProfile();
    window.addEventListener("resize", updateProfile);

    const handlePointerMove = (e: MouseEvent) => {
      if (!isInteractive.current) return;
      // Normalized horizontal offset [-1, +1]
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;

      // Vertical hover mapping tuned for intuitive interaction across cake & hero:
      // When cursor is at or above the top of the cake (clientY / innerHeight <= 0.16): t = 1.0 (Full Overhead Top View)
      // When cursor is at the center of the cake (clientY / innerHeight ≈ 0.46): t = 0.35 (Signature 3/4 Perspective)
      // When cursor is at or below the base platter (clientY / innerHeight >= 0.76): t = 0.0 (Direct Front View)
      const yRatio = e.clientY / window.innerHeight;
      const tRaw = 1.0 - (yRatio - 0.16) / (0.76 - 0.16);
      const tClamped = THREE.MathUtils.clamp(tRaw, 0, 1);

      mouseTarget.current.x = THREE.MathUtils.clamp(nx, -1, 1);
      mouseTarget.current.t = tClamped;
    };

    const handlePointerLeave = () => {
      // Smoothly return to signature 3/4 perspective when pointer leaves window
      mouseTarget.current.x = 0;
      mouseTarget.current.t = 0.35;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("mouseleave", handlePointerLeave);
    return () => {
      window.removeEventListener("resize", updateProfile);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("mouseleave", handlePointerLeave);
    };
  }, []);

  useFrame((_, delta) => {
    const p = THREE.MathUtils.clamp(getProgress(scrollProgress), 0, 1);
    const aspect = size.width / Math.max(1, size.height);

    // Frame-rate independent smooth damping for buttery 60 FPS motion
    const isTouch = isTouchActive && "current" in isTouchActive && isTouchActive.current;
    const targetT = isTouch && touchT && "current" in touchT ? touchT.current : mouseTarget.current.t;

    mouseCurrent.current.x = THREE.MathUtils.damp(mouseCurrent.current.x, mouseTarget.current.x, 4.0, delta);
    mouseCurrent.current.t = THREE.MathUtils.damp(mouseCurrent.current.t, targetT, 4.0, delta);

    // Responsive baseline camera framing:
    let baseZ = 5.6;
    let baseY = 0.82;
    let baseLookAtY = 0.70;

    if (aspect < 0.72) {
      // Mobile / narrow portrait: maintain safe width so platter never clips on left/right
      const tanHalfFov = Math.tan((38 * Math.PI) / 360);
      const safePlatterWidth = 3.25;
      baseZ = Math.max(8.8, safePlatterWidth / (2 * tanHalfFov * aspect));
      baseY = 0.94;
      baseLookAtY = 0.70;
    } else if (deviceProfile === "tablet" || aspect < 1.1) {
      baseZ = 6.6;
      baseY = 0.86;
      baseLookAtY = 0.70;
    } else {
      // Landscape / Desktop / Laptop screens:
      if (size.height < 740) {
        const heightDeficit = Math.max(0, 740 - size.height);
        baseZ = Math.min(6.5, 5.85 + heightDeficit * 0.0035);
        baseY = 0.76;
        baseLookAtY = 0.66;
      } else {
        baseZ = 5.6;
        baseY = 0.82;
        baseLookAtY = 0.70;
      }
    }

    // Full 3D Camera Arc Interpolation:
    // t = 0.0 (Cursor at bottom): Direct Front View (Y ≈ baseY - 0.44, Z ≈ baseZ + 0.15, lookAtY = 0.60)
    // t = 0.35 (Cursor in center): Signature 3/4 Beauty Angle (Y = baseY, Z = baseZ, lookAtY = baseLookAtY)
    // t = 1.0 (Cursor at top): Overhead Top View (Y ≈ topY, Z ≈ topZ, lookAtY = 0.72)
    const t = mouseCurrent.current.t;
    const nx = mouseCurrent.current.x;

    let targetY: number;
    let targetZ: number;
    let targetLookAtY: number;

    if (t <= 0.35) {
      // Arc between Front View (t=0) and Signature 3/4 View (t=0.35)
      const u = t / 0.35;
      targetY = THREE.MathUtils.lerp(baseY - 0.44, baseY, u);
      targetZ = THREE.MathUtils.lerp(baseZ + 0.15, baseZ, u);
      targetLookAtY = THREE.MathUtils.lerp(0.60, baseLookAtY, u);
    } else {
      // Arc between Signature 3/4 View (t=0.35) and Full Overhead Top View (t=1.0)
      const u = (t - 0.35) / 0.65;
      const smoothU = u * u * (3 - 2 * u); // Smoothstep curve for seamless acceleration
      // In top view, camera rises high above the cake and angles down directly over the top tier
      const topY = Math.max(4.9, baseZ * 0.90);
      const topZ = Math.max(2.3, baseZ * 0.42);
      targetY = THREE.MathUtils.lerp(baseY, topY, smoothU);
      targetZ = THREE.MathUtils.lerp(baseZ, topZ, smoothU);
      targetLookAtY = THREE.MathUtils.lerp(baseLookAtY, 0.72, smoothU);
    }

    const targetX = nx * 0.32; // Subtle horizontal parallax

    // Macro zoom during scroll progress 0.35 - 0.55 (strictly desktop; mobile scroll leaves camera untouched)
    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.innerWidth < 1024 ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches ||
        "ontouchstart" in window);

    if (!isTouchDevice && p >= 0.35 && p < 0.55) {
      const localT = Math.sin(((p - 0.35) / 0.2) * Math.PI);
      targetZ -= localT * 0.65;
      targetY += localT * 0.08;
    }

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 5.0, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 5.0, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 5.0, delta);

    lookAtCurrent.current = THREE.MathUtils.damp(lookAtCurrent.current, targetLookAtY, 5.0, delta);
    camera.lookAt(0, lookAtCurrent.current, 0);
  });

  return null;
}

/**
 * Detects whether WebGL is safely supported in the current client browser environment.
 */
function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/**
 * CakeCarouselSwapper
 * Manages smooth cross-fade / scale transitions between the 3 hero cakes.
 * Keeps GPU memory optimal by setting visible=false when scale < 0.005.
 */
function CakeCarouselSwapper({
  activeCakeIndex = 0,
  scrollProgress,
  touchRotation,
}: {
  activeCakeIndex: number;
  scrollProgress?: number | React.RefObject<number> | { current: number };
  touchRotation?: number | React.RefObject<number> | { current: number };
}) {
  const group1 = useRef<THREE.Group>(null);
  const group2 = useRef<THREE.Group>(null);
  const group3 = useRef<THREE.Group>(null);

  const scale1 = useRef(activeCakeIndex === 0 ? 1 : 0);
  const scale2 = useRef(activeCakeIndex === 1 ? 1 : 0);
  const scale3 = useRef(activeCakeIndex === 2 ? 1 : 0);

  const [renderedCakes, setRenderedCakes] = useState<Record<number, boolean>>({
    0: true,
    1: activeCakeIndex === 1,
    2: activeCakeIndex === 2,
  });

  useEffect(() => {
    setRenderedCakes((prev) => ({ ...prev, [activeCakeIndex]: true }));
  }, [activeCakeIndex]);

  useFrame((_, delta) => {
    const target1 = activeCakeIndex === 0 ? 1 : 0;
    const target2 = activeCakeIndex === 1 ? 1 : 0;
    const target3 = activeCakeIndex === 2 ? 1 : 0;

    scale1.current = THREE.MathUtils.damp(scale1.current, target1, 9.0, delta);
    scale2.current = THREE.MathUtils.damp(scale2.current, target2, 9.0, delta);
    scale3.current = THREE.MathUtils.damp(scale3.current, target3, 9.0, delta);

    if (group1.current) {
      group1.current.scale.setScalar(scale1.current);
      group1.current.visible = scale1.current > 0.005;
      group1.current.position.y = (1 - scale1.current) * -0.22;
    }
    if (group2.current) {
      group2.current.scale.setScalar(scale2.current);
      group2.current.visible = scale2.current > 0.005;
      group2.current.position.y = (1 - scale2.current) * -0.22;
    }
    if (group3.current) {
      group3.current.scale.setScalar(scale3.current);
      group3.current.visible = scale3.current > 0.005;
      group3.current.position.y = (1 - scale3.current) * -0.22;
    }
  });

  return (
    <>
      <group ref={group1}>
        <HeroCakeMesh
          scrollProgress={scrollProgress}
          touchRotation={touchRotation}
        />
      </group>
      {renderedCakes[1] && (
        <group ref={group2}>
          <KidsCakeMesh
            scrollProgress={scrollProgress}
            touchRotation={touchRotation}
          />
        </group>
      )}
      {renderedCakes[2] && (
        <group ref={group3}>
          <AnniversaryCakeMesh
            scrollProgress={scrollProgress}
            touchRotation={touchRotation}
          />
        </group>
      )}
    </>
  );
}

/**
 * HeroCakeScene
 *
 * Dedicated R3F component boundary for the flagship 3D hero celebration cake.
 * Renders studio lighting, soft turntable shadows, and the scrubbed 3D model.
 */
export function HeroCakeScene({
  scrollProgress = 0,
  className = "",
  activeCakeIndex = 0,
}: HeroCakeSceneProps) {
  const [canRenderWebGL, setCanRenderWebGL] = useState(() => isWebGLAvailable());
  const touchRotationRef = useRef(0);
  const touchTRef = useRef(0.35);
  const isTouchActiveRef = useRef(false);
  const touchZoneRef = useRef<HTMLDivElement>(null);

  // Gesture intent state machine: "idle" -> "pending" -> locked to "rotate" OR "tilt"
  const gestureMode = useRef<"idle" | "pending" | "rotate" | "tilt">("idle");
  const activePointerId = useRef<number | null>(null);
  const startClientX = useRef(0);
  const startClientY = useRef(0);
  const startT = useRef(0.35);
  const lastClientX = useRef(0);
  const lastClientY = useRef(0);

  useEffect(() => {
    if (!canRenderWebGL) {
      setCanRenderWebGL(isWebGLAvailable());
    }
  }, [canRenderWebGL]);

  // Prevent default browser scroll strictly after a deliberate cake gesture mode is locked
  useEffect(() => {
    const el = touchZoneRef.current;
    if (!el) return;

    const preventTouchScroll = (e: TouchEvent) => {
      if ((gestureMode.current === "rotate" || gestureMode.current === "tilt") && e.cancelable) {
        e.preventDefault();
      }
    };

    el.addEventListener("touchmove", preventTouchScroll, { passive: false });
    return () => {
      el.removeEventListener("touchmove", preventTouchScroll);
    };
  }, []);

  if (!canRenderWebGL) {
    return null;
  }

  const handleTouchZonePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Desktop mouse uses window.pointermove hover — strictly handle touch / pen gestures
    if (e.pointerType === "mouse") return;

    activePointerId.current = e.pointerId;
    gestureMode.current = "pending";
    startClientX.current = e.clientX;
    startClientY.current = e.clientY;
    lastClientX.current = e.clientX;
    lastClientY.current = e.clientY;
    startT.current = touchTRef.current;
  };

  const handleTouchZonePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== e.pointerId || gestureMode.current === "idle") return;

    // Gesture intent determination with 8px threshold:
    if (gestureMode.current === "pending") {
      const totalDx = e.clientX - startClientX.current;
      const totalDy = e.clientY - startClientY.current;
      const absX = Math.abs(totalDx);
      const absY = Math.abs(totalDy);
      const dist = Math.hypot(totalDx, totalDy);

      if (dist < 8) {
        return; // Movement below threshold: do not lock yet
      }

      // Lock intent exclusively into one mode for the entire gesture:
      if (absX >= absY * 1.05) {
        gestureMode.current = "rotate";
        isTouchActiveRef.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
      } else {
        gestureMode.current = "tilt";
        isTouchActiveRef.current = true;
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {}
      }
    }

    // Mode A: Horizontal cake rotation only (camera tilt untouched)
    if (gestureMode.current === "rotate") {
      const deltaX = e.clientX - lastClientX.current;
      const clampedDx = THREE.MathUtils.clamp(deltaX, -40, 40);
      touchRotationRef.current += clampedDx * 0.012;
      lastClientX.current = e.clientX;
      lastClientY.current = e.clientY;
    }
    // Mode B: Vertical camera tilt only (cake rotation untouched)
    // Drag DOWN (positive totalDy) => move camera toward FRONT VIEW (t=0.0)
    // Drag UP (negative totalDy) => move camera toward TOP / OVERHEAD VIEW (t=1.0)
    else if (gestureMode.current === "tilt") {
      const totalDy = e.clientY - startClientY.current;
      const newT = THREE.MathUtils.clamp(startT.current - totalDy / 150, 0, 1);
      touchTRef.current = newT;
      lastClientX.current = e.clientX;
      lastClientY.current = e.clientY;
    }
  };

  const handleTouchZonePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerId === activePointerId.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
      activePointerId.current = null;
      gestureMode.current = "idle";
      isTouchActiveRef.current = false;
      // Settle camera back to signature 3/4 beauty view on finger release
      touchTRef.current = 0.35;
    }
  };

  return (
    <div className={`relative w-full h-full select-none ${className}`} data-component="hero-cake-scene">
      {/* Mobile Interactive Cake Touch Zone (restricted strictly to visible cake; empty background scrolls immediately) */}
      <div
        ref={touchZoneRef}
        className="cake-touch-zone absolute left-1/2 -translate-x-1/2 top-[20%] h-[52%] w-[68%] max-w-[270px] z-20 touch-none lg:hidden pointer-events-auto select-none"
        onPointerDown={handleTouchZonePointerDown}
        onPointerMove={handleTouchZonePointerMove}
        onPointerUp={handleTouchZonePointerUpOrCancel}
        onPointerCancel={handleTouchZonePointerUpOrCancel}
        aria-label="Interactive 3D Cake Touch Stage"
      />

      <Canvas
        camera={{ position: [0, 0.85, 5.6], fov: 38 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        shadows
        className="w-full h-full"
      >
        {/* Studio Bakery Lighting Rig */}
        <ambientLight intensity={0.95} color="#FFF8ED" />

        {/* Primary Warm Key Light */}
        <directionalLight
          position={[3.2, 6.0, 3.5]}
          intensity={1.75}
          color="#FFE8CA"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Golden Specular Rim / Back Light */}
        <directionalLight
          position={[-3.5, 4.5, -2.5]}
          intensity={1.3}
          color="#F5C542"
        />

        {/* Gentle Ambient Floor / Fill Light */}
        <directionalLight
          position={[0, -2, 2.5]}
          intensity={0.55}
          color="#FAF0E3"
        />

        {/* Soft Front Accent Light for Gold Tools & Embossed Script */}
        <directionalLight
          position={[0, 1.9, 4.6]}
          intensity={1.05}
          color="#FFF6E0"
        />

        <Suspense fallback={null}>
          <CameraRig
            scrollProgress={scrollProgress}
            touchT={touchTRef}
            isTouchActive={isTouchActiveRef}
          />
          <CakeCarouselSwapper
            activeCakeIndex={activeCakeIndex}
            scrollProgress={scrollProgress}
            touchRotation={touchRotationRef}
          />

          {/* Soft Ground Contact Shadow on Turntable Floor */}
          <ContactShadows
            position={[0, -0.62, 0]}
            opacity={0.65}
            scale={5.0}
            blur={1.8}
            far={2.5}
            color="#24120A"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default HeroCakeScene;
