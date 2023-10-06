import client from './apiClient';

export const getAdminItems = (params) => {
  return client.get('admin/items', { params });
};

export const exportAdminItems = (params) => {
  return client.get('admin/items/export', {
    params,
    responseType: 'blob'
  });
};

export const getAdminItemsDetail = (id) => {
  return client.get(`admin/items/${id}`);
};

export const deleteAdminItems = (id) => {
  return client.delete(`admin/items/${id}`);
};

export const postAdminItems = (body, customConfig = {}) => {
  return client.post('admin/items', body, { ...customConfig });
};

export const editAdminItems = (id, body, customConfig = {}) => {
  return client.put(`admin/items/${id}`, body, { ...customConfig });
};
