import React from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Button, Card, CardContent, CardHeader, Grid } from '@mui/material';

import FacilitiesTable from './table/FacilitiesTable';

const ListCustomersFacilities = () => {
  const router = useRouter();
  const customerId = router.query.id;

  return (
    <Grid container spacing={6} sx={{ marginTop: '24px' }}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="施設一覧"
            action={
              <Link href={`/customers/${customerId}/facilities/create`}>
                <Button variant="contained" color="info">
                  施設追加
                </Button>
              </Link>
            }
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FacilitiesTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ListCustomersFacilities;
