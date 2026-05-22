import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import SectionWipe from './ui/SectionWipe';

const imageUrl = 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=80';

export default function Vision() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-12%' });
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const visionY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [20, -20]);
  const missionY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-20, 20]);

  return (
    <section ref={ref} className="relative min-h-[80vh] overflow-hidden">
      <SectionWipe className="absolute left-0 top-0 z-30" />
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${imageUrl}")` }}
      />
      <div className="absolute inset-0 bg-navy/55 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-br from-cream/20 via-transparent to-navy-deep/75" />

      <div className="relative z-10 min-h-[80vh] px-6 py-24 lg:px-12">
        <div className="flex items-start justify-between gap-6">
          <h2 className="bg-cream/85 px-5 py-4 font-display text-[clamp(2.1rem,5vw,4.8rem)] font-bold uppercase leading-none text-navy backdrop-blur-md">
            View From The Top
          </h2>
          <div className="mt-3 hidden h-12 w-12 items-center justify-center rounded-full border border-navy/35 bg-cream/80 text-navy backdrop-blur-md md:flex">
            <ArrowRight size={20} aria-hidden="true" />
          </div>
        </div>

        <div className="mt-20 grid gap-6 lg:mt-28 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <motion.article
            className="bg-navy px-7 py-8 shadow-2xl shadow-navy-deep/25 lg:ml-[8vw]"
            style={{ y: visionY }}
            initial={reduceMotion ? false : { x: -70, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -70, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-gold">Our Vision</p>
            <p className="font-serif text-[clamp(1.45rem,2vw,2.2rem)] leading-[1.3] text-cream">
              To build sustainable cities through strategic enterprise, innovative solutions, and impactful partnerships.
            </p>
          </motion.article>

          <motion.article
            className="bg-navy-deep px-7 py-9 shadow-2xl shadow-navy-deep/25 lg:mr-[5vw] lg:mt-[-3rem]"
            style={{ y: missionY }}
            initial={reduceMotion ? false : { x: 70, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: 70, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.2, delay: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mb-5 text-[0.75rem] font-medium uppercase tracking-[0.22em] text-gold">Our Mission</p>
            <p className="text-[1.05rem] leading-[1.8] text-cream/80 lg:text-[1.15rem]">
              To drive sustainable urban development by fostering purposeful enterprise, building strategic partnerships, and delivering solutions that create lasting value for communities globally.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
