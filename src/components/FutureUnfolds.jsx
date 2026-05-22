import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import RevealText from './ui/RevealText';
import SectionWipe from './ui/SectionWipe';

const imageUrl = 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1600&q=80';

export default function FutureUnfolds() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-12%' });
  const reduceMotion = useReducedMotion();

  return (
    <section ref={ref} className="relative overflow-hidden bg-navy">
      <SectionWipe className="absolute left-0 top-0 z-20" />
      <div className="grid min-h-[80vh] grid-cols-1 lg:grid-cols-2">
        <div className="relative min-h-[420px] overflow-hidden">
          <motion.div
            className="absolute -inset-8 bg-cover bg-center"
            style={{ backgroundImage: `url("${imageUrl}")` }}
            animate={reduceMotion ? {} : { scale: [1, 1.08] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
          />
          <div className="absolute inset-0 bg-navy/35 mix-blend-multiply" />
        </div>

        <div className="flex items-center bg-navy-deep px-6 py-20 lg:px-12">
          <div className="max-w-[620px]">
            <p className="mb-6 text-[0.78rem] uppercase tracking-[0.22em] text-gold">Our Commitment</p>
            <h2 className="mb-8 font-display text-[clamp(2.3rem,5vw,4.5rem)] font-bold leading-[1.05] text-cream">
              {isInView && <RevealText>As the future unfolds.</RevealText>}
            </h2>

            <motion.p
              className="mb-6 text-[1.05rem] leading-[1.8] text-cream/75"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.45 }}
            >
              We remain committed to shaping resilient, future-ready cities that foster economic growth, social connection, and sustainable living.
            </motion.p>
            <motion.p
              className="font-serif text-[1.35rem] italic leading-[1.5] text-gold"
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: reduceMotion ? 0 : 0.7, delay: 0.6 }}
            >
              Redefining urban possibilities through sustainable development and strategic innovation.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
