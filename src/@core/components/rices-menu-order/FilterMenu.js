import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

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

const FilterMenu = ({ filter, handleChange, setFilterApplied }) => {
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
              id="requireAtFrom"
              showYearDropdown
              showMonthDropdown
              selected={filter?.requireAtFrom}
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
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
        <Grid item md={5.825} xs={12}>
          <DropdownCustomerFacilities
            defaultValue={filter?.customerFacility}
            value={filter?.customerFacility}
            onChange={handleChange('customerFacility')}
          />
        </Grid>

        <Grid
          item
          lg={0.35}
          md={0.35}
          marginBottom={1}
          display={{ xs: 'none', lg: 'block', md: 'block' }}
        ></Grid>

        {/* Filter Billing Name */}
        <Grid item md={5.825} xs={12}>
          <FormControlLabel
            label="発注未済"
            control={
              <Checkbox
                checked={filter?.orderStatus === 'notCompleted'}
                onChange={handleChange('orderStatus')}
                value="notCompleted"
              />
            }
          />

          <FormControlLabel
            label="発注済み"
            control={
              <Checkbox
                checked={filter?.orderStatus === 'completed'}
                onChange={handleChange('orderStatus')}
                value="completed"
              />
            }
          />

          <FormControlLabel
            label="全注文"
            control={
              <Checkbox
                checked={filter?.orderStatus === 'all'}
                onChange={handleChange('orderStatus')}
                value="all"
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
            onClick={() => setFilterApplied(filter)}
          >
            検索
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterMenu;
