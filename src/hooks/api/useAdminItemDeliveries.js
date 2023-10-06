import { useQuery } from '@tanstack/react-query';

import { getAdminItemDeliveries } from 'src/client/adminItemDeliveriesClient';
import queries from 'src/consts/queries';

export const useGetAdminItemDeliveries = (params, options = {}) => {
  const queryKey = queries.adminItemDeliveries.list(params).queryKey;

  const queryFn = () => {
    return getAdminItemDeliveries(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};
