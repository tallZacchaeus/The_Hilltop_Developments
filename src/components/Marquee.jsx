import { motion } from 'framer-motion';

export default function Marquee() {
  const items = [
    "Building Sustainable Cities",
    "Strategic Enterprise",
    "Future-Ready Cities",
    "Impactful Partnerships",
    "Long-Term Value"
  ];

  // Duplicate for seamless loop
  const repeatedItems = [...items, ...items, ...items];

  return (
    <div className="overflow-hidden border-y border-cream/15 py-5 bg-navy-deep flex mt-24">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {repeatedItems.map((item, index) => (
          <span key={index} className="flex items-center text-gold-soft font-serif italic text-lg lg:text-xl">
            {item}
            <span className="mx-12 lg:mx-16 text-gold not-italic">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
