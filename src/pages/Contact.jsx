import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function Contact() {
  return (
    <PageTransition>
      <section className="relative min-h-screen w-full bg-[#FF0000] flex flex-col pt-40 px-8 font-manrope z-10">
        <div className="max-w-3xl mx-auto w-full text-center">
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-16"
          >
            <div className="font-marck text-white text-[120px] leading-none mb-6">
              Connect
            </div>
            <p className="text-white font-light text-lg tracking-widest uppercase">
              Initiate the integration sequence
            </p>
          </motion.div>

          <motion.form 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-8 w-full"
            onSubmit={(e) => e.preventDefault()}
          >
            <input 
              type="text" 
              placeholder="ENTER DESIGNATION"
              className="w-full bg-transparent border-b border-white py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white font-light tracking-widest uppercase text-sm"
            />
            <input 
              type="email" 
              placeholder="TRANSMISSION CHANNEL (EMAIL)"
              className="w-full bg-transparent border-b border-white py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white font-light tracking-widest uppercase text-sm"
            />
            <textarea 
              placeholder="DEFINE DIRECTIVES"
              rows={4}
              className="w-full bg-transparent border-b border-white py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-white font-light tracking-widest uppercase text-sm resize-none"
            />
            <button className="mt-8 px-12 py-5 bg-white text-[#FF0000] text-sm uppercase tracking-widest font-bold hover:bg-black hover:text-white hover:border-black border border-white transition-colors duration-300 w-full md:w-auto mx-auto">
              Transmit Data
            </button>
          </motion.form>
          
        </div>
      </section>
    </PageTransition>
  );
}
