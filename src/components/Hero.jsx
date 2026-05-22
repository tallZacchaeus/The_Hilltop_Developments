import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import RevealText from './ui/RevealText';
import MagneticButton from './ui/MagneticButton';
import { ArrowRight } from 'lucide-react';

const slides = [
  {
    src: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1400&q=80',
    label: 'Urban Residences'
  },
  {
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    label: 'Commercial Landmarks'
  },
  {
    src: 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
    label: 'Private Living'
  },
  {
    src: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80',
    label: 'Architectural Detail'
  }
];

export default function Hero({ isLoaded }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [0, 1], [-4, 4]);
  const slideX = useTransform(mouseX, [0, 1], [16, -16]);
  const slideY = useTransform(mouseY, [0, 1], [12, -12]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5200);

    return () => clearTimeout(timer);
  }, [activeSlide]);

  const handleMouseMove = (e) => {
    // Only tilt on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-[56%_44%] items-center px-6 lg:px-12 pt-32 pb-16 gap-12 lg:gap-16 relative overflow-hidden">
      <div className="hero-gradient-mesh absolute -inset-16 pointer-events-none opacity-80" />

      <div className="relative z-10 pt-10 lg:pt-0">
        <motion.div 
          className="inline-flex items-center gap-2.5 px-4 py-2 border border-gold/25 rounded-full text-[0.75rem] tracking-[0.12em] uppercase text-gold-soft mb-9 bg-white/5"
          initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
          animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 16, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          <motion.span 
            className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_0_0_rgba(212,183,110,0.6)]"
            animate={{ boxShadow: ['0 0 0 0 rgba(212,183,110,0.62)', '0 0 0 12px rgba(212,183,110,0)', '0 0 0 0 rgba(212,183,110,0)'] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
          />
          Building Sustainable Cities · Launching Soon
        </motion.div>

        <h1 className="font-display text-[clamp(2.7rem,5.8vw,5.4rem)] font-bold leading-[1.02] mb-7">
          {isLoaded && <RevealText delay={0.6}>Building *sustainable* cities.</RevealText>}
        </h1>

        <motion.p 
          className="text-[1.1rem] leading-[1.65] text-cream-muted max-w-[520px] mb-11 font-light"
          initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
          animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 18, filter: 'blur(10px)' }}
          transition={{ duration: 0.85, delay: 1.05 }}
        >
          A Realty Expression of the Marvel Ideations. Hilltop Developments is shaping resilient, future-ready cities across Nigeria through innovative, adaptive, and impactful real estate. Our full digital portfolio launches soon; our team is available now for investor briefings and private consultations.
        </motion.p>

        <div className="flex flex-wrap gap-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: 1.25 }}
          >
            <MagneticButton variant="primary" href="#consult">
              Contact the Team <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.6, delay: 1.35 }}
          >
            <MagneticButton variant="ghost" href="#consult">
              Get Launch Updates
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      <div className="relative h-[50vh] lg:h-[70vh] min-h-[400px] lg:min-h-[480px]">
        <motion.div 
          className="absolute -top-5 -right-5 w-full h-full border border-gold/70 z-0 hidden lg:block"
          initial={{ opacity: 0, x: 20, y: -20 }}
          animate={isLoaded ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: -20 }}
          transition={{ duration: 0.9, delay: 1.15 }}
        />
        
        <motion.div 
          className="relative w-full h-full z-10 overflow-hidden bg-navy-deep"
          initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0 }}
          animate={isLoaded ? { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', opacity: 1 } : { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)', opacity: 0 }}
          transition={{ duration: 1.15, ease: [0.76, 0, 0.24, 1], delay: 0.9 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, perspective: 1000 }}
        >
          <AnimatePresence mode="wait">
            <motion.div 
              key={slides[activeSlide].src}
              className="absolute -inset-5 bg-cover bg-center brightness-[0.78] saturate-[0.9]"
              style={{
                backgroundImage: `url("${slides[activeSlide].src}")`,
                x: slideX,
                y: slideY
              }}
              initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: reduceMotion ? 1 : [1.02, 1.08] }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{
                opacity: { duration: reduceMotion ? 0 : 1.1, ease: [0.22, 1, 0.36, 1] },
                scale: { duration: reduceMotion ? 0 : 16, ease: 'linear' }
              }}
            />
          </AnimatePresence>

          <div className="absolute inset-0 bg-navy opacity-25 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/55 via-navy/10 to-transparent" />

          <div className="absolute left-5 right-5 bottom-5 z-20 flex items-center justify-between gap-4">
            <span className="text-[0.68rem] lg:text-[0.75rem] tracking-[0.16em] uppercase text-gold-soft">
              {slides[activeSlide].label}
            </span>
            <div className="flex gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.label}
                  type="button"
                  aria-label={`Show ${slide.label}`}
                  onClick={() => setActiveSlide(index)}
                  className={`h-1.5 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy ${index === activeSlide ? 'w-8 bg-gold-soft' : 'w-3 bg-gold/35 hover:bg-gold/70'}`}
                />
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
