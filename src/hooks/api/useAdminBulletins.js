import { useQuery, useMutation } from '@tanstack/react-query'
import {
  getAdminBulletins,
  getAdminBulletinsDetail,
  deleteAdminBulletins,
  postAdminBulletins,
  editAdminBulletins
} from 'src/client/adminBulletinsClient'
import queries from 'src/consts/queries'

export const useGetAdminBulletins = (params, options = {}) => {
  const queryKey = queries.adminBulletins.list(params).queryKey

  const queryFn = () => {
    return getAdminBulletins(params)
  }

  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}

export const useGetAdminBulletinsDetail = (id, options = {}) => {
  const queryKey = queries.adminBulletins.detail(id).queryKey

  const queryFn = () => {
    return getAdminBulletinsDetail(id)
  }

  return useQuery({
    queryKey,
    queryFn,
    ...options
  })
}

export const useDeleteAdminBulletins = () => {
  return useMutation(id => deleteAdminBulletins(id))
}

export const usePostAdminBulletins = () => {
  return useMutation(body => postAdminBulletins(body))
}

export const useEditAdminBulletins = id => {
  return useMutation(body => editAdminBulletins(id, body))
}
