import { useState } from 'react';

import FilterInventoryList from 'components/inventory-list/FilterInventoryList';
import InventoryListTable from 'components/inventory-list/table/InventoryListTable';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const InventoryManagement = () => {
  const [params, setParams] = useState({});

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="在庫管理ページ" />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterInventoryList setParams={setParams} />
            <InventoryListTable params={params} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default InventoryManagement;
