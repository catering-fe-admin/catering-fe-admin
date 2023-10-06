import client from './apiClient'

export const getAdminWarehouses = params => {
  return client.get('admin/warehouses', { params })
}

export const getAdminWarehousesDetail = (id, params) => {
  return client.get(`admin/warehouses/${id}`, { params })
}

export const deleteAdminWarehouses = id => {
  return client.delete(`admin/warehouses/${id}`)
}

export const postAdminWarehouses = body => {
  return client.post('admin/warehouses', body)
}

export const editAdminWarehouses = (id, body) => {
  return client.put(`admin/warehouses/${id}`, body)
}
