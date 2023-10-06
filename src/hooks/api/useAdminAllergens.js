import { useQuery, useMutation, useInfiniteQuery } from '@tanstack/react-query'
import {
  getAdminAllergens,
  getAdminAllergensDetail,
  deleteAdminAllergens,
  postAdminAllergens,
  editAdminAllergens
} from 'src/client/adminAllergensClient'
import queries from 'src/consts/queries'

export const useGetInfiniteAdminAllergens = (params, options = {}) => {
  const queryKey = queries.adminAllergens.list(params).queryKey

  const queryFn = pageParam => {
    return getAdminAllergens({ ...params, ...pageParam })
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

export const useGetAdminAllergensDetail = (id, options = {}) => {
  const queryKey = queries.adminAdminAllergens.detail(id).queryKey

  const queryFn = () => {
    return getAdminAllergensDetail(id)
  }

  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}

export const useDeleteAdminAllergens = () => {
  return useMutation(id => deleteAdminAllergens(id))
}

export const usePostAdminAllergens = () => {
  return useMutation(body => postAdminAllergens(body))
}

export const useEditAdminAllergens = id => {
  return useMutation(body => editAdminAllergens(id, body))
}
