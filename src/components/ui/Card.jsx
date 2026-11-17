const HOVER =
  'transition duration-500 hover:-translate-y-0.5 hover:shadow-[0_1px_2px_rgb(20_38_95/0.05),0_22px_44px_-22px_rgb(20_38_95/0.35)]';

/**
 * White card with a hairline border and soft shadow.
 * @param {{ as?: keyof JSX.IntrinsicElements, interactive?: boolean, className?: string, children: React.ReactNode }
 *   & Record<string, unknown>} props
 */
export default function Card({ as: Tag = 'div', interactive = false, className = '', children, ...rest }) {
  return (
    <Tag
      className={`rounded-card border border-line bg-white shadow-card ${interactive ? HOVER : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
