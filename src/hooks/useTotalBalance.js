import { coinsSimplePriceQueryParams } from '../data/data'
import { useGetCoinsPriceQuery } from '../store/api/apiSlice'

const useTotalBalance = (wallet) => {
  const { data, isSuccess, error, isError, isLoading } = useGetCoinsPriceQuery({
    ...coinsSimplePriceQueryParams,
    ids: wallet.coins.map((coin) => coin.id).join(',')
  })
  let totalBalance = 0
  if (isSuccess) {
    for (const coinId in data) {
      totalBalance += data[coinId].usd * wallet.coins.find((el) => el.id === coinId).amount
    }
  }
  return { totalBalance, isSuccess, error, isError, isLoading }
}

export default useTotalBalance
