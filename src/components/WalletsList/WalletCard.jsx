// Hooks
import { useNavigate } from 'react-router-dom'
import useCoinsData from '../../hooks/useCoinsData'
import CoinsStack from '../UI/CoinsStack/CoinsStack'

const WalletCard = ({ wallet, classes }) => {
  const { id, name } = wallet

  const navigate = useNavigate()

  const { totalBalance, coinsImages, isSuccess, error, isError, isLoading } = useCoinsData(wallet)
  return (
    <article className={classes} onClick={() => navigate(`/wallet/${id}`)}>
      <h4>{name}</h4>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message || 'error'}</p>}
      {isSuccess && <p>${totalBalance.toFixed(2)}</p>}
      {isSuccess && <CoinsStack coinsImages={coinsImages} />}
    </article>
  )
}

export default WalletCard
