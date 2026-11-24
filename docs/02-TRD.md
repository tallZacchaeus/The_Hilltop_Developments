# 02 — Technical Requirements Document

**Last updated:** 2026-11-17

## 1. Tech stack

| Layer | Choice | Notes |
|-------|--------|-------|
| UI library | React 18 | Function components and hooks only |
| Build tool | Vite 5 | `npm run dev`; `npm run build` = client build + server build of `src/entry-server.jsx` + `scripts/prerender.js` → one static HTML file per route, plus `sitemap.xml`, in `dist/` |
| Routing | React Router 7 (`react-router-dom`, library mode) | Routes in `src/App.jsx`; every page is prerendered at build time and hydrated in the browser (§2a, [03-App-Flow.md](03-App-Flow.md)) |
| Styling | Tailwind CSS 3 | Design tokens in `tailwind.config.js`; a few utilities in `src/index.css` |
| Motion | Framer Motion 11 | Scroll reveals and menu transitions; all respect `prefers-reduced-motion` |
| Icons | lucide-react | Tree-shaken per icon |
| Fonts | Satoshi (Fontshare CDN), Manrope (Google Fonts) | Two families, `display=swap` |
| Testing | Vitest 3 (Vite 5–compatible), React Testing Library, jsdom | `npm test`, `npm run test:coverage` (fails below 80 % lines/functions/statements, 75 % branches) |

## 2. Hosting and deployment

- **Host:** Vercel project `the-hilltop-developments`, framework preset **Vite**. `vercel.json` pins `buildCommand: "npm run build"` (which includes prerendering) and `outputDirectory: "dist"`, so a dashboard override can't skip the prerender step and leave every inner page returning 404.
- **Domains:** `www.thehilltopdevelopments.com` (primary); `thehilltopdevelopments.com` redirects to `www`.
- **Static pages:** `vercel.json` sets `cleanUrls: true` (serves `about.html` at `/about`, `developments/splurge.html` at `/developments/splurge`) and `trailingSlash: false` (`/about/` → 308 → `/about`). There is no SPA rewrite: unknown paths get `404.html` with a real 404 status.
- **Security headers:** `vercel.json` also sets CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`. `vite.config.js` reads the same headers into `vite preview` and serves `404.html` for unknown paths, so `npm run build && npm run preview` reproduces production. Any new third-party script, font or image host must be added to the CSP.
- **Deploy trigger:** every push to `main` deploys to production. Use a branch + preview deployment for review.
- **Repository hygiene:** `node_modules/` and `dist/` are git-ignored (see `.gitignore`).

## 2a. Prerendering and hydration

Link-preview crawlers (WhatsApp, LinkedIn, Facebook, X) don't run JavaScript, so each page's title, description and Open Graph tags must be in the HTML the server sends.

- **Build:** `vite build` (client) → `vite build --ssr src/entry-server.jsx --outDir dist-ssr` → `node scripts/prerender.js`. The script renders every path from `prerenderPages()` (`src/prerender/routes.js`: `PAGE_ROUTES` plus one page per entry in `DEVELOPMENTS`, then `/404` → `404.html`), writes `dist/sitemap.xml`, and deletes `dist-ssr/`.
- **Sitemap and robots:** `buildSitemap()` (`src/prerender/sitemap.js`) lists every path from `prerenderPages()` except `/404`, in the same order, so new pages and developments are added automatically (16 URLs today: 9 pages + 7 developments). Each `<loc>` comes from `canonicalUrl()` in `src/lib/pageMeta.js`, the same function behind every page's canonical link, so the two can't disagree. Only `/404` is left out, by path, because it is the only `noindex` page today. A new page that calls `usePageMeta({ noIndex: true })` must also be excluded in `renderSitemap`. There is no `<lastmod>`: a build date would change on every deploy, and Google ignores dates it can't trust. `public/robots.txt` is static: it allows every crawler and names `https://www.thehilltopdevelopments.com/sitemap.xml`. A test checks that line against `SITE.url`.
- **Metadata:** pages call `usePageMeta`; during prerendering it reports to `PageMetaSinkContext`, and `src/prerender/template.js` writes escaped tags between the `<!--app-head:start-->` / `<!--app-head:end-->` markers in `index.html`. Both sides build tags from `src/lib/pageMeta.js`. The build fails if a page renders without calling `usePageMeta`.
- **Browser:** `src/main.jsx` hydrates when `#root` already has markup (production) and renders from scratch on the dev server. `src/Root.jsx` is the wrapper both entries share.
- **Hydration rule:** the browser's first render must match the prerendered HTML exactly. The server sees only the path, so anything that depends on the query string, the clock or browser preferences waits for `useHydrated()` (`src/hooks/useHydrated.js`), which turns `true` right after hydration. Current uses: `ContactPage` (`?type=`), `DevelopmentsPage` (`?category=`), `Reveal`, `ImageHero`. The footer year uses `suppressHydrationWarning` (baked in at build time; it updates on the next deploy). `src/hydration.test.jsx` hydrates every page and fails on any mismatch.
- **Motion:** prerendered content arrives visible. After hydration, `Reveal` hides only content still below the fold and fades it up on scroll; the image hero's entrance plays only after client-side navigation; the logo still draws in after hydration.
- **CSP:** no inline scripts are added, so `script-src 'self'` is unchanged.
- **Adding pages:** a guard test fails if a static route in `src/App.jsx` is missing from `PAGE_ROUTES`, and the build fails unless each page calls `usePageMeta` exactly once. The header marks a section as current only on known pages, so the 404 page looks the same at any URL.
- **Known trade-offs:**
  - The logo's draw-in animation starts from invisible, so the monogram appears once JavaScript runs. The wordmark text is visible straight away.
  - A deep link such as `/developments?category=land` or `/contact?type=partnership` briefly shows the unfiltered page or the empty form, then applies the query once hydrated. Anything typed into that pre-filled form before hydration is reset.
  - URLs are case-sensitive now. `/About` returns 404, whereas React Router used to match it.

