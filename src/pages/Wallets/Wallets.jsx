// Hooks
import { useState } from 'react'
// Components
import AddWalletForm from '../../components/AddWalletForm'
import Modal from '../../components/UI/Modal'
import WalletsList from '../../components/WalletsList'

const Wallets = () => {
  const [showModal, setShowModal] = useState(false)

  const handleToggleModal = () => {
    setShowModal((prevState) => !prevState)
  }
  return (
    <>
      <WalletsList OnAddWallet={handleToggleModal} />
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <AddWalletForm onClose={handleToggleModal} />
        </Modal>
      )}
    </>
  )
}

export default Wallets
