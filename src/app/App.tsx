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
      { name: 'Ачучук', price: 1200, description: 'Традиционный узбекский салат из помидоров и лука', ingredients: 'Помидоры, лук, острый перец, базилик', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnJlc2glMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Свежий', price: 1300, description: 'Легкий витаминный салат', ingredients: 'Огурцы, помидоры, зелень, масло/сметана', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnJlc2glMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Цезарь', price: 1600, description: 'Классический салат с курицей и соусом', ingredients: 'Листья салата, курица, сухарики, пармезан, соус цезарь', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnJlc2glMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Соевый салат', price: 1600, description: 'Пикантный азиатский салат', ingredients: 'Ростки сои, морковь, чеснок, специи, соевый соус', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnJlc2glMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Крабовый салат', price: 1800, description: 'Сытный классический салат', ingredients: 'Крабовые палочки, кукуруза, рис, яйца, майонез', image: 'https://images.unsplash.com/photo-1761315600943-d8a5bb0c499f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwZnJlc2glMjBzYWxhZCUyMGJvd2x8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    ]
  },
  shashlyk: {
    label: 'Шашлык',
    items: [
      { name: 'Кускавой', price: 550, description: 'Сочное мясо кусочками на углях', ingredients: 'Говядина/баранина, специи, маринад', image: 'https://images.unsplash.com/photo-1583665354191-634609954d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlzaCUyMGtlYmFiJTIwbWVhdCUyMHNrZXdlcnMlMjBsdXh1cnl8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Фарш', price: 550, description: 'Нежный люля-кебаб', ingredients: 'Молотое мясо, лук, курдюк, специи', image: 'https://images.unsplash.com/photo-1583665354191-634609954d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlzaCUyMGtlYmFiJTIwbWVhdCUyMHNrZXdlcnMlMjBsdXh1cnl8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Крылышки', price: 550, description: 'Хрустящие куриные крылышки', ingredients: 'Куриные крылья, маринад, специи', image: 'https://images.unsplash.com/photo-1583665354191-634609954d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlzaCUyMGtlYmFiJTIwbWVhdCUyMHNrZXdlcnMlMjBsdXh1cnl8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Ребрышки (баранина)', price: 650, description: 'Ароматные ребрышки на костре', ingredients: 'Бараньи ребрышки, кавказские травы, соль', image: 'https://images.unsplash.com/photo-1583665354191-634609954d54?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaGlzaCUyMGtlYmFiJTIwbWVhdCUyMHNrZXdlcnMlMjBsdXh1cnl8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    ]
  },
  main: {
    label: 'Горячие блюда',
    items: [
      { name: 'Суп', price: 900, description: 'Насыщенный домашний суп', ingredients: 'Мясо, картофель, морковь, лук, зелень', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmllbnRhbCUyMHBpbGFmJTIwcGxvdiUyMGRpc2h8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Плов', price: 1200, weight: 'порция', description: 'Традиционный восточный плов', ingredients: 'Рис лазер, мясо, морковь, нут, изюм', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmllbnRhbCUyMHBpbGFmJTIwcGxvdiUyMGRpc2h8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Лагман', price: 1300, description: 'Тянутая вручную лапша с подливом', ingredients: 'Лапша, мясо, овощи, специи', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmllbnRhbCUyMHBpbGFmJTIwcGxvdiUyMGRpc2h8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Гуйру лагман', price: 1300, description: 'Лагман с обжаренным мясом и овощами', ingredients: 'Лапша, мясо, перец, сельдерей, специи', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmllbnRhbCUyMHBpbGFmJTIwcGxvdiUyMGRpc2h8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Манты', price: 1300, description: 'Мясные манты на пару', ingredients: 'Тесто, фарш (мясо, лук), специи', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmllbnRhbCUyMHBpbGFmJTIwcGxvdiUyMGRpc2h8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Казан кабаб', price: 1500, description: 'Жареное мясо с картофелем в казане', ingredients: 'Мясо, картофель, лук, специи', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmllbnRhbCUyMHBpbGFmJTIwcGxvdiUyMGRpc2h8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Жаренная рыба (сазан)', price: 1800, weight: '250гр', description: 'Свежепойманный сазан, обжаренный до корочки', ingredients: 'Рыба сазан, панировка, лимон, зелень', image: 'https://images.unsplash.com/photo-1761950190821-970680100a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwd2hvbGUlMjBmaXNoJTIwb3V0ZG9vciUyMGZpcmV8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Форель на углях', price: 2200, weight: '250гр', description: 'Нежная форель с дымком', ingredients: 'Форель, маринад, лимон, травы', image: 'https://images.unsplash.com/photo-1761950190821-970680100a22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwd2hvbGUlMjBmaXNoJTIwb3V0ZG9vciUyMGZpcmV8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Казан кебаб', price: 1500, weight: 'порция', description: 'Мясо томленое с овощами', ingredients: 'Мясо, лук, специи, овощи', image: 'https://images.unsplash.com/photo-1735233024815-7986206a18a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmllbnRhbCUyMHBpbGFmJTIwcGxvdiUyMGRpc2h8ZW58MXx8fHwxNzcxMDc0NzU4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
    ]
  },
  drinks: {
    label: 'Напитки',
    items: [
      { name: 'Coca Cola', price: 600, description: 'Газировка, классическая', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Pepsi', price: 600, description: 'Освежающий напиток', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Fanta', price: 600, description: 'Апельсиновая свежесть', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Sprite', price: 600, description: 'Лимон-лайм свежесть', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Сарыагаш', price: 350, description: 'Минеральная вода', ingredients: 'Охлажденная минеральная вода', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Dizzy', price: 550, description: 'Энергетический напиток', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Gorilla', price: 600, description: 'Энергетический напиток', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Фьюс чай', price: 500, description: 'Холодный чай', ingredients: 'Охлажденный напиток', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Piko pulpi', price: 750, description: 'Сок с мякотью', ingredients: 'Натуральный сок', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Piko tetra', price: 700, description: 'Сок в упаковке', ingredients: 'Натуральный сок', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Мохито', price: 1400, description: 'Освежающий безалкогольный коктейль', ingredients: 'Лайм, мята, лед, спрайт, сироп', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Домашний лимонад', price: 1400, description: 'Фирменный лимонад от шефа', ingredients: 'Натуральные цитрусовые, лед, секретный ингредиент', image: 'https://images.unsplash.com/photo-1658846585855-9ceb669bbf87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbGFzcyUyMG9mJTIwY29sYSUyMGljZSUyMGxlbW9ufGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
    ]
  },
  hot_drinks: {
    label: 'Горячие напитки',
    items: [
      { name: 'Черный чай', price: 350, description: 'Классический черный чай', ingredients: 'Крупнолистовой чай', image: 'https://images.unsplash.com/photo-1600271701041-340850ff3bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhvdCUyMHRlYSUyMGdsYXNzfGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Зеленый чай', price: 350, description: 'Освежающий зеленый чай', ingredients: 'Зеленый листовой чай', image: 'https://images.unsplash.com/photo-1600271701041-340850ff3bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhvdCUyMHRlYSUyMGdsYXNzfGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Ташкентский чай', price: 600, description: 'Легендарный ароматный чай', ingredients: 'Чай, лимон, мята, нават', image: 'https://images.unsplash.com/photo-1600271701041-340850ff3bbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFkaXRpb25hbCUyMGhvdCUyMHRlYSUyMGdsYXNzfGVufDF8fHx8MTc3MTA3NDc1OHww&ixlib=rb-4.1.0&q=80&w=1080' },
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
        <p className="font-serif text-white font-bold text-2xl italic mb-1">Fish Resort</p>
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
