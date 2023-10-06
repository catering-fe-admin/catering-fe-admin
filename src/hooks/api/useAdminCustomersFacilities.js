import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  editAdminCustomersFacilities,
  getAdminCustomersFacilties,
  getAdminCustomersFaciltiesDetail,
  postAdminCustomersFacilities,
  resetPasswordAdminCustomersFacilities
} from 'src/client/adminCustomersFacilitiesClient';
import queries from 'src/consts/queries';

export const useGetInfiniteCustomersFacilities = (params, options = {}) => {
  const queryKey = queries.adminCustomersFacilities.list(params).queryKey;

  const queryFn = (pageParam) => {
    return getAdminCustomersFacilties({ ...params, page: pageParam });
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

export const useGetAdminCustomersFacilties = (params, options = {}) => {
  const queryKey = queries.adminCustomersFacilities.list(params).queryKey;

  const queryFn = () => {
    return getAdminCustomersFacilties(params);
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

export const useGetAdminCustomersFacilitiesDetail = (id, options = {}) => {
  const queryKey = queries.adminCustomersFacilities.detail(id).queryKey;

  const queryFn = () => {
    return getAdminCustomersFaciltiesDetail(id);
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

export const usePostAdminCustomersFacilities = () => {
  return useMutation((body) => postAdminCustomersFacilities(body));
};

export const useEditAdminCustomersFacilities = (id) => {
  return useMutation((body) => editAdminCustomersFacilities(id, body));
};

export const useResetPasswordAdminCustomersFacilities = (id) => {
  return useMutation(() => resetPasswordAdminCustomersFacilities(id));
};
