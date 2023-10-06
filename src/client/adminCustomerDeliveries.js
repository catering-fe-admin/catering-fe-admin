import client from './apiClient';

export const getAdminCustomerDeliveries = (params) => {
  return client.get('/admin/customer-deliveries', { params });
};

export const postAdminCustomerDeliveries = (body) => {
  return client.post('/admin/customer-deliveries', body);
};
