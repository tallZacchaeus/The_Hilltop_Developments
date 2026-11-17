import Panel from '../ui/Panel';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const DEFAULT_IMAGE = '/images/hero-glass-sky.jpg';

// The building photo sits in a strip along the bottom and fades up into the sky panel,
// so the heading and buttons always stay on plain sky. Bottom padding clears the strip.
const STRIP_HEIGHT = 'h-[200px] sm:h-[260px] lg:h-[320px]';
const CLEAR_STRIP = 'pt-20 pb-[220px] sm:pb-[290px] md:pt-24 lg:pt-28 lg:pb-[340px]';
const FADE_IN_FROM_TOP = '[mask-image:linear-gradient(to_bottom,transparent,black_55%)]';

/**
 * Centred closing call to action over a pale sky photo (the template's "Unlock Your Ideal Space").
 * @param {{
 *   id: string, eyebrow?: string, title: React.ReactNode, actions?: React.ReactNode,
 *   image?: string | null, children?: React.ReactNode
 * }} props
 */
export default function CtaPanel({ id, eyebrow, title, actions, image = DEFAULT_IMAGE, children }) {
  const headingId = `${id}-title`;
  const background = image ? (
    <div aria-hidden="true" className={`absolute inset-x-0 bottom-0 ${STRIP_HEIGHT}`}>
      <img
        src={image}
        alt=""
        loading="lazy"
        decoding="async"
        className={`h-full w-full object-cover object-bottom ${FADE_IN_FROM_TOP}`}
      />
    </div>
  ) : null;

  return (
    <Panel
      id={id}
      aria-labelledby={headingId}
      background={background}
      innerClassName={image ? CLEAR_STRIP : 'py-20 md:py-28 lg:py-32'}
    >
      <Reveal>
        <SectionHeading eyebrow={eyebrow} title={title} id={headingId}>
          {children && <div className="flex max-w-2xl flex-col gap-4 text-lead text-navy/75">{children}</div>}
          {actions && <div className="mt-3 flex flex-wrap justify-center gap-3">{actions}</div>}
        </SectionHeading>
      </Reveal>
    </Panel>
  );
}
