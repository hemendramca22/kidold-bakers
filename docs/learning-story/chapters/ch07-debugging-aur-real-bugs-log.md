# Chapter 7: Debugging Diary — Asli Galatiyan Aur Software Engineering Sabak

Software engineering me bugs aana sharm ki baat nahi hai. Senior engineers ki pehchan ye hoti hai ki wo bugs se ghabrate nahi, balki root-cause tak pahunchte hain!

---

## Case Study 1: PowerShell Execution Policy Bug (`npm.ps1 UnauthorizedAccess`)

### 1. What Did We Observe?
Jab humne command chalayi `node -v; npm -v`, to terminal par red error aaya:
`npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled on this system. SecurityError UnauthorizedAccess.`

### 2. What Did We Expect?
Hum expect kar rahe the ki Node aur npm ka version number print hoga.

### 3. Why Did It Happen?
Windows PowerShell me security ke liye default `ExecutionPolicy` set hoti hai jo unsigned `.ps1` (PowerShell script) files ko run karne se block karti hai. Node installer ne ek `npm.ps1` banaya hua tha jo block ho gaya.

### 4. How Did We Investigate?
Humne dekha ki Node.js installation me do tarah ke wrappers hote hain:
- `npm.ps1` (PowerShell script - restricted)
- `npm.cmd` (Windows Command Batch file - unrestricted)

### 5. Solution:
Humne command ko `npm.cmd` aur `npx.cmd` ke through call kiya:
```powershell
npm.cmd -v
```

### 6. Verification:
Command turant successfully execute hui aur version `11.19.0` print ho gaya!

### 7. Software Engineering Lesson:
Cross-platform development me OS-specific shell wrappers aur security policies ko samajhna zaroori hai. Windows par batch file (`.cmd`) safer fallback hoti hai.

---

## Case Study 2: External Image Hostnames in Next.js

### 1. What Did We Observe?
Next.js me jab external URL (Unsplash) se image load karte hain, to Next.js render karne se mana kar deta hai.

### 2. What Did We Expect?
Images bina kisi security issue ke load honi chahiye.

### 3. Why Did It Happen?
Next.js security measure ke taur par kisi bhi arbitrary third-party domain se images optimize nahi karta jab tak developer explicitly whitelist na kare (taaki koi malicious site server ke image optimizer ko abuse na kar sake).

### 4. Which File Changed?
`next.config.mjs`

### 5. What Code Changed?
```javascript
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};
```

### 6. Why Did It Solve It?
Next.js ko pata chal gaya ki `images.unsplash.com` ek trusted domain hai, isliye usne image compression allow kar diya.

### 7. Software Engineering Lesson:
Production frameworks security by default follow karte hain. External resources ko hamesha explicitly configure karna chahiye.

---

## Case Study 3: The Ghost of Layout Chunks (`ChunkLoadError: Loading chunk app/layout failed timeout`)

### 1. Observation (Kya Dekha?)
Jab website ko `http://localhost:3000` par khola gaya, to pehli baar website bilkul sahi chali. Lekin jab tab ko kuch der ke liye khula chhod diya gaya, to achanak browser console/screen par red error popup aaya:
```
ChunkLoadError: Loading chunk app/layout failed
(timeout: http://localhost:3000/_next/static/chunks/app/layout.js)
```

### 2. Expected Behaviour (Kya Hona Chahiye Tha?)
Website bina kisi error ke continuously smooth chalni chahiye thi, chahe user tab ko 1 ghante tak khula chhod de ya beech-beech me refresh kare.

### 3. Root Cause (Asli Wajah Kya Thi?)
Teen alag-alag reasons milkar is error ko create kar rahe the:
1. **Stale Cache Collision (.next folder):** Pehle `next build` (production build) chalaya gaya tha, jisme chunk filenames hash-based the (`app/layout-xxxx.js`). Phir bina `.next` ko delete kiye `next dev` shuru kiya gaya, jisme development chunk filenames simple hote hain (`app/layout.js`). Dono ke manifests aur disk artifacts aapas me takra rahe the.
2. **Aggressive On-Demand Entry Buffer Disposal:** Next.js 14 App Router me development ke waqt memory bachane ke liye idle chunks ko Webpack cache se bohot jaldi (15-60 seconds me) dispose kar diya jata hai. Jab idle tab me HMR heartbeat ne chunk manga aur server compilation me time laga, to browser ne 120-second timeout raise kar diya.
3. **Missing Root Error Boundary (`global-error.tsx`):** Next.js App Router me `app/error.tsx` sirf `page.tsx` ke errors pakadta hai, `layout.tsx` ke nahi! Isliye layout chunk fail hone par koi graceful fallback nahi tha.

