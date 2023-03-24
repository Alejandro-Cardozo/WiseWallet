// Utilities
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { persistor, store } from './store'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
// Pages
import Wallets from './pages/Wallets'
import ErrorPage from './pages/ErrorPage'
// Components
import Layout from './components/Layout'
import WalletDetails from './pages/WalletDetails'
import CoinDetails from './pages/CoinDetails'
// Styles
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Wallets />
      },
      {
        path: '/wallet/:walletId',
        element: <WalletDetails />
      },
      {
        path: '/wallet/:walletId/coin/:coinId',
        element: <CoinDetails />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
