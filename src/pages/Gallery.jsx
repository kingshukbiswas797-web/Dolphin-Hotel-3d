import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';

export default function Gallery() {
  const images = [
    { src: '/assets/interior_1.jpg', span: 'md:col-span-2 md:row-span-2' },
    { src: '/assets/exterior_1.jpg', span: 'col-span-1' },
    { src: '/assets/hilsa_sorse.jpg', span: 'col-span-1' },
    { src: '/assets/interior_2.jpg', span: 'md:col-span-2' },
    { src: '/assets/mutton_kadhai.jpg', span: 'col-span-1' },
    { src: '/assets/exterior_2.jpg', span: 'col-span-1' },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-black pt-32 px-6 pb-20 font-sans">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 border-b border-gold-500/20 pb-8"
          >
            <h1 className="text-6xl md:text-8xl font-display font-black text-gold-500 uppercase tracking-widest">
              Gallery
            </h1>
            <p className="text-white/60 uppercase tracking-[0.2em] mt-4 font-bold">
              Visual exploration of our legacy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[250px]">
            {images.map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative group overflow-hidden border border-gold-500/20 ${img.span}`}
              >
                <div className="absolute inset-0 bg-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none" />
                <img 
                  src={img.src} 
                  alt={`Gallery image ${i + 1}`}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
