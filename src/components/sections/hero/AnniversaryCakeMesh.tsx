"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface AnniversaryCakeMeshProps {
  scrollProgress?: number | React.RefObject<number> | { current: number };
  touchRotation?: number | React.RefObject<number> | { current: number };
}

function getProgress(val: number | React.RefObject<number> | { current: number } | undefined): number {
  if (val === undefined) return 0;
  if (typeof val === "number") return val;
  return val.current ?? 0;
}

// Luxury Haute-Confectionery Materials
const ROSE_GOLD_COLOR = "#E8A598";
const ROSE_GOLD_METALNESS = 0.92;
const ROSE_GOLD_ROUGHNESS = 0.14;

const GOLD_COLOR = "#F5C542";
const BURGUNDY_WINE_COLOR = "#420C14";
const CHAMPAGNE_IVORY_COLOR = "#FAF4EB";

/**
 * Refined Stylized 3D Husband-and-Wife Anniversary Couple Figurine
 * - Handcrafted porcelain ivory and rose-gold lustre finish
 * - Refined human proportions suitable for luxury cake topper
 * - Romantic anniversary pose: Husband tenderly supporting his wife as she leans into his embrace
 */
function StylizedCoupleSculpture() {
  return (
    <group position={[0, 0.04, 0]} scale={[0.84, 0.84, 0.84]}>
      {/* Rose-Gold & Carrara Marble Pedestal Mount */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.28, 0.04, 32]} />
        <meshStandardMaterial
          color={ROSE_GOLD_COLOR}
          roughness={ROSE_GOLD_ROUGHNESS}
          metalness={ROSE_GOLD_METALNESS}
        />
      </mesh>

      {/* Scattered Sugar Rose Petals around base */}
      {[0, 1.1, 2.2, 3.4, 4.7].map((angle, idx) => (
        <mesh
          key={`petal-${idx}`}
          position={[Math.cos(angle) * 0.18, 0.024, Math.sin(angle) * 0.18]}
          rotation={[0.2, angle, 0.1]}
        >
          <sphereGeometry args={[0.028, 8, 8]} />
          <meshStandardMaterial color="#C2185B" roughness={0.4} />
        </mesh>
      ))}

      {/* ================= HUSBAND FIGURINE ================= */}
      <group position={[-0.07, 0.02, 0]} rotation={[0, 0.18, -0.06]}>
        {/* Tailored Charcoal Trousers */}
        <mesh position={[0, 0.18, 0]} castShadow>
          <cylinderGeometry args={[0.048, 0.054, 0.36, 16]} />
          <meshStandardMaterial color="#1A1514" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Tuxedo Torso & Rose-Gold Lapels */}
        <mesh position={[0, 0.44, 0]} castShadow>
          <cylinderGeometry args={[0.074, 0.058, 0.24, 16]} />
          <meshStandardMaterial color="#221C1A" roughness={0.25} metalness={0.25} />
        </mesh>
        <mesh position={[0.02, 0.46, 0.055]} rotation={[0, 0, -0.1]}>
          <boxGeometry args={[0.044, 0.16, 0.012]} />
          <meshStandardMaterial color={ROSE_GOLD_COLOR} roughness={0.16} metalness={0.9} />
        </mesh>

        {/* Sculpted Head & Hair */}
        <mesh position={[0, 0.63, 0]} castShadow>
          <sphereGeometry args={[0.065, 18, 18]} />
          <meshStandardMaterial color="#FFF9F5" roughness={0.2} metalness={0.15} />
        </mesh>
        <mesh position={[-0.01, 0.67, -0.02]} castShadow>
          <sphereGeometry args={[0.058, 14, 14]} />
          <meshStandardMaterial color="#2A1D18" roughness={0.35} />
        </mesh>

        {/* Husband's Right Arm (Supporting wife's waist in romantic dip) */}
        <group position={[0.08, 0.48, 0]} rotation={[0.4, 0.2, -0.75]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.024, 0.028, 0.28, 12]} />
            <meshStandardMaterial color="#221C1A" roughness={0.25} metalness={0.25} />
          </mesh>
          <mesh position={[0, 0.15, 0]} castShadow>
            <sphereGeometry args={[0.026, 10, 10]} />
            <meshStandardMaterial color="#FFF9F5" roughness={0.2} />
          </mesh>
        </group>
        {/* Husband's Left Arm */}
        <group position={[-0.08, 0.42, 0.04]} rotation={[0.2, -0.1, 0.4]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.022, 0.026, 0.24, 12]} />
            <meshStandardMaterial color="#221C1A" roughness={0.25} metalness={0.25} />
          </mesh>
        </group>
      </group>

      {/* ================= WIFE FIGURINE ================= */}
      {/* Leaning gracefully into husband's supportive hold */}
      <group position={[0.08, 0.02, 0.03]} rotation={[0.08, -0.24, 0.18]}>
        {/* Flowing Sculptural Bridal Gown */}
        <mesh position={[0, 0.17, -0.01]} castShadow>
          <cylinderGeometry args={[0.062, 0.14, 0.34, 24]} />
          <meshStandardMaterial color="#FFFDF9" roughness={0.28} metalness={0.08} />
        </mesh>
        {/* Rose-Gold Filigree Gown Hem */}
        <mesh position={[0, 0.02, -0.01]}>
          <cylinderGeometry args={[0.138, 0.142, 0.016, 24]} />
          <meshStandardMaterial color={ROSE_GOLD_COLOR} roughness={0.16} metalness={0.9} />
        </mesh>

        {/* Corset Bodice & Sash */}
        <mesh position={[0, 0.39, 0]} castShadow>
          <cylinderGeometry args={[0.052, 0.058, 0.18, 16]} />
          <meshStandardMaterial color="#FFFDF9" roughness={0.25} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0.31, 0]}>
          <cylinderGeometry args={[0.062, 0.062, 0.022, 16]} />
          <meshStandardMaterial color={ROSE_GOLD_COLOR} roughness={0.16} metalness={0.92} />
        </mesh>

        {/* Sculpted Head & Elegant Hair Updo */}
        <mesh position={[-0.03, 0.56, 0]} rotation={[0, 0, -0.15]} castShadow>
          <sphereGeometry args={[0.058, 18, 18]} />
          <meshStandardMaterial color="#FFF9F5" roughness={0.2} metalness={0.15} />
        </mesh>
        <mesh position={[-0.03, 0.60, -0.02]} castShadow>
          <sphereGeometry args={[0.054, 14, 14]} />
          <meshStandardMaterial color="#3E2723" roughness={0.4} />
        </mesh>
        {/* Rose-Gold Tiara Accent */}
        <mesh position={[-0.03, 0.62, 0.01]}>
          <torusGeometry args={[0.032, 0.007, 8, 16]} />
          <meshStandardMaterial color={ROSE_GOLD_COLOR} roughness={0.14} metalness={0.94} />
        </mesh>

        {/* Wife's Left Arm (Tenderly touching husband's shoulder) */}
        <group position={[-0.06, 0.44, 0.02]} rotation={[0.3, -0.4, -0.8]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.018, 0.022, 0.24, 12]} />
            <meshStandardMaterial color="#FFF9F5" roughness={0.22} />
          </mesh>
          <mesh position={[0, 0.13, 0]} castShadow>
            <sphereGeometry args={[0.022, 10, 10]} />
            <meshStandardMaterial color="#FFF9F5" roughness={0.22} />
          </mesh>
        </group>
        {/* Wife's Right Arm */}
        <group position={[0.07, 0.40, 0.01]} rotation={[-0.1, 0.1, 0.25]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.018, 0.022, 0.22, 12]} />
            <meshStandardMaterial color="#FFF9F5" roughness={0.22} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/**
 * 4 Orbiting Miniature 3D Romantic Couple Motifs
 */
