import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <PageTransition className="w-full min-h-screen overflow-hidden py-20 px-4 md:px-20 relative">
      
      {/* Massive Vertical Text */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute left-0 top-0 h-full flex flex-col justify-center pointer-events-none opacity-20 mix-blend-overlay z-0"
      >
        <h1 
          className="text-[25vh] leading-[0.8] font-display font-black text-transparent rotate-180"
          style={{ writingMode: 'vertical-rl', WebkitTextStroke: '3px #cfa45a' }}
        >
          CONTACT
        </h1>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center justify-between min-h-[80vh]">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full md:w-1/2"
        >
          <h1 className="text-[12vw] md:text-[8vw] font-display font-black text-gold-500 leading-none mb-10 text-glow-gold">
            SAY<br/>HELLO.
          </h1>
          
          <div className="space-y-8 bg-black/80 backdrop-blur-md p-10 border-l-8 border-gold-500 shadow-[20px_20px_0px_rgba(207,164,90,0.2)]">
            <div className="flex items-center gap-6 group">
              <MapPin size={40} className="text-gold-500 group-hover:scale-125 transition-transform" />
              <div>
                <h3 className="font-display text-xl text-white uppercase tracking-widest font-bold">Location</h3>
                <p className="text-gray-400">Chhatina, Tehatta, Nadia</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <Phone size={40} className="text-gold-500 group-hover:scale-125 transition-transform" />
              <div>
                <h3 className="font-display text-xl text-white uppercase tracking-widest font-bold">Reservations</h3>
                <p className="text-gray-400">+91 (123) 456-7890</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <Clock size={40} className="text-gold-500 group-hover:scale-125 transition-transform" />
              <div>
                <h3 className="font-display text-xl text-white uppercase tracking-widest font-bold">Hours</h3>
                <p className="text-gray-400">Mon-Sun: 11:00 AM - 11:00 PM</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[70vh] border-8 border-gold-500 p-2 bg-black shadow-[20px_20px_0px_#cfa45a]"
        >
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14631.782806297374!2d88.528405!3d23.714447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f933d1c1c1c1c1%3A0x1c1c1c1c1c1c1c1c!2sTehatta%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
            className="w-full h-full grayscale contrast-125 opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700" 
            style={{ border: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
        
      </div>
    </PageTransition>
  );
}
