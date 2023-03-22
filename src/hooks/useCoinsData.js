import { useGetCoinsMarketsQuery } from '../store/api/apiSlice'
import { coinsMarketsQueryParams } from '../data/data'

const useCoinsData = (wallet) => {
  // const { data, isSuccess, error, isError, isLoading } = useGetCoinsPriceQuery({
  //   ...coinsSimplePriceQueryParams,
  //   ids: wallet.coins.map((coin) => coin.id).join(',')
  // })
  const { data, isSuccess, error, isError, isLoading } = useGetCoinsMarketsQuery({
    ...coinsMarketsQueryParams,
    per_page: 100,
    sparkline: false,
    ids: wallet.coins.filter((coin) => coin.amount > 0).map((coin) => coin.id)
  })
  let totalBalance = 0
  let coinsImages = []
  if (isSuccess && wallet?.coins.length) {
    if (data.length > 0) {
      totalBalance = data.reduce(
        (acc, el) => acc + el.current_price * wallet.coins.find((coin) => coin.id === el.id).amount,
        0
      )
      coinsImages = data.map((obj) => obj.image)
    }
  }
  return { totalBalance, coinsImages, isSuccess, error, isError, isLoading }
}

export default useCoinsData
