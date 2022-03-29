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

export function formatDate(date: Date | number) {
  return new Date(date).toLocaleString('es-ES', {
    year: '2-digit',
    month: '2-digit',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}
