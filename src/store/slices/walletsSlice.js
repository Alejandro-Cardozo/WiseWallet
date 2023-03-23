// Utilities
import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = []

const walletsSlice = createSlice({
  name: 'wallets',
  initialState,
  reducers: {
    addWallet: {
      reducer (state, action) {
        state.push(action.payload)
      },
      prepare (name) {
        return {
          payload: {
            id: nanoid(),
            name,
            coins: []
          }
        }
      }
    },
    editWallet: {
      reducer (state, action) {
        const { walletId, walletNewName } = action.payload
        const existingWallet = state.find((wallet) => wallet.id === walletId)
        if (existingWallet) {
          existingWallet.name = walletNewName
        } else {
          console.log('not found')
        }
      }
    },
    deleteWallet: {
      reducer (state, action) {
        const walletIndex = state.findIndex((wallet) => wallet.id === action.payload)
        state.splice(walletIndex, 1)
      }
    },
    addAmount: {
      reducer (state, action) {
        const { walletId, coinId, totalAmount } = action.payload
        const existingWallet = state.find((wallet) => wallet.id === walletId)
        if (existingWallet) {
          const existingCoinIndex = existingWallet.coins.findIndex((coin) => coin.id === coinId)
          if (existingCoinIndex === -1) {
            existingWallet.coins.push({ id: coinId, amount: totalAmount })
          } else {
            existingWallet.coins[existingCoinIndex].amount += totalAmount
          }
        }
      }
    },
    subtractAmount: {
      reducer (state, action) {
        const { walletId, coinId, totalAmount } = action.payload
        const existingWallet = state.find((wallet) => wallet.id === walletId)
        if (existingWallet) {
          const existingCoinIndex = existingWallet.coins.findIndex((coin) => coin.id === coinId)
          existingWallet.coins[existingCoinIndex].amount -= totalAmount
        }
      }
    }
  }
})

// exported selectors
export const selectAllWallets = (state) => state.wallets
export const selectAllCoinsInWallets = (state) => {
  const allCoins = state.wallets.map((wallet) => wallet.coins.map((coin) => coin.id)).flat(1)
  return [...new Set(allCoins)]
}
export const selectWalletById = (state, walletId) =>
  state.wallets.find((wallet) => wallet.id === walletId)
export const selectWalletCoinField = (state, walletId, coinId, field) => {
  const wallet = state.wallets.find((wallet) => wallet.id === walletId)
  if (wallet) {
    const coinObject = wallet.coins.find((coin) => coin.id === coinId)
    if (coinObject) {
      return coinObject[field]
    }
  }
}

// exported actions
export const { addWallet, editWallet, deleteWallet, addAmount, subtractAmount } =
  walletsSlice.actions

// exported reducer
export default walletsSlice.reducer
