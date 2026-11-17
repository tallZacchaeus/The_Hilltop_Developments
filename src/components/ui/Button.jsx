import { Link } from 'react-router-dom';

const VARIANTS = {
  dark: 'bg-navy text-white shadow-button hover:bg-navy-deep',
  light: 'bg-white text-navy shadow-button ring-1 ring-inset ring-line hover:bg-sky-50',
  glass: 'bg-white/15 text-white ring-1 ring-inset ring-white/40 backdrop-blur-md hover:bg-white/25',
};

const BASE =
  'focus-ring inline-flex min-h-[44px] items-center justify-center gap-2 rounded-btn px-5 py-2.5 font-display text-[15px] font-medium transition-colors duration-300';

const isExternal = (href) => /^https?:\/\//.test(href);

/**
 * Renders a router Link (`to`), an anchor (`href`) or a button.
 * @param {{
 *   to?: string, href?: string, variant?: 'dark' | 'light' | 'glass',
 *   icon?: React.ComponentType<{ className?: string, 'aria-hidden'?: boolean }>,
 *   className?: string, children: React.ReactNode
 * } & Record<string, unknown>} props
 */
export default function Button({ to, href, variant = 'dark', icon: Icon, className = '', children, ...rest }) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      {children}
      {Icon && <Icon aria-hidden className="h-4 w-4 shrink-0" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    const external = isExternal(href);
    const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {content}
        {external && <span className="sr-only"> (opens in a new tab)</span>}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
}
