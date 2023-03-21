// Hooks
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetCoinQuery } from '../../store/api/apiSlice'
// Components
import Button from '../../components/UI/Button/Button'
// Styles
import classes from './CoinDetails.module.css'
import { selectWalletById } from '../../store/slices/walletsSlice'

const CoinDetails = () => {
  const { walletId, coinId } = useParams()

  const wallet = useSelector((state) => selectWalletById(state, walletId))
  const coinInWallet = wallet.coins.find((el) => el.id === coinId)
  const { data, isLoading, isError, error } = useGetCoinQuery(coinId)

  if (isLoading) return <p>Loading...</p>
  if (isError) {
    throw new Error(error.message)
  }

  const { name, image, market_data, symbol } = data

  return (
    <div className={classes['coin-details']}>
      <div className={classes['coin-details__header']}>
        <img src={image.small} alt={`${name} thumbnail`} />
        <p>{name}</p>
      </div>
      <div className='coin-details__balance'>
        <p>
          {coinInWallet ? coinInWallet.amount : 0} {symbol}
        </p>
        <p>
          ${coinInWallet ? (coinInWallet.amount * market_data.current_price.usd).toFixed(2) : 0}
        </p>
      </div>
      <div className={classes['coin-details__action-buttons']}>
        <Button size='lg'>BUY</Button>
        {coinInWallet?.amount && <Button size='lg'>SELL</Button>}
      </div>
    </div>
  )
}

export default CoinDetails
