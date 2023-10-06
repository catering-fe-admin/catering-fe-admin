import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  deleteAdminCourses,
  editAdminCourses,
  getAdminCourses,
  getAdminCoursesDetail,
  postAdminCourses
} from 'src/client/adminCoursesClient';
import queries from 'src/consts/queries';

export const useGetInfiniteAdminCourses = (params, options = {}) => {
  const queryKey = queries.adminCourses.list(params).queryKey;

  const queryFn = (pageParam) => {
    return getAdminCourses({ ...params, ...pageParam });
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

export const useGetAdminCourses = (params, options = {}) => {
  const queryKey = queries.adminCourses.list(params).queryKey;

  const queryFn = () => {
    return getAdminCourses(params);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useGetAdminCoursesDetail = (id, options = {}) => {
  const queryKey = queries.adminCourses.detail(id).queryKey;

  const queryFn = () => {
    return getAdminCoursesDetail(id);
  };

  return useQuery({
    queryKey,
    queryFn,
    ...options
  });
};

export const useDeleteAdminCourses = () => {
  return useMutation((id) => deleteAdminCourses(id));
};

export const usePostAdminCourses = () => {
  return useMutation((body) => postAdminCourses(body));
};

export const useEditAdminCourses = (id) => {
  return useMutation((body) => editAdminCourses(id, body));
};
