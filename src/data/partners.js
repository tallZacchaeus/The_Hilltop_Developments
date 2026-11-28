/**
 * Partners in Success (client request, Nov 2026).
 *
 * Partner: { name: string, logo: string | null, width?: number, height?: number }
 * `logo` is a path under public/; `width`/`height` are the file's pixel size (stops layout shift).
 * A partner with `logo: null` renders as a text wordmark tile.
 */
export const PARTNERS = Object.freeze([
  { name: '1987 Projects & Procurement', logo: '/images/partners/1987-projects.png', width: 400, height: 187 },
  { name: 'Premium Cast', logo: '/images/partners/premium-cast.png', width: 289, height: 216 },
  { name: 'The Facility', logo: '/images/partners/the-facility.png', width: 374, height: 314 },
  // TODO(client): 2nd Haven has not sent a logo yet. Drop the file in public/images/partners/ and set
  // `logo`, `width` and `height` here; the tile switches from a text wordmark to the image.
  { name: '2nd Haven', logo: null },
  // TODO(client): same for Space R.
  { name: 'Space R', logo: null },
]);
