# KidOld Bakers — Comprehensive Project Checkpoint & Handoff Guide

> **CRITICAL INSTRUCTION FOR ALL FUTURE AGENTS & SESSIONS:**
> **STRICT ZERO-REGRESSION POLICY**: All existing code, UI styling, tactile skeuomorphism, dark mode metallic gold tokens, procedural 3D cake meshes, 4-step customizer workflows, and responsive behaviors are **STRICTLY FROZEN**. Under NO circumstances should any future session refactor, remove, redesign, or regress existing working functionality. Future development must strictly build upon this foundation.

---

## 1. Project Overview & Production State

- **Brand**: **KidOld Bakers** (Artisan Bakery & Custom Celebration Cakes in Jaunpur, Uttar Pradesh).
- **Tagline**: *"You Imagine. We Bake."* / *"A celebration, made personal."*
- **Live Production URL**: [https://kidold-bakers.vercel.app](https://kidold-bakers.vercel.app)
- **GitHub Repository**: [https://github.com/hemendramca22/kidold-bakers.git](https://github.com/hemendramca22/kidold-bakers)
- **Primary Branch**: `main`
- **Current Production Commit**: `c5eb7fc`
- **Local Dev Server**: `http://localhost:3000` (Local Network: `http://192.168.1.2:3000`)

---

## 2. Technology Stack & Dependencies

| Layer | Technology | Version | Purpose / Notes |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | `14.2.15` / `14.2.35` | SSR/SSG, Static Prerendering, Optimized Image pipeline |
| **Runtime** | React / React DOM | `18.3.1` | Client & Server Components, React Suspense |
| **Language** | TypeScript | `5.6.3` | Strict type checking (`npm run typecheck`) |
| **Styling** | Tailwind CSS | `3.4.14` | Extended theme tokens, custom skeuomorphic shadows |
| **PostCSS / CSS** | PostCSS / Autoprefixer | `8.4.47` / `10.4.20` | Native CSS variables, glassmorphism, 3D bullion gold gradients |
| **3D Engine** | Three.js | `0.169.0` | WebGL procedural mesh geometry, lighting, textures |
| **React 3D** | `@react-three/fiber` | `8.17.10` | Declarative R3F Canvas, `useFrame`, `useLoader` |
| **3D Helpers** | `@react-three/drei` | `9.114.0` | `ContactShadows`, procedural lighting rigs |
| **Animation** | GSAP + ScrollTrigger | `3.15.0` | Scroll-driven 360° turntable scrub, card entrance, heading reveals |
| **Typography** | `next/font/google` | Built-in | Playfair Display (`--font-playfair`) & Plus Jakarta Sans (`--font-jakarta`) |
| **Deployment** | Vercel CLI | `59.14.0` | Production CI/CD connected to GitHub `main` branch |

---

## 3. Directory Layout & Key Files

```
g:/Different KidOld-Bakers/
├── .next/                                  # Next.js production build artifacts
├── docs/                                   # Documentation and docx generators
├── public/                                 # Static assets (brand logos, product photography, icons)
│   └── images/
│       ├── brand/                          # kidold-logo-clean.png, etc.
│       ├── cake/                           # Cake textures and procedural asset images
│       └── products/                       # Signature cake catalog photography
├── scripts/
│   ├── patch-next-dev-chunk-race.mjs       # CRITICAL: Fixes Next.js dev server chunk race condition on Windows
│   ├── verify-ui-revamp.mjs                # Master regression test suite (191 tests across 15 suites)
│   ├── verify-cold-start.mjs               # Cold-start compilation and chunk delivery test
│   ├── verify-wizard.js                    # Step 1-4 customizer wizard logic tests
│   └── verify-catalog-service.js           # Signature cakes category & filter tests
├── src/
│   ├── app/
│   │   ├── design-my-cake/page.tsx         # Standalone full-page cake customizer route
│   │   ├── globals.css                     # App-wide CSS tokens, skeuomorphic shadows, metallic gold, anti-pull-to-refresh
│   │   ├── layout.tsx                      # Root layout, font definitions, anti-FOUC theme script, JSON-LD SEO
│   │   ├── page.tsx                        # Flagship single-page confectionery showcase
│   │   ├── robots.ts                       # Search engine crawler instructions
│   │   └── sitemap.ts                      # XML sitemap generator
│   ├── components/
│   │   ├── features/cake-customizer/
│   │   │   ├── CakeReferenceSection.tsx    # Step 4 blueprint generator (Option A / Option B, photo toggle)
│   │   │   └── DesignCakeWidgetModal.tsx   # 4-step interactive modal cake customizer studio
│   │   ├── icons/index.tsx                 # Bespoke SVG icons: CakeStudioIcon, FreshBakerIcon, WhatsAppIcon, etc.
│   │   ├── layout/
│   │   │   ├── Footer.tsx                  # Brand footer, store hours, local Jaunpur address, social links
│   │   │   ├── MobileActionDock.tsx        # Persistent 3-button mobile dock: Call (dialer green), Logo, Up Arrow
│   │   │   ├── MobileNav.tsx               # Slide-out glass drawer navigation with tactile buttons
│   │   │   └── Navbar.tsx                  # Fixed glass pill navbar, symmetric single-line items, ThemeToggle, CTAs
│   │   ├── sections/
│   │   │   ├── CategorySection.tsx         # 6 interactive confectionery categories with tactile cards
│   │   │   ├── CustomCakeTeaser.tsx        # 4-step visual preview of the bespoke cake design studio
│   │   │   ├── HeroSection.tsx             # Master GSAP pinning section (1200px scrub, delayed card reveal)
│   │   │   ├── LocalBusinessSection.tsx    # Dual equal-height cards: Store pickup details & interactive Google Map
│   │   │   ├── SignatureSection.tsx        # Shuffled signature cakes catalog with category tabs & WhatsApp ordering
│   │   │   ├── StorySection.tsx            # KidOld heritage story with 3D metallic gold value pillars
│   │   │   ├── TrustBadges.tsx             # 4 value pillars: 100% Eggless, Artisan Crafted, Fresh, Premium
│   │   │   └── hero/
│   │   │       ├── HeroAtmosphere.tsx      # Ambient radial bakery gradients and lighting backdrop
│   │   │       ├── HeroCakeMesh.tsx        # Masterpiece 3D procedural celebration cake (3 tiers, tools, berries)
│   │   │       ├── HeroCakeScene.tsx       # R3F Canvas boundary, studio lighting rig, height-aware CameraRig
│   │   │       └── HeroProductStage.tsx    # Client-side 3D stage with module preloading & WebGL fallback
│   │   ├── theme/
│   │   │   ├── ThemeProvider.tsx           # Context provider for light/dark mode persistence
│   │   │   └── ThemeToggle.tsx             # Skeuomorphic embossed toggle with glowing sun halo
│   │   └── ui/
│   │       ├── Button.tsx                  # Primary (crimson), secondary, gold, whatsapp, outline, ghost buttons
│   │       ├── Card.tsx                    # Glassmorphic and skeuomorphic tactile containers
│   │       ├── CardTiltWrapper.tsx         # GSAP 3D cursor perspective card tilt
│   │       └── SectionHeading.tsx          # Consistent section title typography with animated gold dividers
│   ├── data/
│   │   ├── business.ts                     # Single source of truth for business contact, address, hours
│   │   ├── categories.ts                   # Cake and confectionery categories data
│   │   └── products.ts                     # Signature cakes catalog data with prices and flavor descriptions
│   └── lib/
│       ├── motion.ts                       # GSAP registration, `shouldReduceMotion`, `smoothScrollTo`
│       ├── utils.ts                        # `cn()` clsx + tailwind-merge helper
│       └── whatsapp.ts                     # Formatted WhatsApp inquiry and blueprint order URL generator
├── package.json                            # Scripts, dependencies, postinstall patch hook
├── tailwind.config.ts                      # Brand color tokens, skeuomorphic box shadows, fonts
└── tsconfig.json                           # TypeScript path aliases (`@/*` -> `./src/*`)
```

---

## 4. Current Working Features & UI Behaviors

### A. Flagship 3D Hero Section & Turntable Cake
- **Full Viewport 3D Canvas**: Renders a rich, multi-tiered procedural artisan cake mounted on a 24K gold and Carrara marble turntable platter.
- **Scroll-Driven 360° Scrubbing**:
  - The hero section is pinned with GSAP ScrollTrigger for 1200px of scroll distance.
  - From progress `0.00` to `0.70`, the user enjoys an unobstructed 360° inspection of the rotating cake.
  - At progress `0.70`, the hero overlay card (*"A celebration, made personal"*) slides up into view.
- **Immediate Touch Rotation**: Rotation uses snappy `damp(..., 14.0, delta)` and `scrub: 0.2` with `pointer-events-none` on the canvas container, guaranteeing instant rotation on mobile swipe down with zero gesture latency.
- **Height-Aware Laptop Framing**: On 13-inch and compact laptop viewports (heights 550px–740px), the camera dynamically dollies back (`baseZ = 6.34`, `baseY = 0.76`, `lookAt(0, 0.66, 0)`), ensuring the top berries, turntable platter, and brass base stand are 100% visible with ~20% breathing room top and bottom.

### B. Fixed Glass Navbar & Symmetric Navigation
- **Fixed Top Positioning**: `<header className="fixed top-0 inset-x-0 z-40">` stays out of normal document flow, allowing the hero section to start at `top: 0` without negative margins (`mt-0`).
- **Strictly Symmetric Center Pill**:
  - 5 nav links: `Signature Cakes`, `Categories`, `Design My Cake`, `Our Story`, `Visit Us`.
  - All items use `whitespace-nowrap inline-flex items-center justify-center leading-none h-8 2xl:h-9` so two-word links NEVER wrap onto 2 lines on 13-inch laptop screens (1280px–1366px).
  - Active item uses dark chocolate / 24K bullion gold medallion styling with tactile depression physics.
- **Quick Action CTAs**:
  - `WhatsApp Order`: Direct link pre-filled with inquiry greeting.
  - `Design My Cake`: Smooth scrolls to the 4-step customizer section.
  - `ThemeToggle`: Switches between light cream mode and dark cocoa mode with zero layout shift.

### C. Persistent Mobile 3-Button Action Dock
- **Always Visible**: Floats at the bottom-left on mobile screens (`sm:hidden`) from scroll position 0.
- **Strictly 3 Buttons**:
  1. **Dialer Green Call Button**: Prominent green gradient (`btn-dialer-green`) with telephone icon for instant 1-tap phone calls (`tel:+918887889397`).
  2. **3D Domed KidOld Logo Medallion**: Center convex circular button (`medallion-convex-3d`) featuring the KidOld Bakers logo with full bleed and spherical shine.
  3. **Up Arrow Button**: Smooth scrolls the page back to the top (`#hero`).
- **Expanded Quick Action Sheet**: Tapping the logo/sheet reveals quick shortcuts to WhatsApp, Directions, and Cake Customizer.

### D. Signature Cakes Catalog with Dynamic Shuffle
- **Catalog Filtering**: Filter by `All`, `Birthday`, `Anniversary`, `Chocolate`, `Fruit & Berry`, `Eggless`.
- **Lively Catalog Shuffle**: Clicking any filter tab (even clicking the already active tab repeatedly) triggers a pseudo-random array reshuffle with animated transitions, providing a fresh storefront experience.
- **Order on WhatsApp**: Each product card features a 1-tap WhatsApp button with pre-filled cake name, weight, and price.

### E. 4-Step Bespoke "Design My Cake" Customizer Studio
- Available both as an on-page teaser section and as a full-screen interactive modal / standalone route (`/design-my-cake`).
- **Step 1: Occasion**: Birthday, Anniversary, Kids Theme, Luxury Celebration, etc.
- **Step 2: Flavor & Tier**: Sponge flavor, buttercream frosting, tier selection (1, 2, or 3 tiers).
- **Step 3: Size & Dietary**: Weight in kg, 100% Eggless pure veg toggle, custom message on cake.
- **Step 4: Blueprint & WhatsApp Dispatch**:
  - **No Pre-selection**: Arrives with neither Option A nor Option B pre-selected.
  - **Option A**: Upload reference photo / cake blueprint.
  - **Option B / Direct Option**: "Send blueprint without photo" selection.
  - **WhatsApp CTA**: Centered text *"Send Blueprint to KidOld Bakers on WhatsApp"* styled in 3D metallic gold surface (NEVER green; green is reserved exclusively for the phone call dialer button). The button remains disabled until the user confirms their selection.

### F. Dark Mode Confectionery Color System
- **Light Mode**: Rich French vanilla cream background (`#FFFDF7`), warm chocolate typography (`#2C1810`), 24K gold accents (`#C89D3C`), and raspberry crimson buttons (`#8B1528`).
- **Dark Mode**: Dark cocoa truffle background (`#120905`), ivory text (`#FFFDF7`), and authentic **brushed 24K bullion gold** surface tokens with physical 4px embossed ledges (`.metallic-gold-surface`). No muddy brown tones.

---

## 5. 3D Procedural Cake Implementation & Loading Architecture

### Procedural Mesh Breakdown (`HeroCakeMesh.tsx`)
The cake does NOT rely on heavy external `.gltf`/`.glb` 3D files. It is procedurally modeled using Three.js mathematical primitives, keeping the initial bundle light:
1. **Turntable Platter Base**: Stepped 24K polished brass base collar, fluted brass stem, and a Carrara marble turntable disc with gold mirror bevel edge.
2. **Tier 1 (Vanilla Foundation)**: French vanilla buttercream cylinder with horizontal fondant seams, 40 golden pearl dragées, and front 3D embossed gold *"Kidold Bakers"* cursive typography (generated via in-memory canvas texture).
3. **Tier 2 (Belgian Dark Chocolate)**: Glossy chocolate mirror glaze cap, 28 organic chocolate ganache drips, and circular KidOld Bakers logo emblem in a gold bezel.
4. **Tier 3 (Ivory Chantilly)**: Caramel glaze drips, miniature 3D gold tools (French wire whisk, rolling pin, pastry piping bag, mixing bowl), and 24K gold feather plumes.
5. **Crown Topper**: Gourmet fresh berry cluster (sculpted raspberries, blueberries, blackberries), emerald mint leaves, whipped Chantilly dollops, and standing 24K gold dark chocolate plaque.
6. **Floating Flakes**: 20 orbiting 24K edible gold leaf flakes rotating with gentle counter-oscillation.

### Fast Loading & Anti-Waterfall Architecture
To eliminate the 1–2 second "Loading 3D Craft..." delay on mobile:
1. **Module Evaluation Preloading** (`HeroProductStage.tsx`):
   ```ts
   const loadHeroCakeScene = () => import("./HeroCakeScene").then((mod) => mod.HeroCakeScene);
   if (typeof window !== "undefined") {
     loadHeroCakeScene(); // Pre-warms chunk concurrently with React hydration
   }
   const HeroCakeScene = dynamic(loadHeroCakeScene, { ssr: false, loading: ... });
   ```
2. **Head Asset Preloading** (`layout.tsx`):
   `<link rel="preload" href="/images/brand/kidold-logo-clean.png" as="image" />` initiates image download during initial HTML streaming.
3. **Texture Pre-warming** (`HeroCakeScene.tsx`):
   `useLoader.preload(THREE.TextureLoader, "/images/brand/kidold-logo-clean.png")` decodes the logo texture ahead of time, preventing React Suspense render blocks.

---

## 6. Critical Bugs Solved & Root Cause Analysis

### Bug 1: Cold First-Load Infinite "Loading 3D Craft..." / ChunkLoadError on Windows
- **Symptom**: On initial fresh load after `npm run dev`, localhost:3000 would get stuck on "Loading 3D Craft..." or throw `ChunkLoadError: Loading chunk app/layout failed`. A manual browser refresh fixed it.
- **Root Cause**: On Windows NTFS, Next.js 14 dev server's `serveStatic` and `fileExists` handled incoming browser chunk requests while webpack was still mid-write. Returning 404 or a 0-byte file corrupted the browser's dynamic import promise.
- **Permanent Fix**: Implemented `scripts/patch-next-dev-chunk-race.mjs`, registered as a `postinstall` hook in `package.json`. It patches Next.js's internal `fileExists` and `serveStatic` to poll for up to 3 seconds until chunk files have non-zero size before responding.

### Bug 2: 13-Inch Laptop Navbar Link Wrapping & Symmetry Loss
- **Symptom**: On 13-inch laptop viewports (1280px–1366px), nav links like "Signature Cakes" wrapped into 2 lines, becoming tall pills, while "Categories" remained 1 line.
- **Root Cause**: Nav link buttons lacked `whitespace-nowrap`, had large padding (`px-4 py-2`), and forced `xl:text-sm` (14px).
- **Fix**: Added `whitespace-nowrap inline-flex items-center justify-center leading-none h-8 2xl:h-9` and responsive padding (`px-3 xl:px-3.5 2xl:px-4 text-xs 2xl:text-sm`), plus `shrink-0` on logo and right CTA containers.

### Bug 3: 3D Cake Stand Vertical Cutoff on 13-Inch Screens
- **Symptom**: Platter base and brass stand were cut off by the taskbar/bottom edge on laptop screens.
- **Root Cause**: `HeroSection.tsx` had `min-h-[640px]`, which overflowed the ~600px visible height of short laptop viewports, pushing 40px off-screen under `overflow-hidden`. Camera distance `5.6` was too tight for wide aspect ratios.
- **Fix**: Lowered minimum height to `min-h-[540px] sm:min-h-[580px] lg:min-h-[640px]`. Implemented height-aware camera framing in `HeroCakeScene.tsx` (`baseZ = 6.34`, `baseY = 0.76`, `lookAt(0, 0.66, 0)`) for viewport heights under 740px.

### Bug 4: Disappearing "Design My Cake" Button on iPhone 13 Mini
- **Symptom**: On iPhone 13 Mini, when scrolling to reveal the hero card, the button rendered with a white/transparent background, making white text illegible.
- **Root Cause**: Button relied solely on `bg-gradient-to-b` without a solid background fallback. WebKit's compositor dropped intermediate gradient layers when rendered inside a parent with `backdrop-blur-xl` and GSAP transforms.
- **Fix**: Added solid `bg-[#8B1528]`, `isolate`, and `[transform:translateZ(0)]` to `Button.tsx` and `HeroSection.tsx`, forcing WebKit to create an independent composite layer.

### Bug 5: Mobile Accidental Page Reloads (Pull-to-Refresh)
- **Symptom**: Scrolling up and down near the top of the mobile screen triggered native browser pull-to-refresh reloads.
- **Fix**: Added `overscroll-behavior-y: none;` to `html` and `body` in `globals.css`.

### Bug 6: Mobile Scroll-Through & Sudden Scroll Jump
- **Symptom**: On mobile first load, swiping down scrolled content past the hero without the cake rotating; after scrolling a short distance, the page violently snapped back to the top.
- **Root Cause**:
  1. `<section id="hero">` had negative margin (`-mt-[74px]`), which caused GSAP `.pin-spacer` layout miscalculations.
  2. Late `ScrollTrigger.refresh()` calls on a 350ms timer and `window.load` ran while the user was actively scrolling, unpinning and re-pinning mid-touch.
- **Fix**: Changed navbar from `sticky` to `fixed top-0 inset-x-0`, removed negative margins (`mt-0`), removed `anticipatePin: 1`, enabled `ScrollTrigger.config({ ignoreMobileResize: true })`, and eliminated disruptive mid-scroll refresh calls.

---

## 7. Regression Protection & Test Suite

The project includes an automated regression verification suite:

```bash
node scripts/verify-ui-revamp.mjs
```

### Coverage (191 Tests Across 15 Suites):
1. Brand Tokens & Confectionery Palette
2. Tactile Skeuomorphic Button & Card Shadows
3. Navigation & Fixed Glass Header Layout
4. Mobile Action Dock (Strictly 3 Buttons: Dialer Green Call, Domed Logo, Up Arrow)
5. Shuffled Signature Cakes Catalog & WhatsApp Integrations
6. 4-Step "Design My Cake" Customizer (No auto-selection, Gold WhatsApp CTA)
7. Procedural 3D Cake Meshes & 360° Scrub Pinning
8. Height-Aware Camera Framing for 13-Inch Laptop Viewports
9. Dark Mode Bullion Gold Surface System (`.metallic-gold-surface`)
10. Anti-Pull-to-Refresh (`overscroll-behavior-y: none;`)
11. Pre-rendered Production Static Pages (`/`, `/design-my-cake`, `/robots.txt`, `/sitemap.xml`)

---

## 8. Development & Build Commands

```bash
# 1. Install dependencies and apply postinstall patch
npm install

# 2. Run TypeScript typecheck (Must always pass with 0 errors)
npm run typecheck

# 3. Run regression verification suite (Must pass 191/191 tests)
node scripts/verify-ui-revamp.mjs

# 4. Start local development server
npm run dev

# 5. Clean dev cache if needed
npm run clean:dev

# 6. Build for production
npm run build

# 7. Preview production build locally
npm run start
```

---

## 9. Git & Deployment Workflow

- **Remote**: `https://github.com/hemendramca22/kidold-bakers.git`
- **Tracked Branch**: `main`
- **Vercel CLI Team**: `the-artist-guy`
- **Vercel Project**: `kidold-bakers`

### Deployment Steps:
1. Run local verification:
   ```bash
   npm run typecheck
   node scripts/verify-ui-revamp.mjs
   npm run build
   ```
2. Commit changes:
   ```bash
   git add .
   git commit -m "<Clear, descriptive commit message>"
   ```
3. Push to GitHub:
   ```bash
   git push origin main
   ```
4. Deploy to Vercel Production:
   ```bash
   npx.cmd vercel --prod --yes
   ```
5. Verify live URL:
   ```bash
   node -e "fetch('https://kidold-bakers.vercel.app').then(r => console.log('HTTP Status:', r.status))"
   ```

---

## 10. Current Known Limitations & Future Roadmap

1. **Option B (3D Cake Blueprint Generator)**:
   - In Step 4 of the cake customizer, Option A (upload reference image) and the fallback ("Send blueprint without photo") are functional.
   - Option B (generating an interactive 3D export/screenshot from customizer choices) is queued for future phases.
2. **Online Payment Gateway**:
   - Currently, orders are finalized via direct WhatsApp inquiry (`wa.me`) and direct phone calls (`tel:`). Razorpay/UPI checkout integration is planned for a later milestone.
3. **Admin Dashboard / CMS**:
   - Products and business data currently reside in static configuration files (`src/data/products.ts`, `src/data/business.ts`). A lightweight CMS or database integration may be added in future iterations.

---

> **FINAL HANDOFF REMINDER**:
> Keep this document updated whenever new features are added. Always test thoroughly using `npm run typecheck` and `node scripts/verify-ui-revamp.mjs` before proposing or deploying changes. Never break working code.
