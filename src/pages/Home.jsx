import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, ChevronDown } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const signatureDishes = [
  {
    title: "Dollphin Special MURG",
    desc: "A bold, heavily spiced centerpiece dish commanding absolute attention.",
    img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Hilsa Sorse",
    desc: "Aggressive mustard notes cutting through rich, slow-cooked river fish.",
    img: "https://images.unsplash.com/photo-1588168333986-5b20928eb250?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Mutton Kadhai",
    desc: "Robust flavors cooked in a traditional wok with fiery coastal spices.",
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b6ae398?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Prawn Malai Curry",
    desc: "A luxurious take on coastal richness. Massive flavors, zero apologies.",
    img: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=600"
  }
];

const SPOTLIGHT_R = 260;

function RevealLayer({ image, cursorX, cursorY }) {
  const canvasRef = useRef(null);
  const [maskDataUrl, setMaskDataUrl] = useState('');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (cursorX === -999) return;

      const gradient = ctx.createRadialGradient(
        cursorX, cursorY, 0,
        cursorX, cursorY, SPOTLIGHT_R
      );
      
      gradient.addColorStop(0, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.4, 'rgba(255,255,255,1)');
      gradient.addColorStop(0.6, 'rgba(255,255,255,0.75)');
      gradient.addColorStop(0.75, 'rgba(255,255,255,0.4)');
      gradient.addColorStop(0.88, 'rgba(255,255,255,0.12)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, SPOTLIGHT_R, 0, Math.PI * 2);
      ctx.fill();

      setMaskDataUrl(canvas.toDataURL());
    };

    draw();

    return () => window.removeEventListener('resize', handleResize);
  }, [cursorX, cursorY]);

  return (
    <>
      <canvas ref={canvasRef} className="hidden" />
      <div 
        className="hidden md:block absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none grayscale contrast-125"
        style={{ 
          backgroundImage: `url(${image})`,
          maskImage: `url(${maskDataUrl})`,
          WebkitMaskImage: `url(${maskDataUrl})`,
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat'
        }}
      />
    </>
  );
}

