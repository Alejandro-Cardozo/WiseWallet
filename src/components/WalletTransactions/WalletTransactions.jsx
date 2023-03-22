// Hooks
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// Selectors and Actions
import { selectWalletTransactions, removeTransaction } from '../../store/slices/transactionsSlice'
// Components
import TimeAgo from '../UI/TimeAgo'
import ConfirmationPopup from '../UI/ConfirmationPopup'
import Modal from '../UI/Modal'
// Styles
import classes from './WalletTransactions.module.css'

const WalletTransactions = ({ walletId }) => {
  const transactions = useSelector((state) => selectWalletTransactions(state, walletId))

  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState('')
  const [selectedTransactionId, setSelectedTransactionId] = useState(null)

  const dispatcher = useDispatch()

  const handleToggleModal = (action = '', transactionId = null) => {
    setModalAction(action)
    setSelectedTransactionId(transactionId)
    setShowModal((prevState) => !prevState)
  }

  const handleDeleteTransaction = () => {
    dispatcher(removeTransaction(selectedTransactionId))
    handleToggleModal()
  }
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
              <td>
                <button onClick={handleToggleModal.bind(null, 'edit')}>edt</button>
                <button onClick={handleToggleModal.bind(null, 'delete', transaction.id)}>dlt</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          {modalAction === 'edit' && <p>Hello there</p>}
          {modalAction === 'delete' && (
            <ConfirmationPopup
              title='are u sure?'
              body='sure dude?'
              onConfirm={handleDeleteTransaction}
              onCancel={handleToggleModal}
            />
          )}
        </Modal>
      )}
    </div>
  )
}

export default WalletTransactions
