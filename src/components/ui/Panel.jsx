const TONES = {
  sky: 'panel-sky',
  white: 'bg-white',
};

export const PANEL_INSET = 'mx-3 sm:mx-5 lg:mx-8 xl:mx-16';

/**
 * Rounded, inset section — the template's main building block.
 * `background` renders behind the content and spans the full panel.
 * @param {{
 *   as?: keyof JSX.IntrinsicElements, tone?: 'sky' | 'white', background?: React.ReactNode,
 *   className?: string, innerClassName?: string, children: React.ReactNode
 * } & Record<string, unknown>} props
 */
export default function Panel({
  as: Tag = 'section',
  tone = 'sky',
  background,
  className = '',
  innerClassName = '',
  children,
  ...rest
}) {
  return (
    <Tag className={`relative overflow-hidden rounded-panel ${PANEL_INSET} ${TONES[tone]} ${className}`} {...rest}>
      {background}
      <div
        className={`relative mx-auto w-full max-w-content px-5 py-16 sm:px-8 md:py-20 lg:px-12 lg:py-24 ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  );
}
