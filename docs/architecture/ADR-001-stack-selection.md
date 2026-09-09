# ADR-001: Selection of Next.js 14 App Router, TypeScript, and Tailwind CSS

## Context
KidOld Bakers requires a high-performance web foundation starting as a responsive local bakery showcase (Phase 1) that will progressively evolve into a 3D-interactive, AI-customized ecommerce platform (Phases 2–7).

## Options Considered
1. **Plain React SPA (Vite):** Lightweight for client-side development, but poor out-of-the-box SEO for local search queries in Jaunpur, requires manual routing and meta tagging.
2. **Traditional Multi-Page Website (HTML/Vanilla JS/WordPress):** Quick to stand up, but poorly suited for complex future states such as React Three Fiber canvas layering, client-side customizer state, and headless ecommerce.
3. **Next.js 14 App Router with TypeScript & Tailwind CSS (Chosen):** Hybrid SSR/SSG rendering delivers instant TTFB and perfect SEO for Googlebot while providing modern React component ergonomics, strict type safety, and a unified build pipeline.

## Decision
Adopt Next.js 14 App Router, TypeScript (strict mode), and Tailwind CSS as the primary foundation.

## Consequences & Trade-offs
- **Pros:** Automatic image optimization (`next/image`), seamless JSON-LD injection, modular component boundaries, strict static type checking.
- **Cons:** Slightly steeper learning curve for beginners, which is explicitly mitigated through our Track B (`super_Learning_With_Story_mode`).
