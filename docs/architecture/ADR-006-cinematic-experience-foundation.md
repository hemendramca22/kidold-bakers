# ADR-006: Incremental cinematic experience foundation

## Status

Accepted for the first cinematic increment on 2026-09-08.

## Decision

Cinematic motion is added as small, section-scoped scenes. Each scene must be deterministic from scroll progress, reversible, disabled for reduced motion, and fully cleaned up when its component unmounts.

WebGL remains opt-in. `LazyHeroCakeScene` keeps the current image/HTML presentation as the default and requests the procedural Three.js scene only when explicitly enabled and near the viewport. Future GLB assets live under `/public/models` and must preserve a static poster fallback.

## First increment

The homepage hero receives a restrained camera push on desktop: the product photograph moves slightly closer while the copy recedes as the visitor scrolls through the hero. It uses existing assets and GSAP, adds no new dependency, and leaves all controls outside the animated ownership boundary.

## Guardrails

- Do not pin the page or mount WebGL until the baseline interaction suite remains green.
- Do not animate controls, navigation hit targets, or layout dimensions with scroll.
- Keep scene selectors inside their section scope.
- Run typecheck, lint, build, first-load interaction checks, and reduced-motion checks after every meaningful scene change.
