import { Heart, Minus, Plus, ShoppingCart, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import type { MenuItem } from '../data/menu'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

interface FoodModalProps {
  item: MenuItem
  onClose: () => void
}

export default function FoodModal({ item, onClose }: FoodModalProps) {
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const [quantity, setQuantity] = useState(1)
  const favorited = isFavorite(item.id)

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const handleAddToCart = () => {
    addToCart(item, quantity)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full sm:max-w-lg bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[92vh] sm:max-h-[85vh] flex flex-col">
        {/* Image */}
        <div className="relative w-full aspect-[16/9] shrink-0">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-2 bg-stone-950/70 backdrop-blur-sm rounded-full text-stone-300 hover:text-white transition-colors"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>

          {/* Favorite */}
          <button
            onClick={() => toggleFavorite(item)}
            className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
              favorited
                ? 'bg-red-600 text-white'
                : 'bg-stone-950/70 text-stone-400 hover:text-red-400'
            }`}
            aria-label={favorited ? 'Удалить из избранного' : 'В избранное'}
            aria-pressed={favorited}
          >
            <Heart size={20} fill={favorited ? 'currentColor' : 'none'} />
          </button>

          {/* Tags */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold bg-stone-950/80 backdrop-blur-sm text-amber-400 border border-amber-500/40 rounded-full px-2.5 py-0.5"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 overflow-y-auto p-5 gap-4">
          {/* Title & price */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-amber-500/80 uppercase tracking-wider">
                {item.category}
              </span>
              <h2 className="text-xl font-black text-stone-100 leading-snug mt-0.5">
                {item.title}
              </h2>
            </div>
            <span className="text-2xl font-black text-amber-400 shrink-0">
              {item.price * quantity}{' '}
              <span className="text-sm font-semibold text-stone-400">сом</span>
            </span>
          </div>

          {/* Description */}
          <p className="text-stone-400 text-sm leading-relaxed">{item.description}</p>

          {/* Divider */}
          <div className="border-t border-stone-800" />

          {/* Quantity */}
          <div>
            <p className="text-sm font-semibold text-stone-300 mb-3">Количество</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-stone-800 border border-stone-700 rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-colors"
                  aria-label="Уменьшить количество"
                >
                  <Minus size={18} />
                </button>
                <span className="w-10 text-center font-black text-stone-100 text-lg">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-stone-400 hover:text-stone-100 hover:bg-stone-700 transition-colors"
                  aria-label="Увеличить количество"
                >
                  <Plus size={18} />
                </button>
              </div>
              <span className="text-stone-500 text-sm">{item.price} сом × {quantity}</span>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base rounded-2xl py-4 transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 active:scale-[0.98]"
            aria-label={`Добавить ${quantity} шт. в корзину`}
          >
            <ShoppingCart size={20} />
            Добавить в корзину · {item.price * quantity} сом
          </button>
        </div>
      </div>
    </div>
  )
}
