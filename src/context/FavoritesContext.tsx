import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { MenuItem } from '../data/menu'

interface FavoritesContextValue {
  favorites: MenuItem[]
  toggleFavorite: (item: MenuItem) => void
  isFavorite: (id: number) => boolean
  isOpen: boolean
  openFavorites: () => void
  closeFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<MenuItem[]>(() => {
    try {
      const stored = localStorage.getItem('ff1_favorites')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('ff1_favorites', JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = useCallback((item: MenuItem) => {
    setFavorites((prev) => {
      const exists = prev.find((f) => f.id === item.id)
      return exists ? prev.filter((f) => f.id !== item.id) : [...prev, item]
    })
  }, [])

  const isFavorite = useCallback(
    (id: number) => favorites.some((f) => f.id === id),
    [favorites]
  )

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        isOpen,
        openFavorites: () => setIsOpen(true),
        closeFavorites: () => setIsOpen(false),
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
