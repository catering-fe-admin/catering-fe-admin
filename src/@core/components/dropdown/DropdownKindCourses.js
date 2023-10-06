import isEmpty from 'lodash/isEmpty';

import CustomTextField from 'components/mui/text-field';

import MenuItem from '@mui/material/MenuItem';

const DropdownKindCourses = ({
  error,
  helperText,
  defaultValue = {},
  value = { id: '', value: '' },
  onChange,
  label = '種類',
  readOnly = false
}) => {
  const options = [
    {
      id: 1,
      value: 'NORMAL'
    },
    {
      id: 2,
      value: 'MOUSSE'
    },
    {
      id: 3,
      value: 'RICE'
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
      id="DropdownKindCourses"
    >
      {!isEmpty(defaultValue) && (
        <MenuItem value={defaultValue}>{defaultValue?.value}</MenuItem>
      )}

      {options?.map((option, idx) => {
        return (
          <MenuItem key={idx} value={option}>
            {option?.value}
          </MenuItem>
        );
      })}
    </CustomTextField>
  );
};

export default DropdownKindCourses;
