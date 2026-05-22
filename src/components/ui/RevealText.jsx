import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export default function RevealText({ children, className = '', delay = 0, stagger = 0.08 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();

  // Handle strings only for simplicity. Split by space.
  const words = typeof children === 'string' ? children.split(' ') : [];

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => {
        // Simple markdown parsing for *italics*
        const isItalic = word.startsWith('*') && word.endsWith('*');
        const displayWord = isItalic ? word.slice(1, -1) : word;
        
        return (
          <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
            <motion.span
              className={`inline-block ${isItalic ? 'italic text-gold' : ''}`}
              initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
              animate={reduceMotion || isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
              transition={{
                duration: reduceMotion ? 0 : 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: reduceMotion ? 0 : delay + i * stagger
              }}
            >
              {displayWord}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
