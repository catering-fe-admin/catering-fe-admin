import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  deleteAdminItems,
  editAdminItems,
  exportAdminItems,
  getAdminItems,
  getAdminItemsDetail,
  postAdminItems
} from 'src/client/adminItemsClient';
import queries from 'src/consts/queries';

export const useGetInfiniteAdminItems = (params, options = {}) => {
  const queryKey = queries.adminItems.list(params).queryKey;

  const queryFn = (pageParam) => {
    return getAdminItems({ ...params, ...pageParam });
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

export const useGetAdminItems = (params, options = {}) => {
  const queryKey = queries.adminItems.list(params).queryKey;

  const queryFn = () => {
    return getAdminItems(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useExportAdminItems = (params, options = {}) => {
  const queryKey = queries.adminItems.export(params).queryKey;

  const queryFn = () => {
    return exportAdminItems(params);
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

export const useGetAdminItemsDetail = (id, options = {}) => {
  const queryKey = queries.adminItems.detail(id).queryKey;

  const queryFn = () => {
    return getAdminItemsDetail(id);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useDeleteAdminItems = () => {
  return useMutation((id) => deleteAdminItems(id));
};

export const usePostAdminItems = (customConfig = {}) => {
  return useMutation((body) => postAdminItems(body, customConfig));
};

export const useEditAdminItems = (id, customConfig = {}) => {
  return useMutation((body) => editAdminItems(id, body, customConfig));
};
