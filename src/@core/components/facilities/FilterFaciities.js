import { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import DropdownCustomerFacilities from '../dropdown/DropdownCustomerFacilities';

const FilterFaciities = ({ handleSetParams }) => {
  const [filter, setFilter] = useState({});

  const handleChange = (prop) => (event) => {
    setFilter({ ...filter, [prop]: event });
  };

  const handleSearch = () => {
    const { facility1, facility2 } = filter || {};

    handleSetParams({
      code: facility1?.code || '',
      name: facility2?.name || ''
    });
  };

  return (
    <Grid container spacing={5} padding="24px">
      <Grid item lg={6} md={6} xs={12} spacing={5}>
        <DropdownCustomerFacilities
          label="施設CD"
          value={filter?.facility1 || null}
          onChange={handleChange('facility1')}
          selectorSelectedKey="code"
          additionalParams={{
            name: filter?.facility2?.name
          }}
        />
      </Grid>

      <Grid item lg={6} md={6} xs={12} spacing={5}>
        <DropdownCustomerFacilities
          label="施設名"
          value={filter?.facility2 || null}
          onChange={handleChange('facility2')}
          selectorSelectedKey="name"
          additionalParams={{
            code: filter?.facility1?.code
          }}
        />
      </Grid>

      <Grid item container xs={12} justifyContent="center">
        <Grid item xs={2}>
          <Button
            fullWidth
            color="warning"
            variant="contained"
            onClick={handleSearch}
          >
            検索
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterFaciities;
