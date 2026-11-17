import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { OPPORTUNITIES } from '../data/content';
import usePageMeta from '../hooks/usePageMeta';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Panel from '../components/ui/Panel';
import Photo from '../components/ui/Photo';
import Reveal from '../components/ui/Reveal';
import SectionHeading from '../components/ui/SectionHeading';
import CtaPanel from '../components/sections/CtaPanel';
import ImageHero from '../components/sections/ImageHero';

const STAGGER = 0.06;

function OpportunityCard({ opportunity }) {
  return (
    <Card as="article" interactive className="group relative flex h-full flex-col p-3 sm:p-4">
      <div className="aspect-[16/10] overflow-hidden rounded-inner bg-sky-100">
        <Photo
          src={opportunity.image}
          alt={opportunity.imageAlt}
          className="transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-2 pb-2 pt-5">
        <h3 className="text-h3">{opportunity.title}</h3>
        <p className="text-[15px] leading-relaxed text-navy/70">{opportunity.description}</p>
        <Link
          to={`/contact?type=ownership&opportunity=${opportunity.id}`}
          className="focus-ring mt-auto inline-flex w-fit items-center gap-1.5 rounded-sm pt-3 font-display text-[15px] after:absolute after:inset-0 after:rounded-card after:content-['']"
        >
          Enquire<span className="sr-only"> about {opportunity.title}</span>
          <ArrowUpRight
            aria-hidden
            className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </Link>
      </div>
    </Card>
  );
}

export default function OwnAPiecePage() {
  usePageMeta({
    title: 'Own a Piece',
    description:
      'Own a Piece of the Earth: land, estate, property and investment opportunities across Hilltop developments.',
  });

  return (
    <>
      <ImageHero
        image="/images/countryside-tropical-home.jpg"
        imageAlt="A modern home set among lush tropical trees"
        eyebrow="Own a Piece"
        title="Own a Piece of the Earth."
        lead="A Hilltop Developments property ownership offering, bringing together opportunities to own land and property across different developments."
        actions={
          <Button href="#opportunities" variant="light" icon={ArrowDown}>
            Explore Ownership Opportunities
          </Button>
        }
      />

      <Panel id="opportunities" aria-labelledby="opportunities-title">
        <Reveal>
          <SectionHeading id="opportunities-title" eyebrow="Opportunities" title="Explore Ownership Opportunities" />
        </Reveal>
        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {OPPORTUNITIES.map((opportunity, index) => (
            <Reveal as="li" key={opportunity.id} delay={index * STAGGER}>
              <OpportunityCard opportunity={opportunity} />
            </Reveal>
          ))}
        </ul>
      </Panel>

      <CtaPanel
        id="interested"
        eyebrow="Get started"
        title="Interested in an Opportunity?"
        actions={
          <Button to="/contact?type=ownership" variant="dark" icon={ArrowRight}>
            Submit an Enquiry
          </Button>
        }
      >
        <p>
          Explore the available listings, find an opportunity that suits your interests and submit an enquiry to learn
          more.
        </p>
      </CtaPanel>
    </>
  );
}
