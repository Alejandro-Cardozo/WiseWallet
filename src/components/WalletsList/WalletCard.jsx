// Hooks
import { useNavigate } from 'react-router-dom'
import useTotalBalance from '../../hooks/useTotalBalance'

const WalletCard = ({ wallet, classes }) => {
  const { id, name } = wallet

  const navigate = useNavigate()

  const { totalBalance, isSuccess, error, isError, isLoading } = useTotalBalance(wallet)
  return (
    <article className={classes} onClick={() => navigate(`/wallet/${id}`)}>
      <h4>{name}</h4>
      {isLoading && <p>Loading...</p>}
      {isError && <p>{error.message || 'error'}</p>}
      {isSuccess && <p>${totalBalance.toFixed(2)}</p>}
    </article>
  )
}

export default WalletCard
