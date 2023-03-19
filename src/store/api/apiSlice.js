// Utilities
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coingecko.com/api/v3' }),
  endpoints: (builder) => ({
    getCoinsList: builder.query({
      query: () => '/coins/list'
    }),
    getCoinsMarkets: builder.query({
      query: (args) => ({
        url: '/coins/markets',
        method: 'GET',
        params: { ...args }
      })
    }),
    getCoin: builder.query({
      query: (id) => `/coins/${id}`
    }),
    getCoinPrice: builder.query({
      query: (args) => ({
        url: '/simple/price',
        method: 'GET',
        params: { ...args }
      })
    })
  })
})

// exported custom hooks
export const { useGetCoinsListQuery, useGetCoinsMarketsQuery, useGetCoinQuery, useGetCoinPriceQuery } = apiSlice
