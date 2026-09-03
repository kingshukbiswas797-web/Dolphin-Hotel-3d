import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ display: 'none' }} />
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-30 pointer-events-none grayscale contrast-125"
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
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      mouse.current = { x: touch.clientX, y: touch.clientY };
      if (smooth.current.x === -999) {
        smooth.current = { x: touch.clientX, y: touch.clientY };
      }
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchMove, { passive: true });
    
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
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchMove);
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
      {/* Snap container for smooth section sliding */}
      <div className="w-full bg-black font-sans h-screen overflow-y-auto snap-y snap-mandatory hide-scrollbar relative">
        
        {/* HERO SECTION */}
        <section className="relative w-full overflow-hidden h-screen snap-start shrink-0 flex flex-col justify-center bg-black">
          
          {/* Base Image (z-10) - Brightness increased for clarity */}
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom brightness-90"
            style={{ backgroundImage: 'url(/assets/interior_1.jpg)' }}
          />

          {/* Reveal Layer (z-30) */}
          <RevealLayer 
            image="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1280" 
            cursorX={cursorPos.x} 
            cursorY={cursorPos.y} 
          />

          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 z-40 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none"></div>

          {/* Heading (z-50) */}
          <div className="absolute top-[25%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
            <h1 className="text-white leading-[0.95]">
              <span className="block font-display italic font-normal text-6xl sm:text-8xl md:text-[9vw] text-gold-500 tracking-[-0.02em] hero-anim hero-reveal drop-shadow-2xl" style={{ animationDelay: '0.25s' }}>
                Dolphin
              </span>
              <span className="block font-display font-black text-5xl sm:text-7xl md:text-[8vw] tracking-[0.1em] uppercase hero-anim hero-reveal -mt-2 drop-shadow-2xl text-white" style={{ animationDelay: '0.42s' }}>
                Hotel
              </span>
            </h1>
          </div>

          {/* Bottom-left paragraph */}
          <div className="hidden sm:block absolute bottom-24 left-10 md:left-20 max-w-[320px] z-50 hero-anim hero-fade" style={{ animationDelay: '0.7s' }}>
            <p className="text-sm text-white/90 leading-relaxed font-sans uppercase tracking-widest border-l border-gold-500 pl-6 drop-shadow-md">
              Every ingredient is carefully sourced, blending traditional Indian heritage with classical culinary techniques across generations.
            </p>
          </div>

          {/* Bottom-right block */}
          <div className="absolute bottom-16 sm:bottom-24 left-5 right-5 sm:left-auto sm:right-10 md:right-20 max-w-full sm:max-w-[340px] flex flex-col items-start gap-6 z-50 hero-anim hero-fade" style={{ animationDelay: '0.85s' }}>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans drop-shadow-md">
              Our interactive menus let you peel back the layers of flavor to trace how spices, history, and deep time combine to shape every dish we serve.
            </p>
            <Link 
              to="/menu"
              className="bg-gold-500 hover:bg-white text-black text-xs md:text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-full transition-all hover:scale-[1.03] active:scale-95 shadow-[0_0_20px_rgba(207,164,90,0.3)] pointer-events-auto"
            >
              Discover Menu
            </Link>
          </div>

          {/* Scroll down indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 animate-bounce text-gold-500 opacity-70">
            <ChevronDown size={32} strokeWidth={1} />
          </div>
        </section>

        {/* ELEGANT PHILOSOPHY SECTION */}
        <section className="relative w-full h-screen snap-start shrink-0 bg-[#0a0a0a] flex items-center justify-center p-8 md:p-24 overflow-hidden">
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ margin: "-20%" }}
              className="flex flex-col justify-center"
            >
              <span className="text-gold-500 font-sans tracking-[0.3em] uppercase text-xs font-bold mb-4">Our Legacy</span>
              <h2 className="text-4xl md:text-6xl font-display font-light text-white uppercase leading-[1.1] mb-10">
                Culinary excellence <br/> <span className="text-gold-500 italic font-normal">is not polite.</span>
              </h2>
              <p className="text-lg text-white/60 font-sans font-light leading-relaxed max-w-md">
                It is a bold statement of flavor, history, and aggression. We don't just serve food; we serve centuries of perfected coastal and traditional Indian recipes, crafted to leave an unforgettable mark on your palate.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              viewport={{ margin: "-20%" }}
              className="relative aspect-[3/4] md:aspect-square w-full rounded-t-full overflow-hidden border border-gold-500/20"
            >
              <img 
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" 
                alt="Chef preparing food" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </motion.div>
          </div>
        </section>

        {/* ELEGANT SIGNATURES SECTION */}
        <section className="relative w-full min-h-screen snap-start shrink-0 bg-black py-24 px-6 md:px-16 flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-20%" }}
            className="text-center mb-16"
          >
            <h2 className="text-sm font-sans font-bold tracking-[0.3em] text-gold-500 uppercase mb-4">Curated Perfection</h2>
            <h3 className="text-4xl md:text-5xl font-display text-white uppercase">Signature Dishes</h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto w-full">
            {signatureDishes.map((dish, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ margin: "-10%" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="group cursor-pointer flex flex-col gap-6"
              >
                <div className="aspect-[4/5] overflow-hidden rounded-t-full border border-gold-500/20 relative">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img 
                    src={dish.img} 
                    alt={dish.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="text-center px-4">
                  <h4 className="font-display text-xl text-gold-500 uppercase mb-3">{dish.title}</h4>
                  <p className="text-xs font-light tracking-widest uppercase text-white/50 leading-relaxed">{dish.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="relative w-full h-screen snap-start shrink-0 bg-[#0a0a0a] flex flex-col justify-center items-center py-20 px-6 overflow-hidden">
          <h2 className="text-sm font-sans font-bold tracking-[0.3em] text-gold-500 uppercase mb-16">The Verdict</h2>
          
          <div className="flex gap-8 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar w-full max-w-7xl px-4 md:px-12">
            {reviews.map((review, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ margin: "-20%" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="min-w-[85vw] md:min-w-[450px] border border-gold-500/20 p-10 md:p-14 bg-black/50 backdrop-blur-sm snap-center flex flex-col justify-between"
              >
                <div className="flex gap-1 text-gold-500 mb-8 justify-center">
                  {[1, 2, 3, 4, 5].map(star => <Star key={star} size={18} fill="currentColor" />)}
                </div>
                <p className="font-display italic text-2xl md:text-3xl text-white leading-relaxed text-center mb-10">
                  "{review.text}"
                </p>
                <div className="text-center border-t border-gold-500/20 pt-6">
                  <p className="font-sans font-bold text-sm tracking-widest text-gold-500 uppercase mb-1">{review.name}</p>
                  <p className="text-xs uppercase tracking-widest text-white/40">{review.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
}
