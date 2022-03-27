import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// types

const initialState: CartState = {
  count: 0,
  items: [],
  total: 0,
}

// utils
const getTotal = (items: Array<CartItem>): number => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0)
}

const { actions, reducer } = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addDishToCart: (state, { payload }: PayloadAction<CartItem>) => {
      const isAlreadyInCart = state.items.some((item) => item.id === payload.id)

      const newCart = isAlreadyInCart
        ? state.items.map((item) => {
            if (item.id === payload.id) {
              item.quantity += payload.quantity
              return item
            }
            return item
          })
        : [...state.items, payload]

      state.total = getTotal(newCart)
      state.items = newCart
      state.count = newCart.length
    },
    removeDishFromCart: (state, { payload }: PayloadAction<CartItem['id']>) => {
      const newCart = state.items.filter((item) => item.id !== payload)
      state.total = getTotal(newCart)
      state.items = newCart
      state.count = newCart.length
    },
    increaseQuantity: (state, { payload }: PayloadAction<CartItem['id']>) => {
      const newCart = state.items.map((item) => {
        if (item.id === payload) item.quantity++
        return item
      })
      state.total = getTotal(newCart)
      state.items = newCart
    },
    decreaseQuantity: (state, { payload }: PayloadAction<CartItem['id']>) => {
      const newCart = state.items.filter((item) => {
        if (item.id === payload) item.quantity--
        return item.quantity > 0
      })

      state.total = getTotal(newCart)
      state.items = newCart
      state.count = newCart.length
    },
    emptyCart: (state) => {
      state.items = []
      state.count = 0
      state.total = 0
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
