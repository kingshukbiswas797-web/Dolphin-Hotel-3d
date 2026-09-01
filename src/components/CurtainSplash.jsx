import { motion } from 'framer-motion';

export default function CurtainSplash({ onComplete }) {
  return (
    <div className="fixed inset-0 z-[200] flex pointer-events-none">
      {/* Left Curtain */}
      <motion.div 
        initial={{ x: 0 }} 
        animate={{ x: '-100%' }} 
        transition={{ delay: 1.2, duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        onAnimationComplete={onComplete}
        className="w-1/2 h-full bg-[#111] border-r-2 border-gold-500/20 relative"
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-4 overflow-hidden">
          <motion.span 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block text-4xl md:text-6xl font-display text-gold-500 tracking-[0.2em] uppercase font-bold"
          >
            DOL
          </motion.span>
        </div>
      </motion.div>

      {/* Right Curtain */}
      <motion.div 
        initial={{ x: 0 }} 
        animate={{ x: '100%' }} 
        transition={{ delay: 1.2, duration: 1.5, ease: [0.77, 0, 0.175, 1] }}
        className="w-1/2 h-full bg-[#111] border-l-2 border-gold-500/20 relative"
      >
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-4 overflow-hidden">
          <motion.span 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block text-4xl md:text-6xl font-display text-gold-500 tracking-[0.2em] uppercase font-bold"
          >
            PHIN
          </motion.span>
        </div>
      </motion.div>
    </div>
  );
}
