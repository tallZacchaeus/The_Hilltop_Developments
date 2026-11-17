import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useHydrated } from '../../hooks/useHydrated';

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' };
const VARIANTS = { hidden: { opacity: 0, y: 24 }, shown: { opacity: 1, y: 0 } };
const INSTANT = { duration: 0 };

const isBelowViewport = (element) => element.getBoundingClientRect().top > window.innerHeight;

/**
 * Fades content up once it scrolls into view.
 *
 * Prerendered content arrives visible, so it reads correctly before JavaScript loads. After hydration,
 * whatever is already on screen stays put; only content still below the fold hides (invisibly, off
 * screen) and fades up when scrolled to. Content mounted later, after client-side navigation, always
 * fades up. Visitors who prefer reduced motion see everything without animation.
 * @param {{ as?: 'div' | 'li' | 'article' | 'section', delay?: number, className?: string, children: React.ReactNode }
 *   & Record<string, unknown>} props
 */
export default function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, VIEWPORT);
  const hydrated = useHydrated();
  const [mayHide, setMayHide] = useState(hydrated);

  useEffect(() => {
    if (!mayHide && ref.current && isBelowViewport(ref.current)) setMayHide(true);
  }, [mayHide]);

  const isShown = reduceMotion || !mayHide || isInView;
  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={VARIANTS}
      initial={false}
      animate={isShown ? 'shown' : 'hidden'}
      transition={isShown && !reduceMotion ? { duration: 0.6, delay, ease: EASE } : INSTANT}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
