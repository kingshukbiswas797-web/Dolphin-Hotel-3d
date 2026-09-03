import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Lenis from 'lenis';
import { PhoneCall, Menu as MenuIcon, MessageCircle, MapPin } from 'lucide-react';
import Navbar from './components/Navbar';
import CurtainSplash from './components/CurtainSplash';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen text-white overflow-x-hidden bg-black">
        <LayoutGroup>
          {showSplash && <CurtainSplash onComplete={() => setShowSplash(false)} />}
          
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 flex flex-col">
              <AnimatedRoutes />
            </main>
          </div>

          {/* Desktop Floating Call Button */}
          <a 
            href="tel:+917797188188"
            className="hidden md:flex fixed bottom-6 right-6 z-[200] bg-gold-500 hover:bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(207,164,90,0.5)] transition-all hover:scale-110 active:scale-95 group items-center gap-3 overflow-hidden"
          >
            <PhoneCall size={24} className="group-hover:animate-bounce" />
            <span className="font-bold tracking-widest uppercase text-sm pr-2">Call Now</span>
          </a>

          {/* Mobile Bottom Navigation Bar (Stolen from friend's site!) */}
          <div className="md:hidden fixed bottom-0 w-full z-[150] bg-black/95 backdrop-blur-lg border-t border-gold-500/30 pb-safe pb-2 pt-2">
            <div className="flex items-center justify-around h-14 px-2">
              <a href="/menu" className="flex flex-col items-center justify-center w-full h-full text-[10px] uppercase tracking-wider text-white/70 hover:text-gold-500 transition-colors">
                <MenuIcon size={20} className="mb-1" />
                Menu
              </a>
              <div className="w-px h-8 bg-gold-500/30"></div>
              <a href="tel:+917797188188" className="flex flex-col items-center justify-center w-full h-full text-[10px] uppercase tracking-wider text-gold-500 transition-colors relative">
                <PhoneCall size={20} className="mb-1 animate-pulse" />
                Call
              </a>
              <div className="w-px h-8 bg-gold-500/30"></div>
              <a href="https://wa.me/917797188188" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center w-full h-full text-[10px] uppercase tracking-wider text-white/70 hover:text-green-500 transition-colors">
                <MessageCircle size={20} className="mb-1" />
                WA
              </a>
              <div className="w-px h-8 bg-gold-500/30"></div>
              <a href="https://maps.google.com/?q=Dolphin+Hotel+Nadia" target="_blank" rel="noreferrer" className="flex flex-col items-center justify-center w-full h-full text-[10px] uppercase tracking-wider text-white/70 hover:text-gold-500 transition-colors">
                <MapPin size={20} className="mb-1" />
                Find Us
              </a>
            </div>
          </div>
        </LayoutGroup>
      </div>
    </Router>
  );
}

export default App;
