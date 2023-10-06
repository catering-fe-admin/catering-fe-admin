import { useMutation, useQuery } from '@tanstack/react-query';

import {
  getAdminCustomerPurchaseMousses,
  postAdminCustomerPurchaseMousses,
  postAdminCustomerPurchaseMoussesPreview,
  putAdminCustomerPurchaseMousses
} from 'src/client/adminCustomerPurchaseMousses';
import queries from 'src/consts/queries';

export const useGetAdminCustomerPurchaseMousses = (params, options = {}) => {
  const queryKey = queries.adminCustomerPurchaseMousses.list(params).queryKey;

  const queryFn = () => {
    return getAdminCustomerPurchaseMousses(params);
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

export const usePostAdminCustomerPurchaseMoussesPreview = () => {
  return useMutation((body) => postAdminCustomerPurchaseMoussesPreview(body));
};

export const usePostAdminCustomerPurchaseMousses = () => {
  return useMutation((body) => postAdminCustomerPurchaseMousses(body));
};

export const usePutAdminCustomerPurchaseMousses = () => {
  return useMutation((body) => putAdminCustomerPurchaseMousses(body));
};
