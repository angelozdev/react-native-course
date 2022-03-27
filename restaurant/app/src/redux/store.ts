import { configureStore } from '@reduxjs/toolkit'

// reducers
import dishesReducer from '@features/menu/dishes.slice'
import cartReducer from '@features/cart/cart.slice'
import ordersReducer from '@features/orders/orders.slice'

const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
})

export default store
