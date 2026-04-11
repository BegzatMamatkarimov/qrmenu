import { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuCard } from './components/MenuCard';
import { Bell, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MENU_DATA = {
  salads: {
    label: 'Салаты',
    items: [
      { name: 'Ачучук', price: 1300, description: 'Свежий овощной салат', ingredients: 'Помидоры, лук, зелень', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Свежий салат', price: 1300, description: 'Классический свежий салат', ingredients: 'Огурцы, помидоры, зелень', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Цезарь', price: 1800, description: 'Сытный салат с курицей', ingredients: 'Пекинская капуста, куриное филе, корнишоны, сыр, помидоры, майонез, яйцо', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Свежий салат с соевым соусом', price: 1800, description: 'Овощной салат с насыщенным вкусом', ingredients: 'Огурцы, помидоры, мясо, соленые огурцы, болгарский перец, морковь, соевый соус, лук', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Мужской каприз', price: 1800, description: 'Плотный мясной салат', ingredients: 'Картофель, морковь, соленые огурцы, колбаса, сыр, кукуруза, курица, майонез', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Хрустящий баклажан', price: 1800, description: 'Баклажан с ярким соусом', ingredients: 'Баклажан, помидоры, соус райди, фунчоза', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ]
  },
  main: {
    label: 'Горячие блюда',
    items: [
      { name: 'Сорпа', price: 1000, description: 'Наваристый суп', ingredients: 'Бульон, мясо, овощи', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Пельмени', price: 1100, description: 'Домашние пельмени', ingredients: 'Тесто, мясная начинка, специи', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Плов', price: 0, description: 'На заказ от 6 порций', ingredients: 'На заказ', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Казан-кебаб', price: 0, description: 'На заказ от 6 порций', ingredients: 'На заказ', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Бешбармак', price: 0, description: 'На заказ от 6 порций', ingredients: 'На заказ', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ]
  },
  fish: {
    label: 'Рыба',
    items: [
      { name: 'Форель (сырая)', price: 4000, weight: 'кг', description: 'Свежая форель', ingredients: 'Форель', image: 'https://images.unsplash.com/photo-1761950190821-970680100a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Форель (жареная)', price: 6000, weight: 'кг', description: 'Жареная форель', ingredients: 'Форель', image: 'https://images.unsplash.com/photo-1761950190821-970680100a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Форель (стейк)', price: 6000, weight: 'кг', description: 'Форель в формате стейка', ingredients: 'Форель', image: 'https://images.unsplash.com/photo-1761950190821-970680100a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Форель (шашлык)', price: 6000, weight: 'кг', description: 'Форель на шампуре', ingredients: 'Форель', image: 'https://images.unsplash.com/photo-1761950190821-970680100a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Сазан (жареный)', price: 6000, weight: 'кг', description: 'Жареный сазан', ingredients: 'Сазан', image: 'https://images.unsplash.com/photo-1761950190821-970680100a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ]
  },
  shashlyk: {
    label: 'Шашлыки',
    items: [
      { name: 'Кусковой', price: 780, description: 'Мясо кусочками на углях', ingredients: 'Мясо, маринад, специи', image: 'https://images.unsplash.com/photo-1583665354191-634609954d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Фарш (люля)', price: 720, description: 'Сочный люля-кебаб', ingredients: 'Фарш, лук, специи', image: 'https://images.unsplash.com/photo-1583665354191-634609954d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Утка', price: 700, description: 'Нежная утка, приготовленная на углях', ingredients: 'Утка, фирменный маринад, специи', image: 'https://images.unsplash.com/photo-1583665354191-634609954d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ]
  },
  steaks: {
    label: 'Стейки',
    items: [
      { name: 'T-bone стейк', price: 4500, weight: '500 г', description: 'Сочный стейк премиум-класса', ingredients: 'Говядина', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ]
  },
  snacks: {
    label: 'Снеки',
    items: [
      { name: 'Картофель фри', price: 700, weight: '200 г', description: 'Хрустящий картофель фри', ingredients: 'Картофель, соль, масло', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Крылышки и чипсы', price: 0, description: 'Цена уточняется', ingredients: 'Крылышки, чипсы', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Курт', price: 150, weight: '1 шт', description: 'Традиционная закуска', ingredients: 'Курт', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Чичель', price: 0, description: 'Цена уточняется', ingredients: 'Чичель', image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ]
  },
  hot_drinks: {
    label: 'Горячие напитки',
    items: [
      { name: 'Чёрный чай', price: 350, weight: 'чайник', description: 'Классический чёрный чай', ingredients: 'Чай', image: 'https://images.unsplash.com/photo-1600271701041-340850ff3bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Зелёный чай', price: 350, weight: 'чайник', description: 'Классический зелёный чай', ingredients: 'Чай', image: 'https://images.unsplash.com/photo-1600271701041-340850ff3bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Ташкентский чай', price: 700, weight: 'чайник', description: 'Ароматный ташкентский чай', ingredients: 'Чай, лимон, мята', image: 'https://images.unsplash.com/photo-1600271701041-340850ff3bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Ташкентский чай (большой чайник)', price: 1200, description: 'Большой чайник ташкентского чая', ingredients: 'Чай, лимон, мята', image: 'https://images.unsplash.com/photo-1600271701041-340850ff3bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ]
  },
  drinks: {
    label: 'Напитки',
    items: [
      { name: 'Coca-Cola', price: 800, weight: '1 л', description: 'Газированный напиток', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Pepsi', price: 800, weight: '1 л', description: 'Газированный напиток', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Maxi чай', price: 800, weight: '1.2 л', description: 'Холодный чай', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Fish чай', price: 600, weight: '1 л', description: 'Фирменный чай', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Chortoq', price: 700, description: 'Минеральная вода', ingredients: 'Вода', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Borjomi', price: 800, description: 'Минеральная вода', ingredients: 'Вода', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Piko (Tetra Pak)', price: 800, description: 'Сок в упаковке', ingredients: 'Фруктовый сок', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Сарыагаш', price: 400, weight: '1.5 л', description: 'Минеральная вода', ingredients: 'Вода', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
      { name: 'Вода без газа', price: 250, weight: '0.5 л', description: 'Питьевая вода', ingredients: 'Вода', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ]
  },
  homemade_drinks: {
    label: 'Домашние напитки',
    items: [
      { name: 'Мохито', price: 2000, description: 'Освежающий домашний напиток', ingredients: 'Лайм, мята, лед, сироп', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080' },
    ]
  }
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState('salads');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  type MenuCategory = { label: string; items: Array<{ name: string; price: number; weight?: string; description: string; ingredients: string; image: string }> };
  const filteredMenu = Object.entries(MENU_DATA).reduce<Record<string, MenuCategory>>((acc, [id, data]) => {
    const filteredItems = data.items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.ingredients.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filteredItems.length > 0) {
      acc[id] = { ...data, items: filteredItems };
    }
    return acc;
  }, {});

  const visibleCategories = Object.entries(filteredMenu).map(([id, data]) => ({
    id,
    label: data.label
  }));

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
      const scrollPos = window.scrollY + 250;
      const current = Object.keys(filteredMenu).find(id => {
        const ref = categoryRefs.current[id];
        if (ref) {
          const top = ref.offsetTop;
          const bottom = top + ref.offsetHeight;
          return scrollPos >= top && scrollPos < bottom;
        }
        return false;
      });
      if (current) setActiveCategory(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [filteredMenu]);

  const scrollToCategory = (id: string) => {
    const ref = categoryRefs.current[id];
    if (ref) {
      const top = ref.offsetTop - 100;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#334155] font-sans text-white">
      <div className="fixed inset-0 pointer-events-none opacity-[0.06] z-0 overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,40 50,50 T100,50 V100 H0 Z" fill="#fff" />
          <path d="M0,60 Q25,50 50,60 T100,60 V100 H0 Z" fill="#fff" />
          <path d="M0,70 Q25,60 50,70 T100,70 V100 H0 Z" fill="#fff" />
        </svg>
      </div>

      <Hero searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {visibleCategories.length > 0 && (
        <Navbar
          categories={visibleCategories}
          activeCategory={activeCategory}
          onCategoryChange={scrollToCategory}
        />
      )}

      <main className="relative z-10 px-4 pt-12 pb-32 max-w-lg mx-auto">
        <AnimatePresence mode="popLayout">
          {Object.entries(filteredMenu).length > 0 ? (
            Object.entries(filteredMenu).map(([id, data]) => (
              <motion.section
                key={id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                ref={el => (categoryRefs.current[id] = el)}
                className="mb-12"
              >
                <div className="flex items-center gap-4 mb-6">
                  <h2 className="font-serif text-2xl font-black text-white shrink-0">
                    {data.label}
                  </h2>
                  <div className="h-[1px] bg-white/30 w-full" />
                </div>
                <div className="grid gap-4">
                  {data.items.map((item) => (
                    <MenuCard key={`${id}-${item.name}`} {...item} />
                  ))}
                </div>
              </motion.section>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <p className="font-serif text-xl italic text-white/80">Ничего не найдено...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="relative z-10 py-16 text-center bg-black/10 border-t border-white/20">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
          <Bell className="text-[#475569] w-6 h-6" />
        </div>
        <p className="font-serif text-white font-bold text-2xl italic mb-1">Fish Resort Karnak</p>
        <p className="text-white/70 text-[10px] uppercase tracking-[0.2em]">Luxury Nature Experience</p>
      </footer>

      <div className="fixed bottom-6 right-6 flex flex-col items-end gap-4 z-[60]">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-12 h-12 bg-white text-[#475569] rounded-full shadow-2xl flex items-center justify-center border-2 border-white"
            >
              <ChevronUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
