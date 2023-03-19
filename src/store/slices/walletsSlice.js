// Utilities
import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  {
    id: 'wallet-1',
    name: 'Main Wallet',
    balance: 0,
    coins: [
      {
        id: 'bitcoin',
        name: 'bitcoin',
        amount: 0.4
      },
      {
        id: 'eth',
        name: 'ethereum',
        amount: 0.88
      }
    ]
  },
  {
    id: 'wallet-2',
    name: 'Secondary Wallet',
    balance: 0,
    coins: [
      {
        id: 'bitcoin',
        name: 'bitcoin',
        amount: 0.5
      },
      {
        id: 'eth',
        name: 'ethereum',
        amount: 0.1
      }
    ]
  }
]

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    addWallet: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(name) {
        return {
          payload: {
            id: nanoid(),
            name,
            balance: 0,
            coins: []
          }
        }
      }
    },
    editWallet: {
      reducer(state, action) {
        const { walletId, walletNewName } = action.payload
        const existingWallet = state.find((wallet) => wallet.id === walletId)
        if (existingWallet) {
          existingWallet.name = walletNewName
        } else {
          console.log('not found')
        }
      }
    }
  }
})

// exported selectors
export const selectAllWallets = (state) => state.wallets
export const selectWalletById = (state, walletId) =>
  state.wallets.find((wallet) => wallet.id === walletId)

// exported actions
export const { addWallet, editWallet } = walletsSlice.actions

// exported reducer
export default walletsSlice.reducer
