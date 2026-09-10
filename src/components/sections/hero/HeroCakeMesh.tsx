"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";

interface HeroCakeMeshProps {
  scrollProgress?: number | React.RefObject<number> | { current: number }; // 0 to 1
  touchRotation?: number | React.RefObject<number> | { current: number };
}

function getProgress(val: number | React.RefObject<number> | { current: number } | undefined): number {
  if (val === undefined) return 0;
  if (typeof val === "number") return val;
  return val.current ?? 0;
}

// Shared 24K Gold Material Constants
const GOLD_COLOR = "#F5C542";
const GOLD_ROUGHNESS = 0.14;
const GOLD_METALNESS = 0.94;

interface TransformProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
}

interface RoseProps extends TransformProps {
  color?: string;
  isMetallic?: boolean;
}

/**
 * 1. Procedural 3D Miniature French Wire Whisk in 24K Polished Gold
 */
function GoldWhisk({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: TransformProps) {
  const sc = typeof scale === "number" ? [scale, scale, scale] : scale;
  return (
    <group position={position} rotation={rotation} scale={sc as [number, number, number]}>
      {/* Fluted Cylindrical Handle */}
      <mesh position={[0, -0.11, 0]} castShadow>
        <cylinderGeometry args={[0.012, 0.016, 0.20, 16]} />
        <meshStandardMaterial color={GOLD_COLOR} roughness={GOLD_ROUGHNESS} metalness={GOLD_METALNESS} />
      </mesh>
      {/* Ferrule Collar */}
      <mesh position={[0, -0.01, 0]}>
        <cylinderGeometry args={[0.022, 0.018, 0.024, 16]} />
        <meshStandardMaterial color="#E5B338" roughness={0.16} metalness={0.92} />
      </mesh>
      {/* 4 Intersecting Balloon Wire Loops */}
      {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4].map((angle, idx) => (
        <group key={idx} rotation={[0, angle, 0]}>
          <mesh position={[0, 0.065, 0]} rotation={[0, 0, 0]} castShadow>
            <torusGeometry args={[0.065, 0.0045, 8, 24]} />
            <meshStandardMaterial color={GOLD_COLOR} roughness={0.12} metalness={0.95} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * 2. Procedural 3D Miniature Rolling Pin in 24K Polished Gold
 */
function GoldRollingPin({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: TransformProps) {
  const sc = typeof scale === "number" ? [scale, scale, scale] : scale;
  return (
    <group position={position} rotation={rotation} scale={sc as [number, number, number]}>
      {/* Central Barrel */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.034, 0.034, 0.26, 24]} />
        <meshStandardMaterial color={GOLD_COLOR} roughness={0.14} metalness={GOLD_METALNESS} />
      </mesh>
      {/* Left End Collar & Handle */}
      <mesh position={[-0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.011, 0.016, 0.07, 14]} />
        <meshStandardMaterial color="#D4A237" roughness={0.18} metalness={0.9} />
      </mesh>
      <mesh position={[-0.18, 0, 0]} castShadow>
        <sphereGeometry args={[0.016, 12, 12]} />
        <meshStandardMaterial color={GOLD_COLOR} roughness={0.14} metalness={GOLD_METALNESS} />
      </mesh>
      {/* Right End Collar & Handle */}
      <mesh position={[0.14, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.016, 0.011, 0.07, 14]} />
        <meshStandardMaterial color="#D4A237" roughness={0.18} metalness={0.9} />
      </mesh>
      <mesh position={[0.18, 0, 0]} castShadow>
        <sphereGeometry args={[0.016, 12, 12]} />
        <meshStandardMaterial color={GOLD_COLOR} roughness={0.14} metalness={GOLD_METALNESS} />
      </mesh>
    </group>
  );
}

/**
 * 3. Procedural 3D Miniature Pastry Piping Bag in 24K Polished Gold
 */
function GoldPipingBag({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: TransformProps) {
  const sc = typeof scale === "number" ? [scale, scale, scale] : scale;
  return (
    <group position={position} rotation={rotation} scale={sc as [number, number, number]}>
      {/* Conical Piping Bag Body */}
      <mesh position={[0, 0.08, 0]} castShadow>
        <coneGeometry args={[0.065, 0.22, 20]} />
        <meshStandardMaterial color={GOLD_COLOR} roughness={0.18} metalness={0.92} />
      </mesh>
      {/* Gathered Ruffled Top */}
      <mesh position={[0, 0.19, 0]}>
        <torusGeometry args={[0.045, 0.016, 8, 20]} />
        <meshStandardMaterial color="#D4A237" roughness={0.22} metalness={0.88} />
      </mesh>
      <mesh position={[0, 0.21, 0]}>
        <sphereGeometry args={[0.024, 12, 12]} />
        <meshStandardMaterial color={GOLD_COLOR} roughness={0.14} metalness={GOLD_METALNESS} />
      </mesh>
      {/* Fluted Star Nozzle Tip */}
      <mesh position={[0, -0.04, 0]} rotation={[Math.PI, 0, 0]} castShadow>
        <coneGeometry args={[0.018, 0.045, 6]} />
        <meshStandardMaterial color="#FFE89E" roughness={0.10} metalness={0.96} />
      </mesh>
    </group>
  );
}

/**
 * 4. Procedural 3D Miniature Mixing Bowl in 24K Polished Gold
 */
function GoldMixingBowl({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: TransformProps) {
  const sc = typeof scale === "number" ? [scale, scale, scale] : scale;
  return (
    <group position={position} rotation={rotation} scale={sc as [number, number, number]}>
      {/* Flared Bowl Hemisphere Body */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.088, 0.048, 0.075, 24]} />
        <meshStandardMaterial color={GOLD_COLOR} roughness={0.14} metalness={GOLD_METALNESS} />
      </mesh>
      {/* Polished Rim Lip */}
      <mesh position={[0, 0.078, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.086, 0.009, 8, 24]} />
        <meshStandardMaterial color="#FFE89E" roughness={0.12} metalness={0.96} />
      </mesh>
      {/* Base Foot Stand */}
      <mesh position={[0, 0.005, 0]}>
        <cylinderGeometry args={[0.052, 0.052, 0.01, 20]} />
        <meshStandardMaterial color="#D4A237" roughness={0.2} metalness={0.88} />
      </mesh>
    </group>
  );
}

/**
 * 5. Procedural 3D Multi-Layered Sculpted Rose (Gold, Blush Mauve, Champagne Cream)
 */
function SculptedRose({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  color = "#C97A8A",
  isMetallic = false,
}: RoseProps) {
  const sc = typeof scale === "number" ? [scale, scale, scale] : scale;
  const roughness = isMetallic ? 0.16 : 0.38;
  const metalness = isMetallic ? 0.92 : 0.04;

  return (
    <group position={position} rotation={rotation} scale={sc as [number, number, number]}>
      {/* Central Spiraled Bud Core */}
      <mesh position={[0, 0.045, 0]} castShadow>
        <sphereGeometry args={[0.038, 14, 14]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} />
      </mesh>
      {/* Inner Petal Ring (3 Cupped Petals) */}
      {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((ang, idx) => (
        <group key={`inner-${idx}`} rotation={[0, ang, 0]}>
          <mesh position={[0.024, 0.038, 0]} rotation={[0.2, 0, 0.25]} castShadow>
            <cylinderGeometry args={[0.045, 0.032, 0.04, 12, 1, true]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      {/* Middle Petal Ring (4 Angled Petals) */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((ang, idx) => (
        <group key={`mid-${idx}`} rotation={[0, ang + 0.3, 0]}>
          <mesh position={[0.052, 0.03, 0]} rotation={[0.35, 0, 0.4]} castShadow>
            <cylinderGeometry args={[0.068, 0.048, 0.042, 14, 1, true]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
      {/* Outer Flared Petal Ring (5 Flared Petals) */}
      {[0, (2 * Math.PI) / 5, (4 * Math.PI) / 5, (6 * Math.PI) / 5, (8 * Math.PI) / 5].map((ang, idx) => (
        <group key={`outer-${idx}`} rotation={[0, ang + 0.5, 0]}>
          <mesh position={[0.082, 0.018, 0]} rotation={[0.5, 0, 0.55]} castShadow>
            <cylinderGeometry args={[0.096, 0.07, 0.044, 16, 1, true]} />
            <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} side={THREE.DoubleSide} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/**
 * 6. Procedural 3D Golden Botanical Leaf Branch / Sprig
 */
function GoldLeafBranch({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: TransformProps) {
  const sc = typeof scale === "number" ? [scale, scale, scale] : scale;
  return (
    <group position={position} rotation={rotation} scale={sc as [number, number, number]}>
      {/* Central Curved Stem */}
      <mesh position={[0, 0.10, 0]} castShadow>
        <cylinderGeometry args={[0.007, 0.007, 0.24, 8]} />
        <meshStandardMaterial color={GOLD_COLOR} roughness={0.2} metalness={0.88} />
      </mesh>
      {/* Leaf Blades Arranged in Pairs */}
      {[-0.07, 0.0, 0.07].map((yOffset, idx) => (
        <group key={idx} position={[0, 0.10 + yOffset, 0]}>
          {/* Left Leaf Blade */}
          <mesh position={[-0.055, 0.01, 0]} rotation={[0, 0, 0.6]} scale={[1, 0.25, 2.4]} castShadow>
            <coneGeometry args={[0.024, 0.07, 5]} />
            <meshStandardMaterial color={GOLD_COLOR} roughness={0.15} metalness={0.92} />
          </mesh>
          {/* Right Leaf Blade */}
          <mesh position={[0.055, 0.01, 0]} rotation={[0, 0, -0.6]} scale={[1, 0.25, 2.4]} castShadow>
            <coneGeometry args={[0.024, 0.07, 5]} />
            <meshStandardMaterial color={GOLD_COLOR} roughness={0.15} metalness={0.92} />
          </mesh>
        </group>
      ))}
      {/* Terminal Tip Leaf */}
      <mesh position={[0, 0.24, 0]} scale={[1, 0.25, 2.4]} castShadow>
        <coneGeometry args={[0.024, 0.08, 5]} />
        <meshStandardMaterial color="#FFE89E" roughness={0.12} metalness={0.95} />
      </mesh>
    </group>
  );
}

/**
 * 7. Procedural 3D Golden Feather Plume (As seen in Attachment 2)
 */
function GoldFeatherPlume({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1 }: TransformProps) {
  const sc = typeof scale === "number" ? [scale, scale, scale] : scale;
  return (
    <group position={position} rotation={rotation} scale={sc as [number, number, number]}>
      {/* Feather Central Quill */}
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.005, 0.008, 0.32, 8]} />
        <meshStandardMaterial color="#FFE89E" roughness={0.12} metalness={0.95} />
      </mesh>
      {/* Tapered Feather Vanes */}
      {[-0.08, -0.02, 0.04, 0.10, 0.16].map((y, idx) => {
        const spread = 0.035 + (idx < 3 ? idx * 0.012 : (5 - idx) * 0.012);
        return (
          <group key={idx} position={[0, 0.14 + y, 0]}>
            <mesh position={[-spread / 2, 0, 0]} rotation={[0, 0, 0.45]} scale={[spread * 1.5, 0.008, 0.03]} castShadow>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={GOLD_COLOR} roughness={0.15} metalness={0.92} />
            </mesh>
            <mesh position={[spread / 2, 0, 0]} rotation={[0, 0, -0.45]} scale={[spread * 1.5, 0.008, 0.03]} castShadow>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={GOLD_COLOR} roughness={0.15} metalness={0.92} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

/**
 * Masterpiece 3D Artisan Celebration Cake Mesh
 * 
 * Recreates the ultra-detailed cake design from Attachment 2:
 * - Tier 1: 3D embossed gold "Kidold Bakers" script, horizontal fondant seams, golden whisks, bowls, piping bags, and multi-tone roses.
 * - Tier 2: Belgian dark chocolate tier with circular KidOld Bakers logo emblem in gold bezel, ganache drips, tools, and rose clusters.
 * - Tier 3: Ivory Chantilly tier with golden caramel drips, mini tools, rosebuds, and fresh berry/mint crown.
 * - Stepped luxury gold & white turntable base platter with engraved rim script.
 * - Full 360° scroll turntable rotation with soft inertia.
 */
export function HeroCakeMesh({ scrollProgress = 0, touchRotation = 0 }: HeroCakeMeshProps) {
  const rootGroup = useRef<THREE.Group>(null);
  const sparklesGroup = useRef<THREE.Group>(null);
  const enterScale = useRef(0.60);

  // Load official KidOld Bakers clean logo for Tier 2 front medallion
  const logoTexture = useLoader(THREE.TextureLoader, "/images/brand/kidold-logo-clean.png");

  // Generate 3D Embossed Gold "Kidold Bakers" Script for Tier 1 Front Face
  const goldScriptTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 280;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, 1024, 280);

    // Deep 3D drop shadow for physical embossed relief
    ctx.shadowColor = "rgba(40, 20, 5, 0.85)";
    ctx.shadowBlur = 14;
    ctx.shadowOffsetX = 4;
    ctx.shadowOffsetY = 8;

    // Base extrusion dark gold
    ctx.fillStyle = "#A87920";
    ctx.font = "italic 700 82px 'Playfair Display', Georgia, 'Brush Script MT', cursive, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("Kidold Bakers", 512, 142);

    // Rich metallic gold gradient
    const grad = ctx.createLinearGradient(320, 70, 700, 210);
    grad.addColorStop(0, "#FFECA3");
    grad.addColorStop(0.25, "#F5C542");
    grad.addColorStop(0.5, "#FFF5D1");
    grad.addColorStop(0.75, "#D4AF37");
    grad.addColorStop(1, "#A87920");

    ctx.shadowColor = "transparent";
    ctx.fillStyle = grad;
    ctx.fillText("Kidold Bakers", 512, 138);

    // Specular top light reflection stroke
    ctx.strokeStyle = "rgba(255, 255, 255, 0.9)";
    ctx.lineWidth = 2.0;
    ctx.strokeText("Kidold Bakers", 511, 137);

    // Delicate golden underline flourish
    ctx.strokeStyle = grad;
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(310, 185);
    ctx.bezierCurveTo(430, 202, 600, 168, 710, 185);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);


  // Generate Hand-Piped Vanilla Buttercream Calligraphy for Reverse (180°) Side
  const pipedCreamTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 640;
    canvas.height = 240;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.clearRect(0, 0, 640, 240);

    ctx.shadowColor = "rgba(10, 5, 2, 0.75)";
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 4;

    ctx.fillStyle = "#FFF9EC";
    ctx.font = "italic 700 58px 'Playfair Display', Georgia, serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("KidOld Bakers", 320, 105);

    ctx.shadowColor = "transparent";
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "italic 700 57px 'Playfair Display', Georgia, serif";
    ctx.fillText("KidOld Bakers", 319, 103);

    ctx.strokeStyle = "#FFF8E7";
    ctx.lineWidth = 3.5;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(170, 155);
    ctx.bezierCurveTo(240, 172, 400, 138, 470, 155);
    ctx.stroke();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Pre-generate 40 Golden Pearl Dragées for Tier 1 base rim
  const basePearls = useMemo(() => {
    const pearls = [];
    const count = 40;
    const radius = 1.14;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pearls.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        isGold: i % 3 !== 0,
      });
    }
    return pearls;
  }, []);

  // Pre-generate Tier 2 Organic Chocolate Ganache Drips
  const tier2Drips = useMemo(() => {
    const drips = [];
    const count = 28;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;

      const distToFront = Math.abs(angle - Math.PI / 2);
      const distToBack = Math.abs(angle - (3 * Math.PI) / 2);
      if (distToFront < 0.44 || distToBack < 0.50) {
        continue;
      }

      const height = 0.17 + Math.sin(i * 2.3) * 0.08 + Math.cos(i * 1.5) * 0.05;
      const radius = 0.838;
      const thickness = 0.035 + (i % 3) * 0.008;
      drips.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        height,
        y: 0.60 - height / 2,
        bottomY: 0.60 - height,
        thickness,
      });
    }
    return drips;
  }, []);

  // Pre-generate Tier 3 Golden Caramel Drips
  const tier3Drips = useMemo(() => {
    const drips = [];
    const count = 18;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + 0.18;
      const height = 0.13 + Math.sin(i * 2.8) * 0.06 + Math.cos(i * 1.9) * 0.03;
      const radius = 0.555;
      const thickness = 0.028 + (i % 2) * 0.006;
      drips.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        height,
        y: 0.44 - height / 2,
        bottomY: 0.44 - height,
        thickness,
      });
    }
    return drips;
  }, []);

  // Crown Topper Fresh Berries
  const berries = useMemo(() => {
    return [
      { type: "raspberry", x: 0.12, y: 0.08, z: 0.14, scale: 0.09 },
      { type: "raspberry", x: -0.16, y: 0.08, z: 0.12, scale: 0.085 },
      { type: "raspberry", x: 0.02, y: 0.10, z: -0.16, scale: 0.09 },
      { type: "raspberry", x: -0.12, y: 0.09, z: -0.12, scale: 0.08 },
      { type: "raspberry", x: 0.18, y: 0.08, z: -0.06, scale: 0.085 },
      { type: "blueberry", x: 0.04, y: 0.06, z: 0.22, scale: 0.065 },
      { type: "blueberry", x: -0.06, y: 0.06, z: 0.21, scale: 0.06 },
      { type: "blueberry", x: 0.23, y: 0.06, z: 0.08, scale: 0.062 },
      { type: "blueberry", x: -0.22, y: 0.06, z: 0.02, scale: 0.065 },
      { type: "blueberry", x: -0.18, y: 0.07, z: -0.04, scale: 0.058 },
      { type: "blueberry", x: 0.14, y: 0.07, z: -0.18, scale: 0.062 },
      { type: "blackberry", x: 0.0, y: 0.12, z: 0.04, scale: 0.08 },
      { type: "blackberry", x: -0.08, y: 0.11, z: 0.02, scale: 0.075 },
    ];
  }, []);

  // Floating Edible 24K Gold Leaf Flakes
  const goldFlakes = useMemo(() => {
    const flakes = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const dist = 1.38 + (i % 4) * 0.18;
      const height = 0.2 + (i % 6) * 0.35;
      flakes.push({
        x: Math.cos(angle) * dist,
        y: height,
        z: Math.sin(angle) * dist,
        scale: 0.024 + (i % 3) * 0.01,
      });
    }
    return flakes;
  }, []);

  // Real-time animation loop
  useFrame((state, delta) => {
    if (!rootGroup.current) return;

    const isMobile = state.size.width < 640 || (state.size.width / Math.max(1, state.size.height) < 0.72);
    const baseTargetScale = isMobile ? 0.85 : 1.0;
    enterScale.current = THREE.MathUtils.damp(enterScale.current, baseTargetScale, 4.0, delta);
    rootGroup.current.scale.setScalar(enterScale.current);

    const progress = THREE.MathUtils.clamp(getProgress(scrollProgress), 0, 1);
    const clockTime = state.clock.getElapsedTime();

    // On mobile / touch devices: page scrolling must NOT rotate the cake at all.
    // Cake rotation on mobile happens strictly through deliberate horizontal touch drag directly on the cake.
    // On desktop / laptop: scroll continues to drive 360° turntable rotation as approved.
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

    if (sparklesGroup.current) {
      sparklesGroup.current.rotation.y = -clockTime * 0.15;
    }
  });

  return (
    <group ref={rootGroup} position={[0, -0.62, 0]} dispose={null}>
      {/* ============================================================ */}
      {/* 1. STEPPED 24K GOLD & CARRARA MARBLE TURNTABLE PLATTER       */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Step 1: Lower Heavy Brass Base Ring */}
        <mesh position={[0, 0.03, 0]} receiveShadow>
          <cylinderGeometry args={[1.16, 1.28, 0.06, 64]} />
          <meshStandardMaterial color="#D4A237" roughness={0.22} metalness={0.88} />
        </mesh>
        {/* Step 2: Middle Brass Collar */}
        <mesh position={[0, 0.075, 0]}>
          <cylinderGeometry args={[0.96, 1.08, 0.05, 64]} />
          <meshStandardMaterial color={GOLD_COLOR} roughness={0.16} metalness={0.92} />
        </mesh>
        {/* Step 3: Brass Base Rim Accent Ring */}
        <mesh position={[0, 0.10, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.96, 0.024, 16, 64]} />
          <meshStandardMaterial color={GOLD_COLOR} roughness={0.14} metalness={0.94} />
        </mesh>
        {/* Fluted Brass Column Stem */}
        <mesh position={[0, 0.25, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[0.32, 0.48, 0.28, 48]} />
          <meshStandardMaterial color="#C89D3C" roughness={0.22} metalness={0.86} />
        </mesh>
        {/* Upper Brass Collar Flange */}
        <mesh position={[0, 0.40, 0]}>
          <cylinderGeometry args={[0.62, 0.38, 0.04, 48]} />
          <meshStandardMaterial color="#D4A237" roughness={0.18} metalness={0.9} />
        </mesh>
        {/* Solid White Carrara Marble Turntable Disc */}
        <mesh position={[0, 0.45, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[1.50, 1.50, 0.06, 64]} />
          <meshStandardMaterial color="#FAF8F5" roughness={0.22} metalness={0.06} />
        </mesh>
        {/* Polished 24K Gold Mirror Bevel Edge Rim */}
        <mesh position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.49, 0.024, 16, 64]} />
          <meshStandardMaterial color={GOLD_COLOR} roughness={0.12} metalness={0.96} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. TIER 1: FRENCH VANILLA FOUNDATION & ARTISAN BAKERY ACCENTS */}
      {/* ============================================================ */}
      <group position={[0, 0.51, 0]}>
        {/* Tier 1 Vanilla Buttercream Sponge Body */}
        <mesh position={[0, 0.36, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.15, 1.15, 0.72, 64]} />
          <meshStandardMaterial color="#FFFDF7" roughness={0.42} metalness={0.02} />
        </mesh>

        {/* Handcrafted Horizontal Fondant Seams */}
        <mesh position={[0, 0.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.155, 0.016, 12, 64]} />
          <meshStandardMaterial color="#FAF5EB" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.155, 0.016, 12, 64]} />
          <meshStandardMaterial color="#FAF5EB" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.14, 0.024, 16, 64]} />
          <meshStandardMaterial color="#FFF9EC" roughness={0.34} />
        </mesh>

        {/* 3D Embossed Gold Typography: "Kidold Bakers" (Front Center) */}
        {goldScriptTexture && (
          <group position={[0, 0.32, 1.156]}>
            <mesh>
              <planeGeometry args={[0.96, 0.28]} />
              <meshStandardMaterial
                map={goldScriptTexture}
                transparent
                alphaTest={0.02}
                roughness={0.16}
                metalness={0.94}
              />
            </mesh>
          </group>
        )}

        {/* Scattered 24K Gold & Iridescent White Pearls Circling Base */}
        {basePearls.map((p, idx) => (
          <mesh key={idx} position={[p.x, 0.038, p.z]} castShadow>
            <sphereGeometry args={[0.036, 16, 16]} />
            <meshStandardMaterial
              color={p.isGold ? GOLD_COLOR : "#FFFDF8"}
              roughness={p.isGold ? 0.16 : 0.24}
              metalness={p.isGold ? 0.92 : 0.18}
            />
          </mesh>
        ))}

        {/* ---------------------------------------------------------- */}
        {/* TIER 1 FRONT-LEFT CLUSTER: MINI TOOLS, ROSES & GOLD LEAVES */}
        {/* ---------------------------------------------------------- */}
        <GoldWhisk
          position={[-0.82, 0.18, 0.88]}
          rotation={[0.3, 0.4, -0.6]}
          scale={0.88}
        />
        <GoldMixingBowl
          position={[-0.94, 0.05, 0.72]}
          rotation={[0.1, 0.2, -0.1]}
          scale={0.92}
        />
        <SculptedRose
          position={[-1.05, 0.22, 0.65]}
          rotation={[0.3, 0.6, -0.4]}
          scale={0.85}
          color="#F8EFE0"
        />
        <SculptedRose
          position={[-0.92, 0.32, 0.78]}
          rotation={[0.2, 0.4, -0.2]}
          scale={0.78}
          color="#C97A8A"
        />
        <SculptedRose
          position={[-1.12, 0.12, 0.52]}
          rotation={[0.4, 0.8, -0.5]}
          scale={0.75}
          color={GOLD_COLOR}
          isMetallic
        />
        <GoldLeafBranch
          position={[-0.88, 0.38, 0.82]}
          rotation={[0.2, 0.5, -0.7]}
          scale={0.85}
        />
        <GoldFeatherPlume
          position={[-1.22, 0.28, 0.42]}
          rotation={[0.4, 0.9, -0.8]}
          scale={0.9}
        />

        {/* ----------------------------------------------------------- */}
        {/* TIER 1 FRONT-RIGHT CLUSTER: MINI TOOLS, ROSES & GOLD LEAVES */}
        {/* ----------------------------------------------------------- */}
        <GoldPipingBag
          position={[0.82, 0.16, 0.88]}
          rotation={[-0.4, -0.5, 0.6]}
          scale={0.85}
        />
        <GoldMixingBowl
          position={[0.96, 0.05, 0.68]}
          rotation={[-0.1, -0.3, 0.1]}
          scale={0.92}
        />
        <SculptedRose
          position={[1.05, 0.18, 0.62]}
          rotation={[-0.3, -0.6, 0.4]}
          scale={0.88}
          color={GOLD_COLOR}
          isMetallic
        />
        <SculptedRose
          position={[0.95, 0.30, 0.72]}
          rotation={[-0.2, -0.4, 0.3]}
          scale={0.75}
          color="#C97A8A"
        />
        <SculptedRose
          position={[1.12, 0.12, 0.48]}
          rotation={[-0.4, -0.7, 0.5]}
          scale={0.82}
          color="#F8EFE0"
        />
        <GoldLeafBranch
          position={[0.88, 0.36, 0.80]}
          rotation={[-0.2, -0.5, 0.7]}
          scale={0.85}
        />
        <GoldFeatherPlume
          position={[1.20, 0.26, 0.44]}
          rotation={[-0.4, -0.8, 0.8]}
          scale={0.9}
        />

        {/* ----------------------------------------------------------- */}
        {/* TIER 1 REVERSE SIDE (180°): BALANCED FLORAL & GOLD ACCENTS */}
        {/* ----------------------------------------------------------- */}
        <SculptedRose
          position={[0.85, 0.20, -0.82]}
          rotation={[-0.3, 2.5, 0.4]}
          scale={0.8}
          color="#C97A8A"
        />
        <SculptedRose
          position={[-0.85, 0.20, -0.82]}
          rotation={[0.3, -2.5, -0.4]}
          scale={0.8}
          color="#F8EFE0"
        />
        <GoldRollingPin
          position={[0, 0.06, -1.16]}
          rotation={[0, Math.PI, 0]}
          scale={0.85}
        />
      </group>

      {/* ============================================================ */}
      {/* 3. TIER 2: BELGIAN DARK CHOCOLATE GANACHE & DUAL EMBLEMS     */}
      {/* ============================================================ */}
      <group position={[0, 1.23, 0]}>
        {/* Tier 2 Dark Chocolate Cake Core */}
        <mesh position={[0, 0.30, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.84, 0.84, 0.62, 64]} />
          <meshStandardMaterial color="#1E0E07" roughness={0.16} metalness={0.16} />
        </mesh>

        {/* Glossy Chocolate Top Mirror Glaze Cap */}
        <mesh position={[0, 0.615, 0]} receiveShadow>
          <cylinderGeometry args={[0.85, 0.85, 0.024, 64]} />
          <meshStandardMaterial color="#160A05" roughness={0.10} metalness={0.20} />
        </mesh>
        <mesh position={[0, 0.622, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.842, 0.018, 16, 56]} />
          <meshStandardMaterial color="#160A05" roughness={0.10} metalness={0.20} />
        </mesh>

        {/* Cascading Chocolate Ganache Drips */}
        {tier2Drips.map((drip, idx) => (
          <group key={idx}>
            <mesh position={[drip.x, drip.y, drip.z]} castShadow>
              <cylinderGeometry args={[drip.thickness * 0.85, drip.thickness * 1.15, drip.height, 16]} />
              <meshStandardMaterial color="#160A05" roughness={0.10} metalness={0.20} />
            </mesh>
            <mesh position={[drip.x, drip.bottomY, drip.z]} castShadow>
              <sphereGeometry args={[drip.thickness * 1.25, 16, 16]} />
              <meshStandardMaterial color="#160A05" roughness={0.10} metalness={0.20} />
            </mesh>
          </group>
        ))}

        {/* ---------------------------------------------------------- */}
        {/* SIDE 1 (FRONT, 0°): OFFICIAL KIDOLD BAKERS LOGO EMBLEM     */}
        {/* ---------------------------------------------------------- */}
        <group position={[0, 0.30, 0.845]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.228, 0.228, 0.024, 36]} />
            <meshStandardMaterial color={GOLD_COLOR} roughness={0.12} metalness={0.94} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.005]}>
            <cylinderGeometry args={[0.208, 0.208, 0.022, 36]} />
            <meshStandardMaterial color="#FFFDF7" roughness={0.22} metalness={0.04} />
          </mesh>
          <mesh position={[0, 0, 0.018]}>
            <circleGeometry args={[0.198, 48]} />
            <meshStandardMaterial map={logoTexture} transparent roughness={0.15} metalness={0.04} />
          </mesh>
        </group>

        {/* ---------------------------------------------------------- */}
        {/* TIER 2 FRONT-LEFT CLUSTER: ROLLING PIN, WHISK, ROSE        */}
        {/* ---------------------------------------------------------- */}
        <GoldRollingPin
          position={[-0.58, 0.08, 0.68]}
          rotation={[0.2, 0.4, -0.3]}
          scale={0.78}
        />
        <GoldMixingBowl
          position={[-0.72, 0.05, 0.52]}
          rotation={[0.1, 0.3, -0.1]}
          scale={0.82}
        />
        <GoldWhisk
          position={[-0.64, 0.16, 0.58]}
          rotation={[0.4, 0.2, -0.4]}
          scale={0.75}
        />
        <SculptedRose
          position={[-0.82, 0.18, 0.42]}
          rotation={[0.3, 0.7, -0.5]}
          scale={0.72}
          color="#F8EFE0"
        />
        <SculptedRose
          position={[-0.72, 0.30, 0.48]}
          rotation={[0.2, 0.5, -0.3]}
          scale={0.65}
          color="#C97A8A"
        />
        <GoldLeafBranch
          position={[-0.85, 0.38, 0.38]}
          rotation={[0.3, 0.6, -0.6]}
          scale={0.75}
        />
        <GoldFeatherPlume
          position={[-0.92, 0.44, 0.28]}
          rotation={[0.4, 0.8, -0.7]}
          scale={0.82}
        />

        {/* ---------------------------------------------------------- */}
        {/* TIER 2 FRONT-RIGHT CLUSTER: PIPING BAG, ROLLING PIN, ROSE  */}
        {/* ---------------------------------------------------------- */}
        <GoldRollingPin
          position={[0.58, 0.08, 0.68]}
          rotation={[-0.2, -0.4, 0.3]}
          scale={0.78}
        />
        <GoldMixingBowl
          position={[0.72, 0.05, 0.52]}
          rotation={[-0.1, -0.3, 0.1]}
          scale={0.82}
        />
        <GoldPipingBag
          position={[0.66, 0.16, 0.56]}
          rotation={[-0.4, -0.3, 0.4]}
          scale={0.75}
        />
        <SculptedRose
          position={[0.82, 0.18, 0.42]}
          rotation={[-0.3, -0.7, 0.5]}
          scale={0.72}
          color="#F8EFE0"
        />
        <SculptedRose
          position={[0.72, 0.30, 0.48]}
          rotation={[-0.2, -0.5, 0.3]}
          scale={0.65}
          color="#C97A8A"
        />
        <GoldLeafBranch
          position={[0.85, 0.38, 0.38]}
          rotation={[-0.3, -0.6, 0.6]}
          scale={0.75}
        />
        <GoldFeatherPlume
          position={[0.92, 0.44, 0.28]}
          rotation={[-0.4, -0.8, 0.7]}
          scale={0.82}
        />

        {/* ---------------------------------------------------------- */}
        {/* SIDE 2 (REVERSE, 180°): NATURAL HAND-PIPED CREAM LETTERING */}
        {/* ---------------------------------------------------------- */}
        <group position={[0, 0.30, -0.846]} rotation={[0, Math.PI, 0]}>
          {pipedCreamTexture && (
            <mesh position={[0, 0, 0.005]}>
              <planeGeometry args={[0.76, 0.28]} />
              <meshStandardMaterial
                map={pipedCreamTexture}
                transparent
                alphaTest={0.02}
                roughness={0.35}
                metalness={0.0}
              />
            </mesh>
          )}
          <SculptedRose
            position={[-0.62, -0.08, 0]}
            rotation={[0.3, 0.4, -0.4]}
            scale={0.65}
            color="#F8EFE0"
          />
          <SculptedRose
            position={[0.62, -0.08, 0]}
            rotation={[-0.3, -0.4, 0.4]}
            scale={0.65}
            color="#C97A8A"
          />
        </group>
      </group>

      {/* ============================================================ */}
      {/* 4. TIER 3: CHANTILLY CREAM & GOLDEN CARAMEL CROWN TIER       */}
      {/* ============================================================ */}
      <group position={[0, 1.85, 0]}>
        {/* Tier 3 Chantilly Cream Cake Body */}
        <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.56, 0.56, 0.44, 48]} />
          <meshStandardMaterial color="#FFFDF5" roughness={0.36} metalness={0.02} />
        </mesh>

        {/* Golden Caramel Glaze Top Cover */}
        <mesh position={[0, 0.445, 0]} receiveShadow>
          <cylinderGeometry args={[0.565, 0.565, 0.02, 48]} />
          <meshStandardMaterial color="#D49232" roughness={0.16} metalness={0.28} />
        </mesh>

        {/* Cascading Golden Caramel Drips */}
        {tier3Drips.map((drip, idx) => (
          <group key={idx}>
            <mesh position={[drip.x, drip.y, drip.z]} castShadow>
              <cylinderGeometry args={[drip.thickness * 0.85, drip.thickness * 1.15, drip.height, 14]} />
              <meshStandardMaterial color="#D49232" roughness={0.16} metalness={0.28} />
            </mesh>
            <mesh position={[drip.x, drip.bottomY, drip.z]} castShadow>
              <sphereGeometry args={[drip.thickness * 1.25, 14, 14]} />
              <meshStandardMaterial color="#D49232" roughness={0.16} metalness={0.28} />
            </mesh>
          </group>
        ))}

        {/* ---------------------------------------------------------- */}
        {/* TIER 3 ACCENTS: MINI WHISK, ROLLING PIN, ROSES & PLUME     */}
        {/* ---------------------------------------------------------- */}
        <GoldWhisk
          position={[0.12, 0.42, 0.48]}
          rotation={[0.3, 0.6, -1.2]}
          scale={0.72}
        />
        <GoldRollingPin
          position={[0.32, 0.44, 0.36]}
          rotation={[0.2, -0.4, 0.3]}
          scale={0.68}
        />
        <SculptedRose
          position={[-0.48, 0.34, 0.32]}
          rotation={[0.3, 0.6, -0.5]}
          scale={0.65}
          color="#F8EFE0"
        />
        <SculptedRose
          position={[-0.56, 0.26, 0.22]}
          rotation={[0.4, 0.8, -0.6]}
          scale={0.58}
          color="#C97A8A"
        />
        <GoldFeatherPlume
          position={[-0.64, 0.46, 0.18]}
          rotation={[0.3, 0.8, -0.7]}
          scale={0.75}
        />
        <GoldLeafBranch
          position={[-0.52, 0.48, 0.24]}
          rotation={[0.2, 0.5, -0.5]}
          scale={0.7}
        />
      </group>

      {/* ============================================================ */}
      {/* 5. CROWN TOPPER: GOURMET FRUIT CLUSTER & 24K GOLD PLAQUE     */}
      {/* ============================================================ */}
      <group position={[0, 2.31, 0]}>
        {/* Handcrafted Fresh Berries Medley */}
        {berries.map((b, idx) => {
          if (b.type === "raspberry") {
            return (
              <group key={idx} position={[b.x, b.y, b.z]}>
                <mesh castShadow>
                  <sphereGeometry args={[b.scale, 16, 16]} />
                  <meshStandardMaterial color="#B0162E" roughness={0.30} metalness={0.10} />
                </mesh>
                <mesh position={[0, b.scale * 0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[b.scale * 0.7, b.scale * 0.28, 8, 16]} />
                  <meshStandardMaterial color="#C71D38" roughness={0.28} />
                </mesh>
              </group>
            );
          } else if (b.type === "blueberry") {
            return (
              <mesh key={idx} position={[b.x, b.y, b.z]} castShadow>
                <sphereGeometry args={[b.scale, 16, 16]} />
                <meshStandardMaterial color="#263152" roughness={0.26} metalness={0.14} />
              </mesh>
            );
          } else {
            return (
              <group key={idx} position={[b.x, b.y, b.z]}>
                <mesh castShadow>
                  <sphereGeometry args={[b.scale, 16, 16]} />
                  <meshStandardMaterial color="#140B13" roughness={0.18} metalness={0.22} />
                </mesh>
              </group>
            );
          }
        })}

        {/* Sculpted Fresh Emerald Mint Leaves */}
        <group position={[-0.14, 0.08, 0.18]} rotation={[0.4, 0.8, -0.3]}>
          <mesh castShadow>
            <coneGeometry args={[0.065, 0.15, 5]} />
            <meshStandardMaterial color="#2D7C47" roughness={0.36} metalness={0.04} />
          </mesh>
        </group>
        <group position={[0.16, 0.07, -0.12]} rotation={[-0.3, -1.1, 0.4]}>
          <mesh castShadow>
            <coneGeometry args={[0.055, 0.13, 5]} />
            <meshStandardMaterial color="#2D7C47" roughness={0.36} metalness={0.04} />
          </mesh>
        </group>

        {/* Whipped Cream Chantilly Dollops on Top Rim */}
        {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, idx) => (
          <mesh
            key={`dollop-${idx}`}
            position={[Math.cos(angle) * 0.38, 0.03, Math.sin(angle) * 0.38]}
            castShadow
          >
            <sphereGeometry args={[0.038, 12, 12]} />
            <meshStandardMaterial color="#FFFDF8" roughness={0.32} metalness={0.02} />
          </mesh>
        ))}

        {/* Standing 24-Karat Gold & Dark Chocolate Plaque at Center Back */}
        <group position={[0, 0.16, 0.02]} rotation={[-0.15, 0, 0]} castShadow>
          <mesh castShadow>
            <boxGeometry args={[0.46, 0.20, 0.03]} />
            <meshStandardMaterial color="#221008" roughness={0.20} metalness={0.25} />
          </mesh>
          <mesh position={[0, 0, 0.016]}>
            <boxGeometry args={[0.42, 0.16, 0.008]} />
            <meshStandardMaterial color={GOLD_COLOR} roughness={0.14} metalness={0.92} />
          </mesh>
          <mesh position={[0, 0, 0.022]}>
            <boxGeometry args={[0.38, 0.12, 0.006]} />
            <meshStandardMaterial color="#FFF9EC" roughness={0.28} metalness={0.04} />
          </mesh>
        </group>
      </group>

      {/* ============================================================ */}
      {/* 6. FLOATING 24K EDIBLE GOLD LEAF FLAKES                      */}
      {/* ============================================================ */}
      <group ref={sparklesGroup}>
        {goldFlakes.map((sp, idx) => (
          <mesh key={idx} position={[sp.x, sp.y, sp.z]} castShadow>
            <octahedronGeometry args={[sp.scale, 0]} />
            <meshStandardMaterial
              color={GOLD_COLOR}
              roughness={0.12}
              metalness={0.95}
              emissive="#D4A237"
              emissiveIntensity={0.35}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default HeroCakeMesh;
