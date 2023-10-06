import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  deleteAdminSupplierPurchases,
  editAdminSupplierPurchases,
  exportAdminSupplierPurchases,
  getAdminSupplierPurchaseMonthlies,
  getAdminSupplierPurchases,
  getAdminSupplierPurchasesDetail,
  postAdminSupplierPurchases
} from 'src/client/adminSupplierPurchasesClient';
import queries from 'src/consts/queries';

export const useGetInfiniteAdminSupplierPurchases = (params, options = {}) => {
  const queryKey = queries.adminSupplierPurchases.list(params).queryKey;

  const queryFn = (pageParam) => {
    return getAdminSupplierPurchases({ ...params, ...pageParam });
  };

  return useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => queryFn(pageParam),
    getNextPageParam: (data) => {
      if (data?.data?.last) return null;

      const currentPageNumber = data?.data?.number + 1;

      return { page: currentPageNumber + 1 };
    },
    ...options
  });
};

export const useGetAdminSupplierPurchases = (params, options = {}) => {
  const queryKey = queries.adminSupplierPurchases.list(params).queryKey;

  const queryFn = () => {
    return getAdminSupplierPurchases(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useExportAdminSupplierPurchases = (id, options = {}) => {
  const queryKey = queries.adminSupplierPurchases.export(id).queryKey;

  const queryFn = () => {
    return exportAdminSupplierPurchases(id);
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

export const useGetAdminSupplierPurchasesDetail = (id, options = {}) => {
  const queryKey = queries.adminSupplierPurchases.detail(id).queryKey;

  const queryFn = () => {
    return getAdminSupplierPurchasesDetail(id);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useDeleteAdminSupplierPurchases = () => {
  return useMutation((id) => deleteAdminSupplierPurchases(id));
};

export const usePostAdminSupplierPurchases = () => {
  return useMutation((body) => postAdminSupplierPurchases(body));
};

export const useEditAdminSupplierPurchases = (id) => {
  return useMutation((body) => editAdminSupplierPurchases(id, body));
};

export const useGetAdminSupplierPurchaseMonthlies = (params, options = {}) => {
  const queryKey = queries.adminSupplierPurchaseMonthlies.list(params).queryKey;

  const queryFn = () => {
    return getAdminSupplierPurchaseMonthlies(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};
