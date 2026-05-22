import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function ScrollReveal({ children, delay = 0, y = 30, duration = 0.9, once = true, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
