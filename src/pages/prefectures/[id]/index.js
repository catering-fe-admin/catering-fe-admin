import React from 'react';

import { useRouter } from 'next/router';

import PrefecturesDetail from 'src/@core/components/prefectures/PrefecturesDetail';
import Notfound from 'src/@core/components/shared/Notfound';
import FallbackSpinner from 'src/@core/components/spinner';
import { useGetAdminPrefecturesDetail } from 'src/hooks/api/useAdminPrefectures';

const PrefecturesDetailPage = () => {
  const router = useRouter();

  const id = router.query.id;

  const { data, isFetching } = useGetAdminPrefecturesDetail(id, {
    enabled: !!id
  });

  const detailData = data?.data;

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : detailData ? (
    <PrefecturesDetail
      isEditPage
      id={detailData?.id}
      name={detailData?.name}
      prefix={detailData?.prefix}
    />
  ) : (
    <Notfound />
  );
};

export default PrefecturesDetailPage;
