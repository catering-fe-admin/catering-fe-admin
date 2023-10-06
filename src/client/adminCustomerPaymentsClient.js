import client from './apiClient'

export const editAdminCustomerPayments = (id, body) => {
  return client.put(`admin/customer-payments/${id}`, body)
}

export const postAdminCustomerPayments = body => {
  return client.post(`admin/customer-payments`, body)
}
