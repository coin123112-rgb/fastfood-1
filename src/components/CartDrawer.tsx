import {
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useCart } from '../context/CartContext'

interface OrderDetails {
  name: string
  phone: string
  orderType: 'delivery' | 'pickup'
  address: string
  notes: string
}

export default function CartDrawer() {
  const { cartItems, removeFromCart, updateQuantity, clearCart, totalPrice, closeCart } =
    useCart()

  const [order, setOrder] = useState<OrderDetails>({
    name: '',
    phone: '',
    orderType: 'delivery',
    address: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof OrderDetails, string>>>({})

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeCart() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeCart])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const validate = (): boolean => {
    const newErrors: typeof errors = {}
    if (!order.name.trim()) newErrors.name = 'Введите имя'
    if (!order.phone.trim()) newErrors.phone = 'Введите номер телефона'
    if (order.orderType === 'delivery' && !order.address.trim())
      newErrors.address = 'Введите адрес доставки'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const buildWhatsAppMessage = (): string => {
    const lines: string[] = [
      '🍔 *Заказ из Fast Food №1*',
      '',
      `👤 Имя: ${order.name}`,
      `📞 Телефон: ${order.phone}`,
      `📦 Тип: ${order.orderType === 'delivery' ? '🚗 Доставка' : '🏃 Самовывоз'}`,
    ]
    if (order.orderType === 'delivery' && order.address) {
      lines.push(`📍 Адрес: ${order.address}`)
    }
    lines.push('', '🧾 *Состав заказа:*')
    cartItems.forEach((ci) => {
      lines.push(`• ${ci.item.title} × ${ci.quantity} = ${ci.item.price * ci.quantity} сом`)
    })
    lines.push('', `💰 *Итого: ${totalPrice} сом*`)
    if (order.notes) {
      lines.push('', `📝 Комментарий: ${order.notes}`)
    }
    return encodeURIComponent(lines.join('\n'))
  }

  const handleOrder = () => {
    if (!validate()) return
    if (cartItems.length === 0) return
    const msg = buildWhatsAppMessage()
    window.open(`https://wa.me/996702211124?text=${msg}`, '_blank', 'noopener,noreferrer')
    clearCart()
    closeCart()
  }

  const updateField = (field: keyof OrderDetails, value: string) => {
    setOrder((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label="Корзина"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside className="relative z-10 w-full sm:max-w-md bg-stone-900 border-l border-stone-800 flex flex-col h-full shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-800 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-400" />
            <h2 className="text-lg font-black text-stone-100">Корзина</h2>
            {cartItems.length > 0 && (
              <span className="bg-amber-500 text-stone-950 text-xs font-black rounded-full px-2 py-0.5">
                {cartItems.reduce((s, ci) => s + ci.quantity, 0)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {cartItems.length > 0 && (
              <button onClick={clearCart} className="text-xs text-stone-500 hover:text-red-400 transition-colors" aria-label="Очистить корзину">
                Очистить
              </button>
            )}
            <button onClick={closeCart} className="p-2 text-stone-400 hover:text-stone-200 rounded-xl hover:bg-stone-800 transition-colors" aria-label="Закрыть корзину">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 px-6 text-center">
              <ShoppingBag size={56} className="text-stone-700 mb-4" />
              <p className="text-stone-400 font-medium text-lg">Корзина пуста</p>
              <p className="text-stone-600 text-sm mt-1">Добавьте блюда из меню</p>
            </div>
          ) : (
            <div>
              {/* Cart items */}
              <ul className="divide-y divide-stone-800">
                {cartItems.map((ci) => (
                  <li key={ci.item.id} className="flex items-center gap-3 p-4">
                    <img src={ci.item.image} alt={ci.item.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-stone-100 text-sm truncate">{ci.item.title}</p>
                      <p className="text-amber-400 font-black text-base">
                        {ci.item.price * ci.quantity} <span className="text-xs text-stone-500 font-normal">сом</span>
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <button onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-700 transition-colors" aria-label="Уменьшить">
                          <Minus size={12} />
                        </button>
                        <span className="w-5 text-center text-sm font-bold text-stone-100">{ci.quantity}</span>
                        <button onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)} className="w-6 h-6 flex items-center justify-center rounded-lg bg-stone-800 text-stone-400 hover:text-stone-200 hover:bg-stone-700 transition-colors" aria-label="Увеличить">
                          <Plus size={12} />
                        </button>
                        <span className="text-xs text-stone-600 ml-1">× {ci.item.price} сом</span>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(ci.item.id)} className="p-2 text-stone-600 hover:text-red-400 hover:bg-stone-800 rounded-xl transition-colors shrink-0" aria-label={`Удалить ${ci.item.title}`}>
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>

              {/* Order form */}
              <div className="p-5 space-y-4 border-t border-stone-800">
                <h3 className="font-black text-stone-100 text-base">Оформление заказа</h3>

                {/* Order type */}
                <div className="flex gap-2">
                  {(['delivery', 'pickup'] as const).map((type) => (
                    <button key={type} onClick={() => updateField('orderType', type)}
                      className={`flex-1 py-2.5 rounded-xl text-sm font-bold border transition-all duration-200 ${
                        order.orderType === type
                          ? 'bg-amber-500 border-amber-500 text-stone-950'
                          : 'bg-stone-800 border-stone-700 text-stone-400 hover:border-stone-500'
                      }`} aria-pressed={order.orderType === type}>
                      {type === 'delivery' ? '🚗 Доставка' : '🏃 Самовывоз'}
                    </button>
                  ))}
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="cart-name" className="block text-xs font-semibold text-stone-400 mb-1.5">Имя *</label>
                  <input id="cart-name" type="text" value={order.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Ваше имя"
                    className={`w-full bg-stone-800 border rounded-xl px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 outline-none focus:border-amber-500 transition-colors ${errors.name ? 'border-red-500' : 'border-stone-700'}`}
                    aria-required="true" aria-invalid={!!errors.name} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="cart-phone" className="block text-xs font-semibold text-stone-400 mb-1.5">Номер телефона *</label>
                  <input id="cart-phone" type="tel" value={order.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="+996 700 000 000"
                    className={`w-full bg-stone-800 border rounded-xl px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 outline-none focus:border-amber-500 transition-colors ${errors.phone ? 'border-red-500' : 'border-stone-700'}`}
                    aria-required="true" aria-invalid={!!errors.phone} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Address (delivery only) */}
                {order.orderType === 'delivery' && (
                  <div>
                    <label htmlFor="cart-address" className="block text-xs font-semibold text-stone-400 mb-1.5">Адрес доставки *</label>
                    <input id="cart-address" type="text" value={order.address} onChange={(e) => updateField('address', e.target.value)} placeholder="Улица, дом, квартира"
                      className={`w-full bg-stone-800 border rounded-xl px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 outline-none focus:border-amber-500 transition-colors ${errors.address ? 'border-red-500' : 'border-stone-700'}`}
                      aria-required="true" aria-invalid={!!errors.address} />
                    {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
                  </div>
                )}

                {/* Notes */}
                <div>
                  <label htmlFor="cart-notes" className="block text-xs font-semibold text-stone-400 mb-1.5">Комментарий к заказу</label>
                  <textarea id="cart-notes" value={order.notes} onChange={(e) => updateField('notes', e.target.value)} placeholder="Особые пожелания, соус и т.д." rows={2}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-stone-100 placeholder:text-stone-600 outline-none focus:border-amber-500 transition-colors resize-none" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="p-5 border-t border-stone-800 space-y-3 shrink-0">
            {/* Summary */}
            <div className="flex items-center justify-between">
              <span className="text-stone-400 text-sm">Итого:</span>
              <span className="text-amber-400 font-black text-2xl">{totalPrice} <span className="text-base text-stone-400 font-semibold">сом</span></span>
            </div>
            {/* WhatsApp order button */}
            <button onClick={handleOrder}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-base rounded-2xl py-4 transition-all duration-200 shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 active:scale-[0.98]"
              aria-label="Оформить заказ через WhatsApp">
              <MessageCircle size={20} />
              Заказать через WhatsApp
            </button>
          </div>
        )}
      </aside>
    </div>
  )
}
