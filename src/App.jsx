import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Lenis from 'lenis';
import { PhoneCall } from 'lucide-react';
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

          {/* Floating Call Button */}
          <a 
            href="tel:+917797188188"
            className="fixed bottom-6 right-6 z-[200] bg-gold-500 hover:bg-white text-black p-4 rounded-full shadow-[0_0_20px_rgba(207,164,90,0.5)] transition-all hover:scale-110 active:scale-95 group flex items-center gap-3 overflow-hidden"
          >
            <PhoneCall size={24} className="group-hover:animate-bounce" />
            <span className="hidden md:block font-bold tracking-widest uppercase text-sm pr-2">Call Now</span>
          </a>
        </LayoutGroup>
      </div>
    </Router>
  );
}

export default App;
