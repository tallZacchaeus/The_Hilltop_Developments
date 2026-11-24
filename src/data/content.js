export const FAQS = Object.freeze([
  {
    question: 'How can I inquire about purchasing a property from Hilltop?',
    answer:
      'You can submit an enquiry through our Contact Us page or reach out using our official contact details. Our team will guide you through the next steps.',
  },
  {
    question: 'How do I find out the prices of available properties?',
    answer:
      'Property prices vary depending on the development and property type. Contact our team for current pricing information.',
  },
  {
    question: 'Can I schedule a physical inspection of a property?',
    answer: 'Yes. You can contact our team to inquire about arranging a property inspection.',
  },
  {
    question: 'Can I purchase a property before its completion?',
    answer:
      'This depends on the development and its sales arrangements. Please contact our team for information about applicable purchase options.',
  },
  {
    question: 'What payment options are available for purchasing a property?',
    answer:
      'Payment arrangements may vary across developments. Contact our team for details about the available payment options.',
  },
  {
    question: 'How can I confirm the details of a land opportunity?',
    answer:
      "Contact our team to request information about the land's location, size, price, title documentation and other relevant details.",
  },
  {
    question: 'What documentation is provided when purchasing land?',
    answer:
      'The documentation available depends on the specific property. Our team can provide information about the relevant title and transaction documents.',
  },
  {
    question: 'Does Hilltop accept investment or development partnership proposals?',
    answer:
      'Yes. We welcome proposals from individuals, organisations and investors interested in exploring mutually beneficial opportunities. You can submit your proposal through our Contact Us page.',
  },
  {
    question: 'How can I propose a partnership with Hilltop?',
    answer:
      'Send us an enquiry outlining your organisation, proposed collaboration and objectives. Our team will review your submission and get back to you.',
  },
  {
    question: 'How can I stay updated on upcoming developments?',
    answer:
      "You can visit our Insights page and follow Hilltop's official social media channels for announcements and project updates.",
  },
  {
    question: 'How can I reach the Hilltop team for further enquiries?',
    answer:
      'Visit our Contact Us page for our official contact details or submit a message through the online enquiry form.',
  },
]);

export const PROJECT_CATEGORIES = Object.freeze([
  {
    id: 'metropolis',
    name: 'Metropolis',
    image: '/images/metropolis-skyline.jpg',
    imageAlt: 'A dense city skyline beside open water',
  },
  {
    id: 'countryside',
    name: 'Countryside',
    image: '/images/countryside-hills.jpg',
    imageAlt: 'Green fields and hedgerows rolling towards a village',
  },
  {
    id: 'hinterland',
    name: 'Hinterland',
    image: '/images/hinterland-savanna.jpg',
    imageAlt: 'Acacia trees scattered across a golden savanna',
  },
]);

/** Own a Piece is strictly land buying (client brief, Nov 2026). */
export const LAND_OPPORTUNITY = Object.freeze({
  id: 'land',
  title: 'Land Opportunities',
  description: 'Explore available land for direct ownership and future development.',
  image: '/images/land-development-site.jpg',
  imageAlt: 'Aerial view of land prepared for development',
});

/** Opportunities an ownership enquiry can be about (the enquiry form and email subject read these). */
export const OPPORTUNITIES = Object.freeze([LAND_OPPORTUNITY]);

export const INSIGHTS = Object.freeze([
  {
    id: 'news',
    title: 'News & Updates',
    description:
      "Keep up with the latest news, announcements and updates from Hilltop Developments. From project milestones and company activities to new developments, find out what's happening across our organisation.",
    image: '/images/construction-cranes.jpg',
    imageAlt: 'Tower cranes rising over a building under construction',
    status: 'First updates coming soon',
  },
  {
    id: 'articles',
    title: 'Articles',
    description:
      'Explore articles, perspectives and useful information on real estate development, investment, urban growth and the built environment.',
    image: '/images/architect-plans.jpg',
    imageAlt: 'Architectural plans being drafted by hand',
    status: 'First articles coming soon',
  },
  {
    id: 'careers',
    title: 'Careers at Hilltop',
    description:
      'Be part of a team contributing to the future of real estate development. Discover career opportunities at Hilltop and find out how your skills, experience and ideas can contribute to our work.',
    image: '/images/construction-crew.jpg',
    imageAlt: 'A construction team at work on site',
    status: 'Open to applications',
  },
]);
