import isEmpty from 'lodash/isEmpty';

import { useGetAdminCustomersDetail } from 'src/hooks/api/useAdminCustomers';

import CustomTextField from 'components/mui/text-field';

import MenuItem from '@mui/material/MenuItem';

const DropdownBillingAddress = ({
  error,
  helperText,
  defaultValue = {},
  value = { id: '', name: '' },
  onChange,
  label = '締日',
  customerId,
  readOnly = false
}) => {
  const { data } = useGetAdminCustomersDetail(customerId, {
    enabled: !!customerId,
    select: (data) => {
      return data?.data?.billings?.filter((e) => e?.name);
    }
  });

  return (
    <CustomTextField
      error={error}
      helperText={helperText}
      fullWidth
      select
      SelectProps={{ readOnly: readOnly, defaultValue, value, onChange }}
      label={label}
      id="billingAddressDropdown"
    >
      {!isEmpty(defaultValue) && (
        <MenuItem value={defaultValue}>{defaultValue?.name}</MenuItem>
      )}
      {data?.map((option, idx) => {
        return (
          <MenuItem value={option} key={idx}>
            {option?.name}
          </MenuItem>
        );
      })}
    </CustomTextField>
  );
};

export default DropdownBillingAddress;
