import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FirebaseError } from 'firebase/app'

interface OrdersState {
  data: {
    orders: Order[]
  }
  isLoading: boolean
  error: FirebaseError | null
  isError: boolean
}

const initialState: OrdersState = {
  data: {
    orders: [],
  },
  isLoading: false,
  error: null,
  isError: false,
}

const { actions, reducer } = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    gotOrdersSuccessfully: (state, { payload }: PayloadAction<Order[]>) => {
      state.data.orders = payload
      state.isLoading = false
      state.isError = false
    },
    gotOrdersWithError: (state, { payload }: PayloadAction<FirebaseError>) => {
      state.error = payload
      state.isLoading = false
      state.isError = true
    },
    gettingOrders: (state) => {
      state.isLoading = true
      state.isError = false
      state.error = null
    },
  },
})

export const { gettingOrders, gotOrdersSuccessfully, gotOrdersWithError } =
  actions
export default reducer
