import { useMutation } from '@tanstack/react-query';

import {
  editAdminCustomerPayments,
  postAdminCustomerPayments
} from 'src/client/adminCustomerPaymentsClient';

export const usePostAdminCustomerPayments = () => {
  return useMutation((body) => postAdminCustomerPayments(body));
};

export const useEditAdminCustomerPayments = () => {
  return useMutation(({ id, body }) => {
    return editAdminCustomerPayments(id, body);
  });
};
