import { useRouter } from 'next/router';

import { useGetAdminSupplierPurchasesDetail } from 'src/hooks/api/useAdminSupplierPurchases';

import PurchaseOrderDetail from 'components/purchase-order/detail/PurchaseOrderDetail';
import Notfound from 'components/shared/Notfound';
import FallbackSpinner from 'components/spinner';

const EditPurchaseOrder = () => {
  const router = useRouter();

  const id = router.query.id;

  const { data, isFetching } = useGetAdminSupplierPurchasesDetail(id, {
    enabled: !!id
  });

  const detailData = data?.data;

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : detailData ? (
    <PurchaseOrderDetail defaultValue={detailData} cardTitle="仕入詳細" />
  ) : (
    <Notfound />
  );
};

export default EditPurchaseOrder;
