"use client";

import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface KidsCakeMeshProps {
  scrollProgress?: number | React.RefObject<number> | { current: number };
  touchRotation?: number | React.RefObject<number> | { current: number };
}

function getProgress(val: number | React.RefObject<number> | { current: number } | undefined): number {
  if (val === undefined) return 0;
  if (typeof val === "number") return val;
  return val.current ?? 0;
}

const GOLD_COLOR = "#F5C542";

/**
 * Procedural Stylized 3D Child Character Component
 * Styled after the KidOld Bakers logo universe:
 * - Cheerful bakery children
 * - Rounded chibi mascot proportions
 * - Warm expressive faces with smile and rosy cheeks
 * - Coordinated baker toques, aprons, and celebration clothing
 */
function MascotKid({
  role = "cutter",
  orbitRadius = 1.62,
  baseHeight = 0.60,
  speed = 0.65,
  phase = 0,
}: {
  role: "cutter" | "reaching" | "wand" | "plate";
  orbitRadius: number;
  baseHeight: number;
  speed: number;
  phase: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const capeRef = useRef<THREE.Mesh>(null);
  const actionArmRef = useRef<THREE.Group>(null);

  // Stardust trail particles
  const trailParticles = useMemo(() => {
    const pts = [];
    for (let i = 0; i < 5; i++) {
      pts.push({
        offsetY: (Math.random() - 0.5) * 0.10,
        offsetZ: -0.14 - i * 0.08,
        scale: 0.016 + Math.random() * 0.012,
        color: i % 2 === 0 ? "#FFE082" : "#FFF9C4",
      });
    }
    return pts;
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime();
    const angle = time * speed + phase;

    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    const wave = Math.sin(time * 1.8 + phase) * 0.12;
    const y = baseHeight + wave;

    groupRef.current.position.set(x, y, z);

    // Face forward along orbital tangent with dynamic banking into the curve
    const forwardAngle = angle + Math.PI / 2;
    const pitch = Math.sin(time * 1.8 + phase) * 0.08;
    const bank = -0.18;

    groupRef.current.rotation.set(pitch, -forwardAngle + Math.PI, bank, "YXZ");

    // Cape flutter
    if (capeRef.current) {
      capeRef.current.rotation.x = 0.30 + Math.sin(time * 10 + phase) * 0.12;
    }

    // Role-specific action arm subtle movement
    if (actionArmRef.current) {
      if (role === "cutter") {
        // Poised cake-cutting sawing motion
        actionArmRef.current.rotation.x = 0.65 + Math.sin(time * 4) * 0.15;
      } else if (role === "wand") {
        // Magical wand twirl
        actionArmRef.current.rotation.z = 0.4 + Math.sin(time * 3) * 0.2;
      } else if (role === "reaching") {
        // Eager frosting-tasting reach
        actionArmRef.current.rotation.x = 0.8 + Math.sin(time * 2.5) * 0.1;
      }
    }
  });

  return (
    <group ref={groupRef}>
      <group scale={[0.32, 0.32, 0.32]} rotation={[0.15, 0, 0]}>
        {/* ================= HEAD & MASCOT EXPRESSION ================= */}
        <group position={[0, 0.30, 0.14]}>
          {/* Rounded Chibi Head */}
          <mesh castShadow>
            <sphereGeometry args={[0.22, 20, 20]} />
            <meshStandardMaterial color="#FFDFBA" roughness={0.45} />
          </mesh>

          {/* Warm Dark Hair */}
          <mesh position={[0, 0.14, -0.06]} castShadow>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#4E2B16" roughness={0.7} />
          </mesh>

          {/* Pigtails for the Baker Girl (Reaching role) */}
          {role === "reaching" && (
            <>
              <mesh position={[-0.20, 0.12, -0.06]} castShadow>
                <sphereGeometry args={[0.075, 12, 12]} />
                <meshStandardMaterial color="#4E2B16" roughness={0.7} />
              </mesh>
              <mesh position={[0.20, 0.12, -0.06]} castShadow>
                <sphereGeometry args={[0.075, 12, 12]} />
                <meshStandardMaterial color="#4E2B16" roughness={0.7} />
              </mesh>
            </>
          )}

          {/* KidOld Baker Toque / Chef Hat */}
          <group position={[0, 0.18, 0]} rotation={[-0.1, 0, 0]}>
            {/* Hat Band with Gold Rim */}
            <mesh position={[0, 0.02, 0]}>
              <cylinderGeometry args={[0.16, 0.16, 0.05, 20]} />
              <meshStandardMaterial color="#F5F5F5" roughness={0.3} />
            </mesh>
            <mesh position={[0, 0.045, 0]}>
              <cylinderGeometry args={[0.162, 0.162, 0.012, 20]} />
              <meshStandardMaterial color={GOLD_COLOR} roughness={0.16} metalness={0.9} />
            </mesh>
            {/* Puffed Pleated Chef Crown */}
            <mesh position={[0, 0.12, 0]} castShadow>
              <sphereGeometry args={[0.19, 18, 18]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
            </mesh>
          </group>

          {/* Cheerful Smiling Eyes */}
          <mesh position={[-0.075, 0.03, 0.185]}>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshStandardMaterial color="#1E1E1E" roughness={0.1} />
          </mesh>
          <mesh position={[0.075, 0.03, 0.185]}>
            <sphereGeometry args={[0.028, 10, 10]} />
            <meshStandardMaterial color="#1E1E1E" roughness={0.1} />
          </mesh>

          {/* Rosy Blushing Cheeks */}
          <mesh position={[-0.115, -0.035, 0.165]}>
            <sphereGeometry args={[0.035, 10, 10]} />
            <meshStandardMaterial color="#FF8A80" roughness={0.6} />
          </mesh>
          <mesh position={[0.115, -0.035, 0.165]}>
            <sphereGeometry args={[0.035, 10, 10]} />
            <meshStandardMaterial color="#FF8A80" roughness={0.6} />
          </mesh>

          {/* Cheerful Open Smile */}
          <mesh position={[0, -0.065, 0.19]}>
            <cylinderGeometry args={[0.03, 0.01, 0.015, 10]} />
            <meshStandardMaterial color="#D81B60" roughness={0.4} />
          </mesh>
        </group>

        {/* ================= TORSO & BAKERY ATTIRE ================= */}
        <group position={[0, 0.08, 0]}>
          {/* Bakery Shirt (Crimson / Sky Blue / Yellow) */}
          <mesh castShadow>
            <cylinderGeometry args={[0.14, 0.17, 0.32, 16]} />
            <meshStandardMaterial
              color={role === "cutter" ? "#8B1528" : role === "wand" ? "#FFB300" : "#1976D2"}
              roughness={0.35}
            />
          </mesh>
          {/* Crisp White Baker Apron */}
          <mesh position={[0, -0.02, 0.045]}>
            <cylinderGeometry args={[0.145, 0.175, 0.26, 16, 1, false, 0, Math.PI]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} side={THREE.DoubleSide} />
          </mesh>
          {/* Apron Gold KidOld Button */}
          <mesh position={[0, 0.08, 0.155]}>
            <sphereGeometry args={[0.022, 10, 10]} />
            <meshStandardMaterial color={GOLD_COLOR} roughness={0.16} metalness={0.9} />
          </mesh>
        </group>

        {/* Dynamic Celebration Flying Cape */}
        <group position={[0, 0.20, -0.12]}>
          <mesh ref={capeRef} position={[0, -0.18, -0.18]} rotation={[0.35, 0, 0]} castShadow>
            <boxGeometry args={[0.34, 0.44, 0.018]} />
            <meshStandardMaterial
              color={role === "cutter" ? "#D81B60" : role === "wand" ? "#7C4DFF" : "#00B0FF"}
              roughness={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>

        {/* ================= ARMS & ROLE-SPECIFIC PROPS ================= */}
        {/* Left Arm */}
        <group position={[-0.18, 0.14, 0.08]} rotation={[0.5, 0.2, -0.4]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.042, 0.045, 0.24, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.13, 0]} castShadow>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshStandardMaterial color="#FFDFBA" roughness={0.45} />
          </mesh>
        </group>

        {/* Right Arm with Role Action Prop */}
        <group ref={actionArmRef} position={[0.18, 0.14, 0.08]} rotation={[0.6, -0.2, 0.4]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.042, 0.045, 0.24, 12]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.35} />
          </mesh>
          <mesh position={[0, 0.13, 0]} castShadow>
            <sphereGeometry args={[0.045, 10, 10]} />
            <meshStandardMaterial color="#FFDFBA" roughness={0.45} />
          </mesh>

          {/* --- PROP 1: STYLIZED GOLDEN CAKE CUTTER / SERVER --- */}
          {role === "cutter" && (
            <group position={[0, 0.26, 0.06]} rotation={[0.6, 0.4, 0]}>
              {/* Wooden / Ivory Handle */}
              <mesh position={[0, -0.06, 0]}>
                <cylinderGeometry args={[0.016, 0.018, 0.14, 12]} />
                <meshStandardMaterial color="#FFF9EC" roughness={0.3} />
              </mesh>
              {/* 24K Gold Cake Server Blade (triangular spatula) */}
              <mesh position={[0, 0.08, 0]} castShadow>
                <boxGeometry args={[0.08, 0.18, 0.01]} />
                <meshStandardMaterial color={GOLD_COLOR} roughness={0.12} metalness={0.95} />
              </mesh>
            </group>
          )}

          {/* --- PROP 2: GOLDEN STAR CELEBRATION WAND --- */}
          {role === "wand" && (
            <group position={[0, 0.26, 0.04]} rotation={[0.3, 0, 0]}>
              <mesh position={[0, -0.08, 0]}>
                <cylinderGeometry args={[0.01, 0.01, 0.24, 10]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.08, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.08, 0.02, 5]} />
                <meshStandardMaterial
                  color={GOLD_COLOR}
                  roughness={0.14}
                  metalness={0.92}
                  emissive={GOLD_COLOR}
                  emissiveIntensity={0.4}
                />
              </mesh>
            </group>
          )}

          {/* --- PROP 3: MINIATURE SILVER DESSERT PLATTER & CUPCAKE --- */}
          {role === "plate" && (
            <group position={[0, 0.20, 0.08]} rotation={[-0.4, 0, 0]}>
              <mesh castShadow>
                <cylinderGeometry args={[0.12, 0.10, 0.016, 20]} />
                <meshStandardMaterial color="#E0E0E0" roughness={0.15} metalness={0.9} />
              </mesh>
              {/* Mini Cupcake with Berry */}
              <mesh position={[0, 0.03, 0]} castShadow>
                <cylinderGeometry args={[0.045, 0.035, 0.04, 12]} />
                <meshStandardMaterial color="#FF4081" roughness={0.3} />
              </mesh>
              <mesh position={[0, 0.065, 0]}>
                <sphereGeometry args={[0.022, 10, 10]} />
                <meshStandardMaterial color="#D50000" roughness={0.2} />
              </mesh>
            </group>
          )}
        </group>

        {/* ================= FLYING LEGS & SNEAKERS ================= */}
        <group position={[-0.08, -0.16, -0.06]} rotation={[-0.6, 0, -0.1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.048, 0.042, 0.24, 12]} />
            <meshStandardMaterial color="#1E88E5" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.12, 0.04]} castShadow>
            <boxGeometry args={[0.065, 0.05, 0.12]} />
            <meshStandardMaterial color="#D81B60" roughness={0.3} />
          </mesh>
        </group>
        <group position={[0.08, -0.16, -0.06]} rotation={[-0.4, 0, 0.15]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.048, 0.042, 0.24, 12]} />
            <meshStandardMaterial color="#1E88E5" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.12, 0.04]} castShadow>
            <boxGeometry args={[0.065, 0.05, 0.12]} />
            <meshStandardMaterial color="#D81B60" roughness={0.3} />
          </mesh>
        </group>

        {/* Stardust Trail */}
        <group position={[0, 0, -0.22]}>
          {trailParticles.map((pt, idx) => (
            <mesh key={idx} position={[0, pt.offsetY, pt.offsetZ]}>
              <octahedronGeometry args={[pt.scale, 0]} />
              <meshStandardMaterial
                color={pt.color}
                roughness={0.15}
                metalness={0.8}
                emissive={pt.color}
                emissiveIntensity={0.6}
              />
            </mesh>
          ))}
        </group>
      </group>
    </group>
  );
}

