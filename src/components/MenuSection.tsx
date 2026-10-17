import { Search } from 'lucide-react'
import { useState } from 'react'
import { categories, menuItems } from '../data/menu'
import type { MenuItem } from '../data/menu'
import FoodModal from './FoodModal'
import MenuCard from './MenuCard'

interface MenuSectionProps {
  searchQuery: string
}

export default function MenuSection({ searchQuery }: MenuSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('Все')
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  const allCategories = ['Все', ...categories]

  const filtered = menuItems.filter((item) => {
    const matchesCategory =
      activeCategory === 'Все' || item.category === activeCategory
    const matchesSearch =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesCategory && matchesSearch
  })

  return (
    <section id="menu" className="bg-stone-950 py-16 lg:py-24" aria-label="Меню">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10">
          <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">
            Наше меню
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-100 mt-2">
            Выберите своё блюдо
          </h2>
          <p className="text-stone-500 mt-2 text-base max-w-md mx-auto">
            Свежие ингредиенты и фирменные рецепты ежедневно
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-8 scrollbar-hide" role="tablist" aria-label="Категории меню">
          {allCategories.map((cat) => (
            <button
              key={cat}
              role="tab"
              aria-selected={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-amber-500 border-amber-500 text-stone-950'
                  : 'bg-stone-900 border-stone-700 text-stone-400 hover:text-stone-200 hover:border-stone-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search results hint */}
        {searchQuery && (
          <div className="mb-6 text-stone-400 text-sm flex items-center gap-2">
            <Search size={15} />
            Результаты по запросу «{searchQuery}» — найдено {filtered.length} позиций
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                onOpenDetail={setSelectedItem}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-stone-600 text-6xl mb-4">🍔</div>
            <p className="text-stone-500 text-lg font-medium">Ничего не найдено</p>
            <p className="text-stone-600 text-sm mt-1">Попробуйте другой запрос или категорию</p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedItem && (
        <FoodModal item={selectedItem} onClose={() => setSelectedItem(null)} />
      )}
    </section>
  )
}
