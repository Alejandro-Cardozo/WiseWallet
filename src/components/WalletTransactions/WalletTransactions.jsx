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
// Icons
import { Pencil, Trash, Hourglass, X, Check } from '@phosphor-icons/react'
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

  const statusIcons = {
    pending: <Hourglass size={16} color='gray' />,
    approved: <Check size={16} color='green' />,
    canceled: <X size={16} color='#ff0000' />
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
            <th style={{ textAlign: 'center' }}>Status</th>
            <th style={{ textAlign: 'center' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                {transaction.type === 'buy' ? '⬇' : '⬆'}
                {transaction.type}
              </td>
              <td>
                <TimeAgo timestamp={transaction.date} />
              </td>
              <td>{transaction.asset}</td>
              <td>{transaction.amount}</td>
              <td>${transaction.price}</td>
              <td>
                <div className={classes.centered} title={transaction.status.toUpperCase()}>
                  {statusIcons[transaction.status]}
                </div>
              </td>
              <td className={classes.centered}>
                {transaction.status === 'pending' && (
                  <button
                    title='Edit'
                    className={classes['action-btn']}
                    onClick={handleToggleModal.bind(null, 'edit', transaction)}
                  >
                    <Pencil size={16} color='var(--color-primary-lightest)' weight='fill' />
                  </button>
                )}
                <button
                  title='Delete'
                  className={classes['action-btn']}
                  onClick={handleToggleModal.bind(null, 'delete', transaction)}
                >
                  <Trash size={16} color='var(--color-primary-lightest)' weight='fill' />
                </button>
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
                This action is irreversible and cannot be undone. Are you're sure?
              </p>
            </ConfirmationPopup>
          )}
        </Modal>
      )}
    </div>
  )
}

export default WalletTransactions
