import { useMutation, useQuery } from '@tanstack/react-query';
import { property } from 'lodash';

import {
  getAdminCustomerPurchaseMenus,
  postAdminCustomerPurchaseMenus
} from 'src/client/adminCustomerPurchaseMenus';
import queries from 'src/consts/queries';

export const useGetAdminCustomerPurchaseMenus = (params, options = {}) => {
  const queryKey = queries.adminCustomerPurchaseMenus.list(params).queryKey;

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

    return getAdminCustomerPurchaseMenus(newParams);
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

export const usePostAdminCustomerPurchaseMenus = () => {
  return useMutation((body) => postAdminCustomerPurchaseMenus(body));
};
