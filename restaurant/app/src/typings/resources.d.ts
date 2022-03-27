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
