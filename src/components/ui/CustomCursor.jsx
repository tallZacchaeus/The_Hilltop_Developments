import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfigDot = { stiffness: 720, damping: 34 };
  const springConfigOutline = { stiffness: 120, damping: 18, mass: 0.7 };

  const dotX = useSpring(cursorX, springConfigDot);
  const dotY = useSpring(cursorY, springConfigDot);
  
  const outlineX = useSpring(cursorX, springConfigOutline);
  const outlineY = useSpring(cursorY, springConfigOutline);

  useEffect(() => {
    // Only enable on non-touch devices
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  // Hide on screens smaller than 1024px completely
  if (!isVisible || typeof window === 'undefined') return null;

  return (
    <div className="hidden lg:block">
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold-soft pointer-events-none z-[9999]"
        animate={{ rotate: isHovering ? 45 : 0, scale: isHovering ? 1.4 : 1 }}
        transition={{ duration: 0.22 }}
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-11 h-11 pointer-events-none z-[9998]"
        animate={{
          scale: isHovering ? 1.45 : 1,
          rotate: isHovering ? 45 : 0
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        style={{
          x: outlineX,
          y: outlineY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <span className="absolute inset-0 border border-gold/70" />
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gold/35" />
        <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-gold/35" />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 h-px w-12 origin-left bg-gold/50 pointer-events-none z-[9997]"
        animate={{ opacity: isHovering ? 0.8 : 0.35, scaleX: isHovering ? 1.45 : 1 }}
        transition={{ duration: 0.24 }}
        style={{
          x: outlineX,
          y: outlineY,
          translateY: '-50%',
          rotate: -18
        }}
      />
    </div>
  );
}
