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
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.2 }}
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
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.4 }}
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
            transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
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
              className="px-12 py-5 bg-gold-500 text-black font-black uppercase tracking-[0.3em] text-lg hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(207,164,90,0.5)]"
            >
              Discover Menu
            </Link>
          </motion.div>
          
        </div>

        {/* Culinary Philosophy Section */}
        <div className="w-full py-32 px-6 flex justify-center bg-gradient-to-b from-transparent to-backgroundAlt/80 border-t border-gold-500/10">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display text-gold-500 mb-6 tracking-widest">Our Philosophy</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                At Dolphin Hotel, we believe that a truly memorable dining experience goes beyond just food. It is an orchestration of the finest ingredients, masterful techniques, and an ambiance that speaks to the soul.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                Our chefs bring decades of heritage from across the continent, crafting dishes that honor traditional Indian, Bengali, and Chinese roots while elevating them into a modern classic context.
              </p>
              <Link to="/about" className="text-gold-500 hover:text-gold-400 flex items-center gap-2 font-medium tracking-widest uppercase text-sm group">
                Read our story <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-[0_0_30px_rgba(207,164,90,0.15)] aspect-[4/5] md:aspect-auto h-full min-h-[400px]"
            >
              <img 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" 
                alt="Chef preparing food" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-background/30 mix-blend-multiply"></div>
            </motion.div>
          </div>
        </div>

        {/* Signature Dishes Section */}
        <div className="w-full py-32 px-6 flex justify-center bg-background/90 backdrop-blur-xl border-t border-gold-500/10">
          <div className="max-w-7xl w-full flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-display text-gold-500 mb-4 tracking-widest">Signature Masterpieces</h2>
              <p className="text-gray-400 font-sans tracking-wide">A glimpse into our most celebrated dishes</p>
              <div className="w-16 h-[2px] bg-gold-500/50 mx-auto mt-6"></div>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
              {signatureDishes.map((dish, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.15 }}
                  className="group cursor-pointer rounded-xl overflow-hidden border border-gold-500/20 bg-backgroundAlt/50 shadow-xl"
                >
                  <div className="aspect-square overflow-hidden relative">
                    <img 
                      src={dish.img} 
                      alt={dish.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-gold-400 text-xl mb-2">{dish.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{dish.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16"
            >
              <Link 
                to="/menu" 
                className="px-8 py-3 border border-gold-500/50 text-gold-400 uppercase tracking-widest text-sm hover:bg-gold-500/10 transition-all duration-300 rounded-full"
              >
                View Full Menu
              </Link>
            </motion.div>
          </div>
        </div>

        {/* The Ambience Preview */}
        <div className="w-full py-32 px-6 flex justify-center border-t border-gold-500/10">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center flex-col-reverse md:flex-row">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative rounded-2xl overflow-hidden border border-gold-500/30 shadow-[0_0_30px_rgba(207,164,90,0.15)] aspect-[4/3] w-full"
            >
              <img 
                src="/assets/interior_2.jpg" 
                alt="Banquet Hall Interior" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-display text-gold-500 mb-6 tracking-widest">The Ambience</h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Our dining hall is designed to transport you to an era of elegance. Draped in luxurious purple and gold, illuminated by stunning neon accents, it sets the perfect stage for family gatherings, intimate dinners, and vibrant celebrations.
              </p>
              <Link to="/gallery" className="text-gold-500 hover:text-gold-400 flex items-center gap-2 font-medium tracking-widest uppercase text-sm group">
                View Gallery <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="w-full py-32 px-4 flex flex-col items-center bg-backgroundAlt/60 backdrop-blur-lg border-t border-gold-500/20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 p-8 bg-background/40 backdrop-blur-sm border border-gold-500/10 rounded-xl"
          >
            <h2 className="text-4xl md:text-5xl font-display text-gold-500 mb-4 tracking-widest">Guest Experiences</h2>
            <p className="text-gray-300 font-sans tracking-wide">Notes & Reviews from our visitors</p>
            <div className="w-16 h-[2px] bg-gold-500/50 mx-auto mt-6"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 w-full max-w-7xl">
            {reviews.map((review, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="p-8 border border-gold-500/20 bg-background/50 backdrop-blur-md rounded-lg hover:bg-background/80 hover:-translate-y-2 transition-all duration-300 flex flex-col gap-4 shadow-xl"
              >
                <div className="flex gap-1 text-gold-500 mb-2">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <p className="text-gray-200 font-sans leading-relaxed flex-1 italic text-lg">
                  "{review.text}"
                </p>
                <div className="mt-6 pt-4 border-t border-gold-500/20">
                  <p className="font-display text-gold-400 tracking-wider text-xl">{review.name}</p>
                  <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">{review.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </PageTransition>
  );
}
