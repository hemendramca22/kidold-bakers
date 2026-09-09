# ADR-003: Decoupled 3D Boundary Architecture

## Context
The long-term vision requires a floating interactive 3D hero cake ("You Imagine. We Bake.") with layer deconstruction (Phase 3 & Phase 4). However, installing Three.js or React Three Fiber in Phase 1 would bloat the initial JavaScript bundle unnecessarily.

## Decision
Create an architectural boundary placeholder: `HeroCakeCanvasPlaceholder.tsx`.
- Matches the exact visual dimensions (`max-w-[480px] aspect-square`).
- Renders an optimized static emblem presentation with ambient CSS glow and hover interaction.
- In Phase 3, this container will dynamically import the Three.js WebGL canvas (`next/dynamic` with `ssr: false`).

## Consequences
- Phase 1 maintains high Core Web Vitals (< 85 KB initial JS).
- Zero refactoring of the hero section layout will be needed when Three.js is introduced in Phase 3.
