import { configureStore } from '@reduxjs/toolkit'

// reducers
import dishesReducer from '@features/menu/dishes.slide'

const store = configureStore({
  reducer: {
    dishes: dishesReducer,
  },
})

export default store
