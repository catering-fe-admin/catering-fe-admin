import client from './apiClient'

export const getAdminFacilityKinds = params => {
  return client.get('admin/facility-kinds', { params })
}

export const getAdminFacilityKindsDetail = (id, params) => {
  return client.get(`admin/facility-kinds/${id}`, { params })
}

export const deleteAdminFacilityKinds = id => {
  return client.delete(`admin/facility-kinds/${id}`)
}

export const postAdminFacilityKinds = body => {
  return client.post('admin/facility-kinds', body)
}

export const editAdminFacilityKinds = (id, body) => {
  return client.put(`admin/facility-kinds/${id}`, body)
}
