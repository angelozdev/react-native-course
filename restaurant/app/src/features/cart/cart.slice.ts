import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// types
interface CartState {
  items: Array<CartItem>
  count: number
}

const initialState: CartState = {
  count: 0,
  items: [],
}

// utils

const { actions, reducer } = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDishToCart: (state, { payload }: PayloadAction<CartItem>) => {
      const isAlreadyInCart = state.items.some((item) => item.id === payload.id)
      if (!isAlreadyInCart) {
        state.items.push(payload)
        state.count++
        return
      }

      const sumQuantitiesOfEqualItems = (item: CartItem) => {
        if (item.id === payload.id) item.quantity += payload.quantity
        return item
      }

      state.items = state.items.map(sumQuantitiesOfEqualItems)
    },
    removeDishFromCart: (state, { payload }: PayloadAction<CartItem['id']>) => {
      const newCart = state.items.filter((item) => item.id !== payload)
      state.items = newCart
      state.count = newCart.length
    },
    increaseQuantity: (state, { payload }: PayloadAction<CartItem['id']>) => {
      const item = state.items.find(({ id }) => id === payload)
      if (item) item.quantity++
    },
    decreaseQuantity: (state, { payload }: PayloadAction<CartItem['id']>) => {
      const item = state.items.find(({ id }) => id === payload)
      if (!item) return
      const newQuantity = item?.quantity - 1
      if (newQuantity === 0) {
        state.items = state.items.filter(({ id }) => id !== payload)
        state.count--
      }
      if (newQuantity > 0) item.quantity = newQuantity
    },
    emptyCart: (state) => {
      state.items = []
      state.count = 0
    },
  },
})

export const {
  addDishToCart,
  removeDishFromCart,
  decreaseQuantity,
  increaseQuantity,
  emptyCart,
} = actions
export default reducer