/**
 * OrbitingKidsCrew (3–4 Mascot Children Orbiting around Kids Cake)
 * 1. Master Baker Kid holding Golden Cake Cutter poised to cut
 * 2. Baker Girl eagerly reaching forward to taste frosting
 * 3. Celebration Kid with Golden Star Wand waving joyfully
 * 4. Treat-Bearer Kid carrying miniature dessert platter
 */
function OrbitingKidsCrew() {
  return (
    <>
      {/* 1. Kid with Cake Cutter */}
      <MascotKid role="cutter" orbitRadius={1.58} baseHeight={0.48} speed={0.68} phase={0} />
      {/* 2. Kid Reaching / Tasting */}
      <MascotKid role="reaching" orbitRadius={1.72} baseHeight={0.88} speed={0.62} phase={Math.PI / 2} />
      {/* 3. Celebration Kid with Star Wand */}
      <MascotKid role="wand" orbitRadius={1.62} baseHeight={1.22} speed={0.66} phase={Math.PI} />
      {/* 4. Treat-Bearer with Platter */}
      <MascotKid role="plate" orbitRadius={1.68} baseHeight={0.62} speed={0.64} phase={(3 * Math.PI) / 2} />
    </>
  );
}

/**
 * KidsCakeMesh (Cake #2)
 * High-Craft Kids Celebration Cake.
 * - Perfectly aligned height envelope (Platter y=0 to Crown Topper y=1.90) matching Cake #1.
 * - Layered fondant craftsmanship (scalloped pennants, vertical candy stripes, cloud puffs).
 * - Buoyant 3D balloon cluster topper with glowing golden star.
 * - 4 stylized KidOld mascot-inspired child characters enacting a celebratory cake-cutting story.
 */
