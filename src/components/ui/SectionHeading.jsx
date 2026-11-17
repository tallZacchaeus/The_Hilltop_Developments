import Eyebrow from './Eyebrow';

const ALIGN = {
  center: 'mx-auto items-center text-center',
  left: 'items-start text-left',
};

/**
 * Eyebrow + heading + lead, used at the top of every section.
 * @param {{
 *   eyebrow?: string, title: React.ReactNode, lead?: React.ReactNode,
 *   align?: 'center' | 'left', as?: 'h1' | 'h2', id?: string,
 *   tone?: 'light' | 'glass', className?: string, children?: React.ReactNode
 * }} props
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'center',
  as: Heading = 'h2',
  id,
  tone = 'light',
  className = '',
  children,
}) {
  const onImage = tone === 'glass';
  const size = Heading === 'h1' ? 'text-h1' : 'text-h2';

  return (
    <div className={`flex max-w-3xl flex-col gap-5 ${ALIGN[align]} ${className}`}>
      {eyebrow && <Eyebrow tone={tone}>{eyebrow}</Eyebrow>}
      <Heading id={id} className={`${size} text-balance ${onImage ? 'text-white' : 'text-navy'}`}>
        {title}
      </Heading>
      {lead && (
        <p className={`max-w-2xl text-lead ${onImage ? 'text-white/85' : 'text-navy/70'}`}>{lead}</p>
      )}
      {children}
    </div>
  );
}
