# 01 — Product Requirements Document

**Product:** Hilltop Developments marketing website
**Live domain:** https://www.thehilltopdevelopments.com
**Copy source:** [Hilltop Developments Website Copy (Google Doc)](https://docs.google.com/document/d/1gtPzjbxr98d8maIZso3mKFPfvwP_AXHbup58nFg7Ko4/edit)
**Design reference:** [Architecteo Framer template](https://architecteo.framer.website/) — see [04-UI-UX-Design-Brief.md](04-UI-UX-Design-Brief.md)
**Last updated:** 2026-11-17

## 1. Overview

Hilltop Developments is a Nigerian real estate development company whose tagline is **Building Sustainable Cities**. Until November 2026 the web presence was a single-page pre-launch holding page. This redesign replaces it with a full multi-page marketing site that presents the company, its services, its developments and its ownership offering, and turns visitors into enquiries.

## 2. Goals

| # | Goal | How the site supports it |
|---|------|--------------------------|
| G1 | Establish Hilltop as a credible, forward-thinking developer | About page (who we are, vision, mission, board, team, categories, partnerships) |
| G2 | Showcase developments and generate interest before launch | Developments index + one page per development, "Coming soon" status |
| G3 | Capture enquiries for developments, services, partnerships, careers and ownership | Enquiry form on Contact, deep links that pre-select the enquiry type |
| G4 | Answer common buyer questions without a call | FAQ (11 questions) on the Contact page |
| G5 | Give the team room to publish news, articles and careers later | Insights page with sections ready for content |

## 3. Target users

| Persona | Needs | Primary pages |
|---------|-------|---------------|
| First-time buyer (young adult) | Affordable, practical homes; how to enquire | Developments → Crib by Hilltop, Contact |
| Premium home buyer | Luxury, privacy, nature; inspection and payment options | Goshen, Splurge, The Terrace, FAQ |
| Land buyer | Land to buy, title documents | Own a Piece (land buying only), FAQ |
| Partner / organisation | Collaboration model, who to contact | About → Partnerships, Contact (partnership) |
| Client needing services | Design & build, advisory, management services | Services, Contact |
| Job seeker | Open roles | Insights → Careers |

## 4. Core features and requirements

| ID | Requirement | Status |
|----|-------------|--------|
| F1 | Seven primary pages: Home, About, Services, Developments, Insights, Contact, Own a Piece | Built |
| F2 | One detail page per development (Crib, Goshen, Splurge, The Terrace, The Yard, Commercial, Infrastructure) | Built |
| F3 | Sticky header with dropdowns for About and Developments; mobile menu | Built |
| F4 | Developments index filterable by Residential / Commercial / Infrastructure | Built |
| F5 | Enquiry form with validation, enquiry-type and development pre-selection from links | Built (sends via email app / WhatsApp; no server) |
| F6 | FAQ accordion with all 11 questions from the copy doc | Built |
| F7 | Team and Client logos driven by data, with a "coming soon" state while empty | Built — awaiting client content (client logo section stays hidden until logos exist) |
| F8 | Per-page title, description, canonical URL and robots (404 is `noindex`) | Built |
| F9 | Privacy Policy and Terms pages | Placeholder until legal text is supplied |
| F10 | Server-side enquiry handling (Resend / Formspree) | Planned |
| F11 | Analytics (Plausible or GA4) | Planned |
| F12 | CMS for news, articles and careers | Planned |

## 5. User stories

- As a **first-time buyer**, I want to see which developments suit me and register interest in one, so the sales team contacts me about that development.
- As a **land investor**, I want to understand Hilltop's ownership opportunities and ask about title documents, so I can decide whether to buy.
- As a **partner organisation**, I want to send a partnership proposal directly, so it reaches the right team.
- As a **visitor on a phone**, I want to message Hilltop on WhatsApp in one tap, because that is how I normally contact businesses.
- As **Hilltop's team**, I want to add board members, team members and client logos by editing one data file, without touching layouts.

## 6. Success metrics

Measurement depends on F11 (analytics), which is planned.

| Metric | Target (first 90 days after launch) |
|--------|-------------------------------------|
| Enquiries started (form submit, WhatsApp or email click) | ≥ 40 / month |
| Visitors reaching a development detail page | ≥ 35 % of sessions |
| Mobile Lighthouse performance score | ≥ 90 |
| Accessibility (axe) serious/critical issues | 0 |

## 7. Content still needed from Hilltop

These are rendered as clearly marked placeholders and tracked in [06-Implementation-Plan.md](06-Implementation-Plan.md):

- Team: photos, names, titles, short bios
- Client logos
- Office hours (the copy doc has `[Insert operating hours]`)
- Per-development facts: location, unit types, price range, status dates, real renders
- News, articles and career openings
- Privacy Policy and Terms & Conditions text
- Official social media links

## 8. Out of scope (this phase)

Property listings with live availability, online payments, user accounts, and a CMS.

## 9. Copy notes — where the site differs from the copy doc

All headings and body text come from the copy doc. These small additions or substitutions were needed for the UI and should be approved by Hilltop:

| Where | What the site shows | Why |
|-------|---------------------|-----|
| Section eyebrows (e.g. "Who we are", "Our commitment", "Coming soon") | Short labels above headings | Template pattern; the doc has no labels |
| Home, "The Future of Cities…" image card | "Living · Working · Community" | Taken from the doc's phrase "living, working and community development" |
| Development detail pages | Facts (Category, Status, Designed for) and a "Register your interest" block | The doc has one paragraph per development; facts are derived from it |
| Insights → News & Articles | Button "Get updates" (WhatsApp) instead of "View All News" / "Explore Articles" | There are no posts yet; the doc's buttons would lead nowhere |
| Team | "Profiles coming soon" card | No profiles supplied yet |
| Contact | No office-hours line | The doc has `[Insert operating hours]` |
| Privacy Policy / Terms | "Being finalised" placeholder | No legal text supplied |

**Client feedback, 24 Nov 2026.** The client asked for four changes; these are the new or reworded texts to approve:

| Where | What the site shows | Why |
|-------|---------------------|-----|
| Developments, nav, homepage card | "Infrastructure" / "Infrastructure Developments" instead of "Land" | Client: change "Land" to Infrastructure. `/developments/land` now redirects to `/developments/infrastructure` |
| Infrastructure detail page | Tagline "The groundwork for growing cities"; designed for "Communities, businesses and partners"; summary about roads, utilities and shared spaces | **Draft:** the copy doc only has Land copy, which describes selling plots. Needs Hilltop's wording |
| Homepage "Creating Spaces That Move Life Forward" lead | "…functional commercial spaces and the infrastructure that supports them…" (was "…and land opportunities…") | Follows the rename |
| Own a Piece | One "Land Opportunities" section ("Enquire about land"); hero lead now "A Hilltop Developments land ownership offering, giving you the opportunity to own land across our developments." Estate, property and investment opportunities removed | Client: Own a Piece is strictly land buying |
| Footer, homepage hero, structured data | "A Realty Expression of the Marvel Ideations" removed | Client: remove Marvel Ideations everywhere |
