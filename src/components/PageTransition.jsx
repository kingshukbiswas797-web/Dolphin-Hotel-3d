import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children, className = "" }) {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ x: '100vw', opacity: 1 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '-100vw', opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className={`w-full min-h-screen ${className}`}
    >
      {children}
    </motion.div>
  );
}
