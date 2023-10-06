import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  editAdminItemPacksInventories,
  getAdminItemPacksInventories,
  postAdminItemPacksInventoriesImport,
  postAdminItemPacksInventoriesPreview
} from 'src/client/adminItemPacksInventoriesClient';
import queries from 'src/consts/queries';

export const useGetInfiniteAdminItemPacksInventories = (
  params,
  options = {}
) => {
  const queryKey = queries.adminItemPacksInventories.list(params).queryKey;

  const queryFn = (pageParam) => {
    return getAdminItemPacksInventories({ ...params, ...pageParam });
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

export const useGetAdminItemPacksInventories = (params, options = {}) => {
  const queryKey = queries.adminItemPacksInventories.list(params).queryKey;

  const queryFn = () => {
    return getAdminItemPacksInventories(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useEditAdminItemPacksInventories = () => {
  return useMutation(({ body }) => editAdminItemPacksInventories(body));
};

export const usePostAdminItemPacksInventoriesPreview = () => {
  return useMutation((body) => postAdminItemPacksInventoriesPreview(body));
};

export const usePostAdminItemPacksInventoriesImport = () => {
  return useMutation((body) => postAdminItemPacksInventoriesImport(body));
};
