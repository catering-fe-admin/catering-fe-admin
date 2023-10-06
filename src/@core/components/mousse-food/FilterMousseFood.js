import { forwardRef } from 'react';
import DatePicker from 'react-datepicker';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

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

const FilterMousseFood = ({ filter, handleChange }) => {
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
        <Grid item lg={5.825} md={5.825} xs={12}>
          <DatePickerWrapper>
            <DatePicker
              id="startDate"
              showYearDropdown
              showMonthDropdown
              selected={filter?.startDate}
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
              onChange={handleChange('startDate')}
              customInput={<CustomDateInput fullWidth label="希望納品日" />}
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
        <Grid item lg={5.825} md={5.825} xs={12}>
          <DatePickerWrapper>
            <DatePicker
              id="endDate"
              showYearDropdown
              showMonthDropdown
              selected={filter?.endDate}
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
              onChange={handleChange('endDate')}
              customInput={<CustomDateInput fullWidth />}
            />
          </DatePickerWrapper>
        </Grid>
      </Grid>

      <Grid item container xs={12} spacing={5} alignItems="flex-end">
        {/* Filter Facility Name */}
        <Grid item lg={5.825} md={5.825} xs={12}>
          <CustomTextField
            fullWidth
            select
            value={filter?.facilityName}
            onChange={handleChange('facilityName')}
            label="施設名"
            id="facilityName"
          >
            <MenuItem value="リールホーム学園前">リールホーム学園前</MenuItem>
          </CustomTextField>
        </Grid>

        {/* Separator */}
        <Grid
          item
          lg={0.35}
          md={0.35}
          marginBottom={1}
          display={{ xs: 'none', lg: 'block', md: 'block' }}
        />

        {/* Filter Order Type */}
        <Grid item lg={5.825} md={5.825} xs={12}>
          <FormControl sx={{ flexWrap: 'wrap', flexDirection: 'row' }}>
            <RadioGroup
              row
              value={filter?.orderType}
              name="order-type-radio"
              onChange={handleChange('orderType')}
              aria-label="order-type-radio"
            >
              <FormControlLabel
                value="発注未済"
                control={<Radio />}
                label="発注未済"
              />
              <FormControlLabel
                value="発注済み"
                control={<Radio />}
                label="発注済み"
              />
              <FormControlLabel
                value="全注文"
                control={<Radio />}
                label="全注文"
              />
            </RadioGroup>
          </FormControl>
        </Grid>

        <Grid item container xs={12} justifyContent="center">
          <Grid item xs={2}>
            <Button fullWidth color="warning" variant="contained">
              検索
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterMousseFood;
