// Hooks
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
// Helpers
import { selectWalletById } from '../../store/slices/walletsSlice'
// Components
import WalletHeader from '../../components/WalletHeader'
import WalletAssets from '../../components/WalletAssets'
import WalletTransactions from '../../components/WalletTransactions'

const WalletDetails = () => {
  const { id } = useParams()

  const currentWallet = useSelector((state) => selectWalletById(state, id))

  return (
    <div style={{ display: 'flex', gap: '4rem', height: '75vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 2 }}>
        <WalletHeader name={currentWallet.name} id={currentWallet.id} />
        <WalletTransactions />
      </div>
      <WalletAssets walletCoins={currentWallet.coins} />
    </div>
  )
}

export default WalletDetails
