# 02 — Technical Requirements Document

**Last updated:** 2026-11-17

## 1. Tech stack

| Layer | Choice | Notes |
|-------|--------|-------|
| UI library | React 18 | Function components and hooks only |
| Build tool | Vite 5 | `npm run dev`, `npm run build` → `dist/` |
| Routing | React Router 7 (`react-router-dom`, library mode) | Client-side routes, see [03-App-Flow.md](03-App-Flow.md) |
| Styling | Tailwind CSS 3 | Design tokens in `tailwind.config.js`; a few utilities in `src/index.css` |
| Motion | Framer Motion 11 | Scroll reveals and menu transitions; all respect `prefers-reduced-motion` |
| Icons | lucide-react | Tree-shaken per icon |
| Fonts | Satoshi (Fontshare CDN), Manrope (Google Fonts) | Two families, `display=swap` |
| Testing | Vitest 3 (Vite 5–compatible), React Testing Library, jsdom | `npm test`, `npm run test:coverage` (fails below 80 % lines/functions/statements, 75 % branches) |

## 2. Hosting and deployment

- **Host:** Vercel project `the-hilltop-developments`, framework preset **Vite** (Vercel runs `npm install` and `vite build` itself).
- **Domains:** `www.thehilltopdevelopments.com` (primary); `thehilltopdevelopments.com` redirects to `www`.
- **SPA routing:** `vercel.json` rewrites every path to `/index.html` so deep links such as `/developments/goshen` load the app.
- **Security headers:** `vercel.json` also sets CSP, HSTS, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy` and `Permissions-Policy`. `vite.config.js` reads the same headers into `vite preview`, so `npm run build && npm run preview` reproduces production. Any new third-party script, font or image host must be added to the CSP.
- **Deploy trigger:** every push to `main` deploys to production. Use a branch + preview deployment for review.
- **Repository hygiene:** `node_modules/` and `dist/` are git-ignored (see `.gitignore`).

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
| SEO | Per-route `<title>`, meta description, canonical and `og:url` set by `usePageMeta`; Organization JSON-LD in `index.html`; 1200×630 JPG social image |
| Browser support | Last two versions of Chrome, Safari (incl. iOS), Firefox, Edge |
| Responsiveness | Layouts verified at 375, 768, 1024, 1440 px; no horizontal scroll |
| Security | No user data stored client-side; external links use `rel="noopener noreferrer"`; form input validated before building links |

## 7. Image credits

Photos in `public/images/` come from two sources:

- **Hilltop brand deck** (client-owned): `glass-facade`, `hero-glass-sky`, `metropolis-skyline`, `curved-architecture`, `commercial-towers`, `residential-dusk`, `apartment-block`.
- **Unsplash** (free under the [Unsplash License](https://unsplash.com/license), no attribution required): `lagos-waterfront`, `countryside-tropical-home`, `goshen-residence`, `splurge-pool-villa`, `land-development-site`, `estate-aerial`, `interior-living`, `construction-cranes`, `construction-crew`, `crib-homes`, `terrace-townhouses`, `yard-courtyard`, `hinterland-savanna`, `countryside-hills`, `partnership-handshake`, `architect-plans`. Replace with real project renders as they become available.
