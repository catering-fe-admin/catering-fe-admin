import client from './apiClient'

export const getAdminCustomersFacilties = params => {
  return client.get('admin/customer-facilities', { params })
}

export const getAdminCustomersFaciltiesDetail = (id, params) => {
  return client.get(`admin/customer-facilities/${id}`, { params })
}

export const deleteAdminCustomersFacilities = id => {
  return client.delete(`admin/customer-facilities/${id}`)
}

export const postAdminCustomersFacilities = body => {
  return client.post('admin/customer-facilities', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const editAdminCustomersFacilities = (id, body) => {
  return client.put(`admin/customer-facilities/${id}`, body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const resetPasswordAdminCustomersFacilities = (id, body) => {
  return client.put(`admin/customer-facilities/${id}/password/reset`, body)
}
