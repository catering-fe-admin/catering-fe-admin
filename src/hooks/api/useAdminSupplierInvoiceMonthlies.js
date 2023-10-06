import { useQuery } from '@tanstack/react-query';

import {
  exportAdminSupplierInvoiceMonthlies,
  getAdminSupplierInvoiceMonthlies
} from 'src/client/adminSupplierInvoiceMonthliesClient';
import queries from 'src/consts/queries';

export const useGetAdminSupplierInvoiceMonthlies = (
  params,
  queryOptions = {}
) => {
  const queryKey = queries.adminSupplierInvoiceMonthlies.list(params).queryKey;

  const queryFn = () => {
    return getAdminSupplierInvoiceMonthlies(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...queryOptions
  });
};

export const useExportAdminSupplierInvoiceMonthlies = (
  params,
  options = {}
) => {
  const queryKey =
    queries.adminSupplierInvoiceMonthlies.export(params).queryKey;

  const queryFn = () => {
    return exportAdminSupplierInvoiceMonthlies(params);
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
