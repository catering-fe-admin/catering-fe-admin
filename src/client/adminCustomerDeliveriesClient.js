import client from './apiClient';

export const getAdminCustomerDeliveries = (params) => {
  return client.get('admin/customer-deliveries', { params });
};

export const postAdminCustomerDeliveries = (body) => {
  return client.post('admin/customer-deliveries', body);
};

export const getAdminCustomerDeliveriesGenerate = (params) => {
  return client.get('admin/customer-deliveries/generate', { params });
};

export const getAdminCustomerDeliveriesExportDeliverySlip = (params) => {
  return client.get('admin/customer-deliveries/export/slip', {
    params,
    responseType: 'blob'
  });
};

export const getAdminCustomerDeliveriesDeliver = (params) => {
  return client.get('admin/customer-deliveries/deliver', { params });
};

export const getAdminCustomerDeliveriesExportInstruction = (params) => {
  return client.get('admin/customer-deliveries/export/instruction', {
    params,
    responseType: 'blob'
  });
};
