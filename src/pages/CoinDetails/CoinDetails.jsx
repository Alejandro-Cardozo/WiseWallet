// Hooks
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetCoinQuery } from '../../store/api/apiSlice'
// Helpers
import { selectWalletById } from '../../store/slices/walletsSlice'
// Components
import CoinHero from '../../components/CoinHero/CoinHero'
import Button from '../../components/UI/Button'

const CoinDetails = () => {
  const { walletId, coinId } = useParams()
  const navigate = useNavigate()

  const wallet = useSelector((state) => selectWalletById(state, walletId))
  const coinInWallet = wallet.coins.find((el) => el.id === coinId)
  const { data, isLoading, isError, error } = useGetCoinQuery(coinId)

  if (isLoading) return <p>Loading...</p>
  if (isError) {
    return <p>Something went wrong: {error.message || 'error'}</p>
  }

  return (
    <>
      <Button styled={['button-link']} onClick={() => navigate(-1)}>&larr; Go back to {wallet.name}</Button>
      <CoinHero walletId={walletId} coinInWallet={coinInWallet} coinData={data} />
    </>
  )
}

export default CoinDetails
