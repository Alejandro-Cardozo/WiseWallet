// Hooks
import { useState } from 'react'
// Components
import Button from '../../components/UI/Button/Button'
import TransactionForm from '../TransactionForm/TransactionForm'
import Modal from '../UI/Modal'
// Styles
import classes from './CoinHero.module.css'

const CoinHero = ({ walletId, coinInWallet, coinData }) => {
  const { id: coinId, name, image, market_data: marketData, symbol } = coinData
  const [showModal, setShowModal] = useState(false)
  const [transactionType, setTransactionType] = useState('')

  const handleToggleModal = (newTransactionType) => {
    setTransactionType(newTransactionType)
    setShowModal((prevState) => !prevState)
  }

  return (
    <div className={classes['coin-details']}>
      <div className={classes['coin-details__header']}>
        <img src={image.large} alt={`${name} thumbnail`} />
        <h4>{name}</h4>
      </div>
      <div className={classes['coin-details__balance']}>
        <p>
          <span>{coinInWallet ? coinInWallet.amount.toFixed(2) : 0}</span> {symbol.toUpperCase()}
        </p>
        <p>${coinInWallet ? (coinInWallet.amount * marketData.current_price.usd).toFixed(2) : 0}</p>
      </div>
      <div className={classes['coin-details__action-buttons']}>
        <Button styled={['lg']} onClick={handleToggleModal.bind(null, 'buy')}>
          BUY
        </Button>
        {coinInWallet?.amount > 0 && (
          <Button styled={['lg']} onClick={handleToggleModal.bind(null, 'sell')}>
            SELL
          </Button>
        )}
      </div>
      {showModal && (
        <Modal onClose={handleToggleModal}>
          <TransactionForm
            onClose={handleToggleModal}
            transactionType={transactionType}
            walletId={walletId}
            coinId={coinId}
            coinName={name}
            coinPrice={marketData.current_price.usd}
            coinSymbol={symbol}
            coinAmount={coinInWallet?.amount || 0}
          />
        </Modal>
      )}
    </div>
  )
}

export default CoinHero
