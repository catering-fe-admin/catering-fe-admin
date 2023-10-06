import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  deleteAdminItemPacks,
  editAdminItemPacks,
  exportAdminItemPacks,
  getAdminItemPacks,
  getAdminItemPacksDetail,
  postAdminItemPacks
} from 'src/client/adminItemPacksClient';
import queries from 'src/consts/queries';

export const useGetInfiniteAdminItemPacks = (params, options = {}) => {
  const queryKey = queries.adminItemPacks.list(params).queryKey;

  const queryFn = (pageParam) => {
    return getAdminItemPacks({ ...params, ...pageParam });
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

export const useGetAdminItemPacks = (params, options = {}) => {
  const queryKey = queries.adminItemPacks.list(params).queryKey;

  const queryFn = () => {
    return getAdminItemPacks(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useExportAdminItemPacks = (params, options = {}) => {
  const queryKey = queries.adminItemPacks.export(params).queryKey;

  const queryFn = () => {
    return exportAdminItemPacks(params);
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

export const useGetAdminItemPacksDetail = (id, options = {}) => {
  const queryKey = queries.adminItemPacks.detail(id).queryKey;

  const queryFn = () => {
    return getAdminItemPacksDetail(id);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useDeleteAdminItemPacks = () => {
  return useMutation((id) => deleteAdminItemPacks(id));
};

export const usePostAdminItemPacks = (customConfig = {}) => {
  return useMutation((body) => postAdminItemPacks(body, customConfig));
};

export const useEditAdminItemPacks = (id, customConfig = {}) => {
  return useMutation((body) => editAdminItemPacks(id, body, customConfig));
};
