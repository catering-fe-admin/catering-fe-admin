import client from './apiClient'

export const getAdminCustomerPurchaseMenus = params => {
  return client.get('admin/customer-purchase-menus', { params })
}

export const postAdminCustomerPurchaseMenus = body => {
  return client.post('admin/customer-purchase-menus', body)
}
