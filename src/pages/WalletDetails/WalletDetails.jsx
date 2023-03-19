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
  let { id } = useParams()

  const currentWallet = useSelector((state) => selectWalletById(state, id))

  return (
    <div>
      <WalletHeader name={currentWallet.name} id={currentWallet.id} />
      <WalletAssets />
      <WalletTransactions />
    </div>
  )
}

export default WalletDetails
