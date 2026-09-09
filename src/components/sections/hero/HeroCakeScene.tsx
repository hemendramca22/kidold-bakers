"use client";

import React, { useRef, useEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { HeroCakeMesh } from "./HeroCakeMesh";

export interface HeroCakeSceneProps {
  scrollProgress?: number | React.RefObject<number> | { current: number }; // 0 to 1
  className?: string;
}

function getProgress(val: number | React.RefObject<number> | { current: number } | undefined): number {
  if (val === undefined) return 0;
  if (typeof val === "number") return val;
  return val.current ?? 0;
}

/**
 * Responsive Camera Controller
 * Manages macro zoom during State 3 (progress 0.35 - 0.55) and subtle desktop pointer tilt.
 */
function CameraRig({
  scrollProgress = 0,
}: {
  scrollProgress?: number | React.RefObject<number> | { current: number };
}) {
  const { camera, size } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const isDesktop = useRef(false);
  const [deviceProfile, setDeviceProfile] = useState<"mobile" | "tablet" | "desktop">("desktop");

  useEffect(() => {
    const updateProfile = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setDeviceProfile("mobile");
        isDesktop.current = false;
      } else if (w < 1024) {
        setDeviceProfile("tablet");
        isDesktop.current = false;
      } else {
        setDeviceProfile("desktop");
        isDesktop.current = true;
      }
    };

    updateProfile();
    window.addEventListener("resize", updateProfile);

    const handlePointerMove = (e: MouseEvent) => {
      if (!isDesktop.current) return;
      // Very restrained pointer offset (max ±0.08 units)
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 0.16;
      mouse.current.y = (e.clientY / window.innerHeight - 0.5) * 0.12;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("resize", updateProfile);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  useFrame(() => {
    const p = THREE.MathUtils.clamp(getProgress(scrollProgress), 0, 1);
    const aspect = size.width / Math.max(1, size.height);

    // Responsive camera framing:
    // When viewport is in narrow portrait mode (aspect < 0.68),
    // calculate exact camera distance Z to guarantee the 3.0-unit turntable platter never clips on left/right.
    let baseZ = 5.6;
    let baseY = 0.82;
    let targetLookAtY = 0.70;

    if (aspect < 0.72) {
      // Mobile / narrow portrait
      const tanHalfFov = Math.tan((38 * Math.PI) / 360);
      const safePlatterWidth = 3.25; // 3.0 unit platter + margins
      baseZ = Math.max(8.8, safePlatterWidth / (2 * tanHalfFov * aspect));
      baseY = 0.94;
      targetLookAtY = 0.70;
    } else if (deviceProfile === "tablet" || aspect < 1.1) {
      baseZ = 6.6;
      baseY = 0.86;
      targetLookAtY = 0.70;
    } else {
      // Landscape / Desktop / Laptop screens:
      // On 13-inch and compact laptop displays (viewport height ~550px-740px),
      // dynamically dolly back camera distance Z and center lookAtY so the bottom turntable stand
      // never clips against the taskbar or bottom edge, maintaining perfect margins.
      if (size.height < 740) {
        const heightDeficit = Math.max(0, 740 - size.height);
        baseZ = Math.min(6.5, 5.85 + heightDeficit * 0.0035);
        baseY = 0.76;
        targetLookAtY = 0.66;
      } else {
        baseZ = 5.6;
        baseY = 0.82;
        targetLookAtY = 0.70;
      }
    }

    let targetZ = baseZ;
    let targetY = baseY;

    if (p >= 0.35 && p < 0.55) {
      const localT = Math.sin(((p - 0.35) / 0.2) * Math.PI);
      targetZ = baseZ - localT * 0.65; // subtle macro dolly-in for artisan ganache detail
      targetY = baseY + localT * 0.08;
    }

    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.1);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + mouse.current.y, 0.1);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x, 0.1);

    camera.lookAt(0, targetLookAtY, 0);
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
 * HeroCakeScene
 *
 * Dedicated R3F component boundary for the flagship 3D hero celebration cake.
 * Renders studio lighting, soft turntable shadows, and the scrubbed 3D model.
 */
export function HeroCakeScene({ scrollProgress = 0, className = "" }: HeroCakeSceneProps) {
  const [canRenderWebGL, setCanRenderWebGL] = useState(() => isWebGLAvailable());

  useEffect(() => {
    if (!canRenderWebGL) {
      setCanRenderWebGL(isWebGLAvailable());
    }
  }, [canRenderWebGL]);

  if (!canRenderWebGL) {
    return null;
  }

  return (
    <div className={`relative w-full h-full select-none ${className}`} data-component="hero-cake-scene">
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
          position={[3.5, 4.8, 3.2]}
          intensity={1.7}
          color="#FFE8CA"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-bias={-0.0001}
        />

        {/* Golden Specular Rim / Back Light */}
        <directionalLight
          position={[-3.5, 3.8, -2.5]}
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
          position={[0, 2.2, 4.2]}
          intensity={0.9}
          color="#FFF6E0"
        />

        <Suspense fallback={null}>
          <CameraRig scrollProgress={scrollProgress} />
          <HeroCakeMesh scrollProgress={scrollProgress} />

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
