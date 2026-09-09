# KidOld Bakers stable baseline

Date: 2026-09-08  
Checkpoint: `stable-baseline-2026-09-08`

This checkpoint captures the repaired application before the next cinematic layer is added.

## Stability repairs included

- Development and production artifacts use separate directories (`.next-dev` and `.next`).
- `npm run dev` no longer deletes a running server's artifacts. Use `npm run dev:fresh` only for an intentional cold-cache start.
- The duplicate automatic chunk-error reload scripts were removed so failures remain observable.
- Essential hero content stays visible during its entrance animation.
- Global navbar section links resolve back to the homepage from `/design-my-cake`.
- The mobile contact dock stays out of the hero viewport and cannot cover its primary CTA.
- Signature Cakes uses balanced layouts for filtered results, including seven products.

## Verification at checkpoint

- TypeScript: passed (`npm run typecheck`)
- ESLint: passed (`npm run lint`)
- Production build: passed (`npm run build`)
- First cold development navigation from an empty `.next-dev`: passed
- Signature Cakes filter on first navigation: passed
- Design My Cake selection and Continue action on first navigation: passed
- Full wizard progression through the review screen: passed
- Mobile navigation open/close: passed
- Navbar navigation from `/design-my-cake` to homepage sections: passed
- Browser console errors and warnings during interaction tests: none
- Mobile hero first paint: core heading and product image visible immediately

The production build reported 176 kB First Load JS for the homepage and 113 kB for `/design-my-cake`.
