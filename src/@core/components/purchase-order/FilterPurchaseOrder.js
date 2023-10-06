import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  getLastDateOfMonth,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';
import { useGetAdminSuppliersDetail } from 'src/hooks/api/useAdminSuppliers';

import DropdownSuppliers from 'components/dropdown/DropdownSuppliers';
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

const FilterPurchaseOrder = ({ setParams }) => {
  const [filter, setFilter] = useState({
    supplier: null,
    issueAtPeriodFrom: firstDateCurrentMonth,
    issueAtPeriodTo: lastDateCurrentMonth
  });

  const handleChange = (prop) => (event) => {
    let value = ['issueAtPeriodFrom', 'issueAtPeriodTo', 'supplier']?.includes(
      prop
    )
      ? event
      : event.target.value;

    if (prop == 'issueAtPeriodTo') {
      value = getLastDateOfMonth(value);
    }

    setFilter({ ...filter, [prop]: value });
  };

  const { data: supplierData } = useGetAdminSuppliersDetail(
    filter?.supplier?.id,
    {
      enabled: !!filter?.supplier
    }
  );

  const handleSearch = () => {
    const { issueAtPeriodFrom, issueAtPeriodTo } = filter || {};

    setParams({
      issueAtPeriodFrom: getFormattedParamsDate(issueAtPeriodFrom),
      issueAtPeriodTo: getFormattedParamsDate(issueAtPeriodTo),
      supplierId: supplierData?.data?.id
    });
  };

  return (
    <Grid container spacing={5} padding="24px" justifyContent="center">
      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Supplier Name ( supplier name ) */}
        <Grid item lg={4} md={12} xs={12}>
          <DropdownSuppliers
            type="NORMAL"
            value={filter?.supplier}
            onChange={handleChange('supplier')}
            label="仕入先名"
          />
        </Grid>

        <Grid
          item
          container
          lg={8}
          md={12}
          xs={12}
          spacing={2}
          alignItems="flex-end"
        >
          {/* Filter issueAtPeriodFrom */}
          <Grid item lg={5.825} md={5.825} xs={12}>
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
          <Grid item lg={5.825} md={5.825} xs={12}>
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

export default FilterPurchaseOrder;
