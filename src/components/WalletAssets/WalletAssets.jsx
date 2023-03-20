// Hooks
import { useState } from 'react'
import { useGetCoinsMarketsQuery } from '../../store/api/apiSlice'
// Data
import { coinsMarketsQueryParams } from '../../data/data'
// Styles
import classes from './WalletAssets.module.css'

const WalletAssets = () => {
  const [pageFetched, setPageFetched] = useState(1)
  const {
    data: coinsMarket,
    isLoading,
    isFetching,
    isError,
    error
  } = useGetCoinsMarketsQuery({
    ...coinsMarketsQueryParams,
    page: `${pageFetched}`
  })

  if (isLoading) {
    return <p>Loading...</p>
  } else if (isError) {
    return <p>Something went wrong: {error}</p>
  }

  const handleNextPage = () => {
    setPageFetched((page) => page + 1)
    document.getElementById('assets-table').scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }
  const handlePreviousPage = () => {
    if (pageFetched > 1) {
      setPageFetched((page) => page - 1)
      document.getElementById('assets-table').scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className={classes['assets-table']} id='assets-table'>
      <h3>Assets</h3>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Balance</th>
            <th>Value</th>
            <th>Price</th>
            <th>24h</th>
            <th>7 days chart</th>
          </tr>
        </thead>
        <tbody>
          {coinsMarket.map((coinMarket) => (
            <tr key={coinMarket.id}>
              <td>{coinMarket.name}</td>
              <td>0 {coinMarket.symbol}</td>
              <td>$0</td>
              <td>${coinMarket.current_price}</td>
              <td>
                {coinMarket.price_change_percentage_24h > 0
                  ? `+${coinMarket.price_change_percentage_24h.toFixed(2)}`
                  : coinMarket.price_change_percentage_24h.toFixed(2)}
              </td>
              <td>--/--/\--\/-</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td rowSpan='6'>
              <button onClick={handlePreviousPage} disabled={pageFetched === 1 || isFetching}>
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={coinsMarket.length < coinsMarketsQueryParams.per_page || isFetching}
              >
                Next
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default WalletAssets