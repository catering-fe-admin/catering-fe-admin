import client from './apiClient';

export const getAdminSuppliers = (params) => {
  return client.get('admin/suppliers', { params });
};

export const getAdminSuppliersDetail = (id, params) => {
  return client.get(`admin/suppliers/${id}`, { params });
};

export const deleteAdminSuppliers = (id) => {
  return client.delete(`admin/suppliers/${id}`);
};

export const postAdminSuppliers = (body) => {
  return client.post('admin/suppliers', body);
};

export const editAdminSuppliers = (id, body) => {
  return client.put(`admin/suppliers/${id}`, body);
};

export const getAdminSuppliersHoliday = (id, params) => {
  return client.get(`admin/suppliers/${id}/holiday`, { params });
};

export const postAdminSuppliersHoliday = (id, params) => {
  return client.post(`admin/suppliers/${id}/holiday`, null, { params });
};

export const deleteAdminSuppliersHoliday = (id, params) => {
  return client.delete(`admin/suppliers/${id}/holiday`, { params });
};
