import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import pickBy from 'lodash/pickBy';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  getLastDateOfMonth,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

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

const PurchasePaymentFilter = ({ setFilterApplied }) => {
  const [filter, setFilter] = useState({
    issueAtPeriodFrom: firstDateCurrentMonth,
    issueAtPeriodTo: lastDateCurrentMonth,
    supplierName: '',
    supplierPointName: ''
  });

  const handleChange = (prop) => (event) => {
    let value = event?.target?.value ?? event;

    if (prop == 'issueAtPeriodTo') {
      value = getLastDateOfMonth(value);
    }

    setFilter({ ...filter, [prop]: value });
  };

  const handleSetFilterApplied = () => {
    const issueAtPeriodFrom = getFormattedParamsDate(filter?.issueAtPeriodFrom);
    const issueAtPeriodTo = getFormattedParamsDate(filter?.issueAtPeriodTo);

    const newFilter =
      pickBy(
        {
          ...filter,
          issueAtPeriodFrom: issueAtPeriodFrom,
          issueAtPeriodTo: issueAtPeriodTo
        },
        (value) => !!value
      ) || {};

    setFilterApplied(newFilter);
  };

  return (
    <Grid container spacing={5} p="24px">
      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Start Billing Month */}
        <Grid item lg={5.825} md={5.825} xs={12}>
          <DatePickerWrapper>
            <DatePicker
              id="issueAtPeriodFrom"
              selected={filter?.issueAtPeriodFrom}
              showMonthYearPicker
              dateFormat="yyyy/MM"
              placeholderText="YYYY/MM"
              onChange={handleChange('issueAtPeriodFrom')}
              customInput={<CustomDateInput fullWidth label="請求月" />}
            />
          </DatePickerWrapper>
        </Grid>

        <Grid
          item
          xs={0.35}
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
              id="issueAtPeriodTo"
              selected={filter?.issueAtPeriodTo}
              showMonthYearPicker
              dateFormat="yyyy/MM"
              placeholderText="YYYY/MM"
              onChange={handleChange('issueAtPeriodTo')}
              customInput={<CustomDateInput fullWidth />}
            />
          </DatePickerWrapper>
        </Grid>
      </Grid>

      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Customer Name */}
        <Grid item lg={5.825} md={5.825} xs={12}>
          <CustomTextField
            fullWidth
            type="text"
            label="仕入先顧客名"
            value={filter?.supplierName}
            id="supplierName"
            onChange={handleChange('supplierName')}
          />
        </Grid>

        {/* Separator */}
        <Grid
          item
          xs={0.35}
          lg={0.35}
          md={0.35}
          marginBottom={1}
          display={{ xs: 'none', lg: 'block', md: 'block' }}
        />

        {/* Filter Billing Name */}
        <Grid item lg={5.825} md={5.825} xs={12}>
          <CustomTextField
            fullWidth
            type="text"
            label="仕入先請求先名"
            value={filter?.supplierPointName}
            id="supplierPointName"
            onChange={handleChange('supplierPointName')}
          />
        </Grid>

        {/* Button Search */}
        <Grid item container xs={12} justifyContent="center">
          <Grid xs={2}>
            <Button
              fullWidth
              color="warning"
              variant="contained"
              onClick={handleSetFilterApplied}
            >
              検索
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PurchasePaymentFilter;
