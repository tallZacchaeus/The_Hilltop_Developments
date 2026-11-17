import { Users } from 'lucide-react';
import Card from '../ui/Card';
import Panel from '../ui/Panel';
import Photo from '../ui/Photo';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const STAGGER = 0.06;

function PersonCard({ person }) {
  return (
    <Card className="flex h-full flex-col p-3 sm:p-4">
      <div className="aspect-square overflow-hidden rounded-inner bg-sky-100">
        <Photo src={person.photo} alt={person.photoAlt ?? `Portrait of ${person.name}`} />
      </div>
      <div className="px-2 pb-2 pt-5">
        <h3 className="text-h3">{person.name}</h3>
        <p className="mt-1 text-[15px] text-navy/70">{person.title}</p>
        <hr className="my-4 border-line" />
        <p className="text-[15px] leading-relaxed text-navy/70">{person.bio}</p>
      </div>
    </Card>
  );
}

function ComingSoon({ groupLabel }) {
  return (
    <Reveal className="mx-auto mt-12 max-w-xl">
      <Card className="flex flex-col items-center gap-3 px-6 py-10 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-full bg-sky-100">
          <Users aria-hidden className="h-5 w-5" />
        </span>
        <h3 className="text-h3">Profiles coming soon</h3>
        <p className="text-[15px] text-navy/70">
          We&apos;re preparing introductions to our {groupLabel}. Check back soon.
        </p>
      </Card>
    </Reveal>
  );
}

/**
 * Advisory board / team section. Shows person cards, or a "coming soon" card while the list is empty.
 * @param {{
 *   id: string, eyebrow: string, title: string, intro: ReadonlyArray<string>,
 *   people: ReadonlyArray<{ name: string, title: string, bio: string, photo: string, photoAlt?: string }>,
 *   groupLabel: string
 * }} props
 */
export default function PeopleSection({ id, eyebrow, title, intro, people, groupLabel }) {
  const headingId = `${id}-title`;

  return (
    <Panel id={id} aria-labelledby={headingId}>
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} id={headingId}>
          {intro.map((paragraph) => (
            <p key={paragraph} className="max-w-2xl text-lead text-navy/70">
              {paragraph}
            </p>
          ))}
        </SectionHeading>
      </Reveal>

      {people.length > 0 ? (
        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {people.map((person, index) => (
            <Reveal as="li" key={person.name} delay={index * STAGGER}>
              <PersonCard person={person} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <ComingSoon groupLabel={groupLabel} />
      )}
    </Panel>
  );
}
