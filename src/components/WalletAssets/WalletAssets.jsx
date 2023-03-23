// Hooks
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetCoinsMarketsQuery } from '../../store/api/apiSlice'
// Helpers
import { getCoinBalance, getBalanceValue } from './WalletAssets.helpers'
// Data
import { coinsMarketsQueryParams } from '../../data/data'
// Components
import Button from '../UI/Button'
import { Sparklines, SparklinesLine } from 'react-sparklines'
// Styles
import classes from './WalletAssets.module.css'

const WalletAssets = ({ walletCoins }) => {
  const navigate = useNavigate()
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
    return (
      <div className={classes['assets-table']}>
        <p>Loading...</p>
      </div>
    )
  } else if (isError) {
    return (
      <div className={classes['assets-table']}>
        <p>Something went wrong: {error.message || 'error'}</p>
      </div>
    )
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
      <h4 className={classes['table-title']}>Assets</h4>
      <table cellSpacing={0}>
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
            <tr key={coinMarket.id} onClick={() => navigate(`coin/${coinMarket.id}`)}>
              <td>
                <div className={classes.coin} title={coinMarket.name}>
                  <img src={coinMarket.image} alt='coin thumbnail' width={25} height={25} />
                  <p className={classes['coin-name']}>{coinMarket.name}</p>
                </div>
              </td>
              <td>
                {getCoinBalance(walletCoins, coinMarket)} {coinMarket.symbol}
              </td>
              <td>{getBalanceValue(walletCoins, coinMarket)}</td>
              <td>${coinMarket.current_price.toFixed(2)}</td>
              <td
                className={coinMarket.price_change_percentage_24h < 0 ? classes.down : classes.up}
              >
                {coinMarket.price_change_percentage_24h > 0 ? '+' : ''}
                {coinMarket.price_change_percentage_24h?.toFixed(2)}
              </td>
              <td>
                <div className='sparkline' style={{ width: 'calc(100% - 5rem)' }}>
                  <Sparklines data={coinMarket.sparkline_in_7d?.price}>
                    <SparklinesLine color='var(--color-secondary-light)' />
                  </Sparklines>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <div className={classes['action-buttons']}>
                <Button onClick={handlePreviousPage} disabled={pageFetched === 1 || isFetching}>
                  &larr; Previous
                </Button>
                <Button
                  onClick={handleNextPage}
                  disabled={coinsMarket.length < coinsMarketsQueryParams.per_page || isFetching}
                >
                  Next &rarr;
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

export default WalletAssets
