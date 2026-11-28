export const DEVELOPMENT_TYPES = Object.freeze([
  {
    id: 'residential',
    label: 'Residential',
    title: 'Residential Developments',
    image: '/images/residential-dusk.jpg',
    imageAlt: 'A modern two-storey home lit warmly at dusk',
  },
  {
    id: 'commercial',
    label: 'Commercial',
    title: 'Commercial Developments',
    image: '/images/commercial-towers.jpg',
    imageAlt: 'Glass office towers seen from street level against the sky',
  },
  {
    id: 'infrastructure',
    label: 'Infrastructure',
    title: 'Infrastructure Developments',
    image: '/images/land-development-site.jpg',
    imageAlt: 'Aerial view of a new development site with roads laid out',
  },
]);

export const DEVELOPMENT_STATUS_LABELS = Object.freeze({
  'coming-soon': 'Coming soon',
  selling: 'Now selling',
  completed: 'Completed',
});

export const DEVELOPMENTS = Object.freeze([
  {
    slug: 'crib',
    name: 'Crib by Hilltop',
    type: 'residential',
    status: 'coming-soon',
    tagline: 'Modern starter homes',
    audience: 'Young adults and first-time homeowners',
    summary:
      'A modern residential concept designed with young adults and first-time homeowners in mind. Crib offers practical, comfortable and functional living spaces with the essential features needed for independent living.',
    image: '/images/crib-homes.jpg',
    imageAlt: 'A row of modern white homes with dark pitched roofs',
    gallery: [
      { src: '/images/crib-homes.jpg', alt: 'Modern white homes with dark roofs' },
      { src: '/images/apartment-block.jpg', alt: 'A contemporary apartment block against a blue sky' },
    ],
  },
  {
    slug: 'goshen',
    name: 'Goshen by Hilltop',
    type: 'residential',
    status: 'coming-soon',
    tagline: 'Luxury residential',
    audience: 'Buyers seeking privacy and refined living',
    summary:
      'A luxury residential development designed for modern living, combining comfort, privacy and contemporary elegance. Every detail is thoughtfully considered to deliver a refined living experience defined by quality and style.',
    image: '/images/goshen-residence.jpg',
    imageAlt: 'A modern home with a green lawn framed by palm trees',
    // Client flyer (Nov 2026), shown on the detail page. Width and height are the file's pixel size.
    flyer: {
      src: '/images/goshen-flyer.jpg',
      alt: 'Flyer: Goshen by Hilltop, coming soon, Ogun State, Nigeria, above a modern concrete and glass home beside a pool',
      width: 1080,
      height: 1350,
    },
    gallery: [
      { src: '/images/goshen-residence.jpg', alt: 'Modern home with lawn and palm trees' },
      { src: '/images/interior-living.jpg', alt: 'A bright, contemporary living room' },
    ],
  },
  {
    slug: 'splurge',
    name: 'Splurge by Hilltop',
    type: 'residential',
    status: 'coming-soon',
    tagline: 'Luxury close to nature',
    audience: 'Those who value luxury, relaxation and nature',
    summary:
      'A residential development designed for those who value luxury, relaxation and a connection to nature. It brings together contemporary design, comfort and sophistication to create a distinctive living experience.',
    image: '/images/splurge-pool-villa.jpg',
    imageAlt: 'A contemporary villa with a pool and a wide lawn',
    // Client flyer (Nov 2026), shown on the detail page.
    flyer: {
      src: '/images/splurge-flyer.jpg',
      alt: 'Flyer: Splurge by Hilltop, coming soon, Ogun State, Nigeria, over a concrete and timber villa beside a turquoise pool in a forest',
      width: 1080,
      height: 1350,
    },
    gallery: [
      { src: '/images/splurge-pool-villa.jpg', alt: 'Villa with pool and garden' },
      { src: '/images/countryside-tropical-home.jpg', alt: 'A modern home among tropical trees' },
    ],
  },
  {
    slug: 'the-terrace',
    name: 'The Terrace by Hilltop',
    type: 'residential',
    status: 'coming-soon',
    tagline: 'Contemporary terraces',
    audience: 'Families who want style and everyday convenience',
    summary:
      'A residential development centred on contemporary design and comfortable living, offering thoughtfully planned spaces that balance functionality, style and everyday convenience.',
    image: '/images/terrace-townhouses.jpg',
    imageAlt: 'Contemporary townhouses with timber louvres and glass',
    gallery: [
      { src: '/images/terrace-townhouses.jpg', alt: 'Townhouses with timber louvres' },
      { src: '/images/residential-dusk.jpg', alt: 'A modern home lit at dusk' },
    ],
  },
  {
    slug: 'the-yard',
    name: 'The Yard by Hilltop',
    type: 'residential',
    status: 'coming-soon',
    tagline: 'Community living',
    audience: 'Residents who value comfort and community',
    summary:
      'A residential development concept that explores modern, practical living through well-considered spaces designed to support comfort, convenience and a sense of community.',
    image: '/images/yard-courtyard.jpg',
    imageAlt: 'An apartment building around a landscaped courtyard',
    gallery: [
      { src: '/images/yard-courtyard.jpg', alt: 'Landscaped residential courtyard' },
      { src: '/images/estate-aerial.jpg', alt: 'Aerial view of a planned residential estate' },
    ],
  },
  {
    slug: 'commercial',
    name: 'Commercial Developments',
    type: 'commercial',
    status: 'coming-soon',
    tagline: 'Spaces for business',
    audience: 'Businesses and organisations',
    summary:
      "Hilltop's commercial developments are designed to provide functional and adaptable spaces for businesses, organisations and commercial activities. We focus on creating environments that support productivity, business operations and long-term value.",
    image: '/images/commercial-towers.jpg',
    imageAlt: 'Glass office towers seen from street level',
    gallery: [
      { src: '/images/commercial-towers.jpg', alt: 'Glass office towers' },
      { src: '/images/glass-facade.jpg', alt: 'A reflective glass facade' },
    ],
  },
  {
    // Draft copy pending client approval (docs/01-PRD.md §9): the client renamed "Land" to "Infrastructure".
    slug: 'infrastructure',
    name: 'Infrastructure Developments',
    type: 'infrastructure',
    status: 'coming-soon',
    tagline: 'The groundwork for growing cities',
    audience: 'Communities, businesses and partners',
    summary:
      "Hilltop's infrastructure developments lay the groundwork for sustainable cities, delivering the roads, utilities and shared spaces that allow communities and businesses to grow and connect.",
    image: '/images/land-development-site.jpg',
    imageAlt: 'Aerial view of a development site with roads laid out',
    gallery: [
      { src: '/images/land-development-site.jpg', alt: 'Development site from above' },
      { src: '/images/estate-aerial.jpg', alt: 'Aerial view of a residential estate' },
    ],
  },
]);

export const UPCOMING_DEVELOPMENTS = DEVELOPMENTS.filter((item) => item.type === 'residential');

export function findDevelopment(slug) {
  return DEVELOPMENTS.find((item) => item.slug === slug) ?? null;
}

export function filterDevelopments(category) {
  const isKnownType = DEVELOPMENT_TYPES.some((type) => type.id === category);
  return isKnownType ? DEVELOPMENTS.filter((item) => item.type === category) : DEVELOPMENTS;
}

export function getTypeLabel(typeId) {
  return DEVELOPMENT_TYPES.find((type) => type.id === typeId)?.label ?? typeId;
}
