import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5">
      {/* Left */}
      <Link to="/" className="flex items-center gap-2">
        <svg width="26" height="26" viewBox="0 0 256 256" fill="#cfa45a" xmlns="http://www.w3.org/2000/svg">
          <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
        </svg>
        <span className="text-gold-500 text-2xl font-display italic tracking-widest font-bold">Dolphin</span>
      </Link>

      {/* Center pill */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-black/40 backdrop-blur-md border border-gold-500/30 rounded-none px-2 py-2 items-center gap-1 shadow-lg">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`px-4 py-1.5 rounded-none text-sm font-bold uppercase tracking-widest transition-colors ${
              location.pathname === link.path 
                ? 'bg-gold-500 text-black' 
                : 'text-gold-500/80 hover:bg-gold-500/20 hover:text-gold-500'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right */}
      <Link 
        to="/contact"
        className="hidden md:block bg-gold-500 text-black text-sm font-bold uppercase tracking-widest px-6 py-2.5 rounded-none hover:bg-white hover:text-black transition-colors"
      >
        Book Table
      </Link>

      {/* Mobile Toggle */}
      <button 
        className="md:hidden text-gold-500 z-50 relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-black flex flex-col items-center justify-center gap-8 z-40 border-b-8 border-gold-500"
          >
            {links.map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="text-gold-500 text-3xl font-display uppercase tracking-widest font-bold hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
