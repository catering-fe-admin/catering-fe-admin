import { useState } from 'react';

import isEmpty from 'lodash/isEmpty';

import { useGetTimezoneType } from 'src/hooks/api/usePublic';

import CustomTextField from 'components/mui/text-field';

import MenuItem from '@mui/material/MenuItem';

const dictionary = {
  MORNING: '朝',
  NOON: '昼',
  NIGHT: '夜'
};

const DropdownTimezone = ({
  error,
  helperText,
  defaultValue = '',
  value = '',
  onChange,
  label = '時間帯',
  readOnly = false
}) => {
  const [timeZone, setTimezone] = useState([]);

  useGetTimezoneType({
    onSuccess: (data) => {
      if (data) {
        const options = data?.data?.map((option) => {
          return {
            label: dictionary[option],
            value: option
          };
        });

        setTimezone(options);
      }
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
      id="timeZoneDropdown"
      disabled={readOnly}
    >
      {!isEmpty(defaultValue) && (
        <MenuItem value={defaultValue}>{defaultValue}</MenuItem>
      )}
      {timeZone?.map((temp, idx) => {
        return (
          <MenuItem value={temp} key={idx}>
            {temp?.label}
          </MenuItem>
        );
      })}
    </CustomTextField>
  );
};

export default DropdownTimezone;
