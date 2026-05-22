# Hilltop Developments

Pre-launch holding page for Hilltop Developments, built with React, Vite, Tailwind CSS, and Framer Motion.

## Brand Reference

Primary brand source: `Africa Missions-Tirta Ayu Spa - Redemption City - Variant 1.pdf`.

Key facts from the brand reference:

- Brand name: Hilltop Developments
- Tagline: Building Sustainable Cities
- Parent positioning: A Realty Expression of the Marvel Ideations
- Vision: To build sustainable cities through strategic enterprise, innovative solutions, and impactful partnerships.
- Mission: To drive sustainable urban development by fostering purposeful enterprise, building strategic partnerships, and delivering solutions that create lasting value for communities globally.

The site uses the deck's deep navy field, white H-monogram language, gold accent treatments, architectural imagery, and overlapping navy content blocks.

## Local Setup

1. Make sure you have Node.js installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

## Sections

- Hero: brand tagline, parent positioning, and architectural carousel.
- View From The Top: vision and mission blocks over blue-tinted architecture.
- Our Approach: sustainable, strategic, and transformative development pillars.
- As The Future Unfolds: closing commitment from the brand deck.
- Consultation and footer: direct enquiry paths and launch positioning.

## Deployment

To deploy to Vercel:
1. Push this repository to GitHub and import it on Vercel.
2. Or use the Vercel CLI: run `vercel --prod` in the root directory.

## Future Enhancements

- **Backend Integration:** The consultation buttons currently use `mailto:` and `wa.me` links. To handle this properly in production, wire them up to an API (like Resend or Formspree) by creating a modal form.
- **Accessibility Check:** The animations all respect `prefers-reduced-motion` but always ensure proper tab-focus and screen-reader testing before going live.
