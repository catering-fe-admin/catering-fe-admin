import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  getAdminCustomerDeliveries,
  getAdminCustomerDeliveriesDeliver,
  getAdminCustomerDeliveriesExportDeliverySlip,
  getAdminCustomerDeliveriesGenerate,
  postAdminCustomerDeliveries
} from 'src/client/adminCustomerDeliveriesClient';
import queries from 'src/consts/queries';

export const useGetInfiniteAdminCustomerDeliveries = (params, options = {}) => {
  const queryKey = queries.adminCustomerDeliveries.list(params).queryKey;

  const queryFn = () => {
    return getAdminCustomerDeliveries(params);
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

export const useGetAdminCustomerDeliveries = (params, options = {}) => {
  const queryKey = queries.adminCustomerDeliveries.list(params).queryKey;

  const queryFn = () => {
    return getAdminCustomerDeliveries(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const usePostAdminCustomerDeliveries = () => {
  return useMutation((body) => postAdminCustomerDeliveries(body));
};

export const useGetAdminCustomerDeliveriesGenerate = (params, options = {}) => {
  const queryKey = queries.adminCustomerDeliveriesGenerate(params).queryKey;

  const queryFn = () => {
    return getAdminCustomerDeliveriesGenerate(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useGetAdminCustomerDeliveriesExportDeliverySlip = (
  params,
  options = {}
) => {
  const queryKey =
    queries.adminCustomerDeliveries.exportDeliverySlip(params).queryKey;

  const queryFn = () => {
    return getAdminCustomerDeliveriesExportDeliverySlip(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useGetAdminCustomerDeliveriesDeliver = (params, options = {}) => {
  const queryKey = queries.adminCustomerDeliveries.deliver(params).queryKey;

  const queryFn = () => {
    return getAdminCustomerDeliveriesDeliver(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};
