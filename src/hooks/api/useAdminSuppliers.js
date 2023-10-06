import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  deleteAdminSuppliers,
  deleteAdminSuppliersHoliday,
  editAdminSuppliers,
  getAdminSuppliers,
  getAdminSuppliersDetail,
  getAdminSuppliersHoliday,
  postAdminSuppliers,
  postAdminSuppliersHoliday
} from 'src/client/adminSupplierClient';
import queries from 'src/consts/queries';

export const useGetInfiniteSuppliers = (params, options = {}) => {
  const queryKey = queries.adminSuppliers.list(params).queryKey;

  const queryFn = (pageParam) => {
    return getAdminSuppliers({ ...params, ...pageParam });
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

export const useGetAdminSuppliers = (params, options = {}) => {
  const queryKey = queries.adminSuppliers.list(params).queryKey;

  const queryFn = () => {
    return getAdminSuppliers(params);
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

export const useGetAdminSuppliersDetail = (id, options = {}) => {
  const queryKey = queries.adminSuppliers.detail(id).queryKey;

  const queryFn = () => {
    return getAdminSuppliersDetail(id);
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

export const useGetAdminSuppliersHoliday = (id, options = {}) => {
  const queryKey = queries.adminSuppliers.holiday(id).queryKey;

  const queryFn = () => {
    return getAdminSuppliersHoliday(id);
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

export const useDeleteAdminSuppliers = () => {
  return useMutation((id) => deleteAdminSuppliers(id));
};

export const usePostAdminSuppliers = () => {
  return useMutation((body) => postAdminSuppliers(body));
};

export const useEditAdminSuppliers = (id) => {
  return useMutation((body) => editAdminSuppliers(id, body));
};

export const usePostAdminSuppliersHoliday = (id) => {
  return useMutation((body) => postAdminSuppliersHoliday(id, body));
};

export const useDeleteAdminSuppliersHoliday = (id) => {
  return useMutation((body) => deleteAdminSuppliersHoliday(id, body));
};
