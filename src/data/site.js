export const SITE = Object.freeze({
  name: 'Hilltop Developments',
  tagline: 'Building Sustainable Cities',
  url: 'https://www.thehilltopdevelopments.com',
  description:
    'Hilltop Developments is a forward-thinking real estate development company creating innovative, future-ready spaces that shape how cities grow and evolve.',
});

export const CONTACT = Object.freeze({
  email: 'info@hilltopdevelopments.com',
  phoneDisplay: '+234 (0) 913 908 3794',
  phoneHref: 'tel:+2349139083794',
  whatsappNumber: '2349139083794',
  addressLines: Object.freeze(['The Light House, by Redemption City', 'Ogun State, Nigeria']),
});

export const NAV_ITEMS = Object.freeze([
  {
    label: 'About',
    to: '/about',
    children: [
      { label: 'Company Overview', to: '/about#overview' },
      { label: 'Vision & Mission', to: '/about#vision' },
      { label: 'Advisory Board', to: '/about#board' },
      { label: 'The Team', to: '/about#team' },
      { label: 'Project Categories', to: '/about#categories' },
      { label: 'Partnerships', to: '/about#partnerships' },
    ],
  },
  { label: 'Services', to: '/services' },
  {
    label: 'Developments',
    to: '/developments',
    children: [
      { label: 'Residential', to: '/developments?category=residential' },
      { label: 'Commercial', to: '/developments?category=commercial' },
      { label: 'Infrastructure', to: '/developments?category=infrastructure' },
    ],
  },
  { label: 'Insights', to: '/insights' },
  { label: 'Own a Piece', to: '/own-a-piece' },
]);

export const FOOTER_GROUPS = Object.freeze([
  {
    title: 'Explore',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Services', to: '/services' },
      { label: 'Developments', to: '/developments' },
      { label: 'Insights', to: '/insights' },
      { label: 'Own a Piece', to: '/own-a-piece' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'FAQs', to: '/contact#faqs' },
      { label: 'Careers at Hilltop', to: '/insights#careers' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Terms & Conditions', to: '/terms' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
]);

/** Every top-level route the app defines (used by the prerender step, the generated sitemap and tests). */
export const PAGE_ROUTES = Object.freeze([
  '/',
  '/about',
  '/services',
  '/developments',
  '/insights',
  '/contact',
  '/own-a-piece',
  '/privacy-policy',
  '/terms',
]);
