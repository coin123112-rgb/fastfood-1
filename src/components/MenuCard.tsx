import { Heart, Plus, ShoppingCart } from 'lucide-react'
import type { MenuItem } from '../data/menu'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

interface MenuCardProps {
  item: MenuItem
  onOpenDetail: (item: MenuItem) => void
}

export default function MenuCard({ item, onOpenDetail }: MenuCardProps) {
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const favorited = isFavorite(item.id)

  return (
    <article className="group relative bg-stone-900 border border-stone-800 rounded-2xl overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-black/40 hover:-translate-y-1 flex flex-col">
      {/* Image */}
      <button
        className="relative w-full overflow-hidden aspect-[4/3] focus:outline-none"
        onClick={() => onOpenDetail(item)}
        aria-label={`Открыть детали ${item.title}`}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />

        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {item.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold bg-stone-950/70 backdrop-blur-sm text-amber-400 border border-amber-500/30 rounded-full px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => { e.stopPropagation(); toggleFavorite(item) }}
          className={`absolute top-2 right-2 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            favorited
              ? 'bg-red-600 text-white'
              : 'bg-stone-950/60 text-stone-400 hover:text-red-400 hover:bg-stone-800/80'
          }`}
          aria-label={favorited ? 'Удалить из избранного' : 'Добавить в избранное'}
          aria-pressed={favorited}
        >
          <Heart size={16} fill={favorited ? 'currentColor' : 'none'} />
        </button>
      </button>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <button
          onClick={() => onOpenDetail(item)}
          className="text-left focus:outline-none"
          aria-label={`Подробнее о ${item.title}`}
        >
          <h3 className="font-bold text-stone-100 text-base leading-snug mb-1 group-hover:text-amber-400 transition-colors line-clamp-1">
            {item.title}
          </h3>
          <p className="text-stone-500 text-sm leading-relaxed line-clamp-2 mb-3">
            {item.description}
          </p>
        </button>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="text-amber-400 font-black text-xl">
            {item.price} <span className="text-sm font-semibold text-stone-400">сом</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetail(item)}
              className="p-2 rounded-xl border border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500 transition-colors"
              aria-label="Подробнее"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => addToCart(item)}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl px-3 py-2 transition-all duration-200 active:scale-95"
              aria-label={`Добавить ${item.title} в корзину`}
            >
              <ShoppingCart size={15} />
              <span className="hidden sm:inline">В корзину</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
