import { useState } from 'react';

import Link from 'next/link';

import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';

import FilterPurchaseOrder from 'components/purchase-order/FilterPurchaseOrder';
import PurchaseOrderTable from 'components/purchase-order/table/PurchaseOrderTable';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const PurchaseOrder = () => {
  const [params, setParams] = useState({
    issueAtPeriodFrom: getFormattedParamsDate(firstDateCurrentMonth),
    issueAtPeriodTo: getFormattedParamsDate(lastDateCurrentMonth)
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="仕入発注一覧"
            action={
              <Link href="/purchase-order/create">
                <Button variant="contained" color="info">
                  新規仕入作成
                </Button>
              </Link>
            }
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterPurchaseOrder setParams={setParams} />
            <PurchaseOrderTable additionalParams={params} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PurchaseOrder;
