const TONES = {
  light: 'bg-white text-navy shadow-[0_1px_2px_rgb(20_38_95/0.06)]',
  glass: 'bg-white/15 text-white ring-1 ring-inset ring-white/40 backdrop-blur-md',
};

/**
 * Small uppercase pill that labels a section (the template's "FEATURED" badge).
 * @param {{ children: React.ReactNode, tone?: 'light' | 'glass', className?: string }} props
 */
export default function Eyebrow({ children, tone = 'light', className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-display text-eyebrow uppercase ${TONES[tone]} ${className}`}
    >
      <span
        aria-hidden="true"
        className="grid h-3.5 w-3.5 place-items-center rounded-full border border-current"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      </span>
      {children}
    </span>
  );
}
