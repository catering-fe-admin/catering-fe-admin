import { useRouter } from 'next/router';

import CustomersDetail from 'src/@core/components/customers/CustomersDetail';
import Notfound from 'src/@core/components/shared/Notfound';
import FallbackSpinner from 'src/@core/components/spinner';
import { useGetAdminCustomersDetail } from 'src/hooks/api/useAdminCustomers';

const EditCustomers = () => {
  const router = useRouter();

  const id = router.query.id;

  const { data, isFetching } = useGetAdminCustomersDetail(id, {
    enabled: !!id
  });

  const detailData = data?.data;

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : detailData ? (
    <CustomersDetail isEdit defaultValues={detailData} />
  ) : (
    <Notfound />
  );
};

// export const dynamic = 'force-dynamic';



export default EditCustomers;
