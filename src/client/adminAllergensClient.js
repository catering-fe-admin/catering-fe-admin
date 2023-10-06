import client from './apiClient'

export const getAdminAllergens = params => {
  return client.get('admin/allergens', { params })
}

export const getAdminAllergensDetail = id => {
  return client.get(`admin/allergens/${id}`)
}

export const deleteAdminAllergens = id => {
  return client.delete(`admin/allergens/${id}`)
}

export const postAdminAllergens = body => {
  return client.post('admin/allergens', body)
}

export const editAdminAllergens = (id, body) => {
  return client.put(`admin/allergens/${id}`, body)
}
