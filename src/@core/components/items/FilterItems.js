import { useState } from 'react';

import pickBy from 'lodash/pickBy';

import DropdownCourses from 'components/dropdown/DropdownCourses';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import DropdownItems from '../dropdown/DropdownItems';
import DropdownSuppliers from '../dropdown/DropdownSuppliers';

const FilterItems = ({ setParams }) => {
  const [filter, setFilter] = useState({
    code: {},
    course: {},
    name: {},
    items: {},
    supplier: {}
  });

  const handleChange = (prop) => (event) => {
    const value = event?.target?.value ?? event;

    setFilter({ ...filter, [prop]: value });
  };

  const handleSearch = () => {
    const { course, code, name, supplier } = filter || {};

    const formattedParams =
      pickBy(
        {
          code: code?.code || '',
          courseId: course?.id || '',
          name: name?.name || '',
          supplierId: supplier?.id || '',
          supplierName: supplier?.name || ''
        },
        (value) => !!value
      ) || {};

    setParams(formattedParams);
  };

  return (
    <Grid container spacing={5} padding="24px" justifyContent="center">
      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Code */}
        <Grid item lg={6} md={6} xs={12}>
          <DropdownItems
            label="品目CD"
            selectorSelectedKey="code"
            value={filter?.code}
            onChange={handleChange('code')}
          />
        </Grid>

        {/* Filter Category ( Course ) */}
        <Grid item lg={6} md={6} xs={12}>
          <DropdownCourses
            value={filter?.course}
            onChange={handleChange('course')}
            label="カテゴリー"
          />
        </Grid>
      </Grid>

      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Item Name ( Name ) */}
        <Grid item lg={6} md={6} xs={12}>
          <DropdownItems
            label="品目名"
            value={filter?.name}
            onChange={handleChange('name')}
          />
        </Grid>

        {/* Filter Supplier Name  */}
        <Grid item lg={6} md={6} xs={12}>
          <DropdownSuppliers
            label="仕入先"
            value={filter?.supplier}
            onChange={handleChange('supplier')}
          />
        </Grid>
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

export default FilterItems;
