import { configureStore } from '@reduxjs/toolkit'
import walletsReducer from './slices/walletsSlice'
import transactionsReducer from './slices/transactionsSlice'
import { apiSlice } from './api/apiSlice'

export const store = configureStore({
  reducer: {
    wallets: walletsReducer,
    transactions: transactionsReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})
