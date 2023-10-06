import client from './apiClient';

export const getAdminCustomerPurchaseSingles = (params) => {
  return client.get('admin/customer-purchase-singles', { params });
};

export const postAdminCustomerPurchaseSinglesPreview = (body) => {
  return client.post('admin/customer-purchase-singles/preview', body);
};

export const postAdminCustomerPurchaseSingles = (body) => {
  return client.post('admin/customer-purchase-singles', body);
};

export const putAdminCustomerPurchaseSingles = (body) => {
  return client.put('admin/customer-purchase-singles', body);
};
