import { ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/services';
import { PARTNERS } from '../data/partners';
import { CLIENTS } from '../data/people';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Panel from '../components/ui/Panel';
import Photo from '../components/ui/Photo';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import CtaPanel from '../components/sections/CtaPanel';
import PartnersSection from '../components/sections/PartnersSection';
import PageHero from '../components/sections/PageHero';

const STAGGER = 0.04;

function ServiceCard({ service, number }) {
  const Icon = service.icon;
  return (
    <Card className="flex h-full flex-col gap-5 p-3 sm:p-4">
      <div className="aspect-[16/10] overflow-hidden rounded-inner bg-sky-100">
        <Photo src={service.image} alt={service.imageAlt} className={service.imagePosition ?? ''} />
      </div>
      <div className="flex flex-1 flex-col gap-4 px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-sky-100">
            <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <span aria-hidden="true" className="font-display text-sm text-navy/50">{String(number).padStart(2, '0')}</span>
        </div>
        <h3 className="text-h3">{service.title}</h3>
        <p className="text-[15px] leading-relaxed text-navy/70">{service.description}</p>
      </div>
    </Card>
  );
}

/** Shown once Hilltop supplies client logos (see src/data/people.js). */
function ClientLogos() {
  if (CLIENTS.length === 0) return null;

  return (
    <Panel id="clients" aria-labelledby="clients-title">
      <SectionHeading id="clients-title" eyebrow="Clients" title="Our Valued Clients" />
      <ul className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
        {CLIENTS.map((client) => (
          <li key={client.name}>
            <Card className="grid h-24 place-items-center p-5">
              <img src={client.logo} alt={client.name} loading="lazy" className="max-h-10 w-auto" />
            </Card>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Expertise That Moves Developments Forward."
        lead="We provide integrated real estate services that support projects at every stage, from initial planning and design to development, delivery and ongoing management."
        image="/images/construction-cranes.jpg"
        imageAlt="Tower cranes over a building under construction"
        actions={
          <Button to="/contact?type=services" variant="dark" icon={ArrowRight}>
            Get in Touch
          </Button>
        }
      />

      <Panel id="all-services" aria-labelledby="all-services-title">
        <h2 id="all-services-title" className="sr-only">
          All services
        </h2>
        <ol className="grid gap-5 md:grid-cols-2">
          {SERVICES.map((service, index) => (
            <Reveal as="li" key={service.id} delay={(index % 2) * STAGGER}>
              <ServiceCard service={service} number={index + 1} />
            </Reveal>
          ))}
        </ol>
      </Panel>

      <PartnersSection id="partners" partners={PARTNERS} />

      <ClientLogos />

      <CtaPanel
        id="next-project"
        eyebrow="Work with us"
        title="Let's Bring Your Next Project to Life."
        actions={
          <Button to="/contact?type=services" variant="dark" icon={ArrowRight}>
            Get in Touch
          </Button>
        }
      >
        <p>
          Whether you are planning a development, seeking professional guidance or looking for effective property
          solutions, Hilltop is ready to explore the possibilities with you.
        </p>
      </CtaPanel>
    </>
  );
}
