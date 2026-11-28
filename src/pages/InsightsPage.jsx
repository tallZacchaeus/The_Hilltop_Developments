import { ArrowRight } from 'lucide-react';
import { INSIGHTS } from '../data/content';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Chip from '../components/ui/Chip';
import Photo from '../components/ui/Photo';
import Reveal from '../components/ui/Reveal';
import PageHero from '../components/sections/PageHero';

const STAGGER = 0.08;

function InsightCard({ insight }) {
  return (
    <Card as="article" id={insight.id} className="flex h-full scroll-mt-28 flex-col p-3 sm:p-4">
      <div className="relative aspect-[16/11] overflow-hidden rounded-inner bg-sky-100">
        <Photo src={insight.image} alt={insight.imageAlt} />
        <div className="absolute right-3 top-3">
          <Chip>{insight.status}</Chip>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 px-2 pb-2 pt-5">
        <h2 className="text-h3">{insight.title}</h2>
        <p className="text-[15px] leading-relaxed text-navy/70">{insight.description}</p>
        <div className="mt-auto pt-3">
          <Button to={insight.action.to} variant="light" icon={ArrowRight}>
            {insight.action.label}
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default function InsightsPage() {
  return (
    <PageHero
      eyebrow="Insights"
      title="Insights and Updates"
      lead="Stay informed about Hilltop Developments, our projects, company activities and perspectives on the real estate industry."
    >
      <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {INSIGHTS.map((insight, index) => (
          <Reveal as="li" key={insight.id} delay={index * STAGGER}>
            <InsightCard insight={insight} />
          </Reveal>
        ))}
      </ul>
    </PageHero>
  );
}
