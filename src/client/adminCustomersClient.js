import client from './apiClient';

export const getAdminCustomers = (params) => {
  return client.get('admin/customers', { params });
};

export const exportAdminCustomers = (params) => {
  return client.get('admin/customers/export', { params });
};

export const getAdminCustomersDetail = (id, params) => {
  return client.get(`admin/customers/${id}`, { params });
};

export const deleteAdminCustomers = (id) => {
  return client.delete(`admin/customers/${id}`);
};

export const postAdminCustomers = (body) => {
  return client.post('admin/customers', body);
};

export const editAdminCustomers = (id, body) => {
  return client.put(`admin/customers/${id}`, body);
};
