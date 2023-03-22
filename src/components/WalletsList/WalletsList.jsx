// Hooks
import { useSelector } from 'react-redux'
import useCoinsData from '../../hooks/useCoinsData'
// Selectors
import { selectAllWallets, selectAllCoinsInWallets } from '../../store/slices/walletsSlice'
// Components
import Button from '../UI/Button'
import WalletCard from './WalletCard'
// Styles
import classes from './WalletsList.module.css'

const WalletsList = ({ OnAddWallet }) => {
  const wallets = useSelector(selectAllWallets)
  const coinsInWallets = useSelector(selectAllCoinsInWallets)

  const { data, isSuccess, error, isError, isLoading } = useCoinsData(coinsInWallets.join(','))

  return (
    <section>
      <div className={classes.header}>
        <h3>My Wallets</h3>
        <Button onClick={OnAddWallet}>+ Add Wallet</Button>
      </div>
      <div className={classes.list}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message || 'error'}</p>}
        {isSuccess &&
          wallets.map((wallet) => (
            <WalletCard key={wallet.id} coinsData={data} wallet={wallet} classes={classes.card} />
          ))}
      </div>
    </section>
  )
}

export default WalletsList
