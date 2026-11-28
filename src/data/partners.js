/**
 * Partners in Success (client request, Nov 2026).
 *
 * Partner: { name: string, logo: string | null, width?: number, height?: number }
 * `logo` is a path under public/; `width`/`height` are the file's pixel size (stops layout shift).
 * A partner with `logo: null` (none today) renders as a text wordmark tile.
 */
export const PARTNERS = Object.freeze([
  { name: '1987 Projects & Procurement', logo: '/images/partners/1987-projects.png', width: 400, height: 187 },
  { name: 'Premium Cast', logo: '/images/partners/premium-cast.png', width: 289, height: 216 },
  { name: 'The Facility', logo: '/images/partners/the-facility.png', width: 374, height: 314 },
  { name: '2nd Haven', logo: '/images/partners/2nd-haven.png', width: 278, height: 332 },
  { name: 'Space R', logo: '/images/partners/space-r.png', width: 400, height: 115 },
]);
