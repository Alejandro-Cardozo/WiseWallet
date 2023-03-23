// Hooks
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// Actions
import { deleteWallet } from '../../store/slices/walletsSlice'
// Components
import WalletForm from '../WalletForm'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
import ConfirmationPopup from '../UI/ConfirmationPopup'
// Styles
import classes from './WalletHeader.module.css'

const WalletHeader = ({ name, id, totalBalance }) => {
  const [showModal, setShowModal] = useState(false)
  const [modalAction, setModalAction] = useState('')

  const dispatcher = useDispatch()
  const navigate = useNavigate()

  const handleToggleModal = (action = '') => {
    setModalAction(action)
    setShowModal((prevState) => !prevState)
  }

  const handleDeleteWallet = () => {
    dispatcher(deleteWallet(id))
    navigate('/')
  }

  return (
    <>
      <article className={classes['wallet-header']}>
        <div className={classes['wallet-info']}>
          <h5>{name}</h5>
          <h2>${totalBalance}</h2>
        </div>
        <div className={classes['header-buttons']}>
          <Button
            styled={['sm', 'outlined-secondary']}
            onClick={handleToggleModal.bind(null, 'edit')}
          >
            edit
          </Button>
          <Button
            styled={['sm', 'outlined-secondary']}
            onClick={handleToggleModal.bind(null, 'delete')}
          >
            delete
          </Button>
        </div>
      </article>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          {modalAction === 'edit' && (
            <WalletForm onClose={handleToggleModal} walletName={name} walletId={id} />
          )}
          {modalAction === 'delete' && (
            <ConfirmationPopup
              title='Delete Wallet?'
              onConfirm={handleDeleteWallet}
              onCancel={handleToggleModal}
            >
              <p style={{ fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-sm)' }}>
                Are you sure you want to delete this wallet? Any unclaimed funds will be lost in
                limbo, and will probably end up in the pockets of a filthy politician.
              </p>
            </ConfirmationPopup>
          )}
        </Modal>
      )}
    </>
  )
}

export default WalletHeader
