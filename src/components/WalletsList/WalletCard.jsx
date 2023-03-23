// Hooks
import { useNavigate } from 'react-router-dom'
// Components
import CoinsStack from '../UI/CoinsStack/CoinsStack'

const WalletCard = ({ coinsData, wallet, classes }) => {
  const { id, name } = wallet

  const navigate = useNavigate()

  const coinsInWallet = coinsData.filter((coin) =>
    wallet.coins.some((el) => el.id === coin.id && el.amount > 0)
  )

  const totalBalance = coinsInWallet.reduce(
    (acc, el) => acc + el.current_price * wallet.coins.find((coin) => coin.id === el.id).amount,
    0
  )
  const coinsImages = coinsInWallet.map((obj) => obj.image)

  return (
    <article className={classes.card} onClick={() => navigate(`/wallet/${id}`)}>
      <div className={classes.card__cover}>
        <h6 className={classes.card__name}>{name}</h6>
        <p className={classes.card__balance}>${totalBalance.toFixed(2)}</p>
        <CoinsStack coinsImages={coinsImages} />
        <img className={classes.card__watermark} src='/favicon.svg' alt='watermark' />
      </div>
    </article>
  )
}

export default WalletCard
