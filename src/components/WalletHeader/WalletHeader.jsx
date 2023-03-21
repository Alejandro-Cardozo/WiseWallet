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

  const deleteConfirmation = (
    <div style={{ textAlign: 'center' }}>
      <h3>Are you sure you want to delete this wallet?</h3>
      <p style={{ margin: '2rem' }}>This action is irreversible!</p>
      <div style={{ display: 'flex', gap: '1rem', margin: '0 auto', width: 'max-content' }}>
        <Button onClick={handleDeleteWallet}>Do it</Button>
        <Button onClick={handleToggleModal}>Cancel</Button>
      </div>
    </div>
  )

  return (
    <>
      <article className={classes['wallet-header']}>
        <div className={classes['wallet-info']}>
          <h5>{name}</h5>
          <h2>${totalBalance}</h2>
        </div>
        <div className={classes['header-buttons']}>
          <Button size='sm' onClick={handleToggleModal.bind(null, 'edit')}>
            edit
          </Button>
          <Button size='sm' onClick={handleToggleModal.bind(null, 'delete')}>
            delete
          </Button>
        </div>
      </article>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          {modalAction === 'edit' && (
            <WalletForm onClose={handleToggleModal} walletName={name} walletId={id} />
          )}
          {modalAction === 'delete' && deleteConfirmation}
        </Modal>
      )}
    </>
  )
}

export default WalletHeader
