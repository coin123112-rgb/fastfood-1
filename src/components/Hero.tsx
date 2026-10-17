import { ChevronDown, MessageCircle } from 'lucide-react'

export default function Hero() {
  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Главная секция"
    >
      {/* Brick texture background */}
      <div
        className="absolute inset-0 bg-stone-950"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 30px,
              rgba(255,255,255,0.015) 30px,
              rgba(255,255,255,0.015) 32px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 60px,
              rgba(255,255,255,0.015) 60px,
              rgba(255,255,255,0.015) 62px
            )
          `,
        }}
      />

      {/* Offset brick rows */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 62px,
              rgba(120,53,15,0.12) 62px,
              rgba(120,53,15,0.12) 64px
            )
          `,
        }}
      />

      {/* Warm glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-amber-950/20" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-600/40 text-red-400 text-sm font-semibold rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          Открыто сейчас · 10:00 — 24:00
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-none mb-6">
          <span className="text-amber-400">Fast Food №1</span>
          <br />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-stone-200 normal-case tracking-normal leading-snug mt-2 block">
            Самая сочная шаурма
            <br />
            и бургеры
          </span>
        </h1>

        {/* Subtext */}
        <p className="text-stone-400 text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Фирменные рецепты, свежие ингредиенты и неповторимый соус №1.
          Доставка и самовывоз в Новопокровке.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-base rounded-2xl px-8 py-4 transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-400/30 hover:-translate-y-0.5"
            aria-label="Перейти к меню"
          >
            Заказать сейчас
          </button>

          <a
            href="https://wa.me/996702211124"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base rounded-2xl px-8 py-4 transition-all duration-200 shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5"
            aria-label="Написать в WhatsApp"
          >
            <MessageCircle size={20} />
            WhatsApp +996 702 211 124
          </a>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 sm:gap-12 mt-14 pt-8 border-t border-stone-800">
          {[
            { value: '16+', label: 'Позиций в меню' },
            { value: '100%', label: 'Свежие продукты' },
            { value: '14 ч', label: 'Работаем каждый день' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">{stat.value}</div>
              <div className="text-xs sm:text-sm text-stone-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToMenu}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-stone-600 hover:text-amber-400 transition-colors animate-bounce"
        aria-label="Прокрутить вниз"
      >
        <ChevronDown size={28} />
      </button>
    </section>
  )
}
