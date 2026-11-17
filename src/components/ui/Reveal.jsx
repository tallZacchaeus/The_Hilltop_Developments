import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1];
const VIEWPORT = { once: true, margin: '0px 0px -10% 0px' };

/**
 * Fades content up once it scrolls into view. Renders a plain element
 * when the visitor prefers reduced motion.
 * @param {{ as?: 'div' | 'li' | 'article' | 'section', delay?: number, className?: string, children: React.ReactNode }
 *   & Record<string, unknown>} props
 */
export default function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
