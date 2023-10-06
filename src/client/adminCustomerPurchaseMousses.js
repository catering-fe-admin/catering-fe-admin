import client from './apiClient';

export const getAdminCustomerPurchaseMousses = (params) => {
  return client.get('admin/customer-purchase-mousses', { params });
};

export const postAdminCustomerPurchaseMoussesPreview = (body) => {
  return client.post('admin/customer-purchase-mousses/preview', body);
};

export const postAdminCustomerPurchaseMousses = (body) => {
  return client.post('admin/customer-purchase-mousses', body);
};

export const putAdminCustomerPurchaseMousses = (body) => {
  return client.put('admin/customer-purchase-mousses', body);
};
