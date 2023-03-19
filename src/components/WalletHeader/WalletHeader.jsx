// Hooks
import { useState } from 'react'
// Components
import AddWalletForm from '../WalletForm'
import Button from '../UI/Button'
import Modal from '../UI/Modal'
// Styles
import classes from './WalletHeader.module.css'

const WalletHeader = ({ name, id }) => {
  const [showModal, setShowModal] = useState(false)

  const handleToggleModal = () => {
    setShowModal((prevState) => !prevState)
  }

  return (
    <>
      <article className={classes['wallet-header']}>
        <div className={classes['wallet-info']}>
          <h5>{name}</h5>
          <h2>$10000</h2>
        </div>
        <div className={classes['header-buttons']}>
          <Button size='sm' onClick={handleToggleModal}>
            edit
          </Button>
          <Button size='sm'>delete</Button>
        </div>
      </article>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <AddWalletForm onClose={handleToggleModal} walletName={name} walletId={id} />
        </Modal>
      )}
    </>
  )
}

export default WalletHeader
