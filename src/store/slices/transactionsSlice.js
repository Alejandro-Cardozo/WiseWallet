// Utilities
import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  {
    id: 'transaction-1',
    walletId: 'wallet-2',
    type: 'Buy',
    date: new Date().toISOString(),
    asset: 'eth',
    amount: 0.2,
    price: 361.12,
    status: 'pending'
  },
  {
    id: 'transaction-1',
    walletId: 'wallet-1',
    type: 'Sell',
    date: new Date().toISOString(),
    asset: 'dot',
    amount: 1,
    price: 6.4,
    status: 'succeeded'
  },
  {
    id: 'transaction-1',
    walletId: 'wallet-1',
    type: 'Buy',
    date: new Date().toISOString(),
    asset: 'usdc',
    amount: 4,
    price: 4.01,
    status: 'failed'
  }
]

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction: {
      reducer (state, action) {
        state.push(action.payload)
      },
      prepare (type, asset, amount, price) {
        return {
          payload: {
            id: nanoid,
            type,
            date: new Date().toISOString(),
            asset,
            amount,
            price,
            status: 'pending'
          }
        }
      }
    }
  }
})

// exported selectors
export const selectWalletTransactions = (state, walletId) =>
  state.transactions.filter((transaction) => transaction.walletId === walletId)

// exported actions
export const { addTransaction } = transactionsSlice.actions

// exported reducer
export default transactionsSlice.reducer
