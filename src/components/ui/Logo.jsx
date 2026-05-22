import { motion, useReducedMotion } from 'framer-motion';

const strokes = [
  'M6 4 V18',
  'M6 22 V36',
  'M26 4 V18',
  'M26 22 V36',
  'M6 18 H18 V10 H26',
  'M6 22 H14 V30 H26'
];

export default function Logo({ size = 32, showWordmark = false, className = '' }) {
  const reduceMotion = useReducedMotion();
  const pathProps = reduceMotion
    ? { initial: false, animate: { pathLength: 1, opacity: 1 } }
    : {
        initial: { pathLength: 0, opacity: 0 },
        animate: { pathLength: 1, opacity: 1 }
      };

  return (
    <span className={`inline-flex flex-col items-center text-current ${className}`}>
      <motion.svg
        width={size}
        height={size * 1.25}
        viewBox="0 0 32 40"
        fill="none"
        aria-hidden="true"
      >
        {strokes.map((d, index) => (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
            {...pathProps}
            transition={{
              duration: reduceMotion ? 0 : 1.2,
              delay: reduceMotion ? 0 : index * 0.1,
              ease: [0.83, 0, 0.17, 1]
            }}
          />
        ))}
      </motion.svg>

      {showWordmark && (
        <span className="mt-1 flex flex-col items-center font-display uppercase leading-none">
          <span className="text-[0.72em] font-bold tracking-[0.03em]">Hilltop</span>
          <span className="mt-1 text-[0.26em] font-normal tracking-[0.18em]">Developments</span>
        </span>
      )}
    </span>
  );
}
