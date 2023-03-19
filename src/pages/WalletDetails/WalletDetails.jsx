// Components
import WalletHeader from '../../components/WalletHeader'
import WalletAssets from '../../components/WalletAssets'
import WalletTransactions from '../../components/WalletTransactions'

const WalletDetails = () => {
  return (
    <div>
      <WalletHeader />
      <WalletAssets />
      <WalletTransactions />
    </div>
  )
}

export default WalletDetails
