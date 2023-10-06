import { useState } from 'react';

import pickBy from 'lodash/pickBy';

import FilterFaciities from 'components/facilities/FilterFaciities';
import TableFacilities from 'components/facilities/table/TableFacilities';

import { Card, CardContent, CardHeader, Grid } from '@mui/material';

const Facilities = () => {
  const [params, setParams] = useState({});

  const handleSetParams = (filter) => {
    const newFilter = pickBy(filter, (value) => !!value) || {};

    setParams(newFilter);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="施設一覧" />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterFaciities handleSetParams={handleSetParams} />
            <TableFacilities additionalParams={params} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Facilities;
