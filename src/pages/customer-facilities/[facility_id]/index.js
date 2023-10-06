'use client';

import { useState } from 'react';

import { useRouter } from 'next/router';

import indexOf from 'lodash/indexOf';
import orderBy from 'lodash/orderBy';

import { useGetAdminCustomersFacilitiesDetail } from 'src/hooks/api/useAdminCustomersFacilities';

import CustomersFacilitiesDetail from 'components/customers-facilities/CustomersFacilitiesDetail';
import Notfound from 'components/shared/Notfound';
import FallbackSpinner from 'components/spinner';

const initialItems = [
  {
    id: null,
    item: {},
    kiloPrice: 0
  }
];

const FacilitiesDetail = () => {
  const router = useRouter();
  const [detailData, setDetailData] = useState(null);

  const id = router?.query?.facility_id;
  const order = ['MORNING', 'NOON', 'NIGHT'];

  console.log('OK');

  const { isFetching } = useGetAdminCustomersFacilitiesDetail(id, {
    enabled: !!id,
    onSuccess: (data) => {
      if (data?.data) {
        const newDetailData = {
          ...data?.data,
          settingMinQtyDate: data?.data?.settingMinQtyDate
            ? new Date(data?.data?.settingMinQtyDate?.split('/').join('-'))
            : null,
          items:
            data?.data?.items?.length > 0 ? data?.data?.items : initialItems,
          prices: orderBy(data?.data?.prices, (item) =>
            indexOf(order, item.type)
          )
        };

        setDetailData(newDetailData);
      }
    }
  });

  return isFetching ? (
    <div style={{ marginTop: '-150px' }}>
      <FallbackSpinner />
    </div>
  ) : detailData ? (
    <CustomersFacilitiesDetail isEdit defaultValues={detailData} />
  ) : (
    <Notfound />
  );
};

// export const dynamic = 'force-dynamic';

export default FacilitiesDetail;
