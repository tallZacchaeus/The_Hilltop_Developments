# Hilltop Developments

Premium real estate landing page build with React, Vite, Tailwind CSS, and Framer Motion.

## Local Setup

1. Make sure you have Node.js installed.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.

## Replacements

- **Hero Image:** In `src/components/Hero.jsx`, there is a TODO for the background image URL. Replace `https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=80` with the correct path to your hero architectural shot (e.g., `url(/Hilltop\ Developments\ 2.png)` if it's placed in `public`).
- **Logo:** The text logomark in `src/components/Header.jsx` can be replaced with an SVG or PNG brand logo if provided.

## Deployment

To deploy to Vercel:
1. Push this repository to GitHub and import it on Vercel.
2. Or use the Vercel CLI: run `vercel --prod` in the root directory.

## Future Enhancements

- **Backend Integration:** The consultation buttons currently use `mailto:` and `wa.me` links. To handle this properly in production, wire them up to an API (like Resend or Formspree) by creating a modal form.
- **Accessibility Check:** The animations all respect `prefers-reduced-motion` but always ensure proper tab-focus and screen-reader testing before going live.
