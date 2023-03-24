// Utilities
import { createSlice, nanoid } from '@reduxjs/toolkit'

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: [],
  reducers: {
    addTransaction: {
      reducer (state, action) {
        state.unshift(action.payload)
      },
      prepare ({ type, walletId, coinId, asset, amount, price }) {
        return {
          payload: {
            id: nanoid(),
            walletId,
            coinId,
            type,
            date: new Date().toISOString(),
            asset,
            amount,
            price,
            status: 'pending'
          }
        }
      }
    },
    removeTransaction: {
      reducer (state, action) {
        const transactionIndex = state.findIndex((transaction) => transaction.id === action.payload)
        state.splice(transactionIndex, 1)
      }
    },
    editTransaction: {
      reducer (state, action) {
        const { id } = action.payload
        const transactionIndex = state.findIndex((transaction) => transaction.id === id)
        state[transactionIndex] = { ...state[transactionIndex], ...action.payload }
      }
    }
  }
})

// exported selectors
export const selectWalletTransactions = (state, walletId) =>
  state.transactions.filter((transaction) => transaction.walletId === walletId)

// exported actions
export const { addTransaction, removeTransaction, editTransaction } = transactionsSlice.actions

// exported reducer
export default transactionsSlice.reducer
