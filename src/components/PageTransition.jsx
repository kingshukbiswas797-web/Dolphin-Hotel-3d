import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

export default function PageTransition({ children }) {
  const location = useLocation();
  
  return (
    <motion.div
      key={location.pathname}
      initial={{ x: '20%', opacity: 0, filter: 'blur(10px)' }}
      animate={{ x: 0, opacity: 1, filter: 'blur(0px)' }}
      exit={{ x: '-20%', opacity: 0, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full min-h-screen"
    >
      {children}
    </motion.div>
  );
}
