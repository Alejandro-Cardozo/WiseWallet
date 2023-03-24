import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist'
import walletsReducer from './slices/walletsSlice'
import transactionsReducer from './slices/transactionsSlice'
import { apiSlice } from './api/apiSlice'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  wallets: walletsReducer,
  transactions: transactionsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat(apiSlice.middleware),
  devTools: true
})

export const persistor = persistStore(store)
