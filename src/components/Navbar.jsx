import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 font-manrope ${
        isScrolled ? 'bg-[#FF0000]/95 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link to="/" className="relative z-50 flex items-center gap-3 group">
          <svg width="32" height="32" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover:rotate-90 transition-transform duration-500">
            <path fillRule="evenodd" clipRule="evenodd" d="M60 120C26.8629 120 0 93.1371 0 60V0C22.5654 0 42.2213 12.4569 52.4662 30.8691C38.4788 34.2089 28.0787 46.7902 28.0787 61.8006V63.1443C28.0787 79.9648 41.7146 93.6006 58.5353 93.6006H59.8789L59.8785 61.8006C59.8785 79.3633 74.1159 93.6006 91.6787 93.6006L91.6787 61.8006C91.6787 44.2783 77.5071 30.0661 60 30.0008L60 0H62.5352C94.2722 0 120 25.7279 120 57.4648V60C120 93.1371 93.1371 120 60 120Z" fill="white"/>
          </svg>
          <span className="text-white font-bold tracking-[0.2em] uppercase text-sm">S.P.D</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 items-center">
          {links.map((link) => (
            <Link 
              key={link.name}
              to={link.path} 
              className={`text-white text-sm uppercase tracking-widest transition-opacity hover:opacity-100 ${
                location.pathname === link.path ? 'opacity-100 font-bold border-b border-white pb-1' : 'opacity-60'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button className="px-6 py-2 bg-white text-[#FF0000] text-sm uppercase tracking-widest font-bold hover:bg-black hover:text-white transition-colors duration-300">
            Access System
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden relative z-50 text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-[#FF0000] flex flex-col items-center justify-center gap-8 z-40"
          >
            {links.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-white text-3xl font-italiana uppercase tracking-widest"
              >
                {link.name}
              </Link>
            ))}
            <button className="mt-8 px-12 py-4 border border-white text-white text-sm uppercase tracking-widest font-bold hover:bg-white hover:text-[#FF0000] transition-colors duration-300">
              Access System
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
