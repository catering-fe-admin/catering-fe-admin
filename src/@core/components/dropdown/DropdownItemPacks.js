import { useState } from 'react';

import isEmpty from 'lodash/isEmpty';
import { useDebounce } from 'use-debounce';

import { loadMoreValidator } from 'src/@core/utils/helper';
import { useGetInfiniteAdminItemPacks } from 'src/hooks/api/useAdminItemPacks';

import CustomTextField from 'components/mui/text-field';

import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';

const DropdownItemPacks = ({
  error,
  helperText,
  withAdditionalParams,
  additionalParams,
  defaultValue = {},
  value = {},
  onChange,
  label = '',
  selectorSelectedKey = 'name', // name or code
  disabled = false,
  disableClearable,
  contentsModifier
}) => {
  const [inputValue, setInputValue] = useState('');
  const [inputValueDebounce] = useDebounce(inputValue, 300);

  const params = {
    page: 1,
    size: 10,
    [selectorSelectedKey]: inputValueDebounce,
    ...additionalParams
  };

  // Remove empty object value
  Object.keys(params).map((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const {
    data: options,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useGetInfiniteAdminItemPacks(params, {
    enabled: disabled
      ? false
      : withAdditionalParams
      ? !isEmpty(additionalParams)
      : true,
    select: (data) => {
      const contents = data?.pages?.flatMap((x) => {
        return x?.data?.content;
      });

      return contentsModifier ? contentsModifier(contents) : contents;
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
    const value = {
      ...option,
      code: option?.code,
      name: option?.item?.name
    };

    return value?.[selectorSelectedKey];
  };

  return (
    <Autocomplete
      options={options || []}
      getOptionLabel={(option) => getOptionLabel(option) || ''}
      id="autocomplete-custom"
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

export default DropdownItemPacks;
