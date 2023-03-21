// Hooks
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useGetCoinQuery } from '../../store/api/apiSlice'
// Helpers
import { selectWalletById } from '../../store/slices/walletsSlice'
// Components
import CoinHero from '../../components/CoinHero/CoinHero'

const CoinDetails = () => {
  const { walletId, coinId } = useParams()

  const wallet = useSelector((state) => selectWalletById(state, walletId))
  const coinInWallet = wallet.coins.find((el) => el.id === coinId)
  const { data, isLoading, isError, error } = useGetCoinQuery(coinId)

  if (isLoading) return <p>Loading...</p>
  if (isError) {
    throw new Error(error.message)
  }

  return (
    <>
      <CoinHero coinInWallet={coinInWallet} coinData={data} />
    </>
  )
}

export default CoinDetails
