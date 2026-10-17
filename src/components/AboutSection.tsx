import { Clock, MapPin, MessageCircle, Phone } from 'lucide-react'

export default function AboutSection() {
  return (
    <>
      {/* About */}
      <section id="about" className="bg-stone-900 py-16 lg:py-24 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">О нас</span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-100 mt-2">Почему Fast Food №1?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🔥', title: 'Свежее каждый день', desc: 'Готовим из свежих продуктов без заморозки. Каждое блюдо делается на ваш заказ.' },
              { icon: '🌯', title: 'Фирменный соус №1', desc: 'Наш секретный соус делает шаурму неповторимой. Именно за ним возвращаются снова.' },
              { icon: '⚡', title: 'Быстро и вкусно', desc: 'Ждать долго не придётся. Готовим быстро, не жертвуя качеством.' },
              { icon: '🚗', title: 'Доставка и самовывоз', desc: 'Привезём прямо к вам или заберите с собой — выберите удобный способ.' },
            ].map((card) => (
              <div key={card.title} className="bg-stone-800/50 border border-stone-700/50 rounded-2xl p-6 text-center hover:border-amber-500/30 transition-colors">
                <div className="text-4xl mb-4">{card.icon}</div>
                <h3 className="font-black text-stone-100 text-base mb-2">{card.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts & Location */}
      <section id="contacts" className="bg-stone-950 py-16 lg:py-24 border-t border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-500 text-sm font-semibold uppercase tracking-wider">Контакты</span>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-100 mt-2">Как нас найти</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Hours */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
                  <Clock size={20} className="text-amber-400" />
                </div>
                <h3 className="font-black text-stone-100 text-base">Время работы</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between py-2 border-b border-stone-800">
                  <span className="text-stone-400 text-sm">Понедельник – Воскресенье</span>
                  <span className="text-amber-400 font-bold text-sm">10:00 – 24:00</span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-emerald-400 text-sm font-semibold">Открыто сейчас</span>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <MapPin size={20} className="text-red-400" />
                </div>
                <h3 className="font-black text-stone-100 text-base">Адрес</h3>
              </div>
              <div className="space-y-1">
                <p className="text-stone-300 text-sm font-semibold">Улица Ленина, 436</p>
                <p className="text-stone-500 text-sm">с. Новопокровка</p>
                <p className="text-stone-500 text-sm">Ысык-Атинский район</p>
                <p className="text-stone-500 text-sm">Чуйская область, 725024</p>
              </div>
              <a
                href="https://maps.google.com/?q=Улица+Ленина+436+Новопокровка+Кыргызстан"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 text-sm font-semibold hover:text-amber-300 transition-colors mt-auto"
                aria-label="Открыть в Google Maps"
              >
                <MapPin size={14} />
                Открыть на карте →
              </a>
            </div>

            {/* Phone */}
            <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                  <Phone size={20} className="text-emerald-400" />
                </div>
                <h3 className="font-black text-stone-100 text-base">Связь с нами</h3>
              </div>
              <div className="space-y-3">
                <a
                  href="tel:+996702211124"
                  className="flex items-center gap-3 p-3 bg-stone-800 rounded-xl hover:bg-stone-700 transition-colors"
                  aria-label="Позвонить на номер +996 702 211 124"
                >
                  <Phone size={16} className="text-amber-400 shrink-0" />
                  <div>
                    <p className="text-stone-300 text-sm font-bold">+996 702 211 124</p>
                    <p className="text-stone-600 text-xs">Основной</p>
                  </div>
                </a>
                <a
                  href="tel:+996502802228"
                  className="flex items-center gap-3 p-3 bg-stone-800 rounded-xl hover:bg-stone-700 transition-colors"
                  aria-label="Позвонить на номер +996 502 802 228"
                >
                  <Phone size={16} className="text-amber-400 shrink-0" />
                  <div>
                    <p className="text-stone-300 text-sm font-bold">+996 502 802 228</p>
                    <p className="text-stone-600 text-xs">Дополнительный</p>
                  </div>
                </a>
                <a
                  href="https://wa.me/996702211124"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-emerald-700/30 border border-emerald-700/50 rounded-xl hover:bg-emerald-700/50 transition-colors"
                  aria-label="Написать в WhatsApp"
                >
                  <MessageCircle size={16} className="text-emerald-400 shrink-0" />
                  <div>
                    <p className="text-stone-300 text-sm font-bold">WhatsApp</p>
                    <p className="text-stone-500 text-xs">Написать сообщение</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
