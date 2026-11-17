import { motion, useReducedMotion } from 'framer-motion';
import Eyebrow from '../ui/Eyebrow';
import Photo from '../ui/Photo';
import { PANEL_INSET } from '../ui/Panel';

const EASE = [0.22, 1, 0.36, 1];

// Vertical scrim on phones (text sits at the bottom), horizontal scrim on desktop (text on the left).
const SCRIM =
  'bg-[linear-gradient(180deg,rgb(16_32_79/0.15)_0%,rgb(16_32_79/0.5)_45%,rgb(16_32_79/0.9)_100%)] ' +
  'lg:bg-[linear-gradient(90deg,rgb(16_32_79/0.88)_0%,rgb(16_32_79/0.6)_42%,rgb(16_32_79/0.05)_78%)]';

/**
 * Full-bleed photo hero with the page's h1 (the template's home hero).
 * @param {{
 *   image: string, imageAlt: string, eyebrow: string, title: React.ReactNode,
 *   lead: React.ReactNode, actions?: React.ReactNode, footnote?: React.ReactNode
 * }} props
 */
export default function ImageHero({ image, imageAlt, eyebrow, title, lead, actions, footnote }) {
  const reduceMotion = useReducedMotion();
  const enter = (delay) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: EASE },
        };

  return (
    <section aria-labelledby="page-title" className={`relative overflow-hidden rounded-panel bg-navy ${PANEL_INSET}`}>
      <Photo src={image} alt={imageAlt} priority className="absolute inset-0" />
      <div aria-hidden="true" className={`absolute inset-0 ${SCRIM}`} />

      <div className="relative mx-auto flex min-h-[min(88svh,820px)] max-w-content flex-col justify-end px-5 pb-10 pt-40 sm:px-8 sm:pb-14 lg:justify-center lg:px-12 lg:py-24">
        <div className="flex max-w-2xl flex-col items-start gap-6">
          <motion.div {...enter(0.05)}>
            <Eyebrow tone="glass">{eyebrow}</Eyebrow>
          </motion.div>
          <motion.h1 id="page-title" className="text-h1 text-balance text-white" {...enter(0.15)}>
            {title}
          </motion.h1>
          <motion.p className="max-w-xl text-lead text-white/85" {...enter(0.25)}>
            {lead}
          </motion.p>
          {actions && (
            <motion.div className="flex flex-wrap gap-3" {...enter(0.35)}>
              {actions}
            </motion.div>
          )}
          {footnote && (
            <motion.div className="flex items-center gap-3 text-[15px] text-white/80" {...enter(0.45)}>
              {footnote}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
