import { useRouter } from 'next/router';

import { useGetAdminItemPacksDetail } from 'src/hooks/api/useAdminItemPacks';

import ItemPacksDetail from 'components/item-packs/ItemPacksDetail';
import Notfound from 'components/shared/Notfound';
import FallbackSpinner from 'components/spinner';

const WrapperItemPacksDetail = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isFetching } = useGetAdminItemPacksDetail(id, {
    enabled: !!id
  });

  const defaultValue = {
    ...data?.data,
    course: data?.data?.item?.course,
    item: {
      id: data?.data?.item?.id,
      name: data?.data?.item?.name
    },
    isAlaCarteAllowed: data?.data?.isAlaCarteAllowed ? 'allow' : 'notAllow'
  };

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : data?.data ? (
    <ItemPacksDetail id={id} defaultValue={defaultValue} />
  ) : (
    <Notfound />
  );
};

export const dynamic = 'force-dynamic';

export default WrapperItemPacksDetail;
