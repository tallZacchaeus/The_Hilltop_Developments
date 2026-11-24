import { motion, useReducedMotion } from 'framer-motion';
import { MARK_HEIGHT, MARK_PATHS, MARK_STROKE, MARK_WIDTH } from './logoMark';

// The same starting state on the server and in the browser keeps hydration consistent;
// reduced motion only changes the duration (an instant draw).
const PATH_MOTION = {
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 }
};

/**
 * Hilltop's H mark in the current text colour, drawn stroke by stroke on first view.
 * @param {{ size?: number, showWordmark?: boolean, className?: string }} props  `size` is the width in px.
 */
export default function Logo({ size = 32, showWordmark = false, className = '' }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className={`inline-flex flex-col items-center text-current ${className}`}>
      <motion.svg
        width={size}
        height={(size * MARK_HEIGHT) / MARK_WIDTH}
        viewBox={`0 0 ${MARK_WIDTH} ${MARK_HEIGHT}`}
        fill="none"
        aria-hidden="true"
      >
        {MARK_PATHS.map((d, index) => (
          <motion.path
            key={d}
            d={d}
            stroke="currentColor"
            strokeWidth={MARK_STROKE}
            strokeLinecap="butt"
            strokeLinejoin="miter"
            {...PATH_MOTION}
            transition={{
              duration: reduceMotion ? 0 : 1.2,
              delay: reduceMotion ? 0 : index * 0.12,
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
