// Hooks
import { useState } from 'react'
import { useSelector } from 'react-redux'
// Actions
import { selectWalletCoinField } from '../../store/slices/walletsSlice'
// Components
import Button from '../UI/Button'
// Styles
import classes from './EditTransactionForm.module.css'

const EditTransactionForm = ({
  handleEditTransaction,
  handleChangeStatus,
  handleToggleModal,
  walletId,
  transaction
}) => {
  const {
    amount: currentAmount,
    type: transactionType,
    price: totalPrice,
    coinId,
    asset
  } = transaction
  const coinPrice = (totalPrice / currentAmount).toFixed(2)
  const [amount, setAmount] = useState(currentAmount)

  const coinAmount = useSelector((state) =>
    selectWalletCoinField(state, walletId, coinId, 'amount')
  )
  return (
    <div className={classes['form-container']}>
      <form className={classes.form}>
        <h4 className={classes['form-title']}>Edit Transaction</h4>
        <label className={classes.label}>
          <input
            className={classes['form-control']}
            type='number'
            name='amount'
            id='amount'
            min={0.01}
            step={0.01}
            max={transactionType === 'buy' ? 100 : coinAmount}
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
      </form>
      <div className={classes['action-buttons']}>
        <Button
          disabled={!amount || `${amount}` === `${currentAmount}`}
          onClick={() =>
            handleEditTransaction(Number(amount), (Number(amount) * coinPrice).toFixed(2))}
        >
          Edit
        </Button>
        <hr className={classes.ruler} />
        <Button
          disabled={`${amount}` !== `${currentAmount}`}
          onClick={() =>
            handleChangeStatus('approved', transactionType, {
              walletId,
              coinId,
              totalAmount: amount
            })}
        >
          Approve Transaction
        </Button>
        <Button
          styled={['outlined']}
          disabled={`${amount}` !== `${currentAmount}`}
          onClick={() => handleChangeStatus('canceled')}
        >
          Cancel Transaction
        </Button>
      </div>
      <button onClick={handleToggleModal} className={classes.close}>
        X
      </button>
    </div>
  )
}

export default EditTransactionForm
