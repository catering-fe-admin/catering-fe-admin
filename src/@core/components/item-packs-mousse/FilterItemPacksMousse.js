import { useState } from 'react';

import pickBy from 'lodash/pickBy';

import DropdownCourses from 'components/dropdown/DropdownCourses';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import DropdownItemPacks from '../dropdown/DropdownItemPacks';
import DropdownItems from '../dropdown/DropdownItems';

const FilterItemPacksMousse = ({ setParams }) => {
  const [filter, setFilter] = useState({
    type: 'MOUSSE',
    code: {},
    course: {},
    name: {}
  });

  const handleChange = (prop) => (event) => {
    const value = event?.target?.value ?? event;

    setFilter({ ...filter, [prop]: value });
  };

  const handleSearch = () => {
    const { course, code, name } = filter || {};

    const formattedParams =
      pickBy(
        {
          code: code?.code || '',
          courseId: course?.id,
          name: name?.name || '',
          itemId: name?.id || ''
        },
        (value) => !!value
      ) || {};

    setParams(formattedParams);
  };

  return (
    <Grid container spacing={5} padding="24px" justifyContent="center">
      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Code */}
        <Grid item lg={4} md={12} xs={12}>
          <DropdownItemPacks
            label="品目パックCD"
            selectorSelectedKey="code"
            value={filter?.code}
            onChange={handleChange('code')}
            additionalParams={{
              type: 'MOUSSE'
            }}
            withAdditionalParams
          />
        </Grid>

        {/* Filter Category ( Course ) */}
        <Grid item lg={4} md={12} xs={12}>
          <DropdownCourses
            value={filter?.course}
            onChange={handleChange('course')}
            label="カテゴリー"
            additionalParams={{ type: 'MOUSSE' }}
          />
        </Grid>

        {/* Filter Item Name ( Name ) */}
        <Grid item lg={4} md={12} xs={12}>
          <DropdownItems
            label="品目名"
            value={filter?.name}
            onChange={handleChange('name')}
            additionalParams={{ type: 'MOUSSE' }}
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

export default FilterItemPacksMousse;
