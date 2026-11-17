# 04 — UI/UX Design Brief

**Last updated:** 2026-11-17

## 1. Direction

**Reference:** the [Architecteo Framer template](https://architecteo.framer.website/) — "light architectural luxury". White page, content sits in large rounded **sky panels** inset from the page edge, soft cloud-like gradients, white cards with thin borders, calm navy type, generous whitespace and gentle fade-up motion.

**Adaptation for Hilltop:** the template's slate navy (`#183654`) is replaced with Hilltop's royal navy, and Hilltop's gold appears only as a small accent (eyebrow dots, focus rings, hover underline). All copy comes from the client's copy doc; no template text or images are reused. The H-monogram logo (`src/components/ui/Logo.jsx`) is kept unchanged.

**Mobbin references** for sections the template doesn't cover:

| Section | Reference | What we took |
|---------|-----------|--------------|
| Developments filter | [Instrument — Recent work](https://mobbin.com/sites/sections/2d0befd1-15d8-45b8-85c4-0898a4b266d8), [Unseen Studio — Selected Projects](https://mobbin.com/sites/sections/79d328bc-800b-4830-9de1-7ef8fd2dd00f) | Pill filter row above an image-card grid, active pill filled navy |
| FAQ | [Hex — FAQ](https://mobbin.com/sites/sections/c06bb90b-e748-4082-aa21-6ad74b1fc8ad) | Centred single-column accordion with a "Can't find your answer? Get in touch" line |
| Contact | [Complex Law — Get in touch](https://mobbin.com/sites/sections/cbb89da9-0000-4c53-883f-bd5d51762ca9) | Info column on the left, form card on the right, pill showing availability |
| Hero card | [General Intelligence Company](https://mobbin.com/sites/sections/721559aa-8890-441f-b6bc-281e7839ce3b) | Large rounded image panel with text overlaid on the left |

## 2. Colour tokens (`tailwind.config.js`)

| Token | Value | Use |
|-------|-------|-----|
| `navy` | `#14265F` | Headings, body text, primary buttons |
| `navy-deep` | `#10204F` | Button hover, hero overlay |
| `navy/70` | rgba of navy at 70 % | Body copy on light backgrounds (contrast 6.9:1 on white) |
| `sky-50` | `#F4F8FC` | Card hover, inputs |
| `sky-100` | `#E9EFF5` | Panel base (bottom) |
| `sky-200` | `#D5E9F8` | Panel top tint |
| `line` | navy at 8 % | Card borders, dividers |
| `gold` | `#D4B76E` | Accent only (eyebrow dot, text selection, link underline) — never for text or focus rings on light backgrounds (1.9:1) |
| white | `#FFFFFF` | Page and cards |

Panels use the `.panel-sky` utility: layered white radial "clouds" over a `sky-200 → sky-100` vertical gradient.

## 3. Typography

| Role | Font | Size (desktop → mobile) | Weight | Tracking |
|------|------|-------------------------|--------|----------|
| H1 | Satoshi | 64 px → 40 px (`clamp`) | 500 | −3 % |
| H2 | Satoshi | 54 px → 34 px | 500 | −3 % |
| H3 / card title | Satoshi | 25 px → 22 px | 500 | −2 % |
| Body large | Manrope | 18 px / 1.6 | 500 | normal |
| Body | Manrope | 16 px / 1.6 | 500 | normal |
| Eyebrow / chip | Satoshi | 13–14 px uppercase | 500 | +7 % |
| Button | Satoshi | 15 px | 500 | normal |

## 4. Components

| Component | File | Notes |
|-----------|------|-------|
| `Panel` | `ui/Panel.jsx` | Rounded 24 px inset section; `tone="sky" | "white" | "image"` |
| `Eyebrow` | `ui/Eyebrow.jsx` | White pill, gold dot-in-ring icon, uppercase label |
| `SectionHeading` | `ui/SectionHeading.jsx` | Eyebrow + H2 + lead, `align="center" | "left"` |
| `Button` | `ui/Button.jsx` | `variant="dark" | "light" | "glass"`; renders `Link`, `<a>` or `<button>` |
| `Card` | `ui/Card.jsx` | White, 20 px radius, 1 px `line` border, soft shadow |
| `Chip` | `ui/Chip.jsx` | Glass tag over images, or solid tag on cards |
| `Reveal` | `ui/Reveal.jsx` | Fade-up on scroll; off for reduced motion |
| `Accordion` | `ui/Accordion.jsx` | Button + region, `aria-expanded`, animated height |
| `DevelopmentCard` | `sections/DevelopmentCard.jsx` | Image with location/category chips, title, summary |
| `CtaPanel` | `sections/CtaPanel.jsx` | Centred closing call to action; the building photo sits in a strip along the bottom and fades up into the sky so text never overlaps it |
| `ImageHero` | `sections/ImageHero.jsx` | Full-bleed photo hero (Home, Own a Piece) with navy scrim — vertical on phones, horizontal on desktop |
| `PageHero` | `sections/PageHero.jsx` | Sky-panel hero for inner pages, centred or with an image |
| `SplitSection` | `sections/SplitSection.jsx` | Text beside a photo; text first on phones |
| `PeopleGrid` | `sections/PeopleGrid.jsx` | Board/team cards, or a "profiles coming soon" card when data is empty |
| `EnquiryForm` | `sections/EnquiryForm.jsx` | Validated form → email / WhatsApp |

## 5. Layout conventions

- Container: `max-w-[1320px]`, side padding 16 px (mobile) → 32 px (tablet) → 64 px panel inset (desktop).
- Vertical rhythm between panels: 24 px (mobile) → 40 px (desktop). Panel inner padding: 64 px → 96 px vertical.
- Radii: panel 24 px, card 20 px, image-in-card 14 px, button 10 px, chip 8 px, pill 999 px.
- Grids: 1 column < 640 px, 2 columns ≥ 640 px, 3 columns ≥ 1024 px. Service bento uses mixed spans.
- Header: 72 px tall, white at 80 % opacity with backdrop blur once scrolled.

## 6. Motion

- Reveal: opacity 0 → 1, y 24 → 0, 0.6 s, `cubic-bezier(0.22, 1, 0.36, 1)`, once per element, 0.06 s stagger in grids. Pages arrive prerendered and fully visible; after hydration only content still below the fold hides and fades up on scroll, so nothing on screen flickers. After client-side navigation every reveal plays.
- Image hero: the staggered entrance plays only after client-side navigation; on a fresh load the prerendered hero is visible immediately (it is the page's largest paint).
- Hover: cards lift 2 px and images scale 1.03 over 0.5 s.
- Menus: 0.2 s fade + 8 px slide.
- `prefers-reduced-motion: reduce` disables transforms and keeps only instant state changes.

## 7. Imagery

Architectural photography with sky and natural light. Overlay chips in glass style. Hero image gets a left-to-right navy gradient so white text keeps ≥ 4.5:1 contrast. All images have meaningful `alt` text (or `alt=""` when decorative).

## 8. Accessibility checklist

- One `h1` per page; headings in order.
- Skip link to `#main`.
- All interactive elements reachable by keyboard with a visible focus ring: 2 px navy with a 2 px white gap (≥ 3:1 on white, sky and the dark hero). Gold is not used for focus — it is only 1.9:1 on white.
- Secondary text on light backgrounds is never lighter than `navy/70` (≈ 6.9:1). The two-tone wordmark is a logotype and exempt.
- Dropdowns open on hover and on focus; Escape hides them. Escape closes the mobile menu, which also closes itself if the viewport grows to desktop width.
- After each in-app navigation focus moves to `<main>` (or the `#hash` target); not on first load. Back/forward keeps the browser's scroll position.
- External links that open a new tab announce "(opens in a new tab)" to screen readers.
- Form fields have labels; errors use `aria-invalid` and `aria-describedby`; a status message is announced with `role="status"`.
- Touch targets ≥ 44 × 44 px.
