// Hooks
import { useSelector } from 'react-redux'
// Selectors
import { selectWalletTransactions } from '../../store/slices/transactionsSlice'
// Components
import TimeAgo from '../UI/TimeAgo/TimeAgo'
// Styles
import classes from './WalletTransactions.module.css'

const WalletTransactions = ({ walletId }) => {
  const transactions = useSelector((state) => selectWalletTransactions(state, walletId))
  return (
    <div className={classes['transactions-table']}>
      <h4>Transactions</h4>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Asset</th>
            <th>Amount</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.type}</td>
              <td>
                <TimeAgo timestamp={transaction.date} />
              </td>
              <td>{transaction.asset}</td>
              <td>{transaction.amount}</td>
              <td>${transaction.price}</td>
              <td>{transaction.status}</td>
              <td>edit/delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default WalletTransactions
