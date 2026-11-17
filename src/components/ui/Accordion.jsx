import { useId, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';

const EASE = [0.22, 1, 0.36, 1];

/**
 * Disclosure list; one item open at a time.
 * @param {{ items: ReadonlyArray<{ question: string, answer: string }>, defaultOpen?: number }} props
 */
export default function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen);
  const baseId = useId();
  const reduceMotion = useReducedMotion();

  const toggle = (index) => setOpenIndex((current) => (current === index ? -1 : index));

  return (
    <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white shadow-card">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-q${index}`;
        const panelId = `${baseId}-a${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(index)}
                className="focus-ring flex w-full items-center justify-between gap-6 px-5 py-5 text-left font-display text-[17px] transition-colors hover:bg-sky-50 sm:px-7 sm:text-lg"
              >
                <span>{item.question}</span>
                <Plus
                  aria-hidden
                  className={`h-5 w-5 shrink-0 text-navy/60 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                />
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl px-5 pb-6 text-[15px] leading-relaxed text-navy/70 sm:px-7 sm:text-base">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
