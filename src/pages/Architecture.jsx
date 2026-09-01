import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function Architecture() {
  return (
    <PageTransition>
      <section className="relative min-h-screen w-full bg-[#FF0000] flex flex-col pt-32 px-8 font-manrope z-10">
        <div className="max-w-4xl mx-auto w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-12"
          >
            Autonomous Architecture
          </motion.h1>

          <div className="grid md:grid-cols-2 gap-16 text-white font-light leading-relaxed">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-bold mb-6 font-italiana uppercase tracking-widest border-b border-white pb-4">Silent Operation</h2>
              <p className="mb-6">Our systems are designed to exist in the periphery of your awareness. We believe that true technological advancement shouldn't demand more of your attention; it should demand less.</p>
              <p>By automating the redundant, we carve out space for the visionary.</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6 font-italiana uppercase tracking-widest border-b border-white pb-4">Balance Restored</h2>
              <p className="mb-6">The modern business landscape is plagued by operational chaos. Our platform acts as a digital counter-weight, absorbing the shock of administrative load so your team can maintain forward momentum.</p>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-32 border border-white p-12 text-center flex flex-col items-center"
          >
            <div className="font-marck text-white text-[80px] leading-none mb-[32px]">S.P.D Core</div>
            <p className="text-lg uppercase tracking-widest max-w-lg mx-auto font-light">
              System active. Optimization protocols engaged.
            </p>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
