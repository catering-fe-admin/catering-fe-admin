import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';
import { useGetAdminCustomersDetail } from 'src/hooks/api/useAdminCustomers';
import { useGetAdminCustomersFacilitiesDetail } from 'src/hooks/api/useAdminCustomersFacilities';

import FilterMenu from 'components/single-item-menu/FilterSingleItemMenu';
import SingleItemMenuItems from 'components/single-item-menu/SingleItemMenuItems';

import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const CARD_HEADER_TITLE = {
  normal: '単品メニュー注文一覧',
  mousse: 'ムース食注文一覧',
  rice: 'お米注文一覧'
};

const BASIC_FILTER = {
  customerFacility: {}
};

const INITIAL_FILTER = {
  normal: {
    ...BASIC_FILTER,
    itemPack: {}
  },
  mousse: {
    ...BASIC_FILTER,
    orderStatus: 'all'
  },
  rice: {
    ...BASIC_FILTER,
    orderStatus: 'all'
  }
};

const SingleOrder = () => {
  const router = useRouter();
  const { customerId, customerFacilityId, type } = router.query || {};

  const [filterApplied, setFilterApplied] = useState({
    ...INITIAL_FILTER[type],
    requireAtFrom: getFormattedParamsDate(firstDateCurrentMonth),
    requireAtTo: getFormattedParamsDate(lastDateCurrentMonth)
  });

  const { data: customerDetail } = useGetAdminCustomersDetail(customerId, {
    enabled: !!customerId
  });
  const customerName = customerDetail?.data?.name;

  const { data: customerFacility } = useGetAdminCustomersFacilitiesDetail(
    customerFacilityId,
    {
      enabled: !!customerFacilityId
    }
  );
  const customerFacilityName = customerFacility?.data?.name;

  useEffect(() => {
    const initialFilter = {
      ...INITIAL_FILTER[type],
      requireAtFrom: getFormattedParamsDate(firstDateCurrentMonth),
      requireAtTo: getFormattedParamsDate(lastDateCurrentMonth)
    };

    setFilterApplied(initialFilter);
  }, [type]);

  return (
    <Grid container spacing={6} sx={{ paddingBottom: '60px' }}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title={CARD_HEADER_TITLE[type]} />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            {customerFacilityId ? (
              <Box sx={{ paddingLeft: '36px', marginBottom: '24px' }}>
                <Typography sx={{ marginBottom: '10px' }}>
                  顧客名: {customerName}
                </Typography>
                <Typography>施設名: {customerFacilityName}</Typography>
              </Box>
            ) : (
              <FilterMenu
                INITIAL_FILTER={INITIAL_FILTER}
                type={type}
                setFilterApplied={setFilterApplied}
              />
            )}

            {type && (
              <SingleItemMenuItems filterApplied={filterApplied} type={type} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SingleOrder;
