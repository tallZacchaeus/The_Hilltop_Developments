import { useSearchParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { DEVELOPMENTS, DEVELOPMENT_TYPES, filterDevelopments } from '../data/developments';
import { useHydrated } from '../hooks/useHydrated';
import Button from '../components/ui/Button';
import CtaPanel from '../components/sections/CtaPanel';
import DevelopmentCard from '../components/sections/DevelopmentCard';
import PageHero from '../components/sections/PageHero';

const ALL = 'all';

const FILTERS = [
  { id: ALL, label: 'All', count: DEVELOPMENTS.length },
  ...DEVELOPMENT_TYPES.map((type) => ({
    id: type.id,
    label: type.label,
    count: DEVELOPMENTS.filter((item) => item.type === type.id).length,
  })),
];

function FilterBar({ activeId, onSelect }) {
  return (
    <div role="group" aria-label="Filter developments" className="mt-12 flex flex-wrap justify-center gap-2">
      {FILTERS.map((filter) => {
        const isActive = filter.id === activeId;
        return (
          <button
            key={filter.id}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelect(filter.id)}
            className={`focus-ring inline-flex min-h-[44px] items-center gap-2 rounded-full px-5 font-display text-[15px] transition-colors ${
              isActive ? 'bg-navy text-white shadow-button' : 'bg-white text-navy/75 ring-1 ring-inset ring-line hover:text-navy'
            }`}
          >
            {filter.label}
            <span className={`text-xs ${isActive ? 'text-white/70' : 'text-navy/70'}`}>{filter.count}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function DevelopmentsPage() {
  const hydrated = useHydrated();
  const [searchParams, setSearchParams] = useSearchParams();
  // Match the prerendered page (all developments) first, then apply ?category= once hydrated.
  const requested = (hydrated ? searchParams.get('category') : null) ?? ALL;
  const activeId = FILTERS.some((filter) => filter.id === requested) ? requested : ALL;
  const developments = filterDevelopments(activeId);

  const handleSelect = (id) => setSearchParams(id === ALL ? {} : { category: id }, { replace: true });

  return (
    <>
      <PageHero
        eyebrow="Developments"
        title="Our Real Estate Developments"
        lead="We see real estate as more than buildings and land. It is about creating spaces that respond to people's needs, support businesses and contribute to the growth of communities."
      >
        <FilterBar activeId={activeId} onSelect={handleSelect} />
        <h2 className="sr-only">Development list</h2>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {developments.map((development) => (
            <li key={development.slug}>
              <DevelopmentCard development={development} showSummary />
            </li>
          ))}
        </ul>
      </PageHero>

      <CtaPanel
        id="next"
        eyebrow="Join us"
        title="Be Part of What Comes Next."
        actions={
          <Button to="/contact?type=development" variant="dark" icon={ArrowRight}>
            Register Your Interest
          </Button>
        }
      >
        <p>The future of cities is shaped by the ideas, decisions and partnerships we make today.</p>
        <p>Join us as we create spaces and opportunities that will serve generations to come.</p>
      </CtaPanel>
    </>
  );
}
