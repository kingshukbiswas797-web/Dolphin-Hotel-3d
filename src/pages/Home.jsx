import { useEffect, useRef, useState } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
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
    title: "Mutton Handi",
    desc: "Eight pieces of uncompromising, slow-cooked indulgence.",
    img: "https://images.unsplash.com/photo-1544025162-84a14f494871?auto=format&fit=crop&q=80&w=600"
  },
  {
    title: "Prawn Malai Curry",
    desc: "A brutalist take on coastal richness. Massive flavors, zero apologies.",
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
    
    // Set internal resolution to match display size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Draw frame
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // If cursor hasn't moved yet, don't draw anything (or draw offscreen)
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
  const { scrollYProgress } = useScroll();
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
      <div className="w-full bg-black font-sans">
        
        {/* NEW MECHANIC HERO SECTION */}
        <section className="relative w-full overflow-hidden h-screen bg-black" style={{ height: '100dvh' }}>
          
          {/* Base Image (z-10) */}
          <div 
            className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom brightness-50"
            style={{ backgroundImage: 'url(/assets/interior_1.jpg)' }}
          />

          {/* Reveal Layer (z-30) */}
          <RevealLayer 
            image="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1280" 
            cursorX={cursorPos.x} 
            cursorY={cursorPos.y} 
          />

          {/* Dark overlay specifically for text readability if needed */}
          <div className="absolute inset-0 z-40 bg-black/20 pointer-events-none"></div>

          {/* Heading (z-50) */}
          <div className="absolute top-[20%] left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-50">
            <h1 className="text-white leading-[0.95]">
              <span className="block font-display italic font-normal text-6xl sm:text-8xl md:text-[9vw] text-gold-500 tracking-[-0.02em] hero-anim hero-reveal" style={{ animationDelay: '0.25s' }}>
                Dolphin
              </span>
              <span className="block font-display font-black text-5xl sm:text-7xl md:text-[8vw] tracking-[0.1em] uppercase hero-anim hero-reveal -mt-2" style={{ animationDelay: '0.42s' }}>
                Hotel
              </span>
            </h1>
          </div>

          {/* Bottom-left paragraph */}
          <div className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[280px] z-50 hero-anim hero-fade" style={{ animationDelay: '0.7s' }}>
            <p className="text-sm text-white/90 leading-relaxed font-sans uppercase tracking-widest border-l-2 border-gold-500 pl-4">
              Every ingredient is carefully sourced, blending traditional Indian heritage with classical culinary techniques across generations.
            </p>
          </div>

          {/* Bottom-right block */}
          <div className="absolute bottom-10 sm:bottom-14 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[300px] flex flex-col items-start gap-4 sm:gap-6 z-50 hero-anim hero-fade" style={{ animationDelay: '0.85s' }}>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-sans">
              Our interactive menus let you peel back the layers of flavor to trace how spices, history, and deep time combine to shape every dish we serve.
            </p>
            <Link 
              to="/menu"
              className="bg-gold-500 hover:bg-white text-black text-sm font-bold tracking-widest uppercase px-8 py-4 rounded-none transition-all hover:scale-[1.03] active:scale-95 shadow-[0_0_20px_rgba(207,164,90,0.3)] pointer-events-auto border-2 border-black"
            >
              Discover Menu
            </Link>
          </div>
        </section>

        {/* Brutalist Grid Section (Rest of page remains intact below the fold) */}
        <div className="w-full bg-black border-t-8 border-gold-500 relative z-20">
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
                <div key={i} className="min-w-[85vw] md:min-w-[400px] border-4 border-black p-8 bg-black text-gold-500 snap-center">
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
