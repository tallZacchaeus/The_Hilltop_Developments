import Panel from '../ui/Panel';
import Photo from '../ui/Photo';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/**
 * Text beside a photo (the template's "Our story" / "Designing for future" layout).
 * On phones the text always comes first.
 * @param {{
 *   id: string, eyebrow: string, title: React.ReactNode, as?: 'h1' | 'h2',
 *   image: string, imageAlt: string, imageSide?: 'left' | 'right', imageAspect?: string,
 *   imageOverlay?: React.ReactNode, priority?: boolean, actions?: React.ReactNode, children?: React.ReactNode
 * }} props
 */
export default function SplitSection({
  id,
  eyebrow,
  title,
  as = 'h2',
  image,
  imageAlt,
  imageSide = 'right',
  imageAspect = 'aspect-[4/3] lg:aspect-[4/5]',
  imageOverlay,
  priority = false,
  actions,
  children,
}) {
  const headingId = as === 'h1' ? 'page-title' : `${id}-title`;
  const isImageLeft = imageSide === 'left';

  return (
    <Panel id={id} aria-labelledby={headingId}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className={isImageLeft ? 'lg:order-2' : ''}>
          <SectionHeading align="left" as={as} id={headingId} eyebrow={eyebrow} title={title}>
            {children && <div className="flex flex-col gap-4 text-lead text-navy/70">{children}</div>}
            {actions && <div className="mt-2 flex flex-wrap gap-3">{actions}</div>}
          </SectionHeading>
        </Reveal>
        <Reveal delay={0.1} className={`relative ${isImageLeft ? 'lg:order-1' : ''}`}>
          <div className={`overflow-hidden rounded-card bg-sky-100 shadow-card ${imageAspect}`}>
            <Photo src={image} alt={imageAlt} priority={priority} />
          </div>
          {imageOverlay}
        </Reveal>
      </div>
    </Panel>
  );
}
