// Styles
import classes from './EmptyTransactionsList.module.css'

const EmptyTransactionsList = () => {
  return (
    <div className={classes['empty-list']}>
      <img src='/no-transactions.png' alt='transactions list is empty' />
      <p>Your transaction list is empty</p>
    </div>
  )
}

export default EmptyTransactionsList
