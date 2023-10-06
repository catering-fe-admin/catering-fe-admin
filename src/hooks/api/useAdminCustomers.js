import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  deleteAdminCustomers,
  editAdminCustomers,
  exportAdminCustomers,
  getAdminCustomers,
  getAdminCustomersDetail,
  postAdminCustomers
} from 'src/client/adminCustomersClient';
import queries from 'src/consts/queries';

export const useGetAdminCustomers = (params, options = {}) => {
  const queryKey = queries.adminCustomers.list(params).queryKey;

  const queryFn = () => {
    return getAdminCustomers(params);
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

export const useExportAdminCustomers = (params, options = {}) => {
  const queryKey = queries.adminCustomers.export(params).queryKey;

  const queryFn = () => {
    return exportAdminCustomers(params);
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

export const useGetAdminCustomersDetail = (id, options = {}) => {
  const queryKey = queries.adminCustomers.detail(id).queryKey;

  const queryFn = () => {
    return getAdminCustomersDetail(id);
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

export const useDeleteAdminCustomers = () => {
  return useMutation((id) => deleteAdminCustomers(id));
};

export const usePostAdminCustomers = () => {
  return useMutation((body) => postAdminCustomers(body));
};

export const useEditAdminCustomers = (id) => {
  return useMutation((body) => editAdminCustomers(id, body));
};
