// Hooks
import { useNavigate } from 'react-router-dom'
import CoinsStack from '../UI/CoinsStack/CoinsStack'

const WalletCard = ({ coinsData, wallet, classes }) => {
  const { id, name } = wallet

  const navigate = useNavigate()

  const coinsInWallet = coinsData.filter((coin) => wallet.coins.some((el) => el.id === coin.id))

  const totalBalance = coinsInWallet.reduce(
    (acc, el) => acc + el.current_price * wallet.coins.find((coin) => coin.id === el.id).amount,
    0
  )
  const coinsImages = coinsInWallet.map((obj) => obj.image)

  return (
    <article className={classes} onClick={() => navigate(`/wallet/${id}`)}>
      <h4>{name}</h4>
      <p>${totalBalance.toFixed(2)}</p>
      <CoinsStack coinsImages={coinsImages} />
    </article>
  )
}

export default WalletCard
