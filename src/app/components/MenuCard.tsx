import { motion } from 'motion/react';
import { ImageWithFallback } from './ImageWithFallback';

interface MenuCardProps {
  name: string;
  price: number;
  weight?: string;
  description: string;
  ingredients: string;
  image: string;
}

export function MenuCard({
  name,
  price,
  weight,
  description,
  ingredients,
  image,
}: MenuCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white rounded-2xl overflow-hidden shadow-lg border-2 border-white/80 mb-4 flex gap-4 p-3"
    >
      <div className="w-24 h-24 shrink-0 overflow-hidden rounded-xl border border-slate-200">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-between flex-1 py-1">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-serif text-slate-800 text-lg leading-tight font-semibold">
              {name}
            </h3>
            {price > 0 && (
              <span className="font-sans text-[#475569] font-bold whitespace-nowrap">
                {price} ₸
              </span>
            )}
          </div>
          <p className="text-slate-600 text-xs line-clamp-1 mt-1 font-sans italic">
            {description}
          </p>
        </div>
        <div className="mt-2">
          <p className="text-slate-500 text-[10px] leading-tight font-sans">
            {ingredients}
          </p>
          {weight != null && (
            <p className="text-slate-600 text-[10px] mt-1 font-bold">{weight}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
