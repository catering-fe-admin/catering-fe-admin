import client from './apiClient'

export const getAdminServes = params => {
  return client.get('admin/serves', { params })
}

export const getAdminServesDetail = id => {
  return client.get(`admin/serves/${id}`)
}

export const deleteAdminServes = id => {
  return client.delete(`admin/serves/${id}`)
}

export const postAdminServes = body => {
  return client.post('admin/serves', body)
}

export const editAdminServes = (id, body) => {
  return client.put(`admin/serves/${id}`, body)
}
