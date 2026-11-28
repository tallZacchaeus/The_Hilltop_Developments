import Card from '../ui/Card';
import Panel from '../ui/Panel';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const STAGGER = 0.05;

function PartnerTile({ partner }) {
  return (
    <Card className="group grid h-32 place-items-center p-5 sm:h-36">
      {partner.logo ? (
        <img
          src={partner.logo}
          alt={partner.name}
          width={partner.width}
          height={partner.height}
          loading="lazy"
          decoding="async"
          className="max-h-20 w-auto max-w-full object-contain opacity-80 grayscale transition duration-300 group-hover:opacity-100 group-hover:grayscale-0 group-focus-within:grayscale-0 motion-reduce:transition-none"
        />
      ) : (
        <span className="text-balance text-center font-display text-xl font-medium tracking-[-0.02em] text-navy/80 transition-colors duration-300 group-hover:text-navy">
          {partner.name}
        </span>
      )}
    </Card>
  );
}

/**
 * "Partners in Success" logo grid. Partners without a logo file show their name as a wordmark.
 * @param {{ id: string, partners: ReadonlyArray<{ name: string, logo: string | null, width?: number, height?: number }> }} props
 */
export default function PartnersSection({ id, partners }) {
  if (partners.length === 0) return null;
  const headingId = `${id}-title`;

  return (
    <Panel id={id} aria-labelledby={headingId}>
      <Reveal>
        <SectionHeading
          id={headingId}
          eyebrow="Our partners"
          title="Partners in Success"
          lead="We work alongside trusted organisations that share our commitment to quality and long-term value."
        />
      </Reveal>
      <ul className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
        {partners.map((partner, index) => (
          <Reveal as="li" key={partner.name} delay={index * STAGGER}>
            <PartnerTile partner={partner} />
          </Reveal>
        ))}
      </ul>
    </Panel>
  );
}
