"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const MODEL_PATH = "/models/Fantasy-Castle-Cake-Optimized.glb";

// Preload the GLB model asset immediately so carousel swapping is instantaneous
if (typeof window !== "undefined") {
  try {
    useGLTF.preload(MODEL_PATH);
  } catch {}
}

interface KidsCakeMeshProps {
  scrollProgress?: number | React.RefObject<number> | { current: number };
  touchRotation?: number | React.RefObject<number> | { current: number };
}

function getProgress(val: number | React.RefObject<number> | { current: number } | undefined): number {
  if (val === undefined) return 0;
  if (typeof val === "number") return val;
  return val.current ?? 0;
}

/**
 * Custom material color & contrast tuner for Fantasy Castle Cake
 * Enriches pale/washed-out pastels into vibrant, delicious bakery fondant tones.
 */
function tuneMaterial(mat: THREE.MeshStandardMaterial) {
  const name = mat.name || "";
  const hsl = { h: 0, s: 0, l: 0 };
  mat.color.getHSL(hsl);

  // Default satin fondant finish
  mat.roughness = 0.38;
  mat.metalness = 0.04;

  if (name.includes("Gold")) {
    // 24K Edible Gold leaf finish for flags, stars, moon, and trim
    mat.color.setHSL(0.105, 0.82, 0.52);
    mat.roughness = 0.24;
    mat.metalness = 0.65;
  } else if (name.includes("Ivory")) {
    // Warm rich French vanilla buttercream (prevents washing out against cream website background)
    mat.color.setHSL(0.108, 0.58, 0.72);
    mat.roughness = 0.40;
  } else if (name.includes("Mint")) {
    // Sweet pistachio/mint fondant (was very desaturated grey-green)
    mat.color.setHSL(0.340, 0.50, 0.50);
  } else if (name.includes("Blush")) {
    // Fresh strawberry rose fondant
    mat.color.setHSL(0.950, 0.68, 0.56);
  } else if (name.includes("Pink")) {
    // Raspberry fondant accent
    mat.color.setHSL(0.942, 0.64, 0.46);
  } else if (name.includes("Blue") && !name.includes("Stone")) {
    // Cornflower pastel blue
    mat.color.setHSL(0.520, 0.56, 0.48);
  } else if (name.includes("Yellow")) {
    // Lemon curd / buttercup yellow
    mat.color.setHSL(0.118, 0.84, 0.50);
  } else if (name.includes("Lavender")) {
    // Royal lilac/lavender fondant
    mat.color.setHSL(0.740, 0.46, 0.48);
  } else if (name.includes("Dragon green")) {
    // Sweet friendly dragon green
    mat.color.setHSL(0.333, 0.52, 0.38);
  } else if (name.includes("Water light")) {
    // Sparkling aqua waterfall
    mat.color.setHSL(0.505, 0.66, 0.50);
    mat.roughness = 0.20;
    mat.metalness = 0.08;
  } else if (name.includes("Turquoise")) {
    // Deep crystal waterfall pool
    mat.color.setHSL(0.525, 0.72, 0.36);
    mat.roughness = 0.22;
  } else if (name.includes("Leaf light")) {
    // Sunlit meadow green
    mat.color.setHSL(0.260, 0.56, 0.32);
  } else if (name.includes("Leaf dark")) {
    // Rich forest evergreen
    mat.color.setHSL(0.290, 0.60, 0.12);
  } else if (name.includes("Leaf")) {
    // Lush meadow foliage
    mat.color.setHSL(0.278, 0.58, 0.22);
  } else if (name.includes("Trunk")) {
    // Milk chocolate tree trunks
    mat.color.setHSL(hsl.h, Math.min(1, hsl.s * 1.2), hsl.l * 0.90);
  } else if (name.includes("Bunny")) {
    // Warm biscuit bunny
    mat.color.setHSL(0.080, 0.48, 0.46);
  } else if (name.includes("Cloud")) {
    // Soft marshmallow puffs
    mat.color.setHSL(hsl.h, 0.25, 0.82);
  } else if (name.includes("Door")) {
    // Rich plum chocolate gate door
    mat.color.setHSL(0.950, 0.42, 0.32);
  } else {
    // General fallback: boost saturation by 25% and slightly deepen lightness by 8% for contrast
    mat.color.setHSL(hsl.h, Math.min(1, hsl.s * 1.25), Math.max(0.1, hsl.l * 0.92));
  }
}

/**
 * KidsCakeMesh (Cake #2)
 * Optimized 3D Fantasy Castle Cake model loaded from /models/Fantasy-Castle-Cake-Optimized.glb.
 * Preserves existing rotation controls, touch responsiveness, desktop scroll sync, and approved scale.
 */
export function KidsCakeMesh({ scrollProgress = 0, touchRotation = 0 }: KidsCakeMeshProps) {
  const rootGroup = useRef<THREE.Group>(null);
  const enterScale = useRef(0.60);

  const { scene } = useGLTF(MODEL_PATH);

  // Clone scene & tune materials for rich, appetizing, high-contrast pastel fondant appearance
  const modelScene = useMemo(() => {
    const clone = scene.clone(true);
    const processedMaterials = new Set<string>();

    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        if (mesh.material) {
          const origMat = mesh.material as THREE.MeshStandardMaterial;
          const mat = origMat.clone();
          mesh.material = mat;

          if (!processedMaterials.has(mat.name)) {
            processedMaterials.add(mat.name);
            tuneMaterial(mat);
          }
        }
      }
    });
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    if (!rootGroup.current) return;

    const isMobile = state.size.width < 640 || (state.size.width / Math.max(1, state.size.height) < 0.72);
    const baseTargetScale = isMobile ? 0.85 : 1.0;
    enterScale.current = THREE.MathUtils.damp(enterScale.current, baseTargetScale, 4.0, delta);
    rootGroup.current.scale.setScalar(enterScale.current);

    const progress = THREE.MathUtils.clamp(getProgress(scrollProgress), 0, 1);
    const clockTime = state.clock.getElapsedTime();

    const isTouchDevice =
      typeof window !== "undefined" &&
      (window.innerWidth < 1024 ||
        window.matchMedia("(pointer: coarse)").matches ||
        window.matchMedia("(hover: none)").matches ||
        "ontouchstart" in window);

    const scrollMultiplier = isTouchDevice ? 0 : 1;
    const targetRotation = progress * Math.PI * 2 * scrollMultiplier + (getProgress(touchRotation) || 0);

    rootGroup.current.rotation.y = THREE.MathUtils.damp(
      rootGroup.current.rotation.y,
      targetRotation,
      14.0,
      delta
    );

    rootGroup.current.position.y = -0.62 + Math.sin(clockTime * 0.8) * 0.012;
  });

  return (
    <group ref={rootGroup} position={[0, -0.62, 0]} dispose={null}>
      <primitive
        object={modelScene}
        position={[0, 0, 0]}
        scale={[5.5, 5.5, 5.5]}
      />
    </group>
  );
}

export default KidsCakeMesh;
