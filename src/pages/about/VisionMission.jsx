import { Eye, Target } from 'lucide-react';
import Card from '../../components/ui/Card';
import Panel from '../../components/ui/Panel';
import Reveal from '../../components/ui/Reveal';

const STATEMENTS = [
  {
    id: 'vision',
    icon: Eye,
    title: 'Our Vision',
    text: 'To build sustainable cities through strategic enterprise, innovative solutions and impactful partnerships.',
  },
  {
    id: 'mission',
    icon: Target,
    title: 'Our Mission',
    text: 'To drive sustainable urban development by fostering purposeful enterprise, building strategic partnerships and delivering solutions that create lasting value for communities globally.',
  },
];

const STAGGER = 0.08;

export default function VisionMission() {
  return (
    <Panel id="vision" aria-label="Vision and mission">
      <ul className="grid gap-5 md:grid-cols-2">
        {STATEMENTS.map(({ id, icon: Icon, title, text }, index) => (
          <Reveal as="li" key={id} delay={index * STAGGER}>
            <Card className="flex h-full flex-col gap-6 p-7 sm:p-10">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-sky-100">
                <Icon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
              </span>
              <h2 className="text-h2">{title}</h2>
              <p className="text-lead text-navy/75">{text}</p>
            </Card>
          </Reveal>
        ))}
      </ul>
    </Panel>
  );
}
