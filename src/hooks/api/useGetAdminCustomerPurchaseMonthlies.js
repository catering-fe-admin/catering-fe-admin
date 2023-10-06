import { useQuery } from '@tanstack/react-query'
import { getAdminCustomerPurchaseMonthlies } from 'src/client/adminCustomerPurchaseMonthlies'

import queries from 'src/consts/queries'

export const useGetAdminCustomerPurchaseMonthlies = (params, options = {}) => {
  const queryKey = queries.adminCustomerPurchaseMonthlies.list(params).queryKey

  const queryFn = () => {
    return getAdminCustomerPurchaseMonthlies(params)
  }

  const queryOptions = {
    ...options
  }

  return useQuery({
    queryKey,
    queryFn,
    ...queryOptions
  })
}
