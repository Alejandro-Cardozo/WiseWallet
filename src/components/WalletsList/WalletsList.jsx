// Hooks
import { useSelector } from 'react-redux'
import { selectAllWallets } from '../../store/slices/walletsSlice'
// Components
import WalletCard from './WalletCard'
// Styles
import classes from './WalletsList.module.css'

const WalletsList = () => {
  const wallets = useSelector(selectAllWallets)

  return (
    <section>
      <h2>My Wallets</h2>
      <div className={classes.list}>
        {wallets.map((wallet) => (
          <WalletCard key={wallet.id} name={wallet.name} balance={wallet.balance} />
        ))}
      </div>
    </section>
  )
}

export default WalletsList
