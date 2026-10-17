import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useCart } from '../context/CartContext'
import { useFavorites } from '../context/FavoritesContext'

interface HeaderProps {
  onSearchChange: (query: string) => void
  searchQuery: string
  activeSection: string
}

const navLinks = [
  { href: '#home', label: 'Главная' },
  { href: '#menu', label: 'Меню' },
  { href: '#about', label: 'О нас' },
  { href: '#contacts', label: 'Контакты' },
]

export default function Header({ onSearchChange, searchQuery, activeSection }: HeaderProps) {
  const { totalItems, totalPrice, openCart } = useCart()
  const { favorites, openFavorites } = useFavorites()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus()
  }, [searchOpen])

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-md shadow-lg shadow-black/30'
          : 'bg-stone-950/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <span className="text-amber-400 font-black text-xl lg:text-2xl tracking-tight leading-none">
              FAST FOOD
            </span>
            <span className="bg-red-600 text-white font-black text-sm lg:text-base px-2 py-0.5 rounded-md leading-tight">
              №1
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Основная навигация">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === link.href.slice(1)
                    ? 'text-amber-400'
                    : 'text-stone-300 hover:text-amber-400'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={openFavorites}
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors duration-200 flex items-center gap-1"
              aria-label="Избранное"
            >
              Избранное
              {favorites.length > 0 && (
                <span className="bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {favorites.length}
                </span>
              )}
            </button>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative hidden sm:flex items-center">
              {searchOpen ? (
                <div className="flex items-center gap-2 bg-stone-800 rounded-xl px-3 py-1.5 border border-stone-700">
                  <Search size={16} className="text-stone-400 shrink-0" />
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Поиск по меню..."
                    className="bg-transparent text-stone-100 text-sm outline-none w-40 placeholder:text-stone-500"
                    aria-label="Поиск по меню"
                  />
                  <button
                    onClick={() => { setSearchOpen(false); onSearchChange('') }}
                    className="text-stone-400 hover:text-stone-200"
                    aria-label="Закрыть поиск"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-stone-400 hover:text-amber-400 transition-colors"
                  aria-label="Открыть поиск"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Favorites (icon only on mobile) */}
            <button
              onClick={openFavorites}
              className="relative p-2 text-stone-400 hover:text-red-400 transition-colors lg:hidden"
              aria-label="Избранное"
            >
              <Heart size={20} />
              {favorites.length > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center leading-none">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-xl px-3 py-2 transition-colors duration-200"
              aria-label="Открыть корзину"
            >
              <ShoppingCart size={18} />
              {totalItems > 0 ? (
                <span className="hidden sm:inline">
                  {totalItems} · {totalPrice} сом
                </span>
              ) : (
                <span className="hidden sm:inline">Корзина</span>
              )}
              {totalItems > 0 && (
                <span className="sm:hidden bg-stone-950/20 rounded-lg px-1 text-xs font-black">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="lg:hidden p-2 text-stone-400 hover:text-stone-100 transition-colors"
              aria-label={mobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="sm:hidden pb-2">
          <div className="flex items-center gap-2 bg-stone-800 rounded-xl px-3 py-2 border border-stone-700">
            <Search size={16} className="text-stone-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Поиск по меню..."
              className="bg-transparent text-stone-100 text-sm outline-none w-full placeholder:text-stone-500"
              aria-label="Поиск по меню"
            />
            {searchQuery && (
              <button onClick={() => onSearchChange('')} className="text-stone-400">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileMenuOpen && (
          <nav
            className="lg:hidden border-t border-stone-800 py-3 flex flex-col gap-1"
            aria-label="Мобильная навигация"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.href.slice(1)
                    ? 'text-amber-400 bg-amber-400/10'
                    : 'text-stone-300 hover:text-amber-400 hover:bg-stone-800'
                }`}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => { openFavorites(); setMobileMenuOpen(false) }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-stone-300 hover:text-amber-400 hover:bg-stone-800 transition-colors"
            >
              Избранное
              {favorites.length > 0 && (
                <span className="bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>
          </nav>
        )}
      </div>
    </header>
  )
}
