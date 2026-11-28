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

// The grid is one column below md, two columns at md, twelve at lg. The photo sits beside the text only
// where the tile is wide enough (about 600px): full width below md, and the 7-column tiles at lg.
const ROW_SM = {
  card: 'sm:flex-row sm:items-stretch',
  image: 'sm:aspect-auto sm:min-h-[200px] sm:w-[44%] sm:shrink-0',
};
const STACK_FROM_MD = {
  card: 'md:flex-col',
  image: 'md:aspect-[16/10] md:min-h-0 md:w-auto',
};
const ROW_AGAIN_AT_LG = {
  card: 'lg:flex-row lg:items-stretch',
  image: 'lg:aspect-auto lg:min-h-[200px] lg:w-[44%] lg:shrink-0',
};
const STACK_FROM_LG = {
  card: 'lg:flex-col',
  image: 'lg:aspect-[16/10] lg:min-h-0 lg:w-auto',
};
const join = (...parts) => parts.join(' ');

const LAYOUTS = {
  // Row below md, stacked in the half-width md tiles, row again in the 7-column lg tiles (indexes 0 and 3).
  wide: {
    card: join(ROW_SM.card, STACK_FROM_MD.card, ROW_AGAIN_AT_LG.card),
    image: join(ROW_SM.image, STACK_FROM_MD.image, ROW_AGAIN_AT_LG.image),
  },
  // Row below md, stacked from md up (indexes 1, 2, 4 and 5: half or narrower tiles).
  narrow: {
    card: join(ROW_SM.card, STACK_FROM_MD.card),
    image: join(ROW_SM.image, STACK_FROM_MD.image),
  },
  // Full-width tile at md (index 6): a row until lg, where it is one third wide and stacks.
  fullThenNarrow: {
    card: join(ROW_SM.card, STACK_FROM_LG.card),
    image: join(ROW_SM.image, STACK_FROM_LG.image),
  },
};
const TILE_LAYOUTS = ['wide', 'narrow', 'narrow', 'wide', 'narrow', 'narrow', 'fullThenNarrow'];

function ServiceTile({ service, layout }) {
  const Icon = service.icon;
  const classes = LAYOUTS[layout];

  return (
    <Card className={`flex h-full flex-col gap-4 p-4 ${classes.card}`}>
      <div className={`aspect-[16/10] overflow-hidden rounded-inner bg-sky-100 ${classes.image}`}>
        <Photo src={service.image} alt={service.imageAlt} className={service.imagePosition ?? ''} />
      </div>
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
            <ServiceTile service={service} layout={TILE_LAYOUTS[index]} />
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
