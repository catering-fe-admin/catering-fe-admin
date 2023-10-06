import client from './apiClient';

export const getAdminSupplierInvoiceMonthlies = (params) => {
  return client.get('admin/supplier-invoice-monthlies', { params });
};

export const exportAdminSupplierInvoiceMonthlies = (params) => {
  return client.get('admin/supplier-invoice-monthlies/export', {
    params,
    responseType: 'blob'
  });
};
