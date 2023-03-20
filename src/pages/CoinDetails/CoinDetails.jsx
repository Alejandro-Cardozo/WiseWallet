// Hooks
import { useParams } from 'react-router-dom'
// Components
import Button from '../../components/UI/Button/Button'
// Styles
import classes from './CoinDetails.module.css'

const CoinDetails = () => {
  const { coinId } = useParams()
  return (
    <div className={classes['coin-details']}>
      <div className='coin-details__header'>
        <img src='' alt='' />
        <p>coin: {coinId}</p>
      </div>
      <div className='coin-details__balance'>
        <p>0 BTC</p>
        <p>$0</p>
      </div>
      <div className={classes['coin-details__action-buttons']}>
        <Button size='lg'>BUY</Button>
        <Button size='lg'>SELL</Button>
      </div>
    </div>
  )
}

export default CoinDetails