export function KidsCakeMesh({ scrollProgress = 0, touchRotation = 0 }: KidsCakeMeshProps) {
  const rootGroup = useRef<THREE.Group>(null);
  const enterScale = useRef(0.60);

  // Pre-generate colorful rainbow candy pearls around Tier 1 base rim
  const baseCandyPearls = useMemo(() => {
    const pearls = [];
    const colors = ["#FF5252", "#FF4081", "#E040FB", "#7C4DFF", "#536DFE", "#40C4FF", "#69F0AE", "#FFD740", "#FF6E40"];
    const count = 40;
    const radius = 1.14;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      pearls.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        color: colors[i % colors.length],
        scale: 0.042 + (i % 3) * 0.008,
      });
    }
    return pearls;
  }, []);

  // Pre-generate 3D Marshmallow Cloud Puffs clustered around Tier 2 base
  const cloudPuffs = useMemo(() => {
    const puffs = [];
    const count = 16;
    const radius = 0.84;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      puffs.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
        scale: 0.088 + (i % 3) * 0.016,
        rotationY: angle,
      });
    }
    return puffs;
  }, []);

  // Pre-generate French Macarons on tier ledges
  const macarons = useMemo(() => {
    return [
      { angle: 0.35, r: 0.98, y: 0.70, color: "#FF80AB" },
      { angle: 1.55, r: 0.96, y: 0.70, color: "#80D8FF" },
      { angle: 2.85, r: 0.98, y: 0.70, color: "#CCFF90" },
      { angle: 4.15, r: 0.96, y: 0.70, color: "#FFE57F" },
      { angle: 5.35, r: 0.98, y: 0.70, color: "#EA80FC" },
      // Tier 2 ledges
      { angle: 0.90, r: 0.68, y: 1.18, color: "#FF80AB" },
      { angle: 3.20, r: 0.66, y: 1.18, color: "#FFE57F" },
      { angle: 5.10, r: 0.68, y: 1.18, color: "#80D8FF" },
    ];
  }, []);

  // Buoyant Celebration Balloons
  const balloons = useMemo(() => {
    return [
      { x: 0, y: 0.16, z: 0, scale: 0.16, color: "#FF4081" },
      { x: -0.15, y: 0.22, z: 0.06, scale: 0.14, color: "#00E5FF" },
      { x: 0.14, y: 0.23, z: 0.04, scale: 0.145, color: "#FFD600" },
      { x: 0.05, y: 0.29, z: -0.09, scale: 0.15, color: "#76FF03" },
      { x: -0.09, y: 0.30, z: -0.04, scale: 0.135, color: "#D500F9" },
    ];
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
      {/* 1. SCALLOPED CERAMIC & GOLD TURNTABLE PLATTER                */}
      {/* Exactly matches Cake #1 elevation (y = 0.00 to 0.20)         */}
      {/* ============================================================ */}
      <group position={[0, 0, 0]}>
        {/* Step 1: Base Rim */}
        <mesh position={[0, 0.03, 0]} receiveShadow>
          <cylinderGeometry args={[1.16, 1.28, 0.06, 64]} />
          <meshStandardMaterial color="#00897B" roughness={0.3} metalness={0.2} />
        </mesh>
        {/* Step 2: 24K Gold Collar */}
        <mesh position={[0, 0.075, 0]}>
          <cylinderGeometry args={[0.98, 1.10, 0.05, 64]} />
          <meshStandardMaterial color={GOLD_COLOR} roughness={0.16} metalness={0.92} />
        </mesh>
        {/* Step 3: Scalloped Upper Platter */}
        <mesh position={[0, 0.125, 0]} receiveShadow>
          <cylinderGeometry args={[1.30, 1.34, 0.05, 64]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.25} />
        </mesh>
        {/* Step 4: Golden Turntable Lip */}
        <mesh position={[0, 0.165, 0]}>
          <cylinderGeometry args={[1.28, 1.32, 0.03, 64]} />
          <meshStandardMaterial color={GOLD_COLOR} roughness={0.16} metalness={0.92} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 2. TIER 1 — SKY BLUE CELEBRATION CARNIVAL BASE               */}
      {/* Elevation matches Cake #1 Tier 1: Center y = 0.44, H = 0.48  */}
      {/* ============================================================ */}
      <group position={[0, 0.44, 0]}>
        {/* Main Pastel Sky Blue Fondant Tier */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.12, 1.14, 0.48, 48]} />
          <meshStandardMaterial color="#4FC3F7" roughness={0.38} metalness={0.06} />
        </mesh>

        {/* Candy Pearls along base rim */}
        {baseCandyPearls.map((p, idx) => (
          <mesh key={`candy-pearl-${idx}`} position={[p.x, -0.23, p.z]} castShadow>
            <sphereGeometry args={[p.scale, 14, 14]} />
            <meshStandardMaterial color={p.color} roughness={0.25} metalness={0.2} />
          </mesh>
        ))}

        {/* 3D Scalloped White Icing Swags along Tier 1 Top Rim */}
        {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].map((angle, idx) => (
          <group key={`swag-${idx}`} position={[0, 0.20, 0]} rotation={[0, angle, 0]}>
            <mesh position={[1.13, -0.06, 0]} rotation={[0.3, 0, 0]}>
              <torusGeometry args={[0.22, 0.024, 10, 24, Math.PI]} />
              <meshStandardMaterial color="#FFFDF9" roughness={0.32} />
            </mesh>
          </group>
        ))}

        {/* Colorful Pastel Celebration Pennant Bunting */}
        {[
          { angle: 0.18, y: 0.04, col: "#FF4081" },
          { angle: 0.75, y: -0.02, col: "#FFD600" },
          { angle: 1.35, y: 0.05, col: "#76FF03" },
          { angle: 2.05, y: -0.03, col: "#FF6E40" },
          { angle: 2.65, y: 0.04, col: "#E040FB" },
          { angle: 3.45, y: -0.02, col: "#FFD600" },
          { angle: 4.15, y: 0.05, col: "#00E5FF" },
          { angle: 4.85, y: -0.03, col: "#FF4081" },
          { angle: 5.55, y: 0.04, col: "#76FF03" },
        ].map((dot, idx) => (
          <mesh
            key={`confetti-${idx}`}
            position={[Math.cos(dot.angle) * 1.135, dot.y, Math.sin(dot.angle) * 1.135]}
            rotation={[0, -dot.angle + Math.PI / 2, 0]}
          >
            <cylinderGeometry args={[0.045, 0.045, 0.012, 16]} />
            <meshStandardMaterial color={dot.col} roughness={0.3} />
          </mesh>
        ))}
      </group>

      {/* French Macarons on Tier Ledges */}
      {macarons.map((m, idx) => (
        <group
          key={`macaron-${idx}`}
          position={[Math.cos(m.angle) * m.r, m.y, Math.sin(m.angle) * m.r]}
          rotation={[0.1, m.angle, 0.15]}
        >
          <mesh position={[0, 0.02, 0]} castShadow>
            <sphereGeometry args={[0.065, 14, 14]} />
            <meshStandardMaterial color={m.color} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.062, 0.062, 0.016, 16]} />
            <meshStandardMaterial color="#FFFDF7" roughness={0.4} />
          </mesh>
          <mesh position={[0, -0.02, 0]} castShadow>
            <sphereGeometry args={[0.065, 14, 14]} />
            <meshStandardMaterial color={m.color} roughness={0.35} />
          </mesh>
        </group>
      ))}

      {/* ============================================================ */}
      {/* 3. TIER 2 — BUTTERCUP STRIPES & MARSHMALLOW CLOUDS          */}
      {/* Elevation matches Cake #1 Tier 2: Center y = 0.94, H = 0.44  */}
      {/* ============================================================ */}
      <group position={[0, 0.94, 0]}>
        {/* Main Buttercup Fondant Tier */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.82, 0.84, 0.44, 40]} />
          <meshStandardMaterial color="#FFE082" roughness={0.36} metalness={0.04} />
        </mesh>

        {/* Vertical Strawberry Cream Candy Fluted Stripes */}
        {[0, Math.PI / 6, Math.PI / 3, Math.PI / 2, (2 * Math.PI) / 3, (5 * Math.PI) / 6, Math.PI, (7 * Math.PI) / 6, (4 * Math.PI) / 3, (3 * Math.PI) / 2, (5 * Math.PI) / 3, (11 * Math.PI) / 6].map((angle, idx) => (
          <mesh
            key={`stripe-${idx}`}
            position={[Math.cos(angle) * 0.835, 0, Math.sin(angle) * 0.835]}
            rotation={[0, -angle + Math.PI / 2, 0]}
          >
            <boxGeometry args={[0.045, 0.44, 0.012]} />
            <meshStandardMaterial color="#FF8DA1" roughness={0.32} />
          </mesh>
        ))}

        {/* Sculpted 3D Marshmallow Cloud Puffs along base */}
        {cloudPuffs.map((c, idx) => (
          <group key={`cloud-${idx}`} position={[c.x, -0.19, c.z]} rotation={[0, c.rotationY, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[c.scale, 16, 16]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.4} />
            </mesh>
            <mesh position={[0.05, 0.02, 0]} castShadow>
              <sphereGeometry args={[c.scale * 0.8, 14, 14]} />
              <meshStandardMaterial color="#FFF9FA" roughness={0.4} />
            </mesh>
            <mesh position={[-0.05, 0.01, 0]} castShadow>
              <sphereGeometry args={[c.scale * 0.75, 14, 14]} />
              <meshStandardMaterial color="#F8F9FA" roughness={0.4} />
            </mesh>
          </group>
        ))}
      </group>

      {/* ============================================================ */}
      {/* 4. TIER 3 — BUBBLEGUM LILAC RAINBOW CONFECTION               */}
      {/* Elevation matches Cake #1 Tier 3: Center y = 1.40, H = 0.40  */}
      {/* ============================================================ */}
      <group position={[0, 1.40, 0]}>
        {/* Main Bubblegum Lilac Tier */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.54, 0.56, 0.40, 36]} />
          <meshStandardMaterial color="#CE93D8" roughness={0.34} metalness={0.06} />
        </mesh>

        {/* Whipped Rainbow Cream Swirls on Top Rim */}
        {[0, Math.PI / 4, Math.PI / 2, (3 * Math.PI) / 4, Math.PI, (5 * Math.PI) / 4, (3 * Math.PI) / 2, (7 * Math.PI) / 4].map((angle, idx) => {
          const colors = ["#FF4081", "#FFD740", "#40C4FF", "#69F0AE"];
          return (
            <mesh
              key={`cream-dollop-${idx}`}
              position={[Math.cos(angle) * 0.48, 0.20, Math.sin(angle) * 0.48]}
              castShadow
            >
              <sphereGeometry args={[0.048, 12, 12]} />
              <meshStandardMaterial color={colors[idx % colors.length]} roughness={0.3} />
            </mesh>
          );
        })}
      </group>

      {/* ============================================================ */}
      {/* 5. CROWN TOPPER — BALLOON CLUSTER & 24K GOLD STAR            */}
      {/* Elevation reaches y = 1.90 (matches Cake #1 plaque top!)     */}
      {/* ============================================================ */}
      <group position={[0, 1.60, 0]}>
        {/* Floating Celebration Balloons */}
        {balloons.map((b, idx) => (
          <group key={`balloon-${idx}`} position={[b.x, b.y, b.z]}>
            {/* Balloon Body */}
            <mesh castShadow>
              <sphereGeometry args={[b.scale, 20, 20]} />
              <meshStandardMaterial color={b.color} roughness={0.18} metalness={0.15} />
            </mesh>
            {/* Balloon Knot */}
            <mesh position={[0, -b.scale * 0.95, 0]}>
              <coneGeometry args={[0.022, 0.035, 10]} />
              <meshStandardMaterial color={b.color} roughness={0.3} />
            </mesh>
            {/* Fine Gold String */}
            <mesh position={[0, -b.scale * 0.95 - 0.10, 0]}>
              <cylinderGeometry args={[0.003, 0.003, 0.20, 6]} />
              <meshStandardMaterial color={GOLD_COLOR} roughness={0.2} metalness={0.8} />
            </mesh>
          </group>
        ))}

        {/* Centered Glowing 3D Golden Celebration Star */}
        <group position={[0, 0.20, 0.04]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.13, 0.13, 0.032, 5]} />
            <meshStandardMaterial
              color={GOLD_COLOR}
              roughness={0.14}
              metalness={0.92}
              emissive="#D4A237"
              emissiveIntensity={0.45}
            />
          </mesh>
          <mesh position={[0, -0.10, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.18, 8]} />
            <meshStandardMaterial color="#E5B338" roughness={0.2} metalness={0.85} />
          </mesh>
        </group>
      </group>

      {/* ============================================================ */}
      {/* 6. 4 MASCOT BAKERY CHILDREN ORBITING & CAKE CUTTING SCENE    */}
      {/* ============================================================ */}
      <OrbitingKidsCrew />
    </group>
  );
}

export default KidsCakeMesh;
