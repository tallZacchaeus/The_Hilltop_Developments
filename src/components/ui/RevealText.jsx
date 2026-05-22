import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';

export default function RevealText({ children, className = '', delay = 0, stagger = 0.08 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const reduceMotion = useReducedMotion();

  const content = typeof children === 'string' ? children : '';
  const parts = content.split(/(\*[^*]+\*)/g).filter(Boolean);
  
  const words = [];
  parts.forEach(part => {
    const isItalic = part.startsWith('*') && part.endsWith('*');
    const text = isItalic ? part.slice(1, -1) : part;
    const splitWords = text.split(' ').filter(w => w !== '');
    splitWords.forEach(word => {
      words.push({ text: word, isItalic });
    });
  });

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((wordObj, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <motion.span
            className={`inline-block origin-bottom ${wordObj.isItalic ? 'italic text-gold' : ''}`}
            initial={reduceMotion ? false : { y: '100%', opacity: 0 }}
            animate={reduceMotion || isInView ? { y: 0, opacity: 1 } : { y: '100%', opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.9,
              ease: [0.22, 1, 0.36, 1],
              delay: reduceMotion ? 0 : delay + i * stagger
            }}
          >
            {wordObj.text}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
