import { useEffect, useState } from 'react'
import AboutSection from './components/AboutSection'
import CartDrawer from './components/CartDrawer'
import FavoritesModal from './components/FavoritesModal'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import MenuSection from './components/MenuSection'
import { CartProvider, useCart } from './context/CartContext'
import { FavoritesProvider, useFavorites } from './context/FavoritesContext'

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeSection, setActiveSection] = useState('home')
  const { isOpen: cartOpen } = useCart()
  const { isOpen: favOpen } = useFavorites()

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = ['home', 'menu', 'about', 'contacts']
    const observers: IntersectionObserver[] = []

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100">
      <Header
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        activeSection={activeSection}
      />

      <main>
        <Hero />
        <MenuSection searchQuery={searchQuery} />
        <AboutSection />
      </main>

      <Footer />

      {/* Overlays */}
      {cartOpen && <CartDrawer />}
      {favOpen && <FavoritesModal />}
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <FavoritesProvider>
        <AppContent />
      </FavoritesProvider>
    </CartProvider>
  )
}
