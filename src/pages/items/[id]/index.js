import { useRouter } from 'next/router';

import { useGetAdminItemsDetail } from 'src/hooks/api/useAdminItems';

import ItemsDetail from 'components/items/ItemsDetail';
import Notfound from 'components/shared/Notfound';
import FallbackSpinner from 'components/spinner';

const WrapperItemssDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isFetching } = useGetAdminItemsDetail(id, {
    enabled: !!id
  });

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : data?.data ? (
    <ItemsDetail id={id} defaultValue={data?.data} />
  ) : (
    <Notfound />
  );
};

export default WrapperItemssDetail;
