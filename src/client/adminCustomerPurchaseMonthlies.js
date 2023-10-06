import client from './apiClient'

export const getAdminCustomerPurchaseMonthlies = params => {
  return client.get('admin/customer-purchase-monthlies', { params })
}
