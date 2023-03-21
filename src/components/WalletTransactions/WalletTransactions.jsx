// Styles
import classes from './WalletTransactions.module.css'

const WalletTransactions = () => {
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
          <tr>
            <td>Buy</td>
            <td>Today</td>
            <td>btc</td>
            <td>1</td>
            <td>$400</td>
            <td>pending</td>
            <td>edit/delete</td>
          </tr>
          <tr>
            <td>Sell</td>
            <td>Yesterday</td>
            <td>eth</td>
            <td>2</td>
            <td>$123</td>
            <td>failed</td>
            <td>edit/delete</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default WalletTransactions
