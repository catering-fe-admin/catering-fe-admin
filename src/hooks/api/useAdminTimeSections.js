import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { getTimeSections } from 'src/client/adminTimeSectionsClient'
import queries from 'src/consts/queries'

export const useGetInfiniteTimeSections = (params, options = {}) => {
  const queryKey = queries.adminTimeSections.list(params).queryKey

  const queryFn = pageParam => {
    return getTimeSections({ ...params, page: pageParam })
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

export const useGetAdminTimeSections = (params, options = {}) => {
  const queryKey = queries.adminTimeSections.list(params).queryKey

  const queryFn = () => {
    return getTimeSections(params)
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