### 4. Investigation (Kaise Pata Lagaya?)
- Humne `.next/static/chunks/app/` ko inspect kiya aur dekha ki cache directory ka timestamp kal ka tha aur server files ka aaj ka tha.
- Webpack HMR request lifecycle ko trace kiya.
- Next.js documentation verify ki jisme explicitly mention hai ki `app/layout` errors ke liye `global-error.tsx` mandatory hota hai.

### 5. Affected Files (Kaunsi Files Me Changes Hue?)
- `next.config.mjs` (On-demand entries buffer aur Webpack chunk loading fix)
- `src/app/global-error.tsx` (Nayi resilient root error boundary)
- `src/app/layout.tsx` (Inline chunk error recovery listener)
- `package.json` (Naya `npm run clean` script)

### 6. Fix (Humne Kya Code Badla?)
1. **`next.config.mjs` me idle chunk retention badha di:**
```javascript
onDemandEntries: {
  maxInactiveAge: 60 * 1000 * 60, // 1 hour
  pagesBufferLength: 20,
},
webpack: (config, { dev, isServer }) => {
  if (dev && !isServer) {
    config.output.chunkLoadingGlobal = "webpackChunk_kidold_bakers";
  }
  return config;
}
```
2. **`src/app/global-error.tsx` create kiya** jisme chunk load error detect hone par safe automatic single-reload mechanism hai.
3. **`src/app/layout.tsx` me inline proactive error listener script add kiya.**
4. **`package.json` me `"clean"` script add kiya** taaki dev server se pehle purana cache cleanly flush ho sake.

### 7. Verification (Kaise Prove Hua Ki Fix Kaam Kar Raha Hai?)
- `npm run clean` se `.next` ko completely wipe kiya.
- `npm run dev` start kiya.
- Verification script (`scripts/verify-dev.js`) run karke:
  - Homepage request: Status 200 (Success)
  - Layout chunk direct fetch: Status 200 (Success, 965 KB)
  - 5 repeated consecutive refreshes: Har request 200 OK!
- Tab ko idle chhodkar re-test kiya: Zero `ChunkLoadError`!
- Final `npm run build` run karke verify kiya ki production build 100% cleanly pass ho rahi hai.

### 8. Software Engineering Lesson (Zindagi Bhar Ka Sabak)
> **"Development mode cache aur Production build cache ko kabhi mix mat hone do."**
> Jab bhi build tools ya frameworks me 'random' timeouts ya chunk missing ke errors aate hain, 90% time problem code me nahi balki stale generated artifacts aur aggressive cache invalidation me hoti hai. Self-healing resilience mechanisms (jaise automatic chunk retry) production systems ko bulletproof banate hain!

---

## Case Study 4: The 404 Vanishing Image in Lower-Left Card (`savory-bakes` External Dependency Bug)

### 1. What Did We Observe?
Categories grid ke lower-left corner me "Savory Bakes & Patties" card achanak broken image icon ya blank box dikha raha tha.

### 2. What Did We Expect?
Har category card par consistent, crisp aur delicious bakery item ki visual photograph display honi chahiye thi, chahe internet connection kaisa bhi ho.

### 3. Root Cause (Asli Wajah Kya Thi?)
`src/data/categories.ts` me savory bakes category ek external Unsplash CDN URL ko point kar rahi thi (`https://images.unsplash.com/photo-1621236378699-8597fee6a1ce`). Jab humne terminal me direct HTTP request check ki:
```bash
https.get(u, res => console.log(res.statusCode)); // Returned 404 Not Found!
```
External hosting provider ne us image ko permanently delete ya move kar diya tha! External hotlinking par depend karne se humari production UI toot gayi.

### 4. Solution (Humne Kaise Solve Kiya?)
1. **100% Asset Localization:** External URLs ko turant remove kiya. Original, high-res golden flaky Indian bakery patties photo (`savory-bakes.jpg`) aur morning bakery breads (`fresh-breads.jpg`) generate karke `public/images/categories/` me bundle kiya.
2. **Defensive UI (`SafeImage.tsx`):** Ek robust wrapper component banaya jo Next.js `Image` ke `onError` event ko intercept karta hai. Agar future me koi bhi image load hone se fail ho jaye, to card layout tutne ke bajaye ek elegant, warm branded placeholder with category title render hota hai.

### 5. Software Engineering Lesson:
Core e-commerce catalog aur branding assets ko kabhi bhi third-party external CDN URLs par blindly depend mat karo. Hamesha assets ko locally self-host karo aur UI me defensive fallback states implement karo.

---

## Case Study 5: Mobile Dock & WhatsApp Click-to-Chat Attachment Architecture

### 1. What Did We Observe?
Customers custom cake order karte waqt reference photos bhejna chahte the. Sawal tha: kya web browser se user ki file pick karke seedha `wa.me/?text=...` ke zariye WhatsApp chat me attach ki ja sakti hai?

### 2. What Did We Expect?
Web browser se WhatsApp native app me image automatically attach ho jaye.

