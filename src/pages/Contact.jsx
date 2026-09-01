import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function Contact() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-black pt-32 px-6 pb-20 font-sans flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full grid md:grid-cols-2 gap-16 border border-gold-500/20 p-8 md:p-12 relative overflow-hidden">
          
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[100px] pointer-events-none" />

          {/* Left Side: Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-between relative z-10"
          >
            <div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-gold-500 uppercase tracking-widest mb-6 leading-none">
                Reserve
              </h1>
              <p className="text-white/60 uppercase tracking-[0.2em] font-bold text-sm leading-relaxed max-w-xs">
                Secure your place at our tables. Reservations are highly recommended.
              </p>
            </div>
            
            <div className="mt-12 space-y-6">
              <div>
                <h3 className="text-gold-500 font-display uppercase tracking-widest text-sm mb-1">Location</h3>
                <p className="text-white/80 font-light text-sm">123 Culinary District, Nadia</p>
              </div>
              <div>
                <h3 className="text-gold-500 font-display uppercase tracking-widest text-sm mb-1">Hours</h3>
                <p className="text-white/80 font-light text-sm">Mon - Sun: 12:00 PM - 11:00 PM</p>
              </div>
              <div>
                <h3 className="text-gold-500 font-display uppercase tracking-widest text-sm mb-1">Direct Line</h3>
                <p className="text-white/80 font-light text-sm">+91 98765 43210</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side: Form */}
          <motion.form 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-8 relative z-10"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="relative group">
              <input 
                type="text" 
                placeholder="YOUR NAME"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500 font-light tracking-widest uppercase text-xs transition-colors"
              />
            </div>
            <div className="relative group">
              <input 
                type="text" 
                placeholder="GUEST COUNT"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-gold-500 font-light tracking-widest uppercase text-xs transition-colors"
              />
            </div>
            <div className="relative group">
              <input 
                type="date"
                className="w-full bg-transparent border-b border-white/20 py-3 text-white focus:outline-none focus:border-gold-500 font-light tracking-widest uppercase text-xs transition-colors custom-date-input"
              />
            </div>
            <button className="mt-6 w-full py-4 bg-gold-500 text-black font-bold uppercase tracking-widest text-xs hover:bg-white transition-colors duration-300 shadow-[0_0_15px_rgba(207,164,90,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]">
              Confirm Request
            </button>
          </motion.form>
        </div>
      </div>
    </PageTransition>
  );
}
