import { useState } from 'react';

import { useRouter } from 'next/router';

import { useGetAdminCustomersDetail } from 'src/hooks/api/useAdminCustomers';
import { useGetAdminCustomersFacilitiesDetail } from 'src/hooks/api/useAdminCustomersFacilities';

import FilterMenu from 'components/single-item-menu/FilterSingleItemMenu';
import SingleItemMenus from 'components/single-item-menu/SingleItemMenuItems';

import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const SingleItemMenu = () => {
  const router = useRouter();
  const { customerId, customerFacilityId, type } = router.query || {};

  const [filter, setFilter] = useState({
    requireAtFrom: null,
    requireAtTo: null,
    customerFacility: {},
    itemPack: {}
  });

  const [filterApplied, setFilterApplied] = useState(filter);

  const handleChange = (prop) => (event) => {
    const valueList = {
      requireAtFrom: event,
      requireAtTo: event,
      customerFacility: event,
      itemPack: event
    };

    const newValue = valueList?.[prop];

    setFilter({ ...filter, [prop]: newValue });
  };

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

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="「単品メニュー」注文検索/一覧" />
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
                filter={filter}
                handleChange={handleChange}
                setFilterApplied={setFilterApplied}
              />
            )}

            {type && (
              <SingleItemMenus filterApplied={filterApplied} type={type} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SingleItemMenu;
