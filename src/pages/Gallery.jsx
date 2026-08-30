import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import PageTransition from '../components/PageTransition';

const IMAGES = [
  { url: '/assets/exterior_1.jpg', title: 'NIGHT EXTERIOR' },
  { url: '/assets/interior_1.jpg', title: 'BANQUET HALL' },
  { url: '/assets/exterior_2.jpg', title: 'BUILDING FRONT' },
  { url: '/assets/interior_2.jpg', title: 'DINING SETUP' },
];

export default function Gallery() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  
  return (
    <PageTransition className="w-full overflow-hidden" ref={containerRef}>
      <div className="w-full min-h-screen relative py-20 px-4 md:px-20">
        
        {/* Massive floating title */}
        <motion.div 
          style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
          className="whitespace-nowrap sticky top-40 z-10 pointer-events-none mb-32"
        >
          <h1 
            className="text-[18vw] leading-[0.8] font-display font-black text-transparent" 
            style={{ WebkitTextStroke: '3px rgba(207,164,90,0.8)' }}
          >
            VISUAL ARCHIVE
          </h1>
        </motion.div>

        <div className="flex flex-col gap-32 relative z-20 max-w-6xl mx-auto">
          {IMAGES.map((img, i) => {
            const isEven = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 100, rotate: isEven ? -5 : 5 }}
                whileInView={{ opacity: 1, y: 0, rotate: isEven ? -2 : 2 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ type: "spring", stiffness: 60, damping: 20 }}
                className={`relative w-full md:w-[70%] ${isEven ? 'self-start' : 'self-end'}`}
              >
                <div className="relative group overflow-hidden border-4 border-gold-500 bg-black p-2 shadow-[20px_20px_0px_#000]">
                  <img 
                    src={img.url} 
                    alt={img.title} 
                    className="w-full h-[60vh] object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gold-500 mix-blend-multiply opacity-50 group-hover:opacity-0 transition-opacity duration-700"></div>
                  
                  {/* Brutalist Label */}
                  <div className="absolute -bottom-6 -right-6 bg-gold-500 text-black px-6 py-2 transform -rotate-3 group-hover:rotate-0 transition-transform font-black text-2xl tracking-[0.2em] border-2 border-black">
                    {img.title}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </PageTransition>
  );
}
