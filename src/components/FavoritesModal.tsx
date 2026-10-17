import { Heart, ShoppingCart, Trash2, X } from 'lucide-react'
import { useEffect } from 'react'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

export default function FavoritesModal() {
  const { favorites, toggleFavorite, closeFavorites } = useFavorites()
  const { addToCart } = useCart()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeFavorites() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeFavorites])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Избранное"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeFavorites}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full sm:max-w-lg bg-stone-900 border border-stone-800 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-red-500" fill="currentColor" />
            <h2 className="text-lg font-black text-stone-100">Избранное</h2>
            {favorites.length > 0 && (
              <span className="bg-stone-800 text-stone-400 text-xs font-bold rounded-full px-2 py-0.5">
                {favorites.length}
              </span>
            )}
          </div>
          <button
            onClick={closeFavorites}
            className="p-2 text-stone-400 hover:text-stone-200 rounded-xl hover:bg-stone-800 transition-colors"
            aria-label="Закрыть"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <Heart size={48} className="text-stone-700 mb-4" />
              <p className="text-stone-400 font-medium text-lg">Пока пусто</p>
              <p className="text-stone-600 text-sm mt-1">
                Нажмите ❤ на карточке блюда, чтобы добавить в избранное
              </p>
            </div>
          ) : (
            <ul className="divide-y divide-stone-800">
              {favorites.map((item) => (
                <li key={item.id} className="flex items-center gap-3 p-4 hover:bg-stone-800/40 transition-colors">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-stone-100 text-sm truncate">{item.title}</p>
                    <p className="text-amber-400 font-black text-base">{item.price} сом</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => { addToCart(item); toggleFavorite(item) }}
                      className="p-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-xl transition-colors"
                      aria-label={`Добавить ${item.title} в корзину`}
                      title="В корзину"
                    >
                      <ShoppingCart size={16} />
                    </button>
                    <button
                      onClick={() => toggleFavorite(item)}
                      className="p-2 text-stone-500 hover:text-red-400 hover:bg-stone-800 rounded-xl transition-colors"
                      aria-label={`Удалить ${item.title} из избранного`}
                      title="Удалить"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {favorites.length > 0 && (
          <div className="p-4 border-t border-stone-800 shrink-0">
            <button
              onClick={() => {
                favorites.forEach((item) => addToCart(item))
                favorites.forEach((item) => toggleFavorite(item))
                closeFavorites()
              }}
              className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base rounded-2xl py-3.5 transition-all duration-200 active:scale-[0.98]"
              aria-label="Добавить все в корзину"
            >
              <ShoppingCart size={18} />
              Добавить всё в корзину
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
