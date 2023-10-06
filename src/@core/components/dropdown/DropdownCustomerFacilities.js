import { useState } from 'react';

import isEmpty from 'lodash/isEmpty';
import { useDebounce } from 'use-debounce';

import { loadMoreValidator } from 'src/@core/utils/helper';
import { useGetInfiniteCustomersFacilities } from 'src/hooks/api/useAdminCustomersFacilities';

import CustomTextField from 'components/mui/text-field';

import { Box } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';

const DropdownCustomerFacilities = ({
  error,
  helperText,
  defaultValue = {},
  value = { id: '', name: '' },
  onChange,
  label = '施設名',
  disabled,
  selectorSelectedKey = 'name', // name or code
  additionalParams = {}
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputValueDebounce] = useDebounce(inputValue, 300);

  const params = {
    page: 1,
    size: 5,
    [selectorSelectedKey]: inputValueDebounce,
    ...additionalParams
  };

  if (isEmpty(params.name)) delete params.name;

  const {
    data: options,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetInfiniteCustomersFacilities(params, {
    select: (data) => {
      return data?.pages?.flatMap((x) => {
        return x?.data?.content;
      });
    }
  });

  const onScrollHandler = (e) => {
    const target = e.currentTarget;

    loadMoreValidator(target, 30, async () => {
      if (!hasNextPage) return;
      if (isFetchingNextPage) return;

      fetchNextPage();
    });
  };

  const onInputChange = (event, value, reason) => {
    if (event && event.type === 'blur') {
      setInputValue('');
    } else if (reason !== 'reset') {
      setInputValue(value);
    }
  };

  const getOptionLabel = (option) => {
    return option?.[selectorSelectedKey];
  };

  return (
    <Autocomplete
      options={options || []}
      getOptionLabel={(option) => getOptionLabel(option) || ''}
      id="dropdownCustomerFacilities"
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
        <Box {...props} component="li" key={option?.id}>
          {getOptionLabel(option) || ''}
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

export default DropdownCustomerFacilities;
