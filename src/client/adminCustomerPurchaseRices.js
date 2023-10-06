import client from './apiClient';

export const getAdminCustomerPurchaseRices = (params) => {
  return client.get('admin/customer-purchase-rices', { params });
};

export const postAdminCustomerPurchaseRicesPreview = (body) => {
  return client.post('admin/customer-purchase-rices/preview', body);
};

export const postAdminCustomerPurchaseRices = (body) => {
  return client.post('admin/customer-purchase-rices', body);
};

export const putAdminCustomerPurchaseRices = (body) => {
  return client.put('admin/customer-purchase-rices', body);
};
