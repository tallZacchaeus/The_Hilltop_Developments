# 06 — Implementation Plan

**Last updated:** 2026-11-17

Legend: ✅ done · 🟡 in progress · ⬜ pending

## Phase 0 — Pre-launch holding page ✅ (May 2026)

Single-page site (hero carousel, vision, pillars, consultation) deployed to Vercel. Superseded by Phase 3; its components were removed in 3.9.

## Phase 1 — Repo hygiene and SEO fixes ✅ (17 Nov 2026)

- ✅ `.gitignore`; stop tracking `node_modules/` and `dist/`
- ✅ Canonical / `og:url` / JSON-LD point at `www.thehilltopdevelopments.com`

## Phase 2 — Planning and assets ✅ (17 Nov 2026)

| Task | Status |
|------|--------|
| Read copy doc, study Architecteo template, Mobbin references | ✅ |
| Six core docs (this folder) | ✅ |
| Image set: 7 brand images + 16 Unsplash photos in `public/images/` (5.7 MB total), 1200×630 social image | ✅ |

## Phase 3 — Redesign build ✅ (17 Nov 2026)

| # | Task | Depends on | Status |
|---|------|-----------|--------|
| 3.1 | React Router 7, Vitest 3 + Testing Library; `vercel.json` SPA rewrite + security headers | — | ✅ |
| 3.2 | Design tokens (`tailwind.config.js`), Satoshi + Manrope, `.panel-sky` | — | ✅ |
| 3.3 | Content data modules (`src/data/*`) | 3.1 | ✅ |
| 3.4 | Shared UI (`Panel`, `Button`, `Eyebrow`, `SectionHeading`, `Card`, `Chip`, `Photo`, `Reveal`, `Accordion`) | 3.2 | ✅ |
| 3.5 | Layout: Header (dropdowns + mobile menu), Footer, ScrollToTop, `usePageMeta` | 3.4 | ✅ |
| 3.6 | Home page | 3.3–3.5 | ✅ |
| 3.7 | About, Services, Developments (+ detail), Insights, Contact (+ FAQ), Own a Piece, legal, 404 | 3.6 | ✅ |
| 3.8 | Enquiry logic + form (email / WhatsApp hand-off) | 3.3 | ✅ |
| 3.9 | Remove old one-page components and assets | 3.6–3.7 | ✅ |

## Phase 4 — Quality ✅ (17 Nov 2026)

| Task | Result |
|------|--------|
| Unit tests: enquiry validation and link builders, data integrity, error boundary | ✅ 46 tests |
| Integration tests: every route's `h1`, detail pages, 404, metadata, filter, contact pre-fill, navigation, focus management, mobile menu, dropdown Escape | ✅ 33 tests (79 total, ~99 % statements / ~94 % branches) |
| Browser QA at 1440 px and 375 px: all pages render; no horizontal overflow; form validation and focus; mobile menu + Escape | ✅ |
| Production preview with CSP headers: fonts load, no console errors, deep links work | ✅ |
| Production build size | ✅ JS 120 KB gzipped (budget 150 KB), CSS 6 KB |
| Independent code review | ✅ 0 critical / 0 high. Fixed all 8 medium (malformed-hash crash + error boundary, focus-ring and text contrast, dropdown Escape, scroll lock on rotate, same-page menu taps, stale enquiry topic, focus on navigation) and 5 low (heading skip, back/forward scroll, trailing-slash canonical, CRLF mailto, new-tab cue). Left as-is: `aria-controls` pointing at the unmounted mobile menu (harmless) |

## Phase 5 — Launch ⬜

- ⬜ Commit on a branch, open PR, review the Vercel preview deployment
- ⬜ Hilltop approves the copy notes in [01-PRD.md](01-PRD.md) §9
- ⬜ Merge to `main` → production deploy
- ⬜ Confirm the email domain is Hilltop's; set up Google Search Console

## Phase 6 — Next (planned)

| Item | Notes |
|------|-------|
| Real content | Board, team, client logos, office hours, development facts and renders, social links, legal text |
| Enquiry API | `POST /api/enquiries` (see [05-Backend-Schema.md](05-Backend-Schema.md)) |
| Analytics | Plausible or GA4; track enquiry starts |
| CMS | For Insights (news, articles, careers) |
| Image formats | Serve AVIF/WebP variants |
| E2E tests | Playwright smoke run against the Vercel preview |
