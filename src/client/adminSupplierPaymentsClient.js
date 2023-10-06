import client from './apiClient';

export const postAdminSupplierPayments = (body) => {
  return client.post('admin/supplier-payments', body);
};

export const editAdminSupplierPayments = (id, body) => {
  return client.put(`admin/supplier-payments/${id}`, body);
};
