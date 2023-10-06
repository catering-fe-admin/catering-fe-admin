import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getAdminCustomerPurchaseRices,
  postAdminCustomerPurchaseRices,
  postAdminCustomerPurchaseRicesPreview,
  putAdminCustomerPurchaseRices
} from 'src/client/adminCustomerPurchaseRices';
import queries from 'src/consts/queries';

export const useGetAdminCustomerPurchaseRices = (params, options = {}) => {
  const queryKey = queries.adminCustomerPurchaseRices.list(params).queryKey;

  const queryFn = () => {
    return getAdminCustomerPurchaseRices(params);
  };

  const queryOptions = {
    ...options
  };

  return useQuery({
    queryKey,
    queryFn,
    ...queryOptions
  });
};

export const usePostAdminCustomerPurchaseRicesPreview = () => {
  return useMutation((body) => postAdminCustomerPurchaseRicesPreview(body));
};

export const usePostAdminCustomerPurchaseRices = () => {
  return useMutation((body) => postAdminCustomerPurchaseRices(body));
};

export const usePutAdminCustomerPurchaseRices = () => {
  return useMutation((body) => putAdminCustomerPurchaseRices(body));
};
