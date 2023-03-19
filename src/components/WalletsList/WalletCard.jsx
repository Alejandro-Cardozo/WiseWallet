// Hooks
import { useNavigate } from 'react-router-dom'

const WalletCard = ({ id, name, balance, classes }) => {
  const navigate = useNavigate()

  return (
    <article className={classes} onClick={() => navigate(`/wallet/${id}`)}>
      <h4>{name}</h4>
      <p>${balance}</p>
    </article>
  )
}

export default WalletCard
