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
      className="p-4 border border-gold-500/20 bg-backgroundAlt/50 rounded-lg hover:border-glow transition-colors cursor-default"
    >
      <div className="flex justify-between items-end">
        <h3 className="text-lg font-display text-gray-200">{item.name}</h3>
        <div className="flex-1 mx-4 border-b border-dotted border-gold-500/30 relative top-[-6px]"></div>
        <span className="text-gold-400 font-medium">₹{item.price}</span>
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
    <PageTransition className="max-w-7xl mx-auto px-4 py-12 relative min-h-screen">
      
      {/* Brutalist Menu Title */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20 text-center relative z-10"
      >
        <h1 className="text-[15vw] leading-[0.8] font-display font-black text-gold-500 mix-blend-screen opacity-90 text-glow-gold select-none">
          THE MENU
        </h1>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 relative z-20">
        {/* Sidebar */}
        <div className="md:w-1/4 flex flex-col gap-2 shrink-0 bg-backgroundAlt/40 backdrop-blur-md p-6 rounded-xl border border-gold-500/20 shadow-xl h-fit sticky top-32">
          <input 
            type="text" 
            placeholder="Search menu..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-6 p-3 bg-background/60 border border-gold-500/30 rounded text-white focus:outline-none focus:border-gold-500 transition-colors"
          />
          <div className="flex overflow-x-auto md:flex-col gap-2 pb-4 md:pb-0 scrollbar-hide">
            {filteredCategories.map((cat) => (
              <button
                key={cat.category}
                onClick={() => setActiveCategory(cat.category)}
                className={`text-left px-4 py-3 whitespace-nowrap transition-all duration-300 rounded ${
                  activeCategory === cat.category 
                    ? 'bg-gold-500/20 text-gold-400 border-l-4 border-gold-400 font-medium' 
                    : 'text-gray-300 hover:text-white hover:bg-background/40'
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="flex-1 min-h-[500px] bg-backgroundAlt/40 backdrop-blur-md p-8 rounded-xl border border-gold-500/20 shadow-xl overflow-hidden" style={{ perspective: 1200 }}>
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
                  className="text-3xl font-display text-gold-400 mb-8 border-b border-gold-500/30 pb-4 text-glow-gold"
                >
                  {displayCategory.category}
                </motion.h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {displayCategory.items.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={{
                        hidden: { opacity: 0, rotateX: -90, y: 50, z: -200 },
                        visible: { 
                          opacity: 1, 
                          rotateX: 0, 
                          y: 0, 
                          z: 0,
                          transition: { type: "spring", stiffness: 200, damping: 15 }
                        },
                        exit: { 
                          opacity: 0, 
                          rotateX: 90, 
                          y: -50, 
                          z: 100,
                          transition: { duration: 0.2 }
                        }
                      }}
                      style={{ transformOrigin: "top center" }}
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
