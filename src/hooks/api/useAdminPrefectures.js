import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import {
  deleteAdminPrefectures,
  editAdminPrefectures,
  getAdminPrefectures,
  getAdminPrefecturesDetail,
  postAdminPrefectures
} from 'src/client/adminPrefecturesClient'
import queries from 'src/consts/queries'

export const useGetInfinitePrefectures = (params, options = {}) => {
  const queryKey = queries.adminSuppliers.list(params).queryKey

  const queryFn = pageParam => {
    return getAdminPrefectures({ ...params, page: pageParam })
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

export const useGetAdminPrefectures = (params, options = {}) => {
  const queryKey = queries.adminPrefectures.list(params).queryKey

  const queryFn = () => {
    return getAdminPrefectures(params)
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

export const useGetAdminPrefecturesDetail = (id, options = {}) => {
  const queryKey = queries.adminPrefectures.detail(id).queryKey

  const queryFn = () => {
    return getAdminPrefecturesDetail(id)
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

export const useDeleteAdminPrefectures = () => {
  return useMutation(id => deleteAdminPrefectures(id))
}

export const usePostAdminPrefectures = () => {
  return useMutation(body => postAdminPrefectures(body))
}

export const useEditAdminPrefectures = id => {
  return useMutation(body => editAdminPrefectures(id, body))
}
