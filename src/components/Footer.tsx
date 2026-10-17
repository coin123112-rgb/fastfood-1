import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'

// Inline Instagram icon since lucide-react doesn't export it
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-stone-950 border-t border-stone-800" aria-label="Нижний колонтитул">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-amber-400 font-black text-xl tracking-tight">FAST FOOD</span>
              <span className="bg-red-600 text-white font-black text-sm px-2 py-0.5 rounded-md">№1</span>
            </div>
            <p className="text-stone-500 text-sm leading-relaxed mb-4">
              Самая сочная шаурма и бургеры в Новопокровке. Фирменные рецепты и свежие ингредиенты каждый день.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/fastfood_n1"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-stone-800 hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500 rounded-xl flex items-center justify-center text-stone-400 hover:text-white transition-all duration-200"
                aria-label="Instagram @fastfood_n1"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://wa.me/996702211124"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-stone-800 hover:bg-emerald-600 rounded-xl flex items-center justify-center text-stone-400 hover:text-white transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-stone-300 font-bold text-sm mb-4 uppercase tracking-wider">Навигация</h3>
            <ul className="space-y-2">
              {[
                { href: '#home', label: 'Главная' },
                { href: '#menu', label: 'Меню' },
                { href: '#about', label: 'О нас' },
                { href: '#contacts', label: 'Контакты' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-stone-500 text-sm hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-stone-300 font-bold text-sm mb-4 uppercase tracking-wider">Контакты</h3>
            <ul className="space-y-3">
              <li>
                <a href="tel:+996702211124" className="flex items-center gap-2 text-stone-500 text-sm hover:text-amber-400 transition-colors">
                  <Phone size={14} className="shrink-0" />
                  +996 702 211 124
                </a>
              </li>
              <li>
                <a href="tel:+996502802228" className="flex items-center gap-2 text-stone-500 text-sm hover:text-amber-400 transition-colors">
                  <Phone size={14} className="shrink-0" />
                  +996 502 802 228
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/996702211124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-500 text-sm hover:text-emerald-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={14} className="shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/fastfood_n1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-stone-500 text-sm hover:text-pink-400 transition-colors"
                  aria-label="Instagram @fastfood_n1"
                >
                  <InstagramIcon size={14} />
                  @fastfood_n1
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Address */}
          <div>
            <h3 className="text-stone-300 font-bold text-sm mb-4 uppercase tracking-wider">Адрес</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-stone-500 text-sm">
                <MapPin size={14} className="shrink-0 mt-0.5" />
                <span>Улица Ленина, 436, с. Новопокровка, Ысык-Атинский район, Чуйская обл., 725024</span>
              </div>
              <div className="flex items-center gap-2 text-stone-500 text-sm">
                <Clock size={14} className="shrink-0" />
                <span>Ежедневно 10:00 – 24:00</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-stone-600 text-xs">
            © {year} Fast Food №1. Все права защищены.
          </p>
          <p className="text-stone-700 text-xs">
            с. Новопокровка, Кыргызстан
          </p>
        </div>
      </div>
    </footer>
  )
}
