import { useInfiniteQuery } from '@tanstack/react-query';

import { getAdminItemPackLogs } from 'src/client/adminItemPackLogsClient';
import queries from 'src/consts/queries';

export const useGetInfiniteAdminItemPackLogs = (params, options = {}) => {
  const queryKey = queries.adminItemPackLogs.list(params).queryKey;

  const queryFn = (pageParam) => {
    return getAdminItemPackLogs({ ...params, page: pageParam });
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
