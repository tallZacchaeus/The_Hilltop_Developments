import { motion, useScroll, useTransform } from 'framer-motion';
import Logo from './ui/Logo';

export default function Header({ isLoaded }) {
  const { scrollY } = useScroll();
  
  const py = useTransform(scrollY, [0, 40], ['1.75rem', '1rem']);
  const backdropBlur = useTransform(scrollY, [0, 40], ['blur(0px)', 'blur(8px)']);
  const borderBottom = useTransform(scrollY, [0, 40], ['1px solid rgba(212, 183, 110, 0)', '1px solid rgba(212, 183, 110, 0.22)']);

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-6 lg:px-12"
      style={{
        paddingTop: py,
        paddingBottom: py,
        backgroundColor: 'transparent',
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
        borderBottom: borderBottom
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={isLoaded ? { y: 0, opacity: 1 } : { y: -100, opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 1 }}
    >
      <a href="#" className="text-cream no-underline flex items-center gap-3">
        <Logo size={34} />
        <span className="hidden sm:flex flex-col font-display uppercase leading-none">
          <span className="text-[0.92rem] font-semibold tracking-[0.08em]">Hilltop</span>
          <span className="mt-1 text-[0.48rem] font-normal tracking-[0.24em]">Developments</span>
        </span>
      </a>
      
      <nav className="flex gap-8 items-center text-[0.85rem] tracking-[0.05em] uppercase">
        {['Contact'].map((item) => (
          <a key={item} href="#consult" className="group relative text-cream opacity-75 hover:opacity-100 transition-opacity">
            {item}
            <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-cream origin-left scale-x-0 transition-transform duration-400 ease-[0.22,1,0.36,1] group-hover:scale-x-100" />
          </a>
        ))}
      </nav>
    </motion.header>
  );
}
