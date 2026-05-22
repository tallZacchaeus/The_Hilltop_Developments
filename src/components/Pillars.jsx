import { motion } from 'framer-motion';
import RevealText from './ui/RevealText';
import ScrollReveal from './ui/ScrollReveal';

const pillars = [
  {
    label: '01 / Sustainable',
    title: 'Future-Ready Cities',
    desc: 'Resilient, future-facing developments that foster economic growth, social connection, and lasting environmental value.',
    glyph: 'growth'
  },
  {
    label: '02 / Strategic',
    title: 'Purposeful Enterprise',
    desc: 'Built on strategic partnerships and adaptive solutions that create measurable value for investors and the communities we serve.',
    glyph: 'partnership'
  },
  {
    label: '03 / Transformative',
    title: 'Beyond Construction',
    desc: 'Spaces and communities that integrate functionality, sustainability, and long-term value — redefining how people live, work, and connect.',
    glyph: 'transform'
  }
];

function PillarGlyph({ type }) {
  if (type === 'growth') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" aria-hidden="true">
        {[6, 12, 18].map((x, i) => (
          <motion.path
            key={x}
            d={`M${x} 20 V${14 - i * 4}`}
            stroke="currentColor"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileHover={{ pathLength: 1 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          />
        ))}
      </svg>
    );
  }

  if (type === 'partnership') {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" aria-hidden="true">
        <motion.circle cx="9" cy="12" r="5" stroke="currentColor" strokeWidth="1.7" whileHover={{ x: 1.5 }} transition={{ duration: 0.4 }} />
        <motion.circle cx="15" cy="12" r="5" stroke="currentColor" strokeWidth="1.7" whileHover={{ x: -1.5 }} transition={{ duration: 0.4 }} />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold" fill="none" aria-hidden="true">
      <motion.rect
        x="6"
        y="6"
        width="12"
        height="12"
        stroke="currentColor"
        strokeWidth="1.7"
        whileHover={{ scale: 1.15 }}
        style={{ transformOrigin: 'center' }}
        transition={{ duration: 0.4 }}
      />
    </svg>
  );
}

export default function Pillars() {
  return (
    <section className="px-6 py-28 lg:px-12">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 max-w-[780px]">
          <div className="mb-5 flex items-center gap-3 text-[0.8rem] uppercase tracking-[0.18em] text-gold">
            <span className="h-px w-8 bg-gold" />
            Our Approach
          </div>
          <h2 className="font-display text-[clamp(2.2rem,4.8vw,4.4rem)] font-bold leading-[1.05]">
            <RevealText>Beyond *construction* — toward transformative real estate.</RevealText>
          </h2>
        </div>

        <div className="grid grid-cols-1 border-t border-cream/15 md:grid-cols-3">
          {pillars.map((pillar, i) => (
            <ScrollReveal
              key={pillar.title}
              delay={0.12 * i}
              className="group relative border-b border-cream/15 py-10 md:border-b-0 md:border-r md:px-8 md:last:border-r-0 md:first:pl-0"
            >
              <div className="mb-8 flex items-center justify-between gap-4">
                <PillarGlyph type={pillar.glyph} />
                <span className="text-right text-[0.68rem] uppercase tracking-[0.16em] text-cream/50">{pillar.label}</span>
              </div>
              <h3 className="mb-4 font-display text-[1.45rem] font-semibold">{pillar.title}</h3>
              <p className="max-w-[360px] text-[0.98rem] leading-[1.75] text-cream/65">{pillar.desc}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
