# ADR-004: Custom Cake Reference Image & Temporary Storage Architecture

## Context
KidOld Bakers' signature offering is bespoke celebration cakes ("You Imagine. We Bake."). Customers frequently bring reference photos (sketches, Instagram inspirations, milestone birthday themes). Additionally, the roadmap includes an AI-assisted custom cake visualization studio. We must balance immediate customer usability, zero storage bloat, cost efficiency, and strict customer photo privacy.

## Architectural Decision

### 1. Phase 1 Implementation (Client-Side & WhatsApp Handoff)
- **Local Validation & Immediate Preview:** Users select a JPEG, PNG, or WebP file (enforced max 5MB). The UI generates an in-memory `URL.createObjectURL` for instant visual confirmation.
- **Privacy First (Zero Server Storage):** Explicit disclaimer displayed to user: *"We do not permanently store your photos. Your cake reference is processed locally on your device."*
- **Authentic WhatsApp Handoff:** Because WhatsApp Click-to-Chat protocol (`wa.me`) only allows query string text parameters and cannot inject raw binary files into the user's native WhatsApp app, the UI sets `hasReferenceImage: true` in the brief and provides prominent inline instructions: *"Attach this photo directly in the WhatsApp chat when it opens."*

### 2. Future Phase Architecture (Temporary Object Storage Pipeline)
When moving to automated backend cake inquiry management and AI generation:
1. **Direct Signed Uploads:**
   - Client requests a presigned upload URL from Next.js API Route (`/api/custom-cakes/presigned-url`).
   - Client uploads image directly to temporary object storage (Cloudinary or Supabase Storage bucket).
2. **Lifecycle Cleanup Policy (Strict 24–48h TTL):**
   - Bucket lifecycle rules automatically purge uploaded files after 48 hours.
   - No permanent server storage of personal customer photographs, ensuring privacy and preventing uncontrolled storage costs.
3. **Signed Temporary URLs for WhatsApp & Baker Dashboard:**
   - Baker dashboard and WhatsApp webhook receive a short-lived signed preview URL.
4. **AI Generation Pipeline (Option B):**
   - The UI boundary in `CakeReferenceSection.tsx` is already prepared with state hooks (`aiPrompt`) and visual tab switching.
   - Will integrate with Google Gemini / Imagen API via a streaming server action in Phase 3/4.

## Consequences
- **Zero Cost & Maximum Privacy in Phase 1:** No cloud storage bills, no data leak surface, no GDPR/compliance overhead.
- **Zero Layout Refactoring:** The customizer wizard already integrates `CakeReferenceSection` cleanly before final brief compilation.
- **Clear User Expectation:** Transparent messaging prevents user confusion regarding how WhatsApp handles image attachments.
