import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import Lenis from 'lenis';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
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

  const [showSplash, setShowSplash] = useState(true); // Always show splash for testing

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <div className="relative min-h-screen text-white overflow-x-hidden">
        {/* Wildly Reacting Background Image */}
        <div 
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-75 ease-out"
          style={{ 
            backgroundImage: 'url(/assets/interior_1.jpg)',
            transform: `scale(1.2) translate(${mousePos.x * -80}px, ${mousePos.y * -80}px)`,
            filter: `hue-rotate(${mousePos.x * 90}deg) saturate(${1 + Math.abs(mousePos.y) * 2}) brightness(0.6)`
          }}
        ></div>
        
        {/* Dark overlay to ensure text readability */}
        <div className="fixed inset-0 z-0 bg-background/80 backdrop-blur-sm mix-blend-multiply"></div>

        <LayoutGroup>
          <div className="relative z-10 flex flex-col min-h-screen">
            {showSplash && <Splash onComplete={handleSplashComplete} />}
            
            {!showSplash && (
              <>
                <Navbar />
                <main className="pt-24 pb-12 flex-1">
                  <AnimatedRoutes />
                </main>
              </>
            )}
          </div>
        </LayoutGroup>
      </div>
    </Router>
  );
}

export default App;
