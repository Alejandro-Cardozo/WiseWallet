// Hooks
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useCoinsData from '../../hooks/useCoinsData'
// Selectors
import { selectAllCoinsInWallets, selectWalletById } from '../../store/slices/walletsSlice'
// Components
import WalletHeader from '../../components/WalletHeader'
import WalletAssets from '../../components/WalletAssets'
import WalletTransactions from '../../components/WalletTransactions'

const WalletDetails = () => {
  const { walletId } = useParams()
  const currentWallet = useSelector((state) => selectWalletById(state, walletId))
  const coinsInWallets = useSelector(selectAllCoinsInWallets)

  const { data, isSuccess, error, isError, isLoading } = useCoinsData(coinsInWallets.join(','))

  let coinsInWallet
  let totalBalance

  if (isSuccess) {
    coinsInWallet = data.filter((coin) => currentWallet.coins.some((el) => el.id === coin.id))

    totalBalance = coinsInWallet.reduce(
      (acc, el) =>
        acc + el.current_price * currentWallet.coins.find((coin) => coin.id === el.id).amount,
      0
    )
  }

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
        <WalletTransactions walletId={walletId} />
      </div>
      <WalletAssets walletCoins={currentWallet.coins} />
    </div>
  )
}

export default WalletDetails
