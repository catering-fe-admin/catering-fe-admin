import { useState } from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import FilterPurchaseOrderDetail from './FilterPurchaseOrderDetail';
import PurchaseOrderDetailTable from './table/PurchaseOrderDetailTable';

const PurchaseOrderDetail = ({ defaultValue, cardTitle = '' }) => {
  const [params, setParams] = useState({
    supplier: defaultValue?.supplier,
    issueAt: defaultValue?.issueAt
      ? new Date(defaultValue?.issueAt)
      : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  });

  return (
    <Card>
      <CardHeader title={cardTitle} />
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <FilterPurchaseOrderDetail
          defaultValue={defaultValue}
          params={params}
          setParams={setParams}
        />
        <PurchaseOrderDetailTable
          defaultValue={defaultValue}
          additionalParams={params}
        />
      </CardContent>
    </Card>
  );
};

export default PurchaseOrderDetail;
