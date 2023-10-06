import { useState } from 'react';

import { useRouter } from 'next/router';

import { useGetAdminSuppliersDetail } from 'src/hooks/api/useAdminSuppliers';

import FilterPurchaseOrderDetail from 'components/purchase-order-details/FilterPurchaseOrderDetail';
import PurchaseOrderDetailsTable from 'components/purchase-order-details/table/PurchaseOrderDetailsTable';

import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const PurchaseOrderDetails = () => {
  const router = useRouter();
  const { detail: supplierId, issueat } = router.query || {};

  const [params, setParams] = useState({
    issueAt: issueat
  });

  const { data } = useGetAdminSuppliersDetail(supplierId, {
    enabled: !!supplierId
  });

  const supplierData = data?.data || {};

  const additionalParams = {
    ...params,
    supplierId: supplierData?.id,
    supplierType: 'NORMAL'
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="仕入詳細ページ" />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Typography
              variant="h4"
              sx={{ padding: '24px', paddingBottom: '16px' }}
            >
              {supplierData?.name}
            </Typography>
            <FilterPurchaseOrderDetail params={params} setParams={setParams} />
            <PurchaseOrderDetailsTable additionalParams={additionalParams} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PurchaseOrderDetails;
