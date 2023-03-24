import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storageSession from 'redux-persist/lib/storage/session'
import { persistReducer, persistStore } from 'redux-persist'
import walletsReducer from './slices/walletsSlice'
import transactionsReducer from './slices/transactionsSlice'
import { apiSlice } from './api/apiSlice'

const persistConfig = {
  key: 'root',
  storage: storageSession
}

const rootReducer = combineReducers({
  wallets: walletsReducer,
  transactions: transactionsReducer,
  [apiSlice.reducerPath]: apiSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
})

export const persistor = persistStore(store)
