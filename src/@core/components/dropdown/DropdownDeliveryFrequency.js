import MenuItem from '@mui/material/MenuItem'
import CustomTextField from 'components/mui/text-field'
import { useGetDeliveryFrequency } from 'src/hooks/api/usePublic'

import isEmpty from 'lodash/isEmpty'

const DropdownDeliveryFrequency = ({
  error,
  helperText,
  defaultValue = '',
  value = '',
  onChange,
  label = '配送頻度',
  readOnly = false
}) => {
  const { data } = useGetDeliveryFrequency()

  const options = data?.data || []

  const dictionary = {
    EVERY_DAY: '毎日',
    EVERY_2_DAY: '２日に１回',
    EVERY_3_DAY: '３日に１回',
    EVERY_4_DAY: '４日に１回'
  }

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
      id='DropdownDeliveryFrequency'
    >
      {!isEmpty(defaultValue) && <MenuItem value={defaultValue}>{defaultValue}</MenuItem>}
      {options?.map((option, idx) => {
        return (
          <MenuItem value={option} key={idx}>
            {dictionary[option]}
          </MenuItem>
        )
      })}
    </CustomTextField>
  )
}

export default DropdownDeliveryFrequency
