import client from './apiClient';

export const getAdminItemPacksInventories = (params) => {
  return client.get('admin/item-packs-inventories', { params });
};

export const editAdminItemPacksInventories = (body) => {
  return client.put('admin/item-packs-inventories', body);
};

export const getAdminItemPacksInventoriesTemplate = () => {
  return client.get('/admin/item-packs-inventories/import/template');
};
export const postAdminItemPacksInventoriesPreview = (body) => {
  return client.post('/admin/item-packs-inventories/import/preview', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const postAdminItemPacksInventoriesImport = (body) => {
  return client.post('/admin/item-packs-inventories/import', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
};
