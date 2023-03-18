import { configureStore } from '@reduxjs/toolkit'
import walletsReducer from './slices/walletsSlice'

export const store = configureStore({
  reducer: {
    wallets: walletsReducer
  }
})
