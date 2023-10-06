import React, { useState } from 'react';

import { Grid, Typography } from '@mui/material';

import FilterFacilityOrderList from './FilterFacilityOrderList';
import FacilityOrderTable from './table/FacilityOrderTable';

const FacilityOrderList = () => {
  const [filter, setFilter] = useState({
    issueAtPeriodFrom: null,
    issueAtPeriodTo: null
  });

  const [filterApplied, setFilterApplied] = useState(filter);

  const handleChange = (prop) => (event) => {
    const newValue = event?.target?.value ?? event;

    setFilter({ ...filter, [prop]: newValue });
  };

  return (
    <>
      <Grid item xs={12} sx={{ marginTop: '24px' }}>
        <Typography variant="h5">【注文情報】</Typography>
      </Grid>

      <FilterFacilityOrderList
        filter={filter}
        handleChange={handleChange}
        setFilterApplied={setFilterApplied}
      />
      <FacilityOrderTable filterApplied={filterApplied} />
    </>
  );
};

export default FacilityOrderList;
