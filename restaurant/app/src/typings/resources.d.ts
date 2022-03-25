type Dish = {
  available: boolean
  category: string
  description: string
  image: string | null
  name: string
  id: string
  price: number
}

type DishesGroupedByCategory = Record<string, Omit<Dish, 'category'>[]>
