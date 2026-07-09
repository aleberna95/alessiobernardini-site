# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Personal marketing site for `alessiobernardini.dev` — Next.js 16 App Router, statically exported (`output: "export"`) and served from Firebase Hosting. Single-page site (`app/page.tsx`) plus a standalone `/qr` redirect page for the business-card QR code. Code comments and user-facing strings are in Italian; keep new ones consistent with that. This is a sibling repo to the CRM at `crm.alessiobernardini.dev` (`../alessiobernardini-crm`), which the site talks to over its public API (see below).

## Commands

Run from `site/` — that's the only `package.json` in this repo; the repo root (one level up) has no `package.json`, it just holds `firebase.json` and historical planning docs:

```bash
npm run dev            # dev server
npm run build           # next build -> site/out/ (static export)
npm run build:check     # next build + verify-seo.mjs against site/out/
npm run lint             # eslint
npm run verify:seo       # checks out/ for robots.txt, sitemap.xml, llms.txt, og-image, canonical, JSON-LD (run after a build)
npm run verify:posthog   # pings PostHog with the key in .env.local to confirm it's valid
npm run generate:og      # regenerates public/og-image.png via @napi-rs/canvas + sharp
npm run deploy           # next build && cd .. && firebase deploy --only hosting (deploys from repo root, needs site/out/)
```

No test runner is configured. There is no `tsc --noEmit` script — TypeScript is checked as part of `next build`. There's also a `next start` script left over from `create-next-app` scaffolding — it's not part of the real flow (the site is a static export served by Firebase Hosting, never run with `next start`).

Local setup: copy `.env.example` to `.env.local`. Vars: `NEXT_PUBLIC_POSTHOG_KEY` / `NEXT_PUBLIC_POSTHOG_HOST` (optional — PostHog silently no-ops if the key is missing) and `NEXT_PUBLIC_CRM_API_URL` (defaults to `https://crm.alessiobernardini.dev` if unset).

## Architecture

### Static export constraints

`next.config.ts` sets `output: "export"` and `trailingSlash: true`. This means **no API routes, no SSR, no middleware, no `next/image` optimization** (`images.unoptimized: true`) — everything must work as pre-rendered HTML/CSS/JS. Any dynamic behavior has to happen client-side (`'use client'`) or by calling the external CRM API.

### Page structure

- `app/page.tsx` — the entire marketing site as one page, composed of section components in order: `Nav`, `Hero`, `About`, `Work`, `Sites`, `Services`, `Contact`, `Footer`, wrapped in `MotionMain` (`components/shared/MotionMain.tsx`, a `motion.main` fade-in). Sections are anchor-linked (`#chi-sono`, `#progetti`, `#siti`, `#servizi`, `#contatti`) rather than routed.
- `app/qr/` — a separate route for the QR code printed on the business card. `page.tsx` renders `QrReveal.tsx` (`'use client'`), a canvas/SVG animation that fakes scanning a QR code before `window.location.replace()`-ing to `/`; degrades to an instant `<meta http-equiv="refresh">` redirect via `<noscript>` and respects `prefers-reduced-motion`. `robots: { index: false, follow: false }`.
- `app/robots.ts` / `app/sitemap.ts` — static (`export const dynamic = "force-static"`) metadata routes required by the export.
- `components/StructuredData.tsx` — injects `Person` and `ProfessionalService` JSON-LD (rendered in `layout.tsx`, server component, no `'use client'`).

### i18n

Custom, dependency-free IT/EN toggle, no routing involved (both languages live at `/`):

- `lib/language-context.tsx` — `LanguageProvider` + `useLanguage()`, React context holding `lang: 'it' | 'en'`, default `'it'`.
- `lib/translations.ts` — one big `Translation` interface plus an `it`/`en` `Record`; `useT(lang)` returns the active translation object. Every section component reads its copy from here — add new UI copy by extending the interface and both locales.
- `lib/content.ts` — structured content that isn't just strings (services, projects/`Work`, `sites`, stats, contact info); bilingual fields use `Record<Lang, string>` inline rather than going through `translations.ts`.

When adding a section, follow the existing pattern: `'use client'` component reads `useLanguage()` + `useT(lang)`, pulls structured data from `lib/content.ts`, and reveals itself on scroll with Framer Motion (`motion.div`/etc. using `initial`/`whileInView` variants and `viewport={{ once: true }}`) — see `About.tsx`, `Work.tsx`, or `Sites.tsx` for the pattern. Note: `lib/hooks.ts` exports a `useInView()` `IntersectionObserver` hook that looks like the obvious tool for this but is currently **dead code** (unused anywhere), and there's no `.section-fade` CSS class — don't reach for either, they're not the convention in use.

