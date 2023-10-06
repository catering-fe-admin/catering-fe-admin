import { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

import FilterSupplierPurchaseOrder from './FilterSupplierPurchaseOrder';
import SupplierPurchaseOrderTable from './table/SupplierPurchaseOrderTable';

const SupplierPurchaseOrder = ({ supplierId }) => {
  const [params, setParams] = useState({});

  const additionalParams = {
    ...params,
    supplierId
  };

  return (
    <Grid container spacing={6} sx={{ marginTop: '24px' }}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="【仕入情報】" />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterSupplierPurchaseOrder setParams={setParams} />
            <SupplierPurchaseOrderTable additionalParams={additionalParams} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SupplierPurchaseOrder;
