export function getDishesGroupedByCategory(dishes: Dish[]) {
  const dishesGroupedByCategory = dishes.reduce((object, dish) => {
    const { category, ...restDish } = dish
    if (!object[category]) object[category] = []
    object[category].push(restDish)
    return object
  }, {} as DishesGroupedByCategory)

  return dishesGroupedByCategory
}

export function formatCurrency(currency: number) {
  return currency.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  })
}
