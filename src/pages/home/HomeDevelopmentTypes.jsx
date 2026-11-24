import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { DEVELOPMENT_TYPES } from '../../data/developments';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Chip from '../../components/ui/Chip';
import Panel from '../../components/ui/Panel';
import Photo from '../../components/ui/Photo';
import Reveal from '../../components/ui/Reveal';
import SectionHeading from '../../components/ui/SectionHeading';

const STAGGER = 0.08;

export default function HomeDevelopmentTypes() {
  return (
    <Panel id="spaces" aria-labelledby="spaces-title">
      <Reveal>
        <SectionHeading
          id="spaces-title"
          eyebrow="Our developments"
          title="Creating Spaces That Move Life Forward."
          lead="From thoughtfully designed residences to functional commercial spaces and the infrastructure that supports them, we develop spaces that respond to the changing needs of people, businesses and communities."
        />
      </Reveal>

      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {DEVELOPMENT_TYPES.map((type, index) => (
          <Reveal as="li" key={type.id} delay={index * STAGGER}>
            <Card as="article" interactive className="group relative h-full p-3 sm:p-4">
              <div className="relative aspect-[4/5] overflow-hidden rounded-inner bg-sky-100">
                <Photo
                  src={type.image}
                  alt={type.imageAlt}
                  className="transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute left-3 top-3">
                  <Chip>{type.label}</Chip>
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 px-2 pb-1 pt-5">
                <h3 className="text-h3">
                  <Link
                    to={`/developments?category=${type.id}`}
                    className="focus-ring rounded-sm after:absolute after:inset-0 after:rounded-card after:content-['']"
                  >
                    {type.title}
                  </Link>
                </h3>
                <ArrowUpRight
                  aria-hidden
                  className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </div>
            </Card>
          </Reveal>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <Button to="/developments" variant="dark" icon={ArrowRight}>
          View Developments
        </Button>
      </div>
    </Panel>
  );
}
