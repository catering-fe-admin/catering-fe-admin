import { useState } from 'react';

import Link from 'next/link';

import fileDownload from 'js-file-download';
import pickBy from 'lodash/pickBy';

import Filter from 'src/@core/components/customers/Filter';
import CustomersTable from 'src/@core/components/customers/table/CustomersTable';
import { useExportAdminCustomers } from 'src/hooks/api/useAdminCustomers';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const Customers = () => {
  const [filterApplied, setFilterApplied] = useState({});

  const handleSetFilterApplied = (filter) => {
    const newFilter = pickBy(filter, (value) => !!value) || {};

    setFilterApplied(newFilter);
  };

  const { refetch: handleExport } = useExportAdminCustomers(filterApplied, {
    enabled: false,
    onSuccess: (data) => {
      if (data?.data) {
        fileDownload(data?.data, '施設マスタ.csv');
      }
    }
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="顧客一覧"
            action={
              <Link href="/customers/create">
                <Button variant="contained" color="info" onClick={handleExport}>
                  新規顧客登録
                </Button>
              </Link>
            }
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Filter handleSetFilterApplied={handleSetFilterApplied} />
            <CustomersTable filterApplied={filterApplied} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Customers;
