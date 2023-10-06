import React from 'react';

import { useRouter } from 'next/router';

import { useGetAdminCoursesDetail } from 'src/hooks/api/useAdminCourses';

import CoursesDetail from 'components/course/CoursesDetail';
import Notfound from 'components/shared/Notfound';
import FallbackSpinner from 'components/spinner';

const CoursesDetailPage = () => {
  const router = useRouter();

  const id = router.query.id;

  const { data, isFetching } = useGetAdminCoursesDetail(id, {
    enabled: !!id
  });

  const detailData = data?.data;

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : detailData ? (
    <CoursesDetail
      isEditPage
      id={detailData?.id}
      name={detailData?.name}
      type={detailData?.type}
    />
  ) : (
    <Notfound />
  );
};

export default CoursesDetailPage;
