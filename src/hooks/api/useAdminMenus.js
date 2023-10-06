import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  deleteAdminMenus,
  editAdminMenus,
  getAdminMenus,
  getAdminMenusDetail,
  postAdminMenus
} from 'src/client/adminMenusClient';
import queries from 'src/consts/queries';

export const useGetAdminMenus = (params, options = {}) => {
  const queryKey = queries.adminMenus.list(params).queryKey;

  const queryFn = () => {
    const newParams = new URLSearchParams();

    Object.keys(params).forEach((property) => {
      if (property === 'sort') {
        params[property].forEach((item) => {
          newParams.append(property, item);
        });
      } else {
        newParams.append(property, params[property]);
      }
    });

    return getAdminMenus(newParams);
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

export const useGetAdminMenusDetail = (id, options = {}) => {
  const queryKey = queries.adminMenus.detail(id).queryKey;

  const queryFn = () => {
    return getAdminMenusDetail(id);
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

export const useDeleteAdminMenus = () => {
  return useMutation((id) => deleteAdminMenus(id));
};

export const usePostAdminMenus = () => {
  return useMutation((body) => postAdminMenus(body));
};

export const useEditAdminMenus = (id) => {
  return useMutation((body) => editAdminMenus(id, body));
};
