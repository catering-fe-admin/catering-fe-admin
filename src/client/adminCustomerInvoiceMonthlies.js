import client from './apiClient';

export const getAdminCustomerInvoiceMonthlies = (params) => {
  return client.get('admin/customer-invoice-monthlies', { params });
};

export const exportAdminCustomerInvoiceMonthlies = (params) => {
  return client.get('admin/customer-invoice-monthlies/export/invoice', {
    params,
    responseType: 'blob'
  });
};
