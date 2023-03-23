// Hooks
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// Selectors and Actions
import {
  selectWalletTransactions,
  removeTransaction,
  editTransaction
} from '../../store/slices/transactionsSlice'
import { addAmount, subtractAmount } from '../../store/slices/walletsSlice'
// Components
import TimeAgo from '../UI/TimeAgo'
import ConfirmationPopup from '../UI/ConfirmationPopup'
import EditTransactionForm from '../EditTransactionForm'
import Modal from '../UI/Modal'
// Styles
import classes from './WalletTransactions.module.css'

const WalletTransactions = ({ walletId }) => {
  const transactions = useSelector((state) => selectWalletTransactions(state, walletId))

  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState('')
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  const dispatcher = useDispatch()

  const handleToggleModal = (action = '', transaction = null) => {
    setModalAction(action)
    setSelectedTransaction(transaction)
    setShowModal((prevState) => !prevState)
  }

  const handleDeleteTransaction = () => {
    dispatcher(removeTransaction(selectedTransaction.id))
    handleToggleModal()
  }

  const handleEditTransaction = (amount, price) => {
    const editedTransaction = {
      id: selectedTransaction.id,
      amount,
      price
    }
    dispatcher(editTransaction(editedTransaction))
    setShowModal((prevState) => !prevState)
  }

  const handleChangeStatus = (newStatus, transactionType, data) => {
    dispatcher(editTransaction({ ...selectedTransaction, status: newStatus }))
    if (newStatus === 'approved') {
      if (transactionType === 'buy') {
        dispatcher(addAmount(data))
      } else if (transactionType === 'sell') {
        dispatcher(subtractAmount(data))
      }
    }
    setShowModal((prevState) => !prevState)
  }

  if (!transactions.length) {
    return <p>No transactions to show</p>
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
                {transaction.status === 'pending' && (
                  <button onClick={handleToggleModal.bind(null, 'edit', transaction)}>edt</button>
                )}
                <button onClick={handleToggleModal.bind(null, 'delete', transaction)}>dlt</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          {modalAction === 'edit' && (
            <EditTransactionForm
              handleEditTransaction={handleEditTransaction}
              handleChangeStatus={handleChangeStatus}
              handleToggleModal={handleToggleModal}
              walletId={walletId}
              transaction={selectedTransaction}
            />
          )}
          {modalAction === 'delete' && (
            <ConfirmationPopup
              title='Delete Transaction?'
              onConfirm={handleDeleteTransaction}
              onCancel={handleToggleModal}
            >
              <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-sm)' }}>
                this action is irreversible and cannot be undone. Are you're sure?
              </p>
            </ConfirmationPopup>
          )}
        </Modal>
      )}
    </div>
  )
}

export default WalletTransactions
