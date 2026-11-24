import { SITE } from '../data/site';
import { DEVELOPMENTS } from '../data/developments';
import { LEGAL_PAGES } from '../data/legal';
import HomePage from '../pages/home/HomePage';
import AboutPage from '../pages/about/AboutPage';
import ServicesPage from '../pages/ServicesPage';
import DevelopmentsPage from '../pages/DevelopmentsPage';
import DevelopmentDetailPage from '../pages/DevelopmentDetailPage';
import InsightsPage from '../pages/InsightsPage';
import ContactPage from '../pages/ContactPage';
import OwnAPiecePage from '../pages/OwnAPiecePage';
import LegalPage from '../pages/LegalPage';
import NotFoundPage from '../pages/NotFoundPage';
import { definePages } from './definePages';

/**
 * Every page on the site: its path, the title and description used in search results and link
 * previews, and what it renders. Adding or rewording a page happens here, in one row; the router,
 * <head> tags, prerendered files, sitemap and header highlighting all follow from this table.
 */
const site = definePages(
  [
    { path: '/', description: SITE.description, element: <HomePage /> },
    {
      path: '/about',
      title: 'About Us',
      description:
        'Hilltop Developments is a forward-thinking real estate development company dedicated to shaping sustainable cities through innovative, adaptive and future-ready developments.',
      element: <AboutPage />,
    },
    {
      path: '/services',
      title: 'Our Services',
      description:
        'Integrated real estate services from design & build and development advisory to property, facility, estate, community and city development.',
      element: <ServicesPage />,
    },
    {
      path: '/developments',
      title: 'Developments',
      description:
        'Explore Hilltop residential, commercial and infrastructure developments, including Crib, Goshen, Splurge, The Terrace and The Yard by Hilltop.',
      element: <DevelopmentsPage />,
    },
    {
      path: '/insights',
      title: 'Insights',
      description:
        'News, articles and career opportunities from Hilltop Developments, plus perspectives on real estate and the built environment.',
      element: <InsightsPage />,
    },
    {
      path: '/contact',
      title: 'Contact Us',
      description:
        "Get in touch with Hilltop Developments about our developments, services or a partnership. We'd be happy to hear from you.",
      element: <ContactPage />,
    },
    {
      path: '/own-a-piece',
      title: 'Own a Piece',
      description:
        'Own a Piece of the Earth: buy land for direct ownership and future development across Hilltop developments.',
      element: <OwnAPiecePage />,
    },
    {
      path: '/privacy-policy',
      title: LEGAL_PAGES.privacy.title,
      description: LEGAL_PAGES.privacy.lead,
      element: <LegalPage kind="privacy" />,
    },
    {
      path: '/terms',
      title: LEGAL_PAGES.terms.title,
      description: LEGAL_PAGES.terms.lead,
      element: <LegalPage kind="terms" />,
    },
    // One page per development; new developments in src/data/developments.js appear automatically.
    {
      each: DEVELOPMENTS,
      path: (development) => `/developments/${development.slug}`,
      title: (development) => development.name,
      description: (development) => development.summary,
      element: (development) => <DevelopmentDetailPage development={development} />,
    },
  ],
  { title: 'Page not found', element: <NotFoundPage /> },
);

export default site;
