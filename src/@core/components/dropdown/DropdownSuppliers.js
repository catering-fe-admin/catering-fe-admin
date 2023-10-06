import { useState } from 'react';

import isEmpty from 'lodash/isEmpty';
import { useDebounce } from 'use-debounce';

import { loadMoreValidator } from 'src/@core/utils/helper';
import { useGetInfiniteSuppliers } from 'src/hooks/api/useAdminSuppliers';

import CustomTextField from 'components/mui/text-field';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const DropdownSuppliers = ({
  error,
  helperText,
  withAdditionalParams,
  additionalParams,
  defaultValue = {},
  value = { id: '', name: '' },
  onChange,
  label = '仕入先',
  type,
  selectorSelectedKey = 'name',
  disabled,
  id = 'dropdownItems',
  disableClearable = false,
  customOptions
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputValueDebounce] = useDebounce(inputValue, 300);

  const params = {
    page: 1,
    size: 10,
    name: inputValueDebounce,
    ...(type && { type }),
    ...additionalParams
  };

  if (isEmpty(params.name)) delete params.name;

  const {
    data: options,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetInfiniteSuppliers(params, {
    enabled: withAdditionalParams ? !isEmpty(additionalParams) : true,
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

  return (
    <Autocomplete
      options={customOptions ? customOptions : options || []}
      getOptionLabel={(option) => option?.[selectorSelectedKey] || ''}
      id={id}
      disableClearable={disableClearable}
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
          {option?.[selectorSelectedKey]}
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

export default DropdownSuppliers;
