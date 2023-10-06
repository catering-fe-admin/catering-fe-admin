import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import dayjs from 'dayjs';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

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

const FilterSupplierPurchaseOrder = ({ setParams }) => {
  const [filter, setFilter] = useState({
    issueAtPeriodFrom: null,
    issueAtPeriodTo: null
  });

  const handleChange = (prop) => (value) => {
    setFilter({ ...filter, [prop]: value });
  };

  const handleSearch = () => {
    const { issueAtPeriodFrom, issueAtPeriodTo } = filter || {};

    setParams({
      issueAtPeriodFrom: issueAtPeriodFrom
        ? dayjs(issueAtPeriodFrom)?.startOf('month').format('YYYY-MM-DD')
        : null,
      issueAtPeriodTo: issueAtPeriodTo
        ? dayjs(issueAtPeriodTo)?.startOf('month').format('YYYY-MM-DD')
        : null
    });
  };

  return (
    <Grid container spacing={5} padding="24px" alignItems="flex-end">
      {/* Filter issueAtPeriodFrom */}
      <Grid item lg={3.825} md={3.825} xs={12}>
        <DatePickerWrapper>
          <DatePicker
            id="issueAtPeriodFrom"
            showMonthYearPicker
            selected={filter?.issueAtPeriodFrom}
            dateFormat="yyyy/MM"
            placeholderText="YYYY-MM"
            onChange={handleChange('issueAtPeriodFrom')}
            customInput={<CustomDateInput fullWidth label="発注年月" />}
          />
        </DatePickerWrapper>
      </Grid>

      <Grid
        item
        xs={0.35}
        lg={0.35}
        md={0.35}
        textAlign="center"
        marginBottom={1}
        display={{ xs: 'none', lg: 'block', md: 'block' }}
      >
        〜
      </Grid>

      {/* Filter issueAtPeriodTo */}
      <Grid item lg={3.825} md={3.825} xs={12}>
        <DatePickerWrapper>
          <DatePicker
            id="issueAtPeriodTo"
            showMonthYearPicker
            selected={filter?.issueAtPeriodTo}
            dateFormat="yyyy/MM"
            placeholderText="YYYY-MM"
            onChange={handleChange('issueAtPeriodTo')}
            customInput={<CustomDateInput fullWidth />}
          />
        </DatePickerWrapper>
      </Grid>

      <Grid item container lg={4} md={4} xs={12} justifyContent="center">
        <Grid item lg={10} md={10} xs={12}>
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

export default FilterSupplierPurchaseOrder;
