import { useState } from 'react';

import { useRouter } from 'next/router';

import pickBy from 'lodash/pickBy';

import FilterMenu from 'src/@core/components/menu-order/FilterMenu';
import MenuItems from 'src/@core/components/menu-order/MenuItems';
import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';
import { useGetAdminCustomersDetail } from 'src/hooks/api/useAdminCustomers';
import { useGetAdminCustomersFacilitiesDetail } from 'src/hooks/api/useAdminCustomersFacilities';

import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const Menu = () => {
  const router = useRouter();
  const { customerId, customerFacilityId } = router.query || {};

  const [filterApplied, setFilterApplied] = useState({
    requireAtFrom: getFormattedParamsDate(firstDateCurrentMonth),
    requireAtTo: getFormattedParamsDate(lastDateCurrentMonth)
  });

  const handleSetFilterApplied = (filter) => {
    const requireAtFrom = getFormattedParamsDate(filter?.requireAtFrom);
    const requireAtTo = getFormattedParamsDate(filter?.requireAtTo);

    const newFilter =
      pickBy(
        {
          ...filter,
          requireAtFrom: requireAtFrom,
          requireAtTo: requireAtTo,
          customerFacilityId: filter?.customerFacility?.id
        },
        (value) => !!value
      ) || {};

    newFilter?.customerFacility && delete newFilter?.customerFacility;

    setFilterApplied(newFilter);
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
          <CardHeader title="献立メニュー注文一覧" />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterMenu
              customerFacility={customerFacility?.data}
              customerFacilityId={customerFacilityId}
              handleSetFilterApplied={handleSetFilterApplied}
            />
            <MenuItems filterApplied={filterApplied} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Menu;
