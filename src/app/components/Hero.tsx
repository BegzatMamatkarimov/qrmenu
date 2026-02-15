import { ImageWithFallback } from './ImageWithFallback';
import { Search, Waves } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Hero({ searchQuery, onSearchChange }: HeroProps) {
  return (
    <div className="relative h-[40vh] w-full flex flex-col justify-end px-6 pb-12">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <ImageWithFallback
          src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/503744317.jpg?k=16496e1e995b4981026cd00180aa0d83480bc81c84b32374444ecb29794dc055&o="
          alt="Fish Resort"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#334155] via-[#334155]/70 to-black/40" />
      </div>

      <div className="relative z-10 space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg">
            <Waves className="text-[#475569] w-6 h-6" />
          </div>
          <span className="font-serif text-white font-bold tracking-widest text-xs uppercase">
            Premium Resort
          </span>
        </div>
        <h1 className="font-serif text-4xl text-white font-black leading-tight drop-shadow-md">
          Fish Resort
        </h1>
        <p className="font-sans text-white/90 text-sm max-w-[280px] drop-shadow-sm">
          Ресторан на свежем воздухе у речки. Ловите рыбу, готовьте её на гриле и наслаждайтесь свежайшим вкусом прямо у воды.
        </p>
      </div>

      <div className="absolute bottom-[-20px] left-0 w-full px-6 z-20">
        <div className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Поиск по меню..."
            className="w-full bg-white backdrop-blur-md border-2 border-white/50 rounded-2xl py-4 pl-12 pr-4 shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:border-white text-[#1e293b] placeholder-[#64748b]"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#475569] w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
