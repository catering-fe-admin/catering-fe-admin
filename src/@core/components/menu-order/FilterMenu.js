import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import dayjs from 'dayjs';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import {
  firstDateCurrentMonth,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';

import DropdownCustomerFacilities from '../dropdown/DropdownCustomerFacilities';

const CustomDateInput = forwardRef((props, ref) => {
  return (
    <CustomTextField
      {...props}
      inputRef={ref}
      label={props?.label}
      autoComplete="off"
    />
  );
});

CustomDateInput.displayName = 'CustomDateInput';

const FilterMenu = ({
  handleSetFilterApplied,
  customerFacilityId,
  customerFacility
}) => {
  const [filter, setFilter] = useState({
    requireAtFrom: firstDateCurrentMonth,
    requireAtTo: lastDateCurrentMonth,
    customerFacility: {},
    isFacilityNotPurchase: false
  });

  const handleChange = (prop) => (event) => {
    const valueList = {
      requireAtFrom: event,
      requireAtTo: event,
      timeZone: event?.target?.value,
      isFacilityNotPurchase: event?.target?.checked,
      customerFacility: event
    };

    const newValue = valueList?.[prop];

    setFilter({ ...filter, [prop]: newValue });
  };
  console.log('new', dayjs(filter?.requireAtFrom).format('YYYY-MM-DD'));

  return (
    <Grid
      container
      spacing={5}
      paddingTop="24px"
      padding="0 24px"
      justifyContent="center"
    >
      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Start Billing Month */}
        <Grid item md={5.825} xs={12}>
          <DatePickerWrapper>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              id="requireAtFrom"
              showYearDropdown
              showMonthDropdown
              selected={filter?.requireAtFrom}
              placeholderText="YYYY/MM/DD"
              onChange={handleChange('requireAtFrom')}
              customInput={<CustomDateInput fullWidth label="献立日" />}
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

        {/* Filter End Billing Month */}
        <Grid item md={5.825} xs={12}>
          <DatePickerWrapper>
            <DatePicker
              dateFormat="yyyy/MM/dd"
              id="requireAtTo"
              showYearDropdown
              showMonthDropdown
              selected={filter?.requireAtTo}
              placeholderText="YYYY/MM/DD"
              onChange={handleChange('requireAtTo')}
              customInput={<CustomDateInput fullWidth />}
            />
          </DatePickerWrapper>
        </Grid>
      </Grid>

      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Facility Name */}
        <Grid item lg={3.825} md={12} xs={12}>
          {customerFacilityId ? (
            <CustomTextField
              label="施設名"
              disabled
              value={customerFacility?.name}
              fullWidth
            />
          ) : (
            <DropdownCustomerFacilities
              defaultValue={filter?.customerFacility}
              value={filter?.customerFacility}
              onChange={handleChange('customerFacility')}
            />
          )}
        </Grid>

        <Grid
          item
          lg={0.35}
          display={{ md: 'none', xs: 'none', lg: 'block' }}
        />

        {/* Filter Billing Name */}
        <Grid item lg={3.825} md={12} xs={12}>
          <FormControlLabel
            label="一つも注文が入っていない施設"
            control={
              <Checkbox
                checked={filter?.isFacilityNotPurchase}
                onChange={handleChange('isFacilityNotPurchase')}
                name="isFacilityNotPurchase"
              />
            }
          />
        </Grid>
      </Grid>

      <Grid item container xs={12} justifyContent="center">
        <Grid xs={2}>
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

export default FilterMenu;
