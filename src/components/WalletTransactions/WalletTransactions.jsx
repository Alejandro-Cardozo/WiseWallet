const WalletTransactions = () => {
  return (
    <div>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>Type</th>
            <th>Date</th>
            <th>Asset</th>
            <th>Amount</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Buy</td>
            <td>Today</td>
            <td>btc</td>
            <td>1</td>
            <td>215jl9djslu93aad</td>
            <td>pending</td>
          </tr>
          <tr>
            <td>Sell</td>
            <td>Tomorrow</td>
            <td>eth</td>
            <td>2</td>
            <td>asdf923h0jk4ks09</td>
            <td>failed</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default WalletTransactions
