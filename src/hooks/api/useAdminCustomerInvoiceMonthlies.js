import { useQuery } from '@tanstack/react-query';

import {
  exportAdminCustomerInvoiceMonthlies,
  getAdminCustomerInvoiceMonthlies
} from 'src/client/adminCustomerInvoiceMonthlies';
import queries from 'src/consts/queries';

export const useGetAdminCustomerInvoiceMonthlies = (params, options = {}) => {
  const queryKey = queries.adminCustomerInvoiceMonthlies.list(params).queryKey;

  const queryFn = () => {
    return getAdminCustomerInvoiceMonthlies(params);
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

export const useExportAdminCustomerInvoiceMonthlies = (
  params,
  options = {}
) => {
  const queryKey =
    queries.adminCustomerInvoiceMonthlies.export(params).queryKey;

  const queryFn = () => {
    return exportAdminCustomerInvoiceMonthlies(params);
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
