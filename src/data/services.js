import {
  Building2,
  ClipboardList,
  Compass,
  HardHat,
  KeyRound,
  LandPlot,
  PencilRuler,
  TrendingUp,
  Users,
  Wrench,
} from 'lucide-react';

export const SERVICES = Object.freeze([
  {
    id: 'design-build',
    title: 'Design & Build',
    icon: PencilRuler,
    description:
      'We bring design concepts to life through coordinated planning and construction, creating functional spaces that respond to project needs and aspirations.',
    image: '/images/architect-plans.jpg',
    imageAlt: 'An architect drafting plans with a pencil and ruler',
  },
  {
    id: 'development-advisory',
    title: 'Development Advisory',
    icon: Compass,
    description:
      'We provide strategic insights and professional guidance to support real estate development decisions, planning and execution.',
    image: '/images/service-advisory.jpg',
    imageAlt: 'Two Black business professionals reviewing a document together outdoors',
    imagePosition: 'object-[50%_28%]',
  },
  {
    id: 'investment-management',
    title: 'Investment Management',
    icon: TrendingUp,
    description:
      'We support the strategic management of real estate investments, focusing on opportunities that deliver value and long-term growth.',
    image: '/images/commercial-towers.jpg',
    imageAlt: 'Glass office towers seen from street level against the sky',
  },
  {
    id: 'project-management',
    title: 'Project Management',
    icon: ClipboardList,
    description:
      'We coordinate the planning, resources and execution of development projects to support efficient delivery and project objectives.',
    image: '/images/construction-crew.jpg',
    imageAlt: 'Construction workers in hard hats on a building site',
  },
  {
    id: 'construction-management',
    title: 'Construction Management',
    icon: HardHat,
    description:
      'We oversee construction activities, coordinating processes, resources and stakeholders to support quality, efficiency and timely project delivery.',
    image: '/images/construction-cranes.jpg',
    imageAlt: 'Tower cranes rising over a building under construction',
  },
  {
    id: 'property-management',
    title: 'Property Management',
    icon: KeyRound,
    description:
      'We support the effective management of properties, helping to maintain their condition, functionality and long-term value.',
    image: '/images/terrace-townhouses.jpg',
    imageAlt: 'Contemporary townhouses with timber louvres and glass',
  },
  {
    id: 'facility-management',
    title: 'Facility Management',
    icon: Wrench,
    description:
      'We coordinate the operations and maintenance of buildings and facilities to support safe, functional and efficient environments.',
    image: '/images/glass-facade.jpg',
    imageAlt: 'The reflective glass facade of a modern building',
  },
  {
    id: 'estate-development',
    title: 'Estate Development',
    icon: LandPlot,
    description:
      'We plan and develop residential and mixed-use estates, creating well-structured environments that support comfortable living and long-term value.',
    image: '/images/estate-aerial.jpg',
    imageAlt: 'Aerial view of a planned residential estate',
  },
  {
    id: 'community-management',
    title: 'Community Management',
    icon: Users,
    description:
      'We support the effective management of residential communities, fostering organised, functional and well-maintained environments for residents.',
    image: '/images/yard-courtyard.jpg',
    imageAlt: 'Apartment building around a landscaped communal courtyard',
  },
  {
    id: 'city-development',
    title: 'City Development',
    icon: Building2,
    description:
      'We contribute to the growth and transformation of cities through strategic development initiatives that promote sustainable urban growth and improve the built environment.',
    image: '/images/metropolis-skyline.jpg',
    imageAlt: 'A dense city skyline beside open water',
  },
]);

/** The copy doc lists the first seven services on the homepage. */
export const HOME_SERVICES = SERVICES.slice(0, 7);
