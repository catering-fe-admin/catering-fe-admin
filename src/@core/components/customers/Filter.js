import React, { useState } from 'react';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

const Filter = ({ handleSetFilterApplied }) => {
  const [filter, setFilter] = useState({
    code: '',
    name: ''
  });

  const handleChange = (prop) => (event) => {
    const newValue = event?.target?.value;

    setFilter({ ...filter, [prop]: newValue });
  };

  return (
    <Grid container spacing={5} padding="24px" justifyContent="center">
      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Code  */}
        <Grid item lg={6} md={6} xs={12}>
          <CustomTextField
            fullWidth
            type="text"
            value={filter?.code}
            onChange={handleChange('code')}
            label="顧客CD"
            id="code"
          />
        </Grid>

        {/* Filter Customers Name  */}
        <Grid item lg={6} md={6} xs={12}>
          <CustomTextField
            fullWidth
            type="text"
            value={filter?.name}
            onChange={handleChange('name')}
            label="顧客名"
            id="customersName"
          />
        </Grid>
      </Grid>

      <Grid item container xs={12} justifyContent="center">
        <Grid item xs={2}>
          <Button
            fullWidth
            color="warning"
            variant="contained"
            onClick={() => handleSetFilterApplied(filter)}
          >
            検索
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Filter;
