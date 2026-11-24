# Hilltop Developments

Marketing website for Hilltop Developments — *Building Sustainable Cities.*

Live: https://www.thehilltopdevelopments.com · Built with React 18, Vite 5, Tailwind CSS 3, Framer Motion and React Router. Design follows the [Architecteo](https://architecteo.framer.website/) template, adapted to Hilltop's royal navy.

## Documentation

| Doc | What's in it |
|-----|--------------|
| [docs/01-PRD.md](docs/01-PRD.md) | Goals, users, features, content still needed, copy notes |
| [docs/02-TRD.md](docs/02-TRD.md) | Stack, hosting, headers, constraints, image credits |
| [docs/03-App-Flow.md](docs/03-App-Flow.md) | Sitemap, navigation, page sections, enquiry flows |
| [docs/04-UI-UX-Design-Brief.md](docs/04-UI-UX-Design-Brief.md) | Colours, type, components, layout, motion, accessibility |
| [docs/05-Backend-Schema.md](docs/05-Backend-Schema.md) | Content models in `src/data/`, enquiry payload, planned API |
| [docs/06-Implementation-Plan.md](docs/06-Implementation-Plan.md) | Phases and current status |

Brand source: `Africa Missions-Tirta Ayu Spa - Redemption City - Variant 1.pdf`. Earlier audit: [AUDIT_REPORT.md](AUDIT_REPORT.md).

## Local setup

```bash
npm install
npm run dev            # http://localhost:5173
```

| Script | Does |
|--------|------|
| `npm run build` | Production build to `dist/`, with every page prerendered to its own HTML file and a generated `sitemap.xml` |
| `npm run preview` | Serves `dist/` like Vercel: same security headers, clean URLs, real 404s |
| `npm test` | Runs the Vitest suite |
| `npm run test:coverage` | Tests + coverage (fails below the 80 % threshold) |

## Editing content

Most content lives in `src/data/` — no layout changes needed:

- `site.js` — contact details, navigation, footer links
- `developments.js` — each development's name, summary, images
- `services.js`, `content.js` — services, FAQs, project categories, ownership opportunities, insights
- `people.js` — advisory board, team and client logos (empty arrays show a "coming soon" state)

Images go in `public/images/` (keep them under ~400 KB, 1600 px wide).

Every page is one row in `src/site/pages.jsx`: its path, the title and description shown in search results and link previews, and what it renders. To add a page or reword its title or description, edit that table; the route, `<head>` tags, prerendered file, sitemap entry and header highlighting follow. New developments in `src/data/developments.js` get their pages automatically. A bad row (duplicate or unsafe path, missing description) stops the tests and the build.

## Deployment

Vercel builds every push to `main` (framework preset: Vite, running `npm run build`). `vercel.json` serves the prerendered pages with clean URLs, returns real 404s and sets the security headers. Use a branch and the Vercel preview URL to review changes before merging.

## Not built yet

Server-side enquiry handling (the form currently opens a pre-filled email or WhatsApp message), analytics, and a CMS for Insights. See [docs/06-Implementation-Plan.md](docs/06-Implementation-Plan.md).
