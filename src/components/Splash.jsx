import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Splash({ onComplete }) {
  const [phase, setPhase] = useState('typing'); // 'typing' -> 'opening'
  const title = "DOLPHIN HOTEL";
  
  useEffect(() => {
    // Start opening curtains after typing finishes (approx 1.8s)
    const openTimer = setTimeout(() => {
      setPhase('opening');
    }, 1800);
    
    // Complete splash sequence after curtains open
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2600);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden pointer-events-none">
      {/* Left Curtain */}
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-full bg-black border-r border-gold-500/30 shadow-[5px_0_15px_rgba(0,0,0,0.8)]"
        initial={{ x: "0%" }}
        animate={{ x: phase === 'opening' ? "-100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      
      {/* Right Curtain */}
      <motion.div
        className="absolute top-0 right-0 w-1/2 h-full bg-black border-l border-gold-500/30 shadow-[-5px_0_15px_rgba(0,0,0,0.8)]"
        initial={{ x: "0%" }}
        animate={{ x: phase === 'opening' ? "100%" : "0%" }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Typewriter Logo */}
      <AnimatePresence>
        {phase === 'typing' && (
          <motion.div 
            layoutId="brand-logo-container"
            className="relative z-10 flex items-center justify-center"
          >
            <motion.h1 
              layoutId="brand-logo-text"
              className="text-4xl md:text-6xl font-display text-gold-500 text-glow-gold tracking-[0.2em] text-center whitespace-nowrap"
            >
              {title.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.1,
                    delay: index * 0.1, // Typewriter stagger
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
