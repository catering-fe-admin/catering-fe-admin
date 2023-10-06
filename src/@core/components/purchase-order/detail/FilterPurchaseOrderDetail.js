import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import { useRouter } from 'next/router';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
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

const FilterPurchaseOrderDetail = ({ params, setParams, defaultValue }) => {
  const router = useRouter();
  const id = router.query.id;
  const isEdit = !!id;

  const [filter, setFilter] = useState({
    supplier: defaultValue?.supplier
  });

  const handleChange = (prop) => (event) => {
    const value = event || event?.target?.value;

    setFilter({ ...filter, [prop]: value });
  };

  const handleChangeIssuAt = (value) => {
    setParams({
      ...params,
      issueAt: value
    });
  };

  const { data: supplierData } = useGetAdminSuppliersDetail(
    filter?.supplier?.id,
    {
      enabled: !!filter?.supplier
    }
  );

  const handleSearch = () => {
    setParams({ ...params, supplier: supplierData?.data });
  };

  return (
    <Grid container spacing={5} padding="24px" justifyContent="flex-end ">
      <Grid item container xs={12} spacing={5} alignItems="flex-end">
        {/* Filter Supplier Name ( supplier name ) */}
        <Grid item xs={isEdit ? 6 : 4.5}>
          <DropdownSuppliers
            type="NORMAL"
            disabled={isEdit}
            defaultValue={defaultValue?.supplier || {}}
            value={filter?.supplier || null}
            onChange={handleChange('supplier')}
            label="仕入先名"
          />
        </Grid>

        {!isEdit && (
          <Grid item xs={3}>
            <Button
              disabled={isEdit}
              fullWidth
              color="warning"
              variant="contained"
              onClick={handleSearch}
            >
              検索
            </Button>
          </Grid>
        )}

        {/* Filter issueAt */}
        <Grid item xs={isEdit ? 6 : 4.5}>
          <DatePickerWrapper>
            <DatePicker
              disabled={isEdit}
              id="issueAt"
              selected={params?.issueAt}
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
              onChange={handleChangeIssuAt}
              customInput={
                <CustomDateInput
                  InputProps={{ readOnly: true }}
                  fullWidth
                  label="発行日"
                />
              }
            />
          </DatePickerWrapper>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterPurchaseOrderDetail;
