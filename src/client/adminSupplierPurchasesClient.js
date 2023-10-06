import client from './apiClient';

export const getAdminSupplierPurchases = (params) => {
  return client.get('admin/supplier-purchases', { params });
};

export const exportAdminSupplierPurchases = (id) => {
  return client.get(`admin/supplier-purchases/${id}/export/invoice`, {
    responseType: 'blob'
  });
};

export const getAdminSupplierPurchasesDetail = (id) => {
  return client.get(`admin/supplier-purchases/${id}`);
};

export const deleteAdminSupplierPurchases = (id) => {
  return client.delete(`admin/supplier-purchases/${id}`);
};

export const postAdminSupplierPurchases = (body) => {
  return client.post('admin/supplier-purchases', body);
};

export const editAdminSupplierPurchases = (id, body) => {
  return client.put(`admin/supplier-purchases/${id}`, body);
};

export const getAdminSupplierPurchaseMonthlies = (params) => {
  return client.get(`admin/supplier-purchase-monthlies`, { params });
};
