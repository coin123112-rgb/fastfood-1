export type Category = 'Шаурма & Хот-доги' | 'Бургеры & Фри' | 'Напитки'

export interface MenuItem {
  id: number
  category: Category
  title: string
  description: string
  price: number
  image: string
  tags: string[]
}

export const categories: Category[] = [
  'Шаурма & Хот-доги',
  'Бургеры & Фри',
  'Напитки',
]

export const menuItems: MenuItem[] = [
  // Шаурма & Хот-доги
  {
    id: 1,
    category: 'Шаурма & Хот-доги',
    title: 'Шаурма Классическая',
    description:
      'Фирменное мясо, свежие томаты, огурцы, капуста, фирменный соус №1. Идеальное сочетание вкуса и аромата в тёплом лаваше.',
    price: 220,
    image:
      'https://images.unsplash.com/photo-1561050501-dbe4c5e575a3?w=600&auto=format&fit=crop',
    tags: ['Популярное', 'Мясо'],
  },
  {
    id: 2,
    category: 'Шаурма & Хот-доги',
    title: 'Шаурма Сырная',
    description:
      'С добавлением сыра, запечённая до золотистой корочки. Нежный расплавленный сыр придаёт неповторимый вкус.',
    price: 230,
    image:
      'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop',
    tags: ['Сыр', 'Запечённая'],
  },
  {
    id: 3,
    category: 'Шаурма & Хот-доги',
    title: 'Шаурма Запечённая',
    description:
      'Сочная ароматная шаурма, приготовленная в печи. Хрустящий лаваш снаружи и сочная начинка внутри.',
    price: 250,
    image:
      'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?w=600&auto=format&fit=crop',
    tags: ['Хит', 'Запечённая'],
  },
  {
    id: 4,
    category: 'Шаурма & Хот-доги',
    title: 'Шаурдог',
    description:
      'Микс шаурмы и хот-дога в лаваше. Уникальное сочетание двух любимых блюд в одном.',
    price: 160,
    image:
      'https://images.unsplash.com/photo-1612392062631-94d4a45f20e5?w=600&auto=format&fit=crop',
    tags: ['Уникальное', 'Микс'],
  },
  {
    id: 5,
    category: 'Шаурма & Хот-доги',
    title: 'Хот-дог Классический',
    description:
      'С сочной сосиской и фирменным соусом. Свежая мягкая булочка и горчица по желанию.',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1612392061787-2b6e10d77ae6?w=600&auto=format&fit=crop',
    tags: ['Классика'],
  },

  // Бургеры & Фри
  {
    id: 6,
    category: 'Бургеры & Фри',
    title: 'Гамбургер с говядиной',
    description:
      'Сочное мясо, фирменный соус, свежие овощи в мягкой булочке. Классический гамбургер для настоящих ценителей.',
    price: 200,
    image:
      'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop',
    tags: ['Говядина', 'Классика'],
  },
  {
    id: 7,
    category: 'Бургеры & Фри',
    title: 'Чизбургер с говядиной',
    description:
      'Говяжья котлета, сыр Чеддер, фирменный соус. Сочная котлета с расплавленным сыром.',
    price: 200,
    image:
      'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600&auto=format&fit=crop',
    tags: ['Говядина', 'Сыр'],
  },
  {
    id: 8,
    category: 'Бургеры & Фри',
    title: 'Чизбургер с курицей',
    description:
      'Куриная котлета, сыр Чеддер, фирменный соус. Нежная курица с тягучим сыром.',
    price: 200,
    image:
      'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&auto=format&fit=crop',
    tags: ['Курица', 'Сыр'],
  },
  {
    id: 9,
    category: 'Бургеры & Фри',
    title: 'Картофель фри',
    description:
      'Золотистый и хрустящий картофель фри. Идеальное дополнение к любому блюду.',
    price: 100,
    image:
      'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&auto=format&fit=crop',
    tags: ['Гарнир', 'Хрустящий'],
  },

  // Напитки
  {
    id: 10,
    category: 'Напитки',
    title: 'Kinza',
    description: 'Освежающий газированный напиток Kinza. Бодрит и утоляет жажду.',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&auto=format&fit=crop',
    tags: ['Газированный'],
  },
  {
    id: 11,
    category: 'Напитки',
    title: 'Nitro',
    description: 'Энергетический напиток Nitro. Заряд энергии для вас.',
    price: 100,
    image:
      'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=600&auto=format&fit=crop',
    tags: ['Энергетик'],
  },
  {
    id: 12,
    category: 'Напитки',
    title: 'Мохито',
    description: 'Освежающий безалкогольный мохито с мятой и лимоном.',
    price: 80,
    image:
      'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=600&auto=format&fit=crop',
    tags: ['Безалкогольный', 'Свежий'],
  },
  {
    id: 13,
    category: 'Напитки',
    title: 'Салам чай',
    description: 'Традиционный чай с ароматными травами. Согревает и расслабляет.',
    price: 50,
    image:
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop',
    tags: ['Горячий', 'Традиционный'],
  },
  {
    id: 14,
    category: 'Напитки',
    title: 'Чалап',
    description: 'Традиционный кисломолочный напиток. Освежает и насыщает.',
    price: 60,
    image:
      'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=600&auto=format&fit=crop',
    tags: ['Традиционный', 'Молочный'],
  },
  {
    id: 15,
    category: 'Напитки',
    title: 'Ретро Кола',
    description: 'Классическая кола в стеклянной бутылке. Холодная и газированная.',
    price: 70,
    image:
      'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop',
    tags: ['Газированный', 'Классика'],
  },
  {
    id: 16,
    category: 'Напитки',
    title: 'Чай / Кофе',
    description: 'Горячий чай или ароматный кофе на ваш выбор. Идеально для отдыха.',
    price: 90,
    image:
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop',
    tags: ['Горячий'],
  },
]
