import { useState } from 'react';
import DatePicker from 'react-datepicker';

import pickBy from 'lodash/pickBy';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import DropdownCustomerFacilities from '../dropdown/DropdownCustomerFacilities';
import DropdownItems from '../dropdown/DropdownItems';

const FilterItemDeliveries = ({ setParams }) => {
  const [filter, setFilter] = useState({
    requireAtFrom: firstDateCurrentMonth,
    requireAtTo: lastDateCurrentMonth
  });

  const handleChange = (prop) => (event) => {
    setFilter({ ...filter, [prop]: event });
  };

  const handleSearch = () => {
    const { requireAtFrom, requireAtTo, facility, item } = filter || {};

    const newFilter =
      pickBy(
        {
          facilityId: facility?.id || '',
          itemId: item?.id || '',
          issueAtPeriodFrom: getFormattedParamsDate(requireAtFrom),
          issueAtPeriodTo: getFormattedParamsDate(requireAtTo)
        },
        (value) => !!value
      ) || {};

    setParams(newFilter);
  };
  return (
    <Grid container spacing={5} padding="24px" justifyContent="center">
      <Grid item container xs={12} spacing={5} alignItems="flex-end">
        {/* Filter requireAtFrom */}
        <Grid item md={5.825} xs={12}>
          <DatePickerWrapper>
            <DatePicker
              id="requireAtFrom"
              showYearDropdown
              showMonthDropdown
              selected={filter?.requireAtFrom}
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
              onChange={handleChange('requireAtFrom')}
              customInput={<CustomTextField fullWidth label="献立日" />}
            />
          </DatePickerWrapper>
        </Grid>

        <Grid
          item
          lg={0.35}
          md={0.35}
          marginBottom={1}
          display={{ xs: 'none', lg: 'block', md: 'block' }}
        >
          〜
        </Grid>

        {/* Filter requireAtTo */}
        <Grid item md={5.825} xs={12}>
          <DatePickerWrapper>
            <DatePicker
              id="requireAtTo"
              showYearDropdown
              showMonthDropdown
              selected={filter?.requireAtTo}
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
              onChange={handleChange('requireAtTo')}
              customInput={
                <CustomTextField
                  fullWidth
                  label={String.fromCharCode(8287).repeat(30)}
                />
              }
            />
          </DatePickerWrapper>
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={5} alignItems="flex-end">
        <Grid item md={5.825} xs={12}>
          <DropdownCustomerFacilities
            label="施設名"
            value={filter?.facility}
            onChange={handleChange('facility')}
          />
        </Grid>

        <Grid
          item
          lg={0.35}
          md={0.35}
          marginBottom={1}
          display={{ xs: 'none', lg: 'block', md: 'block' }}
        />

        <Grid item md={5.825} xs={12}>
          <DropdownItems
            label="商品名"
            value={filter?.item}
            onChange={handleChange('item')}
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

export default FilterItemDeliveries;
