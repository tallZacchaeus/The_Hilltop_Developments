import { ArrowRight, Briefcase, Home, Users } from 'lucide-react';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import SplitSection from '../../components/sections/SplitSection';

// "living, working and community development" — the three focuses named in the copy.
const FOCUSES = [
  { icon: Home, label: 'Living' },
  { icon: Briefcase, label: 'Working' },
  { icon: Users, label: 'Community' },
];

function FocusCard() {
  return (
    <Card className="absolute -bottom-6 left-4 right-4 flex justify-between gap-2 p-4 sm:left-auto sm:right-6 sm:w-80">
      {FOCUSES.map(({ icon: Icon, label }) => (
        <div key={label} className="flex flex-1 flex-col items-center gap-2 py-1 text-center">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-sky-100">
            <Icon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </span>
          <span className="font-display text-sm">{label}</span>
        </div>
      ))}
    </Card>
  );
}

export default function HomeIntro() {
  return (
    <SplitSection
      id="intro"
      eyebrow="Who we are"
      title="The Future of Cities Starts with Us."
      image="/images/curved-architecture.jpg"
      imageAlt="Curving white balconies framing a blue sky"
      imageOverlay={<FocusCard />}
      actions={
        <Button to="/about" variant="dark" icon={ArrowRight}>
          About Hilltop
        </Button>
      }
    >
      <p>
        We are committed to redefining the future of living, working and community development through
        transformative real estate solutions that inspire growth, enhance lifestyles and contribute meaningfully to
        the built environment.
      </p>
    </SplitSection>
  );
}
