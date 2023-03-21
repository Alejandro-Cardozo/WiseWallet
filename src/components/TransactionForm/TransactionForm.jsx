// Hooks
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// Actions
import { addAmount, subtractAmount } from '../../store/slices/walletsSlice'
// Components
import Button from '../UI/Button'
// Styles
import classes from './TransactionForm.module.css'

const TransactionForm = ({
  onClose,
  transactionType,
  walletId,
  coinId,
  coinName,
  coinPrice,
  coinSymbol,
  coinAmount = 0
}) => {
  const [amount, setAmount] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    const totalAmount = Number(amount)
    if (transactionType === 'buy') {
      dispatch(addAmount({ walletId, coinId, coinName, totalAmount }))
    } else if (transactionType === 'sell') {
      dispatch(subtractAmount({ walletId, coinId, totalAmount }))
    }
    onClose()
  }

  return (
    <div className={classes['form-container']}>
      <h4>{transactionType === 'buy' ? `Buy ${coinName}` : `Sell ${coinName}`}</h4>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label}>
          <input
            className={classes['form-control']}
            type='number'
            name='amount'
            id='amount'
            min={0.1}
            step={0.1}
            max={transactionType === 'buy' ? 100 : coinAmount}
            required
            autoFocus
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span>{coinSymbol}</span>
        </label>
        <label className={classes.label}>
          <input
            className={classes['form-control']}
            type='text'
            name='usd'
            id='usd'
            required
            disabled
            value={`$${(Number(amount) * coinPrice).toFixed(2)}`}
          />
          <span>usd</span>
        </label>

        <Button disabled={!amount}>{transactionType === 'buy' ? 'Buy' : 'Sell'}</Button>
      </form>
      <button onClick={onClose} className={classes.close}>
        X
      </button>
    </div>
  )
}

export default TransactionForm
