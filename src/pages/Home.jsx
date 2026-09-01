import { useRef, useEffect } from 'react';
import PageTransition from '../components/PageTransition';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';

const reviews = [
  {
    name: "Ramesh M.",
    date: "2 weeks ago",
    text: "A hidden gem in Tehatta. The interior is absolutely stunning, feels very premium and classical. Their Hilsa preparation is out of this world!"
  },
  {
    name: "Priyanka S.",
    date: "1 month ago",
    text: "We hosted a family dinner here in the banquet area. The warm lighting and beautiful decor made the evening perfect. Great tandoor dishes."
  },
  {
    name: "Arindam B.",
    date: "3 months ago",
    text: "Best multi-cuisine restaurant in the Nadia district. The Chinese food is authentic, and the ambience gives a very luxurious, classic vibe."
  }
];

const signatureDishes = [
  {
    title: "Bengali Hilsa (Ilish)",
    desc: "Fresh river Hilsa prepared in our signature mustard sauce.",
    img: "https://images.unsplash.com/photo-1627308595229-7830f5c90663?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Tandoori Specialties",
    desc: "Overnight marinated chicken and mutton, slow-cooked in a traditional clay oven.",
    img: "https://images.unsplash.com/photo-1599487405270-b27e20ed578c?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Authentic Dal Makhani",
    desc: "Black lentils simmered for 24 hours with butter and cream.",
    img: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Wok-Tossed Hakka Noodles",
    desc: "Classic Indo-Chinese style stir-fry with fresh vegetables and secret sauces.",
    img: "https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800"
  }
];

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  // Subtle 3D mouse parallax effect for the hero card
  const cardRef = useRef(null);
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 20; 
      const y = (clientY / innerHeight - 0.5) * -20;
      cardRef.current.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <PageTransition className="w-full flex flex-col items-center" ref={containerRef}>
      
      <div className="w-full flex flex-col items-center">
        
        {/* Brutalist Hero Section */}
        <div className="min-h-screen flex flex-col items-center justify-center w-full overflow-hidden relative pt-20">
          
          {/* Huge DOLPHIN */}
          <motion.div 
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]) }}
            className="whitespace-nowrap flex justify-center w-full"
          >
            <h1 className="text-[13vw] leading-[0.9] font-display font-black text-gold-500 mix-blend-screen opacity-90 text-glow-gold select-none text-center">
              DOLPHIN
            </h1>
          </motion.div>

          {/* Huge HOTEL (Outlined) */}
          <motion.div 
            initial={{ opacity: 0, x: -200 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.4 }}
            style={{ x: useTransform(scrollYProgress, [0, 1], ["0%", "50%"]) }}
            className="whitespace-nowrap flex justify-center w-full -mt-[2vw]"
          >
            <h1 
              className="text-[13vw] leading-[0.9] font-display font-black text-transparent select-none text-center" 
              style={{ WebkitTextStroke: '3px #cfa45a' }}
            >
              HOTEL
            </h1>
          </motion.div>

          {/* Center floating text */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.8 }}
            style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "300%"]) }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-full text-center pointer-events-none mix-blend-exclusion"
          >
             <p className="text-[2vw] md:text-[1.5vw] font-sans font-bold tracking-[1.5em] text-white uppercase ml-[1.5em]">
               Restaurant & Bar
             </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 z-20"
          >
            <Link 
              to="/menu" 
              className="px-12 py-5 bg-gold-500 text-black font-black uppercase tracking-[0.3em] text-lg hover:bg-white transition-colors duration-300 border-4 border-black"
            >
              Discover Menu
            </Link>
          </motion.div>
          
        </div>

        {/* Brutalist Grid Section */}
        <div className="w-full bg-black/90 border-t-8 border-gold-500 relative z-20">
          <div className="max-w-[100vw] grid md:grid-cols-2 gap-0 border-b-8 border-gold-500">
            
            {/* Left Block */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-10 md:p-20 border-b md:border-b-0 md:border-r-8 border-gold-500 flex flex-col justify-center"
            >
              <h2 className="text-5xl md:text-7xl font-display font-black text-gold-500 uppercase leading-[0.8] mb-8">
                The<br/>Philosophy
              </h2>
              <p className="text-xl text-gray-300 font-sans font-medium uppercase tracking-widest leading-relaxed border-l-8 border-gold-500 pl-6">
                Culinary excellence is not polite. It is a bold statement of flavor, history, and aggression.
              </p>
            </motion.div>

            {/* Right Block (Image) */}
            <div className="relative aspect-square md:aspect-auto overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" 
                alt="Chef preparing food" 
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-150 group-hover:grayscale-0 transition-all duration-500"
              />
            </div>
            
          </div>

          {/* Signature Dishes Bento Grid */}
          <div className="w-full p-6 md:p-12">
            <h2 className="text-[8vw] leading-none font-display font-black text-transparent mb-12" style={{ WebkitTextStroke: '2px #cfa45a' }}>
              SIGNATURES
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              {signatureDishes.map((dish, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="group cursor-pointer border-4 border-gold-500 bg-background/80 hover:bg-gold-500 hover:text-black transition-colors duration-300 flex flex-col"
                >
                  <div className="aspect-square overflow-hidden border-b-4 border-gold-500">
                    <img 
                      src={dish.img} 
                      alt={dish.title}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                    />
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <h3 className="font-display font-black text-2xl uppercase mb-4">{dish.title}</h3>
                    <p className="text-sm font-bold tracking-widest uppercase opacity-80">{dish.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Reviews Banner */}
          <div className="w-full border-t-8 border-gold-500 bg-gold-500 text-black py-20 px-6 overflow-hidden">
            <h2 className="text-center font-display font-black text-6xl md:text-8xl mb-16 uppercase">The Verdict</h2>
            <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
              {reviews.map((review, i) => (
                <div key={i} className="min-w-[85vw] md:min-w-[400px] border-4 border-black p-8 bg-background text-gold-500 snap-center">
                  <div className="flex gap-1 text-gold-500 mb-6">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} size={24} fill="currentColor" />)}
                  </div>
                  <p className="font-sans font-bold text-xl uppercase leading-tight mb-8">
                    "{review.text}"
                  </p>
                  <div className="border-t-4 border-gold-500 pt-4">
                    <p className="font-display font-black text-2xl uppercase">{review.name}</p>
                    <p className="text-sm uppercase tracking-widest text-white">{review.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
