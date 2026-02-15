import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface NavbarProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
}

export function Navbar({ categories, activeCategory, onCategoryChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`sticky top-0 z-50 mt-8 transition-all duration-300 ${
        isScrolled ? 'bg-[#334155]/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="overflow-x-auto no-scrollbar flex gap-4 px-4 items-center justify-center">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-300 relative ${
              activeCategory === cat.id ? 'text-[#475569]' : 'text-white bg-white/20 backdrop-blur-sm hover:bg-white/30'
            }`}
          >
            {activeCategory === cat.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-white rounded-full -z-10 shadow"
                transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
              />
            )}
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
}
