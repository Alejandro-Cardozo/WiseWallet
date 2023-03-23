// Hooks
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// Actions
import { addTransaction } from '../../store/slices/transactionsSlice'
// Components
import Button from '../UI/Button'
// Styles
import classes from './TransactionForm.module.css'

const TransactionForm = ({
  onClose,
  transactionType: type,
  walletId,
  coinId,
  coinName,
  coinPrice,
  coinSymbol: asset,
  coinAmount = 0
}) => {
  const [amount, setAmount] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    const totalAmount = Number(amount)
    const totalPrice = (coinPrice * totalAmount).toFixed(2)
    dispatch(
      addTransaction({
        type,
        walletId,
        coinId,
        asset,
        amount: totalAmount,
        price: totalPrice
      })
    )
    onClose()
    navigate(`/wallet/${walletId}`)
  }

  return (
    <div className={classes['form-container']}>
      <h4>{type === 'buy' ? `Buy ${coinName}` : `Sell ${coinName}`}</h4>
      <form className={classes.form} onSubmit={handleSubmit}>
        <label className={classes.label}>
          <input
            className={classes['form-control']}
            type='number'
            name='amount'
            id='amount'
            min={0.01}
            step={0.01}
            max={type === 'buy' ? 100 : coinAmount}
            required
            autoFocus
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <span>{asset}</span>
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

        <Button disabled={!amount}>{type === 'buy' ? 'Buy' : 'Sell'}</Button>
      </form>
      <button onClick={onClose} className={classes.close}>
        X
      </button>
    </div>
  )
}

export default TransactionForm
