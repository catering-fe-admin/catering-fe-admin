import client from './apiClient';

export const getAdminItemPackLogs = (params) => {
  return client.get('admin/item-pack-logs', { params });
};