export default function Home() {
  const mouse = useRef({ x: -999, y: -999 });
  const smooth = useRef({ x: -999, y: -999 });
  const rafRef = useRef();
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 });

  useEffect(() => {
    // Only run expensive spotlight tracking on desktop
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY };
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    const render = () => {
      if (smooth.current.x !== -999) {
        smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1;
        smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1;
        setCursorPos({ x: smooth.current.x, y: smooth.current.y });
      }
      rafRef.current = requestAnimationFrame(render);
    };
    
    rafRef.current = requestAnimationFrame(render);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const reviews = [
    { text: "A breathtaking experience. The spices tell a story that goes back centuries.", name: "Rahul S.", date: "August 2026" },
    { text: "Easily the most stunning dining environment in Nadia.", name: "Priya M.", date: "July 2026" },
    { text: "Every plate is a masterpiece of aggressive flavors.", name: "Amit B.", date: "July 2026" }
  ];

  return (
    <PageTransition>
      {/* 
        Removed all snap-y classes and hidden overflow so mobile scrolls beautifully. 
        No data-lenis-prevent needed anymore because there's no internal scroll box. 
      */}
      <div className="w-full bg-black font-sans relative">
        
        {/* HERO SECTION */}
        <section className="relative w-full h-[100dvh] flex flex-col justify-center items-center bg-black overflow-hidden">
          
          {/* Base Image */}
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom brightness-[0.6] md:brightness-90"
            style={{ backgroundImage: 'url(/assets/interior_1.jpg)' }}
          />

          {/* Reveal Layer (Hidden on mobile for performance and clarity) */}
          <RevealLayer 
            image="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1280" 
            cursorX={cursorPos.x} 
            cursorY={cursorPos.y} 
          />

          {/* Gradient overlay to ensure text pops on mobile */}
          <div className="absolute inset-0 z-40 bg-gradient-to-t from-black via-black/40 to-black/60 md:bg-gradient-to-b md:from-black/60 md:via-transparent md:to-black/80 pointer-events-none"></div>

          {/* Heading */}
          <div className="relative z-50 flex flex-col items-center text-center px-4 mt-16 md:mt-0">
            <h1 className="text-white flex flex-col items-center">
              <motion.span 
                initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
                animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
                transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
                className="block font-script text-7xl md:text-9xl text-gold-500 drop-shadow-2xl mb-4"
              >
                Dolphin
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, letterSpacing: '0em', y: 20 }}
                animate={{ opacity: 1, letterSpacing: '0.2em', y: 0 }}
                transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
                className="block font-sans font-black text-4xl md:text-6xl uppercase drop-shadow-2xl text-white"
              >
                Hotel
              </motion.span>
            </h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2.5 }}
              className="md:hidden text-white/80 font-sans text-sm mt-8 max-w-[280px] leading-relaxed text-center"
            >
              Culinary excellence blending traditional Indian heritage with deep coastal flavors.
            </p>

            <Link 
              to="/menu"
              className="mt-8 md:mt-12 bg-gold-500 hover:bg-white text-black text-xs md:text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full transition-all hover:scale-[1.03] active:scale-95 shadow-[0_0_20px_rgba(207,164,90,0.3)] hero-anim hero-fade"
              style={{ animationDelay: '3s' }}
            >
              Discover Menu
            </Link>
          </div>

          {/* Desktop-only corner text */}
          <div className="hidden md:block absolute bottom-24 left-16 max-w-[320px] z-50 hero-anim hero-fade" style={{ animationDelay: '3.2s' }}>
            <p className="text-sm text-white/90 leading-relaxed font-sans uppercase tracking-widest border-l border-gold-500 pl-6 drop-shadow-md">
              Every ingredient is carefully sourced, blending traditional Indian heritage with classical culinary techniques.
            </p>
          </div>
          <div className="hidden md:flex absolute bottom-24 right-16 max-w-[340px] flex-col items-start gap-6 z-50 hero-anim hero-fade" style={{ animationDelay: '3.4s' }}>
            <p className="text-sm text-white/90 leading-relaxed font-sans drop-shadow-md">
              Our interactive menus let you peel back the layers of flavor to trace how spices, history, and deep time combine to shape every dish we serve.
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce text-gold-500 opacity-70 hidden md:block">
            <ChevronDown size={32} strokeWidth={1} />
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="relative w-full bg-[#0a0a0a] py-20 md:py-32 px-5 md:px-16 flex justify-center overflow-hidden">
          <div className="max-w-6xl w-full flex flex-col md:grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image comes first on mobile */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="order-1 md:order-2 relative aspect-[4/5] md:aspect-square w-full max-w-[320px] md:max-w-none mx-auto rounded-t-full overflow-hidden border border-gold-500/20"
            >
              <img 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=600" 
                alt="Chef preparing food" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 flex flex-col justify-center text-center md:text-left"
            >
              <span className="text-gold-500 font-sans tracking-[0.3em] uppercase text-[10px] md:text-xs font-bold mb-4">Our Legacy</span>
              <h2 className="text-3xl md:text-6xl font-display font-light text-white leading-[1.2] mb-6 md:mb-10">
                Culinary excellence <br className="hidden md:block"/> <span className="text-gold-500 italic font-normal">is not polite.</span>
              </h2>
              <p className="text-sm md:text-lg text-white/60 font-sans font-light leading-relaxed max-w-sm md:max-w-md mx-auto md:mx-0">
                It is a bold statement of flavor, history, and aggression. We don't just serve food; we serve centuries of perfected coastal and traditional Indian recipes, crafted to leave an unforgettable mark on your palate.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SIGNATURES SECTION */}
        <section className="relative w-full bg-black py-20 md:py-32 px-5 md:px-16 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-20"
          >
            <h2 className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-gold-500 uppercase mb-3">Curated Perfection</h2>
            <h3 className="text-3xl md:text-5xl font-display text-white uppercase">Signature Dishes</h3>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto w-full">
            {signatureDishes.map((dish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group flex flex-col gap-5"
              >
                <div className="aspect-[4/3] sm:aspect-[4/5] overflow-hidden rounded-t-[40px] md:rounded-t-full border border-gold-500/20 relative">
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={dish.img} 
                    alt={dish.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="text-center px-2">
                  <h4 className="font-display text-lg md:text-xl text-gold-500 uppercase mb-2">{dish.title}</h4>
                  <p className="text-[11px] md:text-xs font-light tracking-widest uppercase text-white/50 leading-relaxed">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="relative w-full bg-[#0a0a0a] py-20 md:py-32 px-0 overflow-hidden flex flex-col items-center">
          <h2 className="text-[10px] md:text-xs font-sans font-bold tracking-[0.3em] text-gold-500 uppercase mb-12 md:mb-16">The Verdict</h2>
          
          <div className="flex gap-4 md:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar w-full px-5 md:px-12">
            {reviews.map((review, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="min-w-[85vw] sm:min-w-[400px] md:min-w-[450px] border border-gold-500/20 p-8 md:p-14 bg-black/50 backdrop-blur-sm snap-center flex flex-col justify-between"
              >
                <div className="flex gap-1 text-gold-500 mb-6 md:mb-8 justify-center">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={16} fill="currentColor" />)}
                </div>
                <p className="font-display italic text-xl md:text-3xl text-white leading-relaxed text-center mb-8 md:mb-10">
                  "{review.text}"
                </p>
                <div className="text-center border-t border-gold-500/20 pt-6">
                  <p className="font-sans font-bold text-[11px] md:text-sm tracking-widest text-gold-500 uppercase mb-1">{review.name}</p>
                  <p className="text-[10px] md:text-xs uppercase tracking-widest text-white/40">{review.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
