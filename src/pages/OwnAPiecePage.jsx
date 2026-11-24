import { ArrowDown, ArrowRight } from 'lucide-react';
import { LAND_OPPORTUNITY } from '../data/content';
import usePageMeta from '../hooks/usePageMeta';
import Button from '../components/ui/Button';
import CtaPanel from '../components/sections/CtaPanel';
import ImageHero from '../components/sections/ImageHero';
import SplitSection from '../components/sections/SplitSection';

const LAND_ENQUIRY = `/contact?type=ownership&opportunity=${LAND_OPPORTUNITY.id}`;

/** Own a Piece is Hilltop's land-buying offer (client brief, Nov 2026: strictly land). */
export default function OwnAPiecePage() {
  usePageMeta({
    title: 'Own a Piece',
    description:
      'Own a Piece of the Earth: buy land for direct ownership and future development across Hilltop developments.',
  });

  return (
    <>
      <ImageHero
        image="/images/countryside-tropical-home.jpg"
        imageAlt="A modern home set among lush tropical trees"
        eyebrow="Own a Piece"
        title="Own a Piece of the Earth."
        lead="A Hilltop Developments land ownership offering, giving you the opportunity to own land across our developments."
        actions={
          <Button href="#land" variant="light" icon={ArrowDown}>
            Explore Land Opportunities
          </Button>
        }
      />

      <SplitSection
        id="land"
        eyebrow="Land"
        title={LAND_OPPORTUNITY.title}
        image={LAND_OPPORTUNITY.image}
        imageAlt={LAND_OPPORTUNITY.imageAlt}
        actions={
          <Button to={LAND_ENQUIRY} variant="dark" icon={ArrowRight}>
            Enquire about land
          </Button>
        }
      >
        <p>{LAND_OPPORTUNITY.description}</p>
      </SplitSection>

      <CtaPanel
        id="interested"
        eyebrow="Get started"
        title="Interested in an Opportunity?"
        actions={
          <Button to={LAND_ENQUIRY} variant="dark" icon={ArrowRight}>
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
