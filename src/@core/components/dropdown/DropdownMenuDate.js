import isEmpty from 'lodash/isEmpty';

import CustomTextField from 'components/mui/text-field';

import MenuItem from '@mui/material/MenuItem';

const DropdownMenuDate = ({
  error,
  helperText,
  defaultValue = {},
  value = { id: '', value: '' },
  onChange,
  label = 'menu date',
  readOnly = false
}) => {
  const options = [
    {
      id: 1,
      value: 'require',
      label: '献立日',
      key: 'Menu Date'
    },
    {
      id: 2,
      value: 'delivery',
      label: '出荷日',
      key: 'Delivery Date'
    },
    {
      id: 3,
      value: 'work',
      label: '仕事の日付',
      key: 'Work Date'
    }
  ]?.filter?.((e) => e?.value !== value?.value);

  return (
    <CustomTextField
      error={error}
      helperText={helperText}
      fullWidth
      select
      SelectProps={{
        readOnly: readOnly,
        defaultValue,
        value,
        onChange
      }}
      label={label}
      id="DropdownMenuDate"
    >
      {!isEmpty(defaultValue) && (
        <MenuItem value={defaultValue}>{defaultValue?.label}</MenuItem>
      )}

      {options?.map((option, idx) => {
        return (
          <MenuItem key={idx} value={option}>
            {option?.label}
          </MenuItem>
        );
      })}
    </CustomTextField>
  );
};

export default DropdownMenuDate;
