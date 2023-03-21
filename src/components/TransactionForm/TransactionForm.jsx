// Hooks
import { useState } from 'react'
// Components
import Button from '../UI/Button'
// Styles
import classes from './TransactionForm.module.css'

const TransactionForm = ({ onClose, transactionType, coinName }) => {
  const [amount, setAmount] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div className={classes['form-container']}>
      <h4>{transactionType === 'buy' ? `Buy ${coinName}` : `Sell ${coinName}`}</h4>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          className={classes['form-control']}
          type='number'
          name='amount'
          id='amount'
          min={0}
          max={10}
          step={0.1}
          required
          autoFocus
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className={classes['form-control']}
          type='text'
          name='usd'
          id='usd'
          required
          disabled
          value={`$${Number(amount) * 2}`}
        />
        <Button disabled={!amount}>{transactionType === 'buy' ? 'Buy' : 'Sell'}</Button>
      </form>
      <button onClick={onClose} className={classes.close}>
        X
      </button>
    </div>
  )
}

export default TransactionForm
