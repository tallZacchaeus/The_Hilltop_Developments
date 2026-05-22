import ScrollReveal from './ui/ScrollReveal';

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 px-6 lg:px-12 border-t border-cream/15">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-14 border-b border-cream/15">
        
        {/* Brand */}
        <ScrollReveal delay={0} className="lg:col-span-1">
          <h4 className="font-serif text-[1.4rem] font-normal mb-4">Hilltop Developments</h4>
          <p className="text-cream/65 text-[0.95rem] leading-[1.6] font-light max-w-[340px]">
            Official holding page for Hilltop Developments while the full website is being prepared.
          </p>
        </ScrollReveal>

        {/* Visit */}
        <ScrollReveal delay={0.1}>
          <h5 className="text-[0.75rem] tracking-[0.15em] uppercase text-gold font-medium mb-5">Visit</h5>
          <p className="text-cream text-[0.95rem] leading-[1.5] font-light">
            The Light House,<br/>
            by Redemption City,<br/>
            OGS, Nigeria.
          </p>
        </ScrollReveal>

        {/* Contact */}
        <ScrollReveal delay={0.2}>
          <h5 className="text-[0.75rem] tracking-[0.15em] uppercase text-gold font-medium mb-5">Contact</h5>
          <div className="flex flex-col gap-2">
            <a href="mailto:info@hilltopdevelopments.com" className="text-cream text-[0.95rem] font-light hover:text-gold transition-colors">info@hilltopdevelopments.com</a>
            <a href="tel:+2349139083794" className="text-cream text-[0.95rem] font-light hover:text-gold transition-colors">+234 (0) 913 908 3794</a>
          </div>
        </ScrollReveal>

        {/* Connect */}
        <ScrollReveal delay={0.3}>
          <h5 className="text-[0.75rem] tracking-[0.15em] uppercase text-gold font-medium mb-5">Connect</h5>
          <div className="flex flex-col gap-2">
            <a href="https://wa.me/2349139083794" className="text-cream text-[0.95rem] font-light hover:text-gold transition-colors block w-max origin-left hover:rotate-2">WhatsApp</a>
            <a href="#" className="text-cream text-[0.95rem] font-light hover:text-gold transition-colors block w-max origin-left hover:rotate-2">LinkedIn</a>
            <a href="#" className="text-cream text-[0.95rem] font-light hover:text-gold transition-colors block w-max origin-left hover:rotate-2">Instagram</a>
          </div>
        </ScrollReveal>

      </div>

      <div className="max-w-[1400px] mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[0.82rem] text-cream/65">
        <div>© 2026 Hilltop Developments. All rights reserved.</div>
        <div>Site in development</div>
      </div>
    </footer>
  );
}
