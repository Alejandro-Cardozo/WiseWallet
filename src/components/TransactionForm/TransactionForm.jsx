// Components
import Button from '../UI/Button'
// Styles
import classes from './WalletForm.module.css'

const TransactionForm = ({ onClose, transactionType, coinName }) => {
  const [amount, setAmount] = useState(walletName)

  return (
    <div className={classes['form-container']}>
      <h4>{transactionType = 'buy' ? `Buy ${coinName}` : `Sell ${coinName}`}</h4>
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
        <Button disabled={!amount}>{transactionType = 'buy' ? 'Buy' : 'Sell'}</Button>
      </form>
      <button onClick={onClose} className={classes.close}>
        X
      </button>
    </div>
  )
}

export default TransactionForm
