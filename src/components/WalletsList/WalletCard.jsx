const WalletCard = ({ name, balance }) => {
  return (
    <article style={{
      padding: '2rem 5rem',
      border: '1px solid var(--color-primary)',
      borderRadius: '5px'
    }}
    >
      <h4>{name}</h4>
      <p>${balance}</p>
    </article>
  )
}

export default WalletCard
