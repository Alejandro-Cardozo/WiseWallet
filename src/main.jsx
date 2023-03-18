// Utilities
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { store } from './store'
import { Provider } from 'react-redux'
// Pages
import Wallets from './pages/Wallets'
import ErrorPage from './pages/ErrorPage'
// Components
import Layout from './components/Layout'
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
        path: '/wallets',
        element: <Wallets />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
)
