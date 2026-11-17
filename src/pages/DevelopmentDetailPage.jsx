import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import {
  DEVELOPMENTS,
  DEVELOPMENT_STATUS_LABELS,
  findDevelopment,
  getTypeLabel,
} from '../data/developments';
import { buildQuickWhatsAppLink } from '../lib/enquiry';
import usePageMeta from '../hooks/usePageMeta';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Panel from '../components/ui/Panel';
import Photo from '../components/ui/Photo';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import DevelopmentCard from '../components/sections/DevelopmentCard';
import NotFoundPage from './NotFoundPage';

const RELATED_COUNT = 3;

function FactList({ development }) {
  const facts = [
    { label: 'Category', value: getTypeLabel(development.type) },
    { label: 'Status', value: DEVELOPMENT_STATUS_LABELS[development.status] },
    { label: 'Designed for', value: development.audience },
  ];

  return (
    <dl className="mt-10 grid gap-4 sm:grid-cols-3">
      {facts.map((fact) => (
        <Card key={fact.label} className="px-5 py-6 text-center">
          <dt className="text-sm text-navy/70">{fact.label}</dt>
          <dd className="mt-2 font-display text-xl tracking-[-0.01em]">{fact.value}</dd>
        </Card>
      ))}
    </dl>
  );
}

function RegisterInterest({ development }) {
  const whatsappLink = buildQuickWhatsAppLink(
    `Hello Hilltop Developments, I'd like to know more about ${development.name}.`,
  );

  return (
    <Card className="mt-10 flex flex-col gap-6 p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-h3">Register your interest</h2>
        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-navy/70">
          Share your details and our team will contact you about {development.name}, including pricing, inspections and
          payment options.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button to={`/contact?type=development&development=${development.slug}`} variant="dark" icon={ArrowRight}>
          Register interest
        </Button>
        <Button href={whatsappLink} variant="light" icon={MessageCircle}>
          WhatsApp
        </Button>
      </div>
    </Card>
  );
}

function DevelopmentDetail({ development }) {
  usePageMeta({ title: development.name, description: development.summary });
  const related = DEVELOPMENTS.filter((item) => item.slug !== development.slug).slice(0, RELATED_COUNT);

  return (
    <>
      <Panel aria-labelledby="page-title">
        <Link
          to="/developments"
          className="focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-btn bg-white px-4 font-display text-[15px] shadow-button"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" />
          All developments
        </Link>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <SectionHeading as="h1" id="page-title" align="left" eyebrow={development.tagline} title={development.name} />
          <p className="text-lead text-navy/70">{development.summary}</p>
        </div>

        <FactList development={development} />

        <div className="mt-5 grid gap-4 md:grid-cols-[1.4fr_1fr]">
          {development.gallery.map((photo, index) => (
            <div key={photo.src} className="aspect-[4/3] overflow-hidden rounded-card bg-sky-100 md:aspect-auto md:h-[460px]">
              <Photo src={photo.src} alt={photo.alt} priority={index === 0} />
            </div>
          ))}
        </div>

        <RegisterInterest development={development} />
      </Panel>

      <Panel aria-labelledby="related-title">
        <Reveal>
          <SectionHeading id="related-title" eyebrow="Explore more" title="Other developments" />
        </Reveal>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((item) => (
            <li key={item.slug}>
              <DevelopmentCard development={item} />
            </li>
          ))}
        </ul>
      </Panel>
    </>
  );
}

export default function DevelopmentDetailPage() {
  const { slug } = useParams();
  const development = findDevelopment(slug);

  if (!development) return <NotFoundPage />;
  // key resets page state when moving between developments
  return <DevelopmentDetail key={development.slug} development={development} />;
}
