const TONES = {
  glass: 'bg-navy/35 text-white ring-1 ring-inset ring-white/45 backdrop-blur-md',
  solid: 'bg-sky-100 text-navy',
};

/**
 * Small uppercase tag. `glass` sits on photos, `solid` on white cards.
 * @param {{ children: React.ReactNode, tone?: 'glass' | 'solid', className?: string }} props
 */
export default function Chip({ children, tone = 'glass', className = '' }) {
  return (
    <span
      className={`inline-flex items-center rounded-lg px-2.5 py-1.5 font-display text-[12px] uppercase leading-none tracking-[0.07em] ${TONES[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