### 3. Technical Reality (Browser & Protocol Constraints):
WhatsApp Click-to-Chat API sirf plain text URI encoded query strings accept karta hai (`https://wa.me/919310971535?text=...`). Web browser sandbox security policies kisi bhi website ko permission nahi deti ki wo user ki local machine se binary file uthakar kisi native desktop ya mobile app me inject kar sake.

### 4. Honest & Resilient Solution:
1. **Client-Side Image Preview:** Step 4 me `CakeReferenceSection.tsx` banaya jisme 5MB validation aur instant `URL.createObjectURL` thumbnail preview hai.
2. **Privacy Protection:** User ko clearly bataya gaya ki unki personal photos server par bina wajah store nahi hoti.
3. **Transparent WhatsApp UX:** WhatsApp brief me `*Reference Image:* Customer has selected a reference image to share` format kiya gaya aur user ko button ke upar clear instruction di gayi: *"Attach this photo directly in the WhatsApp chat when it opens."*
4. **Future Scalable Pipeline (ADR-004):** Phase 3 ke liye temporary presigned cloud storage (Cloudinary/Supabase) with 24h automatic cleanup policy architecturally document ki.

### 5. Software Engineering Lesson:
Kabhi bhi client ko fake ya impossible functionality ka illusion mat do. Web platform security rules aur third-party protocols ko respect karte hue transparent, trustworthy user experience design karo.

---

## Case Study 6: The "Dead Wizard" Interaction Bug (Missing "use client" on Shared Primitives & Event Safety)

### 1. What Did We Observe?
Custom Cake wizard visually bilkul theek render ho raha tha, lekin clicking sponge options did nothing, Continue button did nothing, Step progression change nahi ho rahi thi, aur section Step 1 par stuck tha.

### 2. What Did We Expect?
Har option click par highlight hona chahiye, Continue button Step 2 -> Step 3 -> Step 4 le jana chahiye, aur Step 4 me review + WhatsApp handoff perfectly work karna chahiye.

### 3. Root Cause Analysis (Asli Wajah):
1. **Missing `"use client"` on Shared Primitives (`Button.tsx`, `Card.tsx`):** `Button.tsx` ko Server Components (`HeroSection`, `LocalBusinessSection`) bhi import kar rahe the aur Client Component (`CustomCakeTeaser`) bhi. Next.js App Router me bina `"use client"` ke shared interactive components ka dual bundle boundary create hota hai, jisme event handlers (`onClick`) serialization ya hydration ke waqt disconnect ho sakte hain.
2. **HTML Default Button Type:** `Button.tsx` me `<button>` par `type` attribute omitted tha, jisse HTML default `type="submit"` lag jata tha.
3. **Event Propagation & Pointer Interception on Inner Elements:** Option cards ke andar nested `<div>` aur `<p>` tags pointer events ko swallow kar rahe the aur state update visual feedback faint ring ki wajah se user ko imperceptible tha.
4. **Object State Identity vs Primitive ID State:** State me entire object reference (`selectedSponge`) rakhne ke bajaye primitive string ID (`selectedSpongeId`) use karne se re-render synchronization 100% predictable ho jata hai.

### 4. Solution (Code Changes):
- `Button.tsx`: Added `"use client";`, default `type={props.type || "button"}`, and `pointer-events-none` on inner text/icon wrapper.
- `Card.tsx`: Added `"use client";`.
- `CustomCakeTeaser.tsx`:
  - Migrated state to primitive IDs (`selectedSpongeId`, `selectedFillingId`, `selectedThemeId`).
  - Added `pointer-events-none` on inner card content so every click reliably registers on `<button>`.
  - Added dramatic high-contrast selection styling (`border-brand-crimson ring-4 ring-brand-crimson/15` with active `✓ Selected` badge).
  - Wired explicit `(e) => { e.preventDefault(); setCurrentStep(...); }` on all navigation, back, change, and Start Over buttons.

### 5. Verification:
Wrote automated browser test `scripts/verify-wizard.js` using Chrome DevTools Protocol in Edge. Verified 100% passing tests for initial sponge, selecting Red Velvet, navigating to Step 2, selecting Salted Caramel, navigating to Step 3, selecting Kids Playful, navigating to Step 4, verifying blueprint items, switching to AI and Upload tabs, using "Change Filling" to go back to Step 2, updating filling, returning to Step 4, and testing Start Over reset.

### 6. Software Engineering Lesson:
Jab koi component visually render ho lekin interactive events fire na ho rahe hon:
1. Always check `"use client"` on ALL shared leaf primitives used inside client trees.
2. Explicitly provide `type="button"` on buttons to prevent default submit behaviour.
3. Use `pointer-events-none` on decorative/text children inside clickable buttons.
4. Always test with automated browser interaction tests rather than guessing.


