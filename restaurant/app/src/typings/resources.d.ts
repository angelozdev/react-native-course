type Dish = {
  category: string
  description: string
  image: string | null
  name: string
  id: string
  price: number
}

type DishesGroupedByCategory = Record<string, Omit<Dish, 'category'>[]>
type CartItem = Dish & { quantity: number }

type Order = {
  id: string
  items: CartItem[]
  total: number
  createdAt: number
  status: 'pending' | 'delivered' | 'cancelled'
  count: number
}

interface CartState {
  items: Array<CartItem>
  count: number
  total: number
}