### Integration with the CRM

The site is a static frontend for dynamic data fetched client-side from the CRM's public API (`NEXT_PUBLIC_CRM_API_URL`, CORS-gated there by `PUBLIC_API_ALLOWED_ORIGINS` — see `../alessiobernardini-crm/CLAUDE.md`). The live integration points are:

- `components/Services.tsx` — fetches `GET {CRM_API_URL}/api/public/offers` and renders the expand/collapse offers UI (master-detail + mobile bottom-sheet), with money as integer cents (`setupPriceFromCents`/`monthlyPriceFromCents`/etc., `number | null`) formatted via `Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' })`, mirroring the CRM's cents convention. It opens `LeadFormModal` from an offer card, passing `offerId`/`offerTitle`.
- `components/LeadFormModal.tsx` — posts to `POST {CRM_API_URL}/api/public/leads` with `{ name, email, phone?, company?, message?, interestedOfferId?, source: 'alessiobernardini.dev' }`. It is opened **only** from `Services.tsx`'s offer cards, not from `Contact.tsx`.
- `components/Contact.tsx` — has its **own separate inline lead form**, posting to the same `/api/public/leads` endpoint with a near-identical but independently-duplicated payload (no `interestedOfferId`). It does not use `LeadFormModal`. If you change the lead payload shape, update `LeadFormModal.tsx` and `Contact.tsx` in lockstep — the logic isn't shared.
- `components/Offers.tsx` also fetches `/api/public/offers` and duplicates a `PublicOffer` type + pricing logic similar to `Services.tsx`, but **it is dead code** — not imported by `page.tsx` or anything else. Don't assume edits there affect the live site; either wire it in deliberately or ignore it.

When changing the shape of offers or the leads payload, check the corresponding `api/public/*` route handler and Zod schema in the CRM repo — they must stay in sync.

### Analytics

`components/analytics/PostHogProvider.tsx` initializes PostHog client-side only if `NEXT_PUBLIC_POSTHOG_KEY` is set (`api_host` defaults to `https://eu.i.posthog.com` if `NEXT_PUBLIC_POSTHOG_HOST` is unset), deliberately configured to avoid a cookie-consent banner and minimize bundle weight: `persistence: 'memory'` (no cookies), `autocapture: false`, `disable_session_recording: true`, `disable_surveys: true`, `enable_heatmaps: false` (`capture_pageview: true` stays on). Custom events are captured directly via `posthog.capture()` at the call site — don't turn on autocapture to get these for free, it's off intentionally. Current events: `lead_modal_opened`/`lead_submitted` in `LeadFormModal.tsx` (fired from the `Services.tsx` offer-card flow), and a separate `lead_submitted` (`{ source: 'contact_form' }`) in `Contact.tsx`'s own inline form. `scripts/verify-posthog.mjs` is the way to sanity-check a key without opening the site.

### SEO

Metadata is centralized in `app/layout.tsx` (title template, OpenGraph, Twitter card, robots) plus `StructuredData.tsx` for JSON-LD. `scripts/verify-seo.mjs` asserts (against a built `out/`) that robots.txt/sitemap.xml/llms.txt/og-image exist, canonical + absolute og:image + `summary_large_image` are present, and both JSON-LD blocks are in the HTML — run `npm run build:check` (or `verify:seo` after a manual build) before treating an SEO-related change as done. `public/llms.txt` is a static, hand-maintained file — update it if you materially change what the site says about the business.

### Other conventions

- Import alias `@/*` → repo-root-relative (i.e. `site/*`), not `src/*` — there is no `src` dir here.
- File naming: `kebab-case.ts` for libs/scripts, `PascalCase.tsx` for components.
- `firebase.json` (repo root, one level up from `site/`) configures Hosting to serve `site/out` with long-cache headers for hashed assets/fonts/images and no-cache for HTML; it has no rewrites/redirects for `/qr` — that route is handled entirely by the Next.js page, not a Firebase-level redirect.
- `BRAINSTORM.md` and `REBUILD.md` (repo root) are historical planning/design documents from an earlier redesign pass — treat them as background context on intent (design system, copy tone, roadmap ideas), not as a description of current code; the live implementation has since diverged from and extended what they describe (e.g. the `Sites` section, the offers UI in `Services.tsx`, the lead form, PostHog, the `/qr` page).
