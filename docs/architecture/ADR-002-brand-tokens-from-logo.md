# ADR-002: Semantic Design Tokens Derived from Master Logo

## Context
KidOld Bakers possesses a distinctive master logo featuring a child and grandfather holding a handcrafted cake inside a scalloped crimson and gold seal. Generic bakery templates often use cold grays or trendy neon gradients that break brand cohesion.

## Decision
Extract all color values, curvatures, and elevation shadows directly from the master emblem (`kidold Logo.jpeg`):
- Chocolate (`#2C1810`): Derived from the central ribbon banner.
- Crimson (`#8B1528`): Derived from the scalloped wax-seal outer ring.
- Gold (`#C89D3C` / `#F5C542`): Derived from the metallic bezel and floating sparkle hearts.
- Cream (`#FFFDF7` / `#FBF5EB`): Derived from the warm ambient vanilla background.
- Confectionery Radii: `rounded-2xl`, `rounded-3xl`, and `rounded-full`.
- Warm Shadows: `rgba(44, 24, 16, 0.08)` replacing cold neutral grays.

## Consequences
Every UI element across the platform maintains authentic brand consistency and emotional warmth.
