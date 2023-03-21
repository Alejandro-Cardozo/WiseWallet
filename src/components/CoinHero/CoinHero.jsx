// Hooks
import { useState } from 'react'
// Components
import Button from '../../components/UI/Button/Button'
import TransactionForm from '../TransactionForm/TransactionForm'
import Modal from '../UI/Modal'
// Styles
import classes from './CoinHero.module.css'

const CoinHero = ({ coinInWallet, coinData }) => {
  const { name, image, market_data: marketData, symbol } = coinData
  const [showModal, setShowModal] = useState(false)
  const [transactionType, setTransactionType] = useState('')

  const handleToggleModal = (newTransactionType) => {
    setTransactionType(newTransactionType)
    setShowModal((prevState) => !prevState)
  }

  return (
    <div className={classes['coin-details']}>
      <div className={classes['coin-details__header']}>
        <img src={image.small} alt={`${name} thumbnail`} />
        <p>{name}</p>
      </div>
      <div className='coin-details__balance'>
        <p>
          {coinInWallet ? coinInWallet.amount : 0} {symbol}
        </p>
        <p>${coinInWallet ? (coinInWallet.amount * marketData.current_price.usd).toFixed(2) : 0}</p>
      </div>
      <div className={classes['coin-details__action-buttons']}>
        <Button size='lg' onClick={handleToggleModal.bind(null, 'buy')}>
          BUY
        </Button>
        {coinInWallet?.amount && (
          <Button size='lg' onClick={handleToggleModal.bind(null, 'sell')}>
            SELL
          </Button>
        )}
      </div>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <TransactionForm
            onClose={handleToggleModal}
            transactionType={transactionType}
            coinName={name}
          />
        </Modal>
      )}
    </div>
  )
}

export default CoinHero
