import { ArrowRight } from 'lucide-react';
import { HOME_SERVICES } from '../../data/services';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Panel from '../../components/ui/Panel';
import Photo from '../../components/ui/Photo';
import Reveal from '../../components/ui/Reveal';
import SectionHeading from '../../components/ui/SectionHeading';

// Bento rhythm after the template's "What we do best": wide/narrow, narrow/wide, then thirds.
const SPANS = [
  'lg:col-span-7',
  'lg:col-span-5',
  'lg:col-span-5',
  'lg:col-span-7',
  'lg:col-span-4',
  'lg:col-span-4',
  'md:col-span-2 lg:col-span-4',
];
const STAGGER = 0.05;

function ServiceTile({ service }) {
  const Icon = service.icon;

  return (
    <Card className="flex h-full flex-col gap-4 p-4 sm:flex-row sm:items-stretch">
      {service.image && (
        <div className="aspect-[16/10] overflow-hidden rounded-inner bg-sky-100 sm:aspect-auto sm:min-h-[200px] sm:w-[44%] sm:shrink-0">
          <Photo src={service.image} alt={service.imageAlt} />
        </div>
      )}
      <div className="flex flex-col gap-3 p-2 sm:py-3">
        <Icon aria-hidden className="h-6 w-6" strokeWidth={1.5} />
        <h3 className="text-h3">{service.title}</h3>
        <p className="text-[15px] leading-relaxed text-navy/70">{service.description}</p>
      </div>
    </Card>
  );
}

export default function HomeServices() {
  return (
    <Panel id="services" aria-labelledby="services-title">
      <Reveal>
        <SectionHeading
          id="services-title"
          eyebrow="Services"
          title="Expertise That Moves Developments Forward."
          lead="From the initial vision to project delivery and beyond, we provide professional real estate services that bring ideas to life, create value and support the long-term success of developments."
        />
      </Reveal>

      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
        {HOME_SERVICES.map((service, index) => (
          <Reveal as="li" key={service.id} delay={index * STAGGER} className={SPANS[index]}>
            <ServiceTile service={service} />
          </Reveal>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <Button to="/services" variant="dark" icon={ArrowRight}>
          Explore Our Services
        </Button>
      </div>
    </Panel>
  );
}
