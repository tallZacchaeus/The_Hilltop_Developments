import { useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function MagneticButton({ children, variant = 'primary', href, onClick, className = '' }) {
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.5 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Max movement 12px
    x.set(distanceX * 0.15);
    y.set(distanceY * 0.15);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const baseClasses = "relative inline-flex items-center justify-center gap-2.5 px-7 py-4 text-[0.85rem] tracking-[0.08em] uppercase transition-colors duration-300 font-medium whitespace-nowrap overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-navy";
  const variants = {
    primary: "bg-gold text-navy-deep hover:bg-gold-soft",
    ghost: "bg-transparent text-cream border border-cream/15 hover:border-gold hover:text-gold"
  };

  const innerContent = (
    <motion.span 
      className="relative z-10 flex items-center gap-2"
      style={{ x: springX, y: springY }}
    >
      {children}
    </motion.span>
  );

  const buttonProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    className: `${baseClasses} ${variants[variant]} ${className}`,
    onClick
  };

  if (href) {
    return (
      <a href={href} {...buttonProps}>
        {innerContent}
        {isHovered && variant === 'primary' && (
          <motion.div 
            className="absolute inset-0 bg-gold-soft z-0"
            layoutId="magnetic-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </a>
    );
  }

  return (
    <button {...buttonProps}>
      {innerContent}
    </button>
  );
}
