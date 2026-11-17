import { ArrowRight } from 'lucide-react';
import { PROJECT_CATEGORIES } from '../../data/content';
import Button from '../../components/ui/Button';
import Chip from '../../components/ui/Chip';
import Panel from '../../components/ui/Panel';
import Photo from '../../components/ui/Photo';
import Reveal from '../../components/ui/Reveal';
import SectionHeading from '../../components/ui/SectionHeading';

const STAGGER = 0.08;

export default function ProjectCategories() {
  return (
    <Panel id="categories" aria-labelledby="categories-title">
      <Reveal>
        <SectionHeading
          id="categories-title"
          eyebrow="Project Categories"
          title="A Vision Beyond the Present."
          lead="These categories represent our ambition to explore new possibilities in real estate development and shape spaces that respond to the evolving needs of cities and communities."
        />
      </Reveal>

      <ul className="mt-14 grid gap-5 md:grid-cols-3">
        {PROJECT_CATEGORIES.map((category, index) => (
          <Reveal as="li" key={category.id} delay={index * STAGGER}>
            <article className="group relative aspect-[3/4] overflow-hidden rounded-card bg-navy shadow-card">
              <Photo
                src={category.image}
                alt={category.imageAlt}
                className="transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgb(16_32_79/0.85)_100%)]"
              />
              <div className="absolute left-4 top-4">
                <Chip>{String(index + 1).padStart(2, '0')}</Chip>
              </div>
              <h3 className="absolute bottom-6 left-6 font-display text-2xl uppercase tracking-[0.14em] text-white">
                {category.name}
              </h3>
            </article>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mx-auto mt-12 flex max-w-2xl flex-col items-center gap-6 text-center">
        <p className="text-lead text-navy/70">
          Each project explores a distinct approach to development, reflecting the diverse possibilities of how people
          live, work and connect.
        </p>
        <Button to="/developments" variant="dark" icon={ArrowRight}>
          Explore Projects
        </Button>
      </Reveal>
    </Panel>
  );
}
