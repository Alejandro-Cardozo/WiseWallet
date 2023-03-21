// Hooks
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
// Helpers
import { selectWalletById } from '../../store/slices/walletsSlice'
// Components
import WalletHeader from '../../components/WalletHeader'
import WalletAssets from '../../components/WalletAssets'
import WalletTransactions from '../../components/WalletTransactions'
import useTotalBalance from '../../hooks/useTotalBalance'

const WalletDetails = () => {
  const { walletId } = useParams()
  const currentWallet = useSelector((state) => selectWalletById(state, walletId))
  const { totalBalance, isSuccess, error, isError, isLoading } = useTotalBalance(currentWallet)

  return (
    <div style={{ display: 'flex', gap: '4rem', height: '75vh' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 2 }}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>{error.message || 'error'}</p>}
        {isSuccess && (
          <WalletHeader
            name={currentWallet.name}
            id={currentWallet.id}
            totalBalance={totalBalance.toFixed(2)}
          />
        )}
        <WalletTransactions />
      </div>
      <WalletAssets walletCoins={currentWallet.coins} />
    </div>
  )
}

export default WalletDetails
