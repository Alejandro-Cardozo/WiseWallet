// Hooks
import { useGetCoinsMarketsQuery } from '../store/api/apiSlice'
// Data
import { coinsMarketsQueryParams } from '../data/data'

const useCoinsData = (coinsInWallets) => {
  const { data, isSuccess, error, isError, isLoading } = useGetCoinsMarketsQuery({
    ...coinsMarketsQueryParams,
    per_page: 100,
    sparkline: false,
    ids: coinsInWallets
  })
  return { data, isSuccess, error, isError, isLoading }
}

export default useCoinsData
