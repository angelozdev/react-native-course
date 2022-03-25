import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react'
import { getDishes } from '@services/menu'

export const dishesApi = createApi({
  reducerPath: 'dishesAPI',
  tagTypes: ['Dishes'],
  endpoints: (builder) => ({
    getDishes: builder.query<Dish[], void>({
      queryFn: async () => {
        try {
          const dishes = await getDishes()
          return { data: dishes }
        } catch (error) {
          return { error }
        }
      },
      providesTags: ['Dishes'],
    }),
  }),
  baseQuery: fakeBaseQuery(),
})
