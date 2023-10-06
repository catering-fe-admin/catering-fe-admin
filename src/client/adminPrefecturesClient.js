import client from './apiClient'

export const getAdminPrefectures = params => {
  return client.get('admin/prefectures', { params })
}

export const getAdminPrefecturesDetail = (id, params) => {
  return client.get(`admin/prefectures/${id}`, { params })
}

export const deleteAdminPrefectures = id => {
  return client.delete(`admin/prefectures/${id}`)
}

export const postAdminPrefectures = body => {
  return client.post('admin/prefectures', body)
}

export const editAdminPrefectures = (id, body) => {
  return client.put(`admin/prefectures/${id}`, body)
}