## 3. Integrations

| Integration | Used for | Implementation |
|-------------|----------|----------------|
| Email (`mailto:`) | Enquiry form delivery, footer email | `src/lib/enquiry.js` builds a pre-filled email to `info@hilltopdevelopments.com` |
| WhatsApp (`wa.me`) | One-tap chat, enquiry form alternative | `buildWhatsAppLink()` in `src/lib/enquiry.js` |
| Phone (`tel:`) | Click-to-call | `+234 913 908 3794` |
| Fontshare / Google Fonts | Web fonts | `<link>` tags in `index.html` |

No server, database or third-party form service is connected yet. See [05-Backend-Schema.md](05-Backend-Schema.md) for the planned enquiry API.

## 4. Configuration

All site-wide values (name, URLs, contact details, navigation, footer links) live in `src/data/site.js`. Nothing secret is stored in the repo; there are no environment variables yet. When the enquiry API is added, its key must go in Vercel environment variables, never in source.

## 5. Constraints

- The email domain (`hilltopdevelopments.com`) differs from the website domain (`thehilltopdevelopments.com`). The email domain has Google Workspace MX records; confirm ownership before launch.
- Office hours, social links, and people data are not yet supplied (see [01-PRD.md](01-PRD.md) §7).
- Stock photography is a stand-in for real project renders.

## 6. Non-functional requirements

| Area | Requirement |
|------|-------------|
| Performance | JS ≤ 150 KB gzipped for the initial load; LCP < 2.5 s and CLS < 0.1 on mobile 4G; images lazy-loaded below the fold with explicit `width`/`height`; hero image eager with `fetchpriority="high"` |
| Accessibility | WCAG 2.1 AA: semantic landmarks, one `h1` per page, visible focus rings, keyboard-operable menus and accordion, form errors announced, colour contrast ≥ 4.5:1 for body text, reduced-motion support |
| SEO | Each route's `<title>`, meta description, robots, canonical, Open Graph and Twitter tags are in its prerendered HTML (link previews work without JavaScript) and kept current on navigation by `usePageMeta`; unknown URLs return HTTP 404; `/sitemap.xml` generated at build time with the canonical URL of every page except the 404, and `/robots.txt` allowing all crawlers and naming the sitemap (§2a); Organization JSON-LD in `index.html`; 1200×630 JPG social image (site-wide) |
| Browser support | Last two versions of Chrome, Safari (incl. iOS), Firefox, Edge |
| Responsiveness | Layouts verified at 375, 768, 1024, 1440 px; no horizontal scroll |
| Security | No user data stored client-side; external links use `rel="noopener noreferrer"`; form input validated before building links |

## 7. Image credits

**Brand assets** (client logo, Nov 2026). All of these are drawn from the vector mark in `src/components/ui/logoMark.js`. If Hilltop's designer supplies original SVG or PNG files, replace them in place.

| File | Size | Used for |
|------|------|----------|
| `public/favicon.svg` | vector | Browser tab icon; a test keeps its paths identical to `logoMark.js` |
| `public/icon-48.png` | 48×48 | PNG favicon fallback (older browsers, Google results) |
| `public/apple-touch-icon.png` | 180×180 | iOS home-screen icon |
| `public/icon-512.png` | 512×512 | Organization logo in the JSON-LD |
| `public/images/og-hilltop.png` | 1200×630 | Link previews (`og:image`, `twitter:image`) |

A test fails if any icon, logo or share image named in `index.html` is missing from `public/`.

Photos in `public/images/` come from two sources:

- **Hilltop brand deck** (client-owned): `glass-facade`, `hero-glass-sky`, `metropolis-skyline`, `curved-architecture`, `commercial-towers`, `residential-dusk`, `apartment-block`.
- **Unsplash** (free under the [Unsplash License](https://unsplash.com/license), no attribution required): `lagos-waterfront`, `countryside-tropical-home`, `goshen-residence`, `splurge-pool-villa`, `land-development-site`, `estate-aerial`, `interior-living`, `construction-cranes`, `construction-crew`, `crib-homes`, `terrace-townhouses`, `yard-courtyard`, `hinterland-savanna`, `countryside-hills`, `partnership-handshake`, `architect-plans`. Replace with real project renders as they become available.
