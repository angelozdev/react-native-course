import { configureStore } from '@reduxjs/toolkit'

// reducers
import dishesReducer from '@features/menu/dishes.slice'
import cartReducer from '@features/cart/cart.slice'

const store = configureStore({
  reducer: {
    dishes: dishesReducer,
    cart: cartReducer,
  },
})

export default store
