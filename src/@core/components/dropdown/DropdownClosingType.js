import CustomTextField from 'components/mui/text-field'
import Autocomplete from '@mui/material/Autocomplete'
import { Box } from '@mui/material'

import { useGetClosingType } from 'src/hooks/api/usePublic'
import { closingTypeDictionary } from 'src/@core/utils/helper'

const DropdownClosingType = ({
  error,
  helperText,
  defaultValue = {},
  value = { name: '', id: '' },
  onChange,
  label = '締日',
  disabled
}) => {
  const { data } = useGetClosingType()

  const options =
    data?.data
      ?.filter(option => option != defaultValue)
      ?.map(option => {
        return {
          name: closingTypeDictionary[option],
          id: option
        }
      }) || []

  return (
    <Autocomplete
      options={options}
      getOptionLabel={option => option?.name || ''}
      id='closingTypeDropdown'
      onChange={(e, newVal) => onChange(newVal)}
      disabled={disabled}
      renderInput={props => <CustomTextField {...props} label={label} error={error} helperText={helperText} />}
      renderOption={(props, option) => (
        <Box {...props} value={option} component='li' key={option?.id}>
          {option?.name}
        </Box>
      )}
      ListboxProps={{
        style: {
          maxHeight: 150
        }
      }}
      defaultValue={defaultValue}
      value={value}
    />
  )
}

export default DropdownClosingType
