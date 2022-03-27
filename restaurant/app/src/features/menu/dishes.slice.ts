import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { FirebaseError } from 'firebase/app'
import { getDishesGroupedByCategory } from './utils'

interface DishesState {
  data: {
    dishes: Dish[]
    dishesGroupedByCategory: DishesGroupedByCategory
  }
  isLoading: boolean
  error: FirebaseError | null
  isError: boolean
}

const initialState: DishesState = {
  data: {
    dishes: [],
    dishesGroupedByCategory: {},
  },
  isLoading: true,
  error: null,
  isError: false,
}

const { reducer, actions } = createSlice({
  name: 'dishes',
  initialState,
  reducers: {
    getDishesSuccessfully: (state, { payload }: PayloadAction<Dish[]>) => {
      state.data.dishes = payload
      state.isLoading = false
      state.isError = false
      state.error = null
      state.data.dishesGroupedByCategory = getDishesGroupedByCategory(payload)
    },
    gettingDishes: (state) => {
      state.isLoading = true
      state.error = null
    },
    getDishesWithError: (state, { payload }: PayloadAction<FirebaseError>) => {
      state.isLoading = false
      state.error = payload
      state.isError = true
    },
    setIsLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload
    },
  },
})

export const {
  getDishesSuccessfully,
  getDishesWithError,
  gettingDishes,
  setIsLoading,
} = actions

export default reducer
