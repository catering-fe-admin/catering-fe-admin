import { useInfiniteQuery } from '@tanstack/react-query'
import { getAdminFacilityKinds } from 'src/client/adminFacilityKindsClient'
import queries from 'src/consts/queries'

export const useGetInfiniteFacilityKinds = (params, options = {}) => {
  const queryKey = queries.facilityKinds.list(params).queryKey

  const queryFn = pageParam => {
    return getAdminFacilityKinds({ ...params, page: pageParam })
  }

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    getNextPageParam: data => {
      if (data?.data?.last) return null

      const currentPageNumber = data?.data?.number + 1

      return currentPageNumber + 1
    },
    ...options
  })
}
