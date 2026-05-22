import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import CustomCursor from './components/ui/CustomCursor';
import Header from './components/Header';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import Vision from './components/Vision';
import Pillars from './components/Pillars';
import FutureUnfolds from './components/FutureUnfolds';
import Consultation from './components/Consultation';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    // 1s delay before split to match the total 2.5s sequence requirement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <CustomCursor />
      
      <AnimatePresence>
        {loading && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-navy-deep pointer-events-none"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <motion.div 
              className="absolute inset-y-0 left-0 w-1/2 bg-navy"
              initial={reduceMotion ? false : { x: 0, skewX: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '-110%', skewX: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.95, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div 
              className="absolute inset-y-0 right-0 w-1/2 bg-navy"
              initial={reduceMotion ? false : { x: 0, skewX: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { x: '110%', skewX: -8 }}
              transition={{ duration: reduceMotion ? 0 : 0.95, ease: [0.76, 0, 0.24, 1] }}
            />
            <motion.div
              className="relative z-10 h-20 w-20 rounded-full border border-gold/40"
              initial={reduceMotion ? false : { scale: 0.72, opacity: 0, rotate: -24 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { scale: 1.5, opacity: 0, rotate: 24 }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Header isLoaded={!loading} />
      <main>
        <Hero isLoaded={!loading} />
        <Marquee />
        <Vision />
        <Pillars />
        <FutureUnfolds />
        <Consultation />
      </main>
      <Footer />
    </>
  );
}

export default App;
