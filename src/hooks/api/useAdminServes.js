import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import {
  getAdminServes,
  getAdminServesDetail,
  deleteAdminServes,
  postAdminServes,
  editAdminServes
} from 'src/client/adminServesClient'
import queries from 'src/consts/queries'

export const useGetInfiniteAdminServes = (params, options = {}) => {
  const queryKey = queries.adminServes.list(params).queryKey

  const queryFn = pageParam => {
    return getAdminServes({ ...params, ...pageParam })
  }

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    getNextPageParam: data => {
      if (data?.data) {
        return !data?.data?.last && data?.data?.pageable?.pageNumber + 1
      }
    },
    ...options
  })
}

export const useGetAdminServesDetail = (id, options = {}) => {
  const queryKey = queries.adminServes.detail(id).queryKey

  const queryFn = () => {
    return getAdminServesDetail(id)
  }

  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}

export const useDeleteAdminServes = () => {
  return useMutation(id => deleteAdminServes(id))
}

export const usePostAdminServes = () => {
  return useMutation(body => postAdminServes(body))
}

export const useEditAdminServes = id => {
  return useMutation(body => editAdminServes(id, body))
}
