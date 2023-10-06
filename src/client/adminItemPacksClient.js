import client from './apiClient';

export const getAdminItemPacks = (params) => {
  return client.get('admin/item-packs', { params });
};

export const exportAdminItemPacks = (params) => {
  return client.get('admin/item-packs/export', {
    params,
    responseType: 'blob'
  });
};

export const getAdminItemPacksDetail = (id) => {
  return client.get(`admin/item-packs/${id}`);
};

export const deleteAdminItemPacks = (id) => {
  return client.delete(`admin/item-packs/${id}`);
};

export const postAdminItemPacks = (body, customConfig = {}) => {
  return client.post('admin/item-packs', body, { ...customConfig });
};

export const editAdminItemPacks = (id, body, customConfig = {}) => {
  return client.put(`admin/item-packs/${id}`, body, { ...customConfig });
};
