import client from './apiClient';

export const getAdminItemDeliveries = (params) => {
  return client.get('admin/item-deliveries', { params });
};
