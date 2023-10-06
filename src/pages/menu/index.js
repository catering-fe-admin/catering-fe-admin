import { useState } from 'react';

import Link from 'next/link';

import pickBy from 'lodash/pickBy';

import FilterMenu from 'src/@core/components/menu/FilterMenu';
import MenuTable from 'src/@core/components/menu/table/MenuTable';
import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const Menu = () => {
  const [filterApplied, setFilterApplied] = useState({
    dateFrom: getFormattedParamsDate(firstDateCurrentMonth),
    dateTo: getFormattedParamsDate(lastDateCurrentMonth)
  });

  const handleSetFilterApplied = (filter) => {
    const newFilter =
      pickBy(
        {
          dateFrom: getFormattedParamsDate(filter?.dateFrom),
          dateTo: getFormattedParamsDate(filter?.dateTo)
        },
        (value) => !!value
      ) || {};

    setFilterApplied(newFilter);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="献立マスター"
            action={
              <Link href="/menu/create">
                <Button variant="contained" color="info">
                  新規献立登録
                </Button>
              </Link>
            }
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterMenu handleSetFilterApplied={handleSetFilterApplied} />
            <MenuTable filterApplied={filterApplied} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Menu;
