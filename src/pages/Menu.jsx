import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { menuData } from '../data/menuData';

function MenuCard({ item }) {
  const cardRef = useRef(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Rotate relative to center
    const rx = ((y - centerY) / centerY) * -10;
    const ry = ((x - centerX) / centerX) * 10;
    
    setRotateX(rx);
    setRotateY(ry);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ perspective: 1000 }}
      className="p-4 border-2 border-gold-500 bg-black/80 hover:bg-gold-500 hover:text-black transition-colors cursor-default group"
    >
      <div className="flex justify-between items-end">
        <h3 className="text-lg font-display font-black uppercase tracking-widest text-white group-hover:text-black transition-colors">{item.name}</h3>
        <div className="flex-1 mx-4 border-b-2 border-dotted border-gold-500/50 group-hover:border-black/50 relative top-[-6px]"></div>
        <span className="text-gold-400 group-hover:text-black font-black text-xl">₹{item.price}</span>
      </div>
    </motion.div>
  );
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState(menuData[0].category);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCategories = menuData.map(cat => ({
    ...cat,
    items: cat.items.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  const displayCategory = filteredCategories.find(c => c.category === activeCategory) || filteredCategories[0];

  return (
    <PageTransition className="w-full relative min-h-screen">
      
      {/* Brutalist Menu Title */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="pt-32 pb-12 text-center relative z-10 border-b-8 border-gold-500 bg-black/90"
      >
        <h1 className="text-[12vw] leading-[0.8] font-display font-black text-gold-500 text-glow-gold select-none uppercase">
          THE MENU
        </h1>
      </motion.div>

      <div className="flex flex-col md:flex-row relative z-20 w-full">
        {/* Sidebar */}
        <div className="md:w-1/3 lg:w-1/4 flex flex-col shrink-0 bg-black/95 p-8 border-r-8 border-gold-500 min-h-screen">
          <input 
            type="text" 
            placeholder="Search menu..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-8 p-4 bg-transparent border-4 border-gold-500 text-white font-sans uppercase tracking-widest focus:outline-none focus:bg-gold-500 focus:text-black transition-colors placeholder:text-gold-500/50 focus:placeholder:text-black/50"
          />
          <div className="flex flex-col gap-4">
            {filteredCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`text-left px-6 py-4 transition-all duration-300 font-display font-black uppercase text-xl md:text-2xl border-4 ${
                  activeCategory === cat.category 
                    ? 'bg-gold-500 text-black border-gold-500' 
                    : 'text-gray-400 border-transparent hover:border-gold-500 hover:text-white'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 bg-background/80 backdrop-blur-xl p-8 md:p-16 border-t-8 md:border-t-0 border-gold-500" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait">
            {displayCategory && (
              <motion.div
                key={displayCategory.category}
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                  },
                  exit: {
                    opacity: 0,
                    transition: { staggerChildren: 0.04, staggerDirection: -1 }
                  }
                }}
              >
                <motion.h2 
                  variants={{
                    hidden: { opacity: 0, x: -50, filter: "blur(10px)" },
                    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
                    exit: { opacity: 0, x: 50, filter: "blur(10px)" }
                  }}
                  className="text-5xl md:text-7xl font-display font-black text-transparent mb-12 uppercase"
                  style={{ WebkitTextStroke: '2px #cfa45a' }}
                >
                  {displayCategory.category}
                </motion.h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {displayCategory.items.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, scale: 0.92, y: 16 },
                        visible: { 
                          opacity: 1, 
                          scale: 1, 
                          y: 0, 
                          transition: { type: "spring", stiffness: 300, damping: 20 }
                        },
                        exit: { 
                          opacity: 0, 
                          scale: 0.92, 
                          y: -16, 
                          transition: { duration: 0.2 }
                        }
                      }}
                    >
                      <MenuCard item={item} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
}
