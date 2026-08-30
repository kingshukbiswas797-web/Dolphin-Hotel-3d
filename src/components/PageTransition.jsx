import { motion } from 'framer-motion';

const pageVariants = {
  initial: {
    opacity: 0,
    rotateY: -90,
    z: -500,
  },
  in: {
    opacity: 1,
    rotateY: 0,
    z: 0,
  },
  out: {
    opacity: 0,
    rotateY: 90,
    z: -500,
  },
};

const pageTransition = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
  mass: 1,
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className={`min-h-[calc(100vh-80px)] w-full ${className}`}
      style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
    >
      {children}
    </motion.div>
  );
}
