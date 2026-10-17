import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { MenuItem } from '../data/menu'

export interface CartItem {
  item: MenuItem
  quantity: number
}

interface CartContextValue {
  cartItems: CartItem[]
  addToCart: (item: MenuItem, quantity?: number) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('ff1_cart')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('ff1_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = useCallback((item: MenuItem, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.item.id === item.id)
      if (existing) {
        return prev.map((ci) =>
          ci.item.id === item.id
            ? { ...ci, quantity: ci.quantity + quantity }
            : ci
        )
      }
      return [...prev, { item, quantity }]
    })
  }, [])

  const removeFromCart = useCallback((id: number) => {
    setCartItems((prev) => prev.filter((ci) => ci.item.id !== id))
  }, [])

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((ci) => ci.item.id !== id))
    } else {
      setCartItems((prev) =>
        prev.map((ci) => (ci.item.id === id ? { ...ci, quantity } : ci))
      )
    }
  }, [])

  const clearCart = useCallback(() => setCartItems([]), [])

  const totalItems = cartItems.reduce((sum, ci) => sum + ci.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, ci) => sum + ci.item.price * ci.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
