import { useRouter } from 'next/router';

import ItemPacksMousseDetail from 'src/@core/components/item-packs-mousse/ItemPacksMousseDetail';
import { useGetAdminItemPacksDetail } from 'src/hooks/api/useAdminItemPacks';

import Notfound from 'components/shared/Notfound';
import FallbackSpinner from 'components/spinner';

const WrapperItemPacksMousseDetail = () => {
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
    isAlaCarteAllowed: true
  };

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : data?.data ? (
    <ItemPacksMousseDetail id={id} defaultValue={defaultValue} />
  ) : (
    <Notfound />
  );
};

export default WrapperItemPacksMousseDetail;
