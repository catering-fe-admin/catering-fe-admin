import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  getAdminCustomerPurchaseSingles,
  postAdminCustomerPurchaseSingles,
  postAdminCustomerPurchaseSinglesPreview,
  putAdminCustomerPurchaseSingles
} from 'src/client/admincustomerPurchaseSingles';
import queries from 'src/consts/queries';

export const useGetInfiniteAdminCustomerPurchaseSingles = (
  params,
  options = {}
) => {
  const queryKey = queries.adminCustomerPurchaseSingles.list(params).queryKey;

  const queryFn = () => {
    return getAdminCustomerPurchaseSingles(params);
  };

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    getNextPageParam: (data) => {
      if (data?.data?.last) return null;

      const currentPageNumber = data?.data?.number + 1;

      return currentPageNumber + 1;
    },
    ...options
  });
};

export const useGetAdminCustomerPurchaseSingles = (params, options = {}) => {
  const queryKey = queries.adminCustomerPurchaseSingles.list(params).queryKey;

  const queryFn = () => {
    return getAdminCustomerPurchaseSingles(params);
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

export const usePostAdminCustomerPurchaseSinglesPreview = () => {
  return useMutation((body) => postAdminCustomerPurchaseSinglesPreview(body));
};

export const usePostAdminCustomerPurchaseSingles = () => {
  return useMutation((body) => postAdminCustomerPurchaseSingles(body));
};

export const usePutAdminCustomerPurchaseSingles = () => {
  return useMutation((body) => putAdminCustomerPurchaseSingles(body));
};
