import { useState } from 'react';

import isEmpty from 'lodash/isEmpty';
import { useDebounce } from 'use-debounce';

import { loadMoreValidator } from 'src/@core/utils/helper';
import { useGetInfiniteAdminCourses } from 'src/hooks/api/useAdminCourses';

import CustomTextField from 'components/mui/text-field';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const DropdownCourses = ({
  error,
  helperText,
  defaultValue = {},
  value = { id: '', name: '' },
  onChange,
  label = 'カテゴリー',
  disabled,
  type = 'NORMAL',
  id = 'dropdownCourses',
  additionalParams
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputValueDebounce] = useDebounce(inputValue, 300);

  const params = {
    page: 1,
    size: 10,
    type,
    name: inputValueDebounce,
    ...additionalParams
  };

  if (isEmpty(params.name)) delete params.name;

  const {
    data: options,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetInfiniteAdminCourses(params, {
    select: (data) => {
      return data?.pages?.flatMap((x) => {
        return x?.data?.content;
      });
    }
  });

  const onInputChange = (event, value, reason) => {
    if (event && event.type === 'blur') {
      setInputValue('');
    } else if (reason !== 'reset') {
      setInputValue(value);
    }
  };

  const onScrollHandler = (e) => {
    const target = e.currentTarget;

    loadMoreValidator(target, 30, async () => {
      if (!hasNextPage) return;
      if (isFetchingNextPage) return;

      fetchNextPage();
    });
  };

  return (
    <Autocomplete
      options={options || []}
      getOptionLabel={(option) => option?.name || ''}
      id={id}
      onInputChange={onInputChange}
      onChange={(e, newVal) => onChange(newVal)}
      disabled={disabled}
      renderInput={(props) => (
        <CustomTextField
          {...props}
          label={label}
          error={error}
          helperText={helperText}
        />
      )}
      renderOption={(props, option) => (
        <Box {...props} value={option} component="li" key={option?.id}>
          {option?.name}
        </Box>
      )}
      ListboxProps={{
        onScroll: onScrollHandler,
        style: {
          maxHeight: 150
        }
      }}
      defaultValue={defaultValue}
      value={value}
    />
  );
};

export default DropdownCourses;
