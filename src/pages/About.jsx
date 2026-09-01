import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function About() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  return (
    <PageTransition>
      <div className="min-h-[150vh] w-full overflow-hidden px-4" ref={containerRef}>
        
        {/* Massive Background Text */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-20 left-0 w-full pointer-events-none opacity-20 mix-blend-overlay"
        >
          <h1 className="text-[25vw] leading-none font-black font-display whitespace-nowrap -ml-[10vw]">HISTORY</h1>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto pt-40 pb-20">
          <motion.div
            initial={{ opacity: 0, rotate: -5 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            className="mb-32"
          >
            <h1 className="text-[8vw] md:text-[6vw] font-display text-gold-500 font-black leading-[0.8] mix-blend-screen text-glow-gold">
              NOT JUST A RESTAURANT.<br/>
              <span className="text-transparent" style={{ WebkitTextStroke: '2px #cfa45a' }}>A CULINARY REVOLUTION.</span>
            </h1>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-20">
            <motion.div style={{ y: y2 }} className="text-xl md:text-3xl font-sans font-bold text-gray-200 leading-tight uppercase tracking-widest p-10 border-4 border-gold-500 bg-black/95 shadow-[15px_15px_0px_#cfa45a]">
              <p className="mb-10">We rebel against the ordinary. Located in the heart of Chhatina, Tehatta, Dolphin Hotel shatters the mold of traditional dining.</p>
              <p>We blend ancient Indian culinary secrets with aggressive, modern execution. Every dish is a statement.</p>
            </motion.div>

            <motion.div style={{ rotate }} className="relative aspect-square w-full">
              <img 
                src="/assets/interior_1.jpg" 
                alt="Interior" 
                className="w-full h-full object-cover grayscale contrast-150 hover:grayscale-0 transition-all duration-700 shadow-[20px_20px_0px_#cfa45a]"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
