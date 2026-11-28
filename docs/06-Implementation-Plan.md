# 06 — Implementation Plan

**Last updated:** 2026-11-24

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
| 3.5 | Layout: Header (dropdowns + mobile menu), Footer, ScrollToTop, `usePageMeta` (replaced by the page table in 5.4) | 3.4 | ✅ |
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

## Phase 5 — Launch 🟡

- ✅ Commit on a branch and open [PR #1](https://github.com/tallZacchaeus/The_Hilltop_Developments/pull/1) (17 Nov 2026)
- ✅ Merge to `main` (`addf303`) → production deploy on Vercel, state READY (17 Nov 2026)
- ✅ Live-site check on `www.thehilltopdevelopments.com`: all routes return the new app shell, security headers present, apex redirects to `www`, fonts load, no console or CSP errors, canonical / `og:url` set per page. Merged `main` passes all 79 tests and builds to the same bundle hashes as the reviewed branch
- ⬜ Review the live site on a real phone and desktop, including the card WhatsApp shows when a development page link is shared
- ⬜ Send a real enquiry by email and by WhatsApp from a phone
- ⬜ Hilltop approves the copy notes in [01-PRD.md](01-PRD.md) §9
- ⬜ Confirm the email domain is Hilltop's; set up Google Search Console and submit `https://www.thehilltopdevelopments.com/sitemap.xml` (live since 17 Nov 2026, Phase 5.2)

## Phase 5.1 — Prerendered pages ✅ (17 Nov 2026)

Shared links showed the homepage title for every page, and unknown URLs returned HTTP 200. Every route is now static HTML with its own metadata, hydrated in the browser (details in [02-TRD.md](02-TRD.md) §2a).

| Task | Status |
|------|--------|
| Build-time prerender: `src/entry-server.jsx` + `scripts/prerender.js` → 17 HTML files including `404.html` (entry now `src/site/buildSite.jsx`, see 5.4) | ✅ |
| Shared page metadata (`src/lib/pageMeta.js`) behind both `usePageMeta` and the prerendered head tags (`usePageMeta` replaced by the page table in 5.4) | ✅ |
| Hydration-safe query strings, reveals, image hero and footer year (`useHydrated`) | ✅ |
| `vercel.json`: `cleanUrls`, `trailingSlash: false`, SPA rewrite removed → real 404s; `vite preview` matches | ✅ |
| Tests: prerender output, route list (and a guard that it matches `App.jsx`), head-tag escaping, hydration of every page and of 404s under real sections, `Reveal` behaviour | ✅ 145 tests (~99 % statements / ~96 % branches) |
| Independent code review | ✅ 0 critical / 0 high. Fixed 4 medium (build command pinned in `vercel.json`, route-table drift test, header nav state on 404s under real sections, exactly one `usePageMeta` per page) and 3 low (template comment no longer shipped, path guard in the preview 404 plugin, `dist-ssr/` removed on failure). Kept by design: see the trade-offs in [02-TRD.md](02-TRD.md) §2a |
| Local check with `npm run preview`: status codes, per-page titles, headers on 404s, `?type=` / `?category=`, client-side navigation, no console or CSP errors | ✅ |
| Merged as [PR #3](https://github.com/tallZacchaeus/The_Hilltop_Developments/pull/3) (`92e924f`). Live check: unknown paths return 404; `/about/` → 308 → `/about`; each development page has its own `<title>` and `og:*` tags in the HTML, so link previews don't need JavaScript; no `x-robots-tag` header | ✅ |

## Phase 5.2 — Sitemap and robots.txt ✅ (17 Nov 2026)

Both URLs used to return the 404 page; Search Console needs them. Built on top of Phase 5.1 (details in [02-TRD.md](02-TRD.md) §2a).

| Task | Status |
|------|--------|
| `sitemap.xml` generated at build time from `prerenderPages()` (`src/prerender/sitemap.js`; now built by `buildSite`, see 5.4): canonical URLs, 404 left out, XML-escaped, stable order; new developments are listed automatically | ✅ |
| Static `public/robots.txt`: allows all crawlers, names the sitemap | ✅ |
| Tests: sitemap rendering, page list, `canonicalUrl`, `robots.txt` contents | ✅ 157 tests (~99 % statements / ~96 % branches) |
| Local check with `npm run preview`: `/robots.txt` 200 `text/plain`, `/sitemap.xml` 200 XML with 16 URLs, unknown paths still 404 | ✅ |
| Merged as [PR #5](https://github.com/tallZacchaeus/The_Hilltop_Developments/pull/5) (`160898f`). It replaced PR #4, which was stacked on PR #3 and merged into `feat/prerender-pages` after #3 had already landed, so it never reached `main`. Live check: `/robots.txt` returns 200 `text/plain`; `/sitemap.xml` returns 200 `application/xml` with 16 URLs, each returning 200 without a redirect; unknown paths still return 404 | ✅ |

## Phase 5.3 — Client feedback, round 1 🟡 (24 Nov 2026)

The client likes the site and asked for these changes ("pictures in some places" to follow separately):

| Task | Status |
|------|--------|
| "Land" development category renamed to Infrastructure (data, nav, filter, homepage card, detail page `/developments/infrastructure`); permanent redirect from `/developments/land` in `vercel.json` | ✅ (infrastructure copy is a draft for approval, see [01-PRD.md](01-PRD.md) §9) |
| Own a Piece is strictly land buying: one land section and enquiry link; estate, property and investment opportunities removed; enquiry type "Own a Piece (land)" | ✅ |
| "A Realty Expression of the Marvel Ideations" removed from the footer, homepage hero, JSON-LD, README and PRD; tests fail if it reappears on any page or in `index.html` | ✅ |
| New logo, favicon and share-link image: the client's H mark redrawn as vector strokes (`logoMark.js`, symmetry-tested), used in the header and footer, `favicon.svg`, 48 px PNG favicon, 180 px iOS icon, 512 px JSON-LD logo and a new 1200×630 `og-hilltop.png` with the "HILLTOP / DEVELOPMENTS" lockup; old logo PNGs and `og-hilltop.jpg` removed | ✅ (replace with the designer's originals if supplied) |
| Picture changes | ⬜ Waiting for the client's list |
| Vitest ignores agent worktrees under `.claude/` (their copies of the tests were being collected) | ✅ |

## Phase 5.4 — One page table ✅ (24 Nov 2026)

What pages exist and how each is described was spread over `App.jsx`, `PAGE_ROUTES`, `src/prerender/routes.js`, a `usePageMeta` call in every page (with an "exactly once" build check), `PageMetaSinkContext`, the sitemap module and a route-table drift test. It now lives in one table, `src/site/pages.jsx`. Chosen after comparing four interface designs ("design it twice"); details in [02-TRD.md](02-TRD.md) §2a.

| Task | Status |
|------|--------|
| `definePages()`: page table → `pages` and `pageAt()` (exact, case-sensitive, decoded; anything else → the 404 page), checked when it loads | ✅ |
| `SiteRoutes` (one catch-all route; the table is the only URL matcher), `useCurrentPage()` for the header, `buildSite(template)` returning every deploy file | ✅ |
| Pages no longer handle metadata; `DevelopmentDetailPage` receives its development; legal text moved to `src/data/legal.js` | ✅ |
| Removed `App.jsx`, `entry-server.jsx`, `usePageMeta`, `PAGE_ROUTES`, `src/prerender/routes.js` and `sitemap.js`, and their tests (replaced by tests on the new interface) | ✅ |
| Fixed: `/About` (wrong case) rendered the About page over Vercel's 404.html; the 404 page's canonical URL changed in the browser | ✅ |
| Tests: every page and 404s at foreign URLs hydrate without mismatches; head tags update on in-app navigation; a page remounts when moving between developments | ✅ |
| Build output identical to before (all 17 HTML files and `sitemap.xml`, ignoring asset hashes); browser check of navigation, head tags and header highlighting | ✅ |
| Independent code review | ✅ 0 critical / 0 high. Fixed 2 medium (clear errors for malformed family rows; tests for head updates on navigation and for remounting between developments) and 3 low (an encoded slash no longer matches a page, stale comment, history rows annotated) |

## Phase 5.2 — Client updates ✅ (27 Nov 2026)

| Item | Status |
|------|--------|
| Insights page: client copy and buttons (View All News / Explore Articles / Explore Career Opportunities) opening the contact form with a pre-selected subject (new `news` and `articles` enquiry types) | ✅ |
| Advisory Board section, nav link and data removed (Our Team unchanged) | ✅ |
| "Partners in Success" (`PartnersSection`, `src/data/partners.js`) on About (after Our Team) and Services; 2nd Haven and Space R are text tiles pending logos | ✅ |
| Partnerships photo replaced with two Black professionals shaking hands (Pexels) | ✅ |
| Navy footer with AA contrast | ✅ |
| A picture for every service | ✅ |
| Goshen coming-soon flyer on `/developments/goshen` (more flyers to follow: add a `flyer` to the development) | ✅ |
| Logos for 2nd Haven and Space R | ⬜ awaiting client |

## Phase 6 — Next (planned)

| Item | Notes |
|------|-------|
| Real content | Team, client logos, 2nd Haven and Space R logos, more development flyers, office hours, development facts and renders, social links, legal text |
| Enquiry API | `POST /api/enquiries` (see [05-Backend-Schema.md](05-Backend-Schema.md)) |
| Analytics | Plausible or GA4; track enquiry starts |
| CMS | For Insights (news, articles, careers) |
| Image formats | Serve AVIF/WebP variants |
| E2E tests | Playwright smoke run against the Vercel preview |
| Per-page share images | Development pages still use the site-wide `og-hilltop.png`; a 1200×630 image per development would make WhatsApp previews more specific |
