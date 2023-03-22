// Utilities
import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = [
  {
    id: 'wallet-1',
    name: 'Main Wallet',
    coins: [
      {
        id: 'bitcoin',
        amount: 0.4
      },
      {
        id: 'ethereum',
        amount: 0.88
      },
      {
        id: 'cardano',
        amount: 1
      }
    ]
  },
  {
    id: 'wallet-2',
    name: 'Secondary Wallet',
    coins: [
      {
        id: 'bitcoin',
        amount: 0.5
      },
      {
        id: 'ethereum',
        amount: 0.1
      },
      {
        id: 'ripple',
        amount: 4
      }
    ]
  },
  {
    id: 'wallet-3',
    name: 'Secondary Wallet',
    coins: [
      {
        id: 'doge-coin',
        amount: 6.5
      },
      {
        id: 'polskadot',
        amount: 1.1
      },
      {
        id: 'ripple',
        amount: 1
      }
    ]
  },
  {
    id: 'wallet-4',
    name: 'Secondary Wallet',
    balance: 0,
    coins: [
      {
        id: 'tether',
        amount: 10.1
      },
      {
        id: 'tron',
        amount: 8
      }
    ]
  },
  {
    id: 'wallet-5',
    name: 'Secondary Wallet',
    coins: [
      {
        id: 'usd-coin',
        amount: 0.8
      }
    ]
  }
]

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
  const allCoins = state.wallets.map(wallet => wallet.coins.map(coin => coin.id)).flat(1)
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
