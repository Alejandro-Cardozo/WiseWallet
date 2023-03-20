export const getCoinBalance = (walletCoins, coinMarket) => {
  if (walletCoins.some((el) => el.id === coinMarket.id)) {
    const coinIndex = walletCoins.findIndex((el) => el.id === coinMarket.id)
    return walletCoins[coinIndex].amount
  } else {
    return 0
  }
}

export const getBalanceValue = (walletCoins, coinMarket) => {
  const balanceValue = getCoinBalance(walletCoins, coinMarket) * coinMarket.current_price
  return balanceValue.toFixed(2)
}
