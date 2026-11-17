import { ArrowRight } from 'lucide-react';
import { UPCOMING_DEVELOPMENTS } from '../../data/developments';
import Button from '../../components/ui/Button';
import Panel from '../../components/ui/Panel';
import Reveal from '../../components/ui/Reveal';
import SectionHeading from '../../components/ui/SectionHeading';
import DevelopmentCard from '../../components/sections/DevelopmentCard';

const STAGGER = 0.06;
// Five cards: three then two, centred (widths account for the 20px gap).
const ITEM_WIDTH = 'w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]';

export default function HomeUpcoming() {
  return (
    <Panel id="upcoming" aria-labelledby="upcoming-title">
      <Reveal>
        <SectionHeading id="upcoming-title" eyebrow="Coming soon" title="Upcoming Developments" />
      </Reveal>

      <ul className="mt-14 flex flex-wrap justify-center gap-5">
        {UPCOMING_DEVELOPMENTS.map((development, index) => (
          <Reveal as="li" key={development.slug} delay={index * STAGGER} className={ITEM_WIDTH}>
            <DevelopmentCard development={development} />
          </Reveal>
        ))}
      </ul>

      <div className="mt-12 flex justify-center">
        <Button to="/developments" variant="dark" icon={ArrowRight}>
          Explore Developments
        </Button>
      </div>
    </Panel>
  );
}
