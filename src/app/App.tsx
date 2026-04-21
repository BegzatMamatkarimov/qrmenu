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
      { name: 'Ачучук', price: 1300, description: 'Свежий овощной салат', ingredients: 'Помидоры, лук, зелень', image: 'Ачучук.jpg' },
      { name: 'Свежий салат', price: 1300, description: 'Классический свежий салат', ingredients: 'Огурцы, помидоры, зелень', image: 'qweqwe.jpg' },
      { name: 'Цезарь', price: 1800, description: 'Сытный салат с курицей', ingredients: 'Пекинская капуста, куриное филе, корнишоны, сыр, помидоры, майонез, яйцо', image: 'Цезарь.jpg' },
      { name: 'Свежий салат с соевым соусом', price: 1800, description: 'Овощной салат с насыщенным вкусом', ingredients: 'Огурцы, помидоры, мясо, соленые огурцы, болгарский перец, морковь, соевый соус, лук', image: 'sddefault.jpg' },
      { name: 'Мужской каприз', price: 1800, description: 'Плотный мясной салат', ingredients: 'Картофель, морковь, соленые огурцы, колбаса, сыр, кукуруза, курица, майонез', image: 'salat_mujskoi_kapriz.JPG' },
      { name: 'Хрустящий баклажан', price: 1800, description: 'Баклажан с ярким соусом', ingredients: 'Баклажан, помидоры, соус райди, фунчоза', image: 'Салат_с_хрустящими_баклажанами_и_помидорами.jpg' },
    ]
  },
  main: {
    label: 'Горячие блюда',
    items: [
      { name: 'Сорпа', price: 1000, description: 'Наваристый суп', ingredients: 'Бульон, мясо, овощи', image: 'baa3922721f64a4e211737796045cd76.jpg' },
      { name: 'Пельмени', price: 1100, description: 'Домашние пельмени', ingredients: 'Тесто, мясная начинка, специи', image: '5-33.webp' },
      { name: 'Плов', price: 0, description: 'На заказ от 6 порций', ingredients: 'На заказ', image: 'p_O.jpg' },
      { name: 'Казан-кебаб', price: 0, description: 'На заказ от 6 порций', ingredients: 'На заказ', image: 'preview_b029a903f114ec071edfde54d42c0e65.jpg' },
      { name: 'Бешбармак', price: 0, description: 'На заказ от 6 порций', ingredients: 'На заказ', image: 'beshbarmak-reczept-klassicheskij.jpg' },
    ]
  },
  fish: {
    label: 'Рыба',
    items: [
      { name: 'Форель (сырая)', price: 4500, weight: 'кг', description: 'Свежая форель', ingredients: 'Форель', image: '1319013-photo-big.jpg' },
      { name: 'Форель (жареная)', price: 6500, weight: 'кг', description: 'Жареная форель', ingredients: 'Форель', image: '07a4695289_1000.jpg' },
      { name: 'Форель (стейк)', price: 6500, weight: 'кг', description: 'Форель в формате стейка', ingredients: 'Форель', image: 'WhatsApp Image 2026-04-09 at 22.57.12.jpeg' },
      { name: 'Форель (шашлык)', price: 6500, weight: 'кг', description: 'Форель на шампуре', ingredients: 'Форель', image: 'WhatsApp Image 2026-04-09 at 22.57.11.jpeg' },
      { name: 'Сазан (жареный)', price: 6500, weight: 'кг', description: 'Жареный сазан', ingredients: 'Сазан', image: 'Сазан.jpg' },
    ]
  },
  shashlyk: {
    label: 'Шашлыки',
    items: [
      { name: 'Кусковой', price: 780, description: 'Мясо кусочками на углях', ingredients: 'Мясо, маринад, специи', image: 'shashlik-iz-govyadini-7.jpg' },
      { name: 'Фарш (люля)', price: 720, description: 'Сочный люля-кебаб', ingredients: 'Фарш, лук, специи', image: 'cjd2asc5vr57rffrjymqyvuzzo46bjdx.jpg' },
      { name: 'Утка', price: 700, description: 'Нежная утка, приготовленная на углях', ingredients: 'Утка, фирменный маринад, специи', image: 'shashlik_iz_utki-268247.jpg' },
    ]
  },
  steaks: {
    label: 'Стейки',
    items: [
      { name: 'T-bone стейк', price: 4500, weight: '500 г', description: 'Сочный стейк премиум-класса', ingredients: 'Говядина', image: 'Ti-boun-stejk.jpg' },
    ]
  },
  snacks: {
    label: 'Снеки',
    items: [
      { name: 'Картофель фри', price: 700, weight: '200 г', description: 'Хрустящий картофель фри', ingredients: 'Картофель, соль, масло', image: 'kartofel-fry.jpg' },
      { name: 'Кириешки и чипсы', price: 0, description: 'Цена уточняется', ingredients: 'Крылышки, чипсы', image: '215945_or.jpg' },
      { name: 'Курт', price: 150, weight: '1 шт', description: 'Традиционная закуска', ingredients: 'Курт', image: '60f55679-7a25-4743-85b9-5fbadb3c2b24.webp' },
      { name: 'Чечель', price: 700,weight: '1 пачка', description: '1 пачка', ingredients: 'Чечель', image: 'cheezu-chechil.jpg.webp' },
    ]
  },
  hot_drinks: {
    label: 'Горячие напитки',
    items: [
      { name: 'Чёрный чай', price: 450, weight: 'чайник', description: 'Классический чёрный чай', ingredients: 'Чай', image: 'images.jpeg' },
      { name: 'Зелёный чай', price: 450, weight: 'чайник', description: 'Классический зелёный чай', ingredients: 'Чай', image: 'images2.jpeg' },
      { name: 'Ташкентский чай', price: 700, weight: 'чайник', description: 'Ароматный ташкентский чай', ingredients: 'Чай, лимон, мята', image: 'tashketskiy-chai.jpg' },
      { name: 'Ташкентский чай (большой чайник)', price: 1200, description: 'Большой чайник ташкентского чая', ingredients: 'Чай, лимон, мята', image: 'tashketskiy-chai.jpg' },
    ]
  },
  drinks: {
    label: 'Напитки',
    items: [
      { name: 'Coca-Cola', price: 800, weight: '1 л', description: 'Газированный напиток', ingredients: 'Охлажденный напиток', image: '05946053681acf7401f6e79ef83e617c.jpg' },
      { name: 'Pepsi', price: 800, weight: '1 л', description: 'Газированный напиток', ingredients: 'Охлажденный напиток', image: 'pepsi2-500x500.jpg' },
      { name: 'Pepsi', price: 1200, weight: '2 л', description: 'Газированный напиток', ingredients: 'Охлажденный напиток', image: 'pepsi2-500x500.jpg' },
      { name: 'Maxi чай', price: 800, weight: '1.2 л', description: 'Холодный чай', ingredients: 'Охлажденный напиток', image: 'i.webp' },
      { name: 'Maxi чай', price: 1200, weight: '2 л', description: 'Холодный чай', ingredients: 'Охлажденный напиток', image: 'i.webp' },
      { name: 'Fuse чай', price: 600, weight: '1 л', description: 'Фирменный чай', ingredients: 'Охлажденный напиток', image: 'fusetea-mango-pineapple_d.jpg.webp' },
      { name: 'Gorilla', price: 650, weight: '0.5 л', description: 'Энергетический напиток', ingredients: 'Охлажденный напиток', image: '224713-napitok_energeticheskii_gorilla_zh_b_450_ml.webp' },
      { name: 'DIZZY', price: 650, weight: '0.33 л', description: 'Энергетический напиток', ingredients: 'Охлажденный напиток', image: '3454babfd000032e9be0225822ad758b.jpg' },
      { name: 'Chortoq', price: 700, description: 'Минеральная вода', ingredients: 'Вода', image: '1l.jpg' },
      { name: 'Borjomi', price: 900, description: 'Минеральная вода', ingredients: 'Вода', image: '3f2d7d9948b7f07a9760cb2d64b71c76.jpg' },
      { name: 'Piko (Tetra Pak)', price: 800, description: 'Сок в упаковке', ingredients: 'Фруктовый сок', image: 'piko-tetra.png.webp' },
      { name: 'Сарыагаш', price: 600, weight: '1.5 л', description: 'Минеральная вода', ingredients: 'Вода', image: 'Минеральная_вода_Сарыагаш__1_5_л.jpg' },
      { name: 'Вода без газа', price: 250, weight: '0.5 л', description: 'Питьевая вода', ingredients: 'Вода', image: '686542bbd50b8cecdf904ce3.avif' },
    ]
  },
  homemade_drinks: {
    label: 'Домашние напитки',
    items: [
      { name: 'Мохито', price: 2000, description: 'Освежающий домашний напиток', ingredients: 'Лайм, мята, лед, сироп', image: '102158_picture.jpg' },
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
