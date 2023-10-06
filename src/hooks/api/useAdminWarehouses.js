import { useInfiniteQuery } from '@tanstack/react-query'
import { getAdminWarehouses } from 'src/client/adminWarehousesClient'
import queries from 'src/consts/queries'

export const useGetInfiniteAdminWarehouses = (params, options = {}) => {
  const queryKey = queries.adminWarehouses.list(params).queryKey

  const queryFn = pageParam => {
    return getAdminWarehouses({ ...params, ...pageParam })
  }

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    getNextPageParam: data => {
      if (data?.data?.last) return null

      const currentPageNumber = data?.data?.number + 1

      return { page: currentPageNumber + 1 }
    },
    ...options
  })
}