function OrbitingRomanticMotifs() {
  const groupRef = useRef<THREE.Group>(null);
  const ring1 = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Group>(null);
  const heartRef = useRef<THREE.Group>(null);
  const flutesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const speed = 0.55;

    // Motif 1: Interlocking Wedding Bands (Radius 1.58, height 0.48)
    if (ring1.current) {
      const angle1 = time * speed;
      ring1.current.position.set(
        Math.cos(angle1) * 1.58,
        0.48 + Math.sin(time * 1.4) * 0.08,
        Math.sin(angle1) * 1.58
      );
      ring1.current.rotation.y = time * 1.2;
      ring1.current.rotation.x = Math.sin(time * 0.8) * 0.3;
    }

    // Motif 2: Double-Swan Heart Silhouette (Radius 1.68, height 0.95)
    if (ring2.current) {
      const angle2 = time * speed + Math.PI / 2;
      ring2.current.position.set(
        Math.cos(angle2) * 1.68,
        0.95 + Math.cos(time * 1.3) * 0.09,
        Math.sin(angle2) * 1.68
      );
      ring2.current.rotation.y = -angle2 + Math.PI / 2;
    }

    // Motif 3: Faceted Rose Quartz Heart Medallion (Radius 1.52, height 0.32)
    if (heartRef.current) {
      const angle3 = time * speed + Math.PI;
      heartRef.current.position.set(
        Math.cos(angle3) * 1.52,
        0.32 + Math.sin(time * 1.6) * 0.07,
        Math.sin(angle3) * 1.52
      );
      heartRef.current.rotation.y = time * 0.9;
      heartRef.current.rotation.z = Math.sin(time * 1.1) * 0.2;
    }

    // Motif 4: Toasting Champagne Flutes (Radius 1.62, height 0.72)
    if (flutesRef.current) {
      const angle4 = time * speed + (3 * Math.PI) / 2;
      flutesRef.current.position.set(
        Math.cos(angle4) * 1.62,
        0.72 + Math.cos(time * 1.5) * 0.08,
        Math.sin(angle4) * 1.62
      );
      flutesRef.current.rotation.y = -angle4;
      flutesRef.current.rotation.z = Math.sin(time * 2.2) * 0.12;
    }
  });

  return (
    <group ref={groupRef}>
      {/* MOTIF 1: Interlocking Gold Wedding Bands */}
      <group ref={ring1} scale={[0.22, 0.22, 0.22]}>
        <mesh rotation={[0.4, 0.3, 0]} castShadow>
          <torusGeometry args={[0.22, 0.038, 16, 32]} />
          <meshStandardMaterial
            color={GOLD_COLOR}
            roughness={0.12}
            metalness={0.96}
            emissive="#B8860B"
            emissiveIntensity={0.25}
          />
        </mesh>
        <mesh position={[0.16, 0.06, 0]} rotation={[-0.3, 0.5, 0.6]} castShadow>
          <torusGeometry args={[0.22, 0.038, 16, 32]} />
          <meshStandardMaterial
            color={ROSE_GOLD_COLOR}
            roughness={0.14}
            metalness={0.94}
            emissive="#AD1457"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0, 0.23, 0.06]} castShadow>
          <octahedronGeometry args={[0.055, 0]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.05} metalness={0.9} />
        </mesh>
      </group>

      {/* MOTIF 2: Double-Swan Love Heart Silhouette */}
      <group ref={ring2} scale={[0.24, 0.24, 0.24]}>
        <group position={[-0.14, 0, 0]}>
          <mesh castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0.06, 0.16, 0]} rotation={[0, 0, -0.4]} castShadow>
            <cylinderGeometry args={[0.028, 0.04, 0.24, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0.11, 0.28, 0]} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0.16, 0.27, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.018, 0.045, 8]} />
            <meshStandardMaterial color={GOLD_COLOR} roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
        <group position={[0.14, 0, 0]} scale={[-1, 1, 1]}>
          <mesh castShadow>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0.06, 0.16, 0]} rotation={[0, 0, -0.4]} castShadow>
            <cylinderGeometry args={[0.028, 0.04, 0.24, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0.11, 0.28, 0]} castShadow>
            <sphereGeometry args={[0.045, 12, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
          </mesh>
          <mesh position={[0.16, 0.27, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.018, 0.045, 8]} />
            <meshStandardMaterial color={GOLD_COLOR} roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      </group>

      {/* MOTIF 3: Faceted Rose Quartz Love-Heart Medallion */}
      <group ref={heartRef} scale={[0.25, 0.25, 0.25]}>
        <mesh position={[-0.08, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#F48FB1"
            roughness={0.18}
            metalness={0.25}
            emissive="#AD1457"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0.08, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color="#F48FB1"
            roughness={0.18}
            metalness={0.25}
            emissive="#AD1457"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0, -0.08, 0]} rotation={[0, 0, Math.PI]} castShadow>
          <coneGeometry args={[0.17, 0.26, 16]} />
          <meshStandardMaterial
            color="#F48FB1"
            roughness={0.18}
            metalness={0.25}
            emissive="#AD1457"
            emissiveIntensity={0.2}
          />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <torusGeometry args={[0.18, 0.018, 8, 24]} />
          <meshStandardMaterial color={GOLD_COLOR} roughness={0.12} metalness={0.92} />
        </mesh>
      </group>

      {/* MOTIF 4: Toasting Champagne Flutes */}
      <group ref={flutesRef} scale={[0.22, 0.22, 0.22]}>
        <group position={[-0.08, 0, 0]} rotation={[0, 0, -0.22]}>
          <mesh position={[0, 0.18, 0]} castShadow>
            <cylinderGeometry args={[0.048, 0.022, 0.24, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.08} metalness={0.1} transparent opacity={0.82} />
          </mesh>
          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.042, 0.02, 0.14, 14]} />
            <meshStandardMaterial color="#FFD54F" roughness={0.15} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.007, 0.007, 0.18, 10]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.2} />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.01, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.2} />
          </mesh>
        </group>
        <group position={[0.08, 0, 0]} rotation={[0, 0, 0.22]}>
          <mesh position={[0, 0.18, 0]} castShadow>
            <cylinderGeometry args={[0.048, 0.022, 0.24, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.08} metalness={0.1} transparent opacity={0.82} />
          </mesh>
          <mesh position={[0, 0.13, 0]}>
            <cylinderGeometry args={[0.042, 0.02, 0.14, 14]} />
            <meshStandardMaterial color="#FFD54F" roughness={0.15} metalness={0.5} />
          </mesh>
          <mesh position={[0, 0.01, 0]}>
            <cylinderGeometry args={[0.007, 0.007, 0.18, 10]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.2} />
          </mesh>
          <mesh position={[0, -0.08, 0]}>
            <cylinderGeometry args={[0.065, 0.065, 0.01, 16]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.2} />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/**
 * AnniversaryCakeMesh (Cake #3)
 * State-of-the-Art Luxury Anniversary Centerpiece.
 * - Perfectly aligned height envelope (Platter y=0 to Crown Couple Topper y=1.92) matching Cake #1.
 * - Velvet Royal Wine, Champagne Ivory & Rose-Gold Metallic tiers with sculptural sugar ribbon swags.
 * - Cascading hand-sculpted sugar roses.
 * - Refined 3D husband-and-wife couple figurine sculpture in romantic celebration pose.
 * - 4 orbiting miniature romantic celebration motifs.
 */
export function AnniversaryCakeMesh({ scrollProgress = 0, touchRotation = 0 }: AnniversaryCakeMeshProps) {
  const rootGroup = useRef<THREE.Group>(null);
  const enterScale = useRef(0.60);

  // Cascading luxury sugar roses across tiers
  const sugarRoses = useMemo(() => {
    return [
      // Cascading from Tier 3 down to Tier 2
      { angle: 0.25, r: 0.54, y: 1.40, scale: 0.095, color: "#C2185B" },
      { angle: 0.42, r: 0.58, y: 1.28, scale: 0.088, color: "#D81B60" },
      { angle: 0.60, r: 0.68, y: 1.14, scale: 0.092, color: "#E91E63" },
      { angle: 0.78, r: 0.82, y: 0.98, scale: 0.085, color: "#F06292" },
      { angle: 0.95, r: 0.86, y: 0.84, scale: 0.090, color: "#F48FB1" },
      { angle: 1.15, r: 0.98, y: 0.68, scale: 0.094, color: "#FFF3E0" },
      { angle: 1.35, r: 1.12, y: 0.52, scale: 0.098, color: "#FFFFFF" },
      // Opposite accent cluster
      { angle: 3.4, r: 0.52, y: 1.38, scale: 0.085, color: "#C2185B" },
      { angle: 3.6, r: 0.82, y: 0.92, scale: 0.082, color: "#F06292" },
    ];
  }, []);

  // 40 Alternating Rose-Gold and Ivory Pearl Dragées for Tier 1 base rim
  const pearlRim = useMemo(() => {
    const pearls = [];
    const count = 40;
    const radius = 1.14;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pearls.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        isRoseGold: i % 2 === 0,
      });
    }
    return pearls;
  }, []);

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
      {/* ============================================================ */}
      {/* 1. PEDESTAL PLATTER IN ROSE GOLD & DARK CHOCOLATE           */}
      {/* Exactly matches Cake #1 elevation (y = 0.00 to 0.20)         */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Step 1: Lower Heavy Dark Chocolate Base Ring */}
        <mesh position={[0, 0.03, 0]} receiveShadow>
          <cylinderGeometry args={[1.16, 1.28, 0.06, 64]} />
          <meshStandardMaterial color="#1E100A" roughness={0.25} metalness={0.4} />
        </mesh>
        {/* Step 2: Rose-Gold Beveled Collar Ring */}
        <mesh position={[0, 0.075, 0]}>
          <cylinderGeometry args={[0.98, 1.10, 0.05, 64]} />
          <meshStandardMaterial
            color={ROSE_GOLD_COLOR}
            roughness={ROSE_GOLD_ROUGHNESS}
            metalness={ROSE_GOLD_METALNESS}
          />
        </mesh>
        {/* Step 3: Upper Champagne Platter Top */}
        <mesh position={[0, 0.125, 0]} receiveShadow>
          <cylinderGeometry args={[1.30, 1.34, 0.05, 64]} />
          <meshStandardMaterial color={CHAMPAGNE_IVORY_COLOR} roughness={0.22} />
        </mesh>
        {/* Step 4: Golden Platter Rim Lip */}
        <mesh position={[0, 0.165, 0]}>
          <cylinderGeometry args={[1.28, 1.32, 0.03, 64]} />
          <meshStandardMaterial color={GOLD_COLOR} roughness={0.16} metalness={0.92} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. TIER 1 — DEEP VELVET ROYAL WINE / BURGUNDY TIER           */}
      {/* Elevation matches Cake #1 Tier 1: Center y = 0.44, H = 0.48  */}
      {/* ============================================================ */}
      <group position={[0, 0.44, 0]}>
        {/* Main Velvet Burgundy Fondant Tier */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.12, 1.14, 0.48, 48]} />
          <meshStandardMaterial color={BURGUNDY_WINE_COLOR} roughness={0.35} metalness={0.12} />
        </mesh>

        {/* Rose-Gold Filigree Lace Band across Tier 1 middle */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1.138, 1.138, 0.10, 48]} />
          <meshStandardMaterial
            color={ROSE_GOLD_COLOR}
            roughness={ROSE_GOLD_ROUGHNESS}
            metalness={ROSE_GOLD_METALNESS}
          />
        </mesh>

        {/* Alternating Rose-Gold and Ivory Pearl Rim around Base */}
        {pearlRim.map((p, idx) => (
          <mesh key={`anniv-pearl-${idx}`} position={[p.x, -0.23, p.z]} castShadow>
            <sphereGeometry args={[0.034, 12, 12]} />
            <meshStandardMaterial
              color={p.isRoseGold ? ROSE_GOLD_COLOR : "#FFF9F0"}
              roughness={0.15}
              metalness={p.isRoseGold ? 0.9 : 0.2}
            />
          </mesh>
        ))}
      </group>

      {/* ============================================================ */}
      {/* 3. TIER 2 — CHAMPAGNE IVORY WITH DRAPED SUGAR RIBBON SWAGS   */}
      {/* Elevation matches Cake #1 Tier 2: Center y = 0.94, H = 0.44  */}
      {/* ============================================================ */}
      <group position={[0, 0.94, 0]}>
        {/* Tall Champagne Ivory Fondant Cylinder */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.82, 0.84, 0.44, 44]} />
          <meshStandardMaterial color={CHAMPAGNE_IVORY_COLOR} roughness={0.28} metalness={0.06} />
        </mesh>

        {/* Draped Rose-Gold Sugar Ribbon Swags around Tier 2 */}
        {[0, Math.PI / 3, (2 * Math.PI) / 3, Math.PI, (4 * Math.PI) / 3, (5 * Math.PI) / 3].map((angle, idx) => (
          <group key={`swag-${idx}`} position={[0, 0.06, 0]} rotation={[0, angle, 0]}>
            <mesh position={[0.835, -0.06, 0]} rotation={[0.4, 0, 0]}>
              <torusGeometry args={[0.20, 0.022, 10, 24, Math.PI]} />
              <meshStandardMaterial
                color={ROSE_GOLD_COLOR}
                roughness={ROSE_GOLD_ROUGHNESS}
                metalness={ROSE_GOLD_METALNESS}
              />
            </mesh>
          </group>
        ))}

        {/* Delicate Golden Trim at Tier 2 Top Rim */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.83, 0.83, 0.016, 44]} />
          <meshStandardMaterial color={GOLD_COLOR} roughness={0.14} metalness={0.92} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 4. TIER 3 — ROSE GOLD METALLIC LUSTRE TIER                   */}
      {/* Elevation matches Cake #1 Tier 3: Center y = 1.40, H = 0.40  */}
      {/* ============================================================ */}
      <group position={[0, 1.40, 0]}>
        {/* Gleaming Rose-Gold Top Tier */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.52, 0.54, 0.40, 36]} />
          <meshStandardMaterial
            color={ROSE_GOLD_COLOR}
            roughness={ROSE_GOLD_ROUGHNESS}
            metalness={ROSE_GOLD_METALNESS}
          />
        </mesh>

        {/* Ivory Beaded Neck Ring */}
        <mesh position={[0, -0.20, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.02, 36]} />
          <meshStandardMaterial color="#FFF9F0" roughness={0.25} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 5. CASCADING HAND-SCULPTED SUGAR ROSES                       */}
      {/* ============================================================ */}
      {sugarRoses.map((rose, idx) => (
        <group
          key={`rose-${idx}`}
          position={[Math.cos(rose.angle) * rose.r, rose.y, Math.sin(rose.angle) * rose.r]}
          rotation={[0.2, rose.angle + Math.PI / 2, 0.1]}
        >
          <mesh castShadow>
            <sphereGeometry args={[rose.scale, 16, 16]} />
            <meshStandardMaterial color={rose.color} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.01, 0]} rotation={[0.4, 0.3, 0]} castShadow>
            <torusGeometry args={[rose.scale * 0.7, rose.scale * 0.3, 8, 16]} />
            <meshStandardMaterial color={rose.color} roughness={0.32} />
          </mesh>
        </group>
      ))}

      {/* ============================================================ */}
      {/* 6. HERO STYLIZED 3D HUSBAND & WIFE ANNIVERSARY SCULPTURE     */}
      {/* Elevation reaches y = 1.92 (matches Cake #1 plaque top!)     */}
      {/* ============================================================ */}
      <group position={[0, 1.60, 0]}>
        <StylizedCoupleSculpture />
      </group>

      {/* ============================================================ */}
      {/* 7. 4 MINIATURE 3D ROMANTIC ORBITING MOTIFS                   */}
      {/* ============================================================ */}
      <OrbitingRomanticMotifs />
    </group>
  );
}

export default AnniversaryCakeMesh;
