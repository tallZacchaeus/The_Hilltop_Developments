import { ArrowRight, MessageCircle } from 'lucide-react';
import { INSIGHTS } from '../data/content';
import { buildQuickWhatsAppLink } from '../lib/enquiry';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Chip from '../components/ui/Chip';
import Photo from '../components/ui/Photo';
import Reveal from '../components/ui/Reveal';
import PageHero from '../components/sections/PageHero';

const STAGGER = 0.08;
const UPDATES_LINK = buildQuickWhatsAppLink('Hello Hilltop Developments, please add me to your news and updates.');

// News and articles have no posts yet, so their action subscribes to updates;
// careers routes straight to an enquiry.
const ACTIONS = {
  news: { label: 'Get updates', href: UPDATES_LINK, icon: MessageCircle },
  articles: { label: 'Get updates', href: UPDATES_LINK, icon: MessageCircle },
  careers: { label: 'Explore Career Opportunities', to: '/contact?type=careers', icon: ArrowRight },
};

function InsightCard({ insight }) {
  const { label, ...action } = ACTIONS[insight.id];

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
          <Button variant="light" {...action}>
            {label}
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
