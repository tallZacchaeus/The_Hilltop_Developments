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
  },
  {
    id: 'investment-management',
    title: 'Investment Management',
    icon: TrendingUp,
    description:
      'We support the strategic management of real estate investments, focusing on opportunities that deliver value and long-term growth.',
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
  },
  {
    id: 'property-management',
    title: 'Property Management',
    icon: KeyRound,
    description:
      'We support the effective management of properties, helping to maintain their condition, functionality and long-term value.',
  },
  {
    id: 'facility-management',
    title: 'Facility Management',
    icon: Wrench,
    description:
      'We coordinate the operations and maintenance of buildings and facilities to support safe, functional and efficient environments.',
  },
  {
    id: 'estate-development',
    title: 'Estate Development',
    icon: LandPlot,
    description:
      'We plan and develop residential and mixed-use estates, creating well-structured environments that support comfortable living and long-term value.',
  },
  {
    id: 'community-management',
    title: 'Community Management',
    icon: Users,
    description:
      'We support the effective management of residential communities, fostering organised, functional and well-maintained environments for residents.',
  },
  {
    id: 'city-development',
    title: 'City Development',
    icon: Building2,
    description:
      'We contribute to the growth and transformation of cities through strategic development initiatives that promote sustainable urban growth and improve the built environment.',
  },
]);

/** The copy doc lists the first seven services on the homepage. */
export const HOME_SERVICES = SERVICES.slice(0, 7);
