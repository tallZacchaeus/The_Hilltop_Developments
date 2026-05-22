import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import RevealText from './ui/RevealText';
import MagneticButton from './ui/MagneticButton';
import ScrollReveal from './ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';

export default function Consultation() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const mailSubject = encodeURIComponent("Enquiry — Hilltop Developments");
  const mailBody = encodeURIComponent("Hello Hilltop team,\n\nI'd like to receive updates about Hilltop Developments.\n\nName:\nPhone:\nPreferred contact method:\n\nThank you.");
  const mailtoLink = `mailto:info@hilltopdevelopments.com?subject=${mailSubject}&body=${mailBody}`;
  const whatsappLink = "https://wa.me/2349139083794?text=" + encodeURIComponent("Hello Hilltop Developments, I'd like to receive updates and confirm the right contact for enquiries.");

  return (
    <section id="consult" className="relative py-28 px-6 lg:px-12 bg-navy-deep overflow-hidden" ref={ref}>
      
      {/* Giant H Background */}
      <motion.div 
        className="absolute -top-32 -right-24 font-serif font-light text-[38rem] leading-none text-gold/[0.025] pointer-events-none select-none z-0 hidden lg:block"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        H
      </motion.div>

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        {/* Section Label */}
        <div className="flex items-center justify-center gap-3 text-[0.8rem] tracking-[0.18em] uppercase text-gold mb-8">
          <motion.div 
            className="h-[1px] bg-gold w-8 origin-right"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
          Contact
          <motion.div 
            className="h-[1px] bg-gold w-8 origin-left"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.6rem)] font-light leading-[1.1] tracking-[-0.02em] mb-6">
          {isInView && <RevealText>Reach Hilltop *directly.*</RevealText>}
        </h2>

        <ScrollReveal delay={0.4}>
          <p className="text-cream/65 text-[1.1rem] leading-[1.7] font-light max-w-[600px] mx-auto mb-12">
            The full site is not live yet. For now, send an enquiry and the team will follow up with the right information when it is ready to share.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.6}>
          <div className="flex flex-wrap justify-center gap-4">
            <MagneticButton variant="primary" href={mailtoLink}>
              Send an Enquiry <ArrowRight size={16} />
            </MagneticButton>
            <MagneticButton variant="ghost" href={whatsappLink}>
              Message on WhatsApp
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
