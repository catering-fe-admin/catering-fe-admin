import { useMutation } from '@tanstack/react-query';

import {
  editAdminSupplierPayments,
  postAdminSupplierPayments
} from 'src/client/adminSupplierPaymentsClient';

export const usePostAdminSupplierPayments = () => {
  return useMutation(({ body }) => postAdminSupplierPayments(body));
};

export const useEditAdminSupplierPayments = () => {
  return useMutation(({ id, body }) => editAdminSupplierPayments(id, body));
};
