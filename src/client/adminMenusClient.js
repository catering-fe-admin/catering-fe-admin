import client from './apiClient'

export const getAdminMenus = params => {
  return client.get('admin/menus', { params })
}

export const getAdminMenusDetail = (id, params) => {
  return client.get(`admin/menus/${id}`, { params })
}

export const deleteAdminMenus = id => {
  return client.delete(`admin/menus/${id}`)
}

export const postAdminMenus = body => {
  return client.post('admin/menus', body)
}

export const editAdminMenus = (id, body) => {
  return client.put(`admin/menus/${id}`, body)
}
