import { useState } from 'react';

import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';

import FilterItemDeliveries from 'components/item-deliveries/FilterItemDeliveries';
import ItemDeliveriesTable from 'components/item-deliveries/table/ItemDeliveriesTable';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const ItemDeliveries = () => {
  const [params, setParams] = useState({
    requireAtFrom: getFormattedParamsDate(firstDateCurrentMonth),
    requireAtTo: getFormattedParamsDate(lastDateCurrentMonth)
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="注文パック数確認" />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterItemDeliveries setParams={setParams} />
            <ItemDeliveriesTable params={params} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ItemDeliveries;
