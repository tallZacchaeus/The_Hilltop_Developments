import { FAQS } from '../../data/content';
import Accordion from '../ui/Accordion';
import Panel from '../ui/Panel';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

/** FAQ accordion (all 11 questions from the copy doc), linked from the footer as /contact#faqs. */
export default function FaqSection() {
  return (
    <Panel id="faqs" aria-labelledby="faqs-title">
      <Reveal>
        <SectionHeading eyebrow="FAQs" title="Frequently Asked Questions" id="faqs-title" />
      </Reveal>
      <Reveal className="mx-auto mt-12 max-w-3xl">
        <Accordion items={FAQS} />
      </Reveal>
      <p className="mt-8 text-center text-[15px] text-navy/70">
        Can&apos;t find your answer?{' '}
        <a
          href="#enquiry"
          className="focus-ring rounded-sm font-display text-navy underline decoration-gold decoration-2 underline-offset-4"
        >
          Get in touch
        </a>
      </p>
    </Panel>
  );
}
