import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header 
      className={clsx(
        "fixed top-0 w-full z-40 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md py-4 shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-gold-500/20" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <Link to="/" className="z-50 block">
          <motion.div layoutId="brand-logo-container">
            <motion.h1 
              layoutId="brand-logo-text"
              className="text-xl md:text-2xl font-display font-bold text-gold-500 text-glow-gold tracking-widest whitespace-nowrap"
            >
              DOLPHIN HOTEL
            </motion.h1>
          </motion.div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative text-sm uppercase tracking-wider font-medium text-gray-300 hover:text-white transition-colors group"
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div
                  layoutId="underline"
                  className="absolute -bottom-2 left-0 w-full h-[2px] bg-gold-400 shadow-[0_0_8px_rgba(242,201,76,0.8)]"
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gold-400 z-50 relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-backgroundAlt z-40 flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "text-2xl font-display uppercase tracking-widest",
                    location.pathname === link.path ? "text-gold-400 text-glow-gold" : "text-gray-300"
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
