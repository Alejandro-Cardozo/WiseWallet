import { createSlice } from '@reduxjs/toolkit'

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
  reducers: {}
})

// exported selectors
export const selectAllWallets = (state) => state.wallets

export default walletsSlice.reducer
