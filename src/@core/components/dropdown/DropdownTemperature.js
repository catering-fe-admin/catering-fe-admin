import { useState } from 'react'

import MenuItem from '@mui/material/MenuItem'
import CustomTextField from 'components/mui/text-field'

import { useGetTemperature } from 'src/hooks/api/usePublic'
import { getTemperatureLocale } from 'src/@core/utils/temperatureUtils'

import isEmpty from 'lodash/isEmpty'

const DropdownTemperature = ({
  error,
  helperText,
  defaultValue = '',
  value = '',
  onChange,
  label = '温度帯',
  readOnly = false
}) => {
  const [temperature, setTemperature] = useState([])
  useGetTemperature({
    onSuccess: data => {
      if (data) {
        setTemperature(
          data?.data?.filter(e => getTemperatureLocale(e) != defaultValue).map(e => getTemperatureLocale(e))
        )
      }
    }
  })

  return (
    <CustomTextField
      error={error}
      helperText={helperText}
      fullWidth
      select
      SelectProps={{ readOnly: readOnly, defaultValue, value, onChange }}
      label={label}
      id='temperatureDropdown'
    >
      {!isEmpty(defaultValue) && <MenuItem value={defaultValue}>{defaultValue}</MenuItem>}
      {temperature?.map((temp, idx) => {
        return (
          <MenuItem value={temp} key={idx}>
            {temp}
          </MenuItem>
        )
      })}
    </CustomTextField>
  )
}

export default DropdownTemperature
