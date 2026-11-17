import Panel from '../ui/Panel';
import Photo from '../ui/Photo';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/**
 * Sky-panel hero for inner pages: centred heading, or heading + image side by side.
 * Anything passed as `children` renders below the heading inside the same panel.
 * @param {{
 *   eyebrow: string, title: React.ReactNode, lead?: React.ReactNode, actions?: React.ReactNode,
 *   image?: string, imageAlt?: string, id?: string, children?: React.ReactNode
 * }} props
 */
export default function PageHero({ eyebrow, title, lead, actions, image, imageAlt = '', id, children }) {
  const hasImage = Boolean(image);
  const heading = (
    <SectionHeading
      as="h1"
      id="page-title"
      eyebrow={eyebrow}
      title={title}
      lead={lead}
      align={hasImage ? 'left' : 'center'}
    >
      {actions && <div className={`mt-2 flex flex-wrap gap-3 ${hasImage ? '' : 'justify-center'}`}>{actions}</div>}
    </SectionHeading>
  );

  return (
    <Panel id={id} aria-labelledby="page-title">
      {hasImage ? (
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>{heading}</Reveal>
          <div className="aspect-[4/3] overflow-hidden rounded-card bg-sky-100 shadow-card lg:aspect-[5/4]">
            <Photo src={image} alt={imageAlt} priority />
          </div>
        </div>
      ) : (
        <Reveal>{heading}</Reveal>
      )}
      {children}
    </Panel>
  );
}
