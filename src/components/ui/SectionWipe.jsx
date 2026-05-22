import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export default function SectionWipe({ className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`h-px w-full origin-left bg-gold/55 ${className}`}
      initial={reduceMotion ? false : { scaleX: 0 }}
      animate={isInView || reduceMotion ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.83, 0, 0.17, 1] }}
    />
  );
}
