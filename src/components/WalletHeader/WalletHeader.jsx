// Components
import Button from '../UI/Button'
// Styles
import classes from './WalletHeader.module.css'

const WalletHeader = () => {
  return (
    <article className={classes['wallet-header']}>
      <div className={classes['wallet-info']}>
        <h5>Wallet Name</h5>
        <h2>$10000</h2>
      </div>
      <div className={classes['header-buttons']}>
        <Button size='sm'>edit</Button>
        <Button size='sm'>delete</Button>
      </div>
    </article>
  )
}

export default WalletHeader
