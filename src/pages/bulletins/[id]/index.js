import { useState } from 'react';

import { useRouter } from 'next/router';

import Notfound from 'src/@core/components/shared/Notfound';
import FallbackSpinner from 'src/@core/components/spinner';
import { useGetAdminBulletinsDetail } from 'src/hooks/api/useAdminBulletins';

import BulletinsDetail from 'components/bulletins/bulletins-detail/BulletinsDetail';

const WrapperBulletinsDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const [docs, setDocs] = useState([]);
  const [values, setValues] = useState(null);

  const { isFetching } = useGetAdminBulletinsDetail(id, {
    enabled: !!id,
    onSuccess: (data) => {
      if (data) {
        const { docs, ...restData } = data?.data || {};

        setValues({
          ...restData,
          date: new Date(restData?.date?.split('/').join('-')),
          file1: docs?.find((e) => e?.position == 1),
          file2: docs?.find((e) => e?.position == 2),
          file3: docs?.find((e) => e?.position == 3)
        });

        setDocs(docs);
      }
    }
  });

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : values ? (
    <BulletinsDetail id={id} defaultValue={values} docs={docs} />
  ) : (
    <Notfound />
  );
};

export default WrapperBulletinsDetail;
