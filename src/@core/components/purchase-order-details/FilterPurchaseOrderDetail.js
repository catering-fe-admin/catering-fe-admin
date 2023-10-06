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

const FilterPurchaseOrderDetail = ({ params, setParams }) => {
  const [filter, setFilter] = useState({
    issueAt: new Date(params?.issueAt) ?? null
  });

  const handleChange = (prop) => (event) => {
    const value = event;
    setFilter({ ...filter, [prop]: value });
  };

  const handleSearch = () => {
    const { issueAt } = filter || {};

    setParams({
      issueAt: issueAt
        ? dayjs(issueAt)?.startOf('month').format('YYYY-MM-DD')
        : null
    });
  };

  return (
    <Grid container spacing={5} padding="24px" alignItems="flex-end">
      <Grid item lg={6} md={12} xs={12}>
        <DatePickerWrapper>
          <DatePicker
            id="issueAt"
            showMonthYearPicker
            selected={filter?.issueAt}
            dateFormat="yyyy/MM"
            placeholderText="YYYY-MM"
            onChange={handleChange('issueAt')}
            customInput={<CustomDateInput fullWidth label="請求月" />}
          />
        </DatePickerWrapper>
      </Grid>

      <Grid item lg={3} md={12} xs={12}>
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
  );
};

export default FilterPurchaseOrderDetail;
