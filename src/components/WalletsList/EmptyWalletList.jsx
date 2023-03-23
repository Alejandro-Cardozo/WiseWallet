import Button from '../UI/Button'

const EmptyWalletList = ({ classes, onClick }) => {
  return (
    <section className={classes['empty-wallet']}>
      <h2>Create a new wallet</h2>
      <p>Start buying and selling cryptocurrencies by creating your first wallet</p>
      <Button style={{ marginTop: '2rem' }} onClick={onClick}>
        Create wallet
      </Button>
      <img src='/wallet-1.png' alt='empty wallet' />
    </section>
  )
}

export default EmptyWalletList
