import React from 'react';

import { useRouter } from 'next/router';

import { useGetAdminCustomersDetail } from 'src/hooks/api/useAdminCustomers';
import { useGetAdminCustomersFacilitiesDetail } from 'src/hooks/api/useAdminCustomersFacilities';

import SingleItemMenus from 'components/single-item-menu/SingleItemMenuItems';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const CreateSingleItemMenu = () => {
  const router = useRouter();
  const { customerId, customerFacilityId, type } = router.query || {};

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
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Box
              sx={{
                paddingLeft: '36px',
                paddingTop: '24px',
                marginBottom: '24px'
              }}
            >
              <Typography sx={{ marginBottom: '10px' }}>
                顧客名: {customerName}
              </Typography>
              <Typography>施設名: {customerFacilityName}</Typography>
            </Box>

            {type && (
              <SingleItemMenus
                isCreate
                facilityId={customerFacilityId}
                type={type}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CreateSingleItemMenu;
