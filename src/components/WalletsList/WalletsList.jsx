// Hooks
import { useSelector } from 'react-redux'
// Selectors
import { selectAllWallets } from '../../store/slices/walletsSlice'
// Components
import Button from '../UI/Button'
import WalletCard from './WalletCard'
// Styles
import classes from './WalletsList.module.css'

const WalletsList = ({ OnAddWallet }) => {
  const wallets = useSelector(selectAllWallets)

  return (
    <section>
      <div className={classes.header}>
        <h2>My Wallets</h2>
        <Button onClick={OnAddWallet}>+ Add Wallet</Button>
      </div>
      <div className={classes.list}>
        {wallets.map((wallet) => (
          <WalletCard key={wallet.id} wallet={wallet} classes={classes.card} />
        ))}
      </div>
    </section>
  )
}

export default WalletsList
