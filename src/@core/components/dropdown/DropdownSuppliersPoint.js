import { useState } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from 'components/mui/text-field'

import { useGetAdminSuppliersDetail } from 'src/hooks/api/useAdminSuppliers'

import isEmpty from 'lodash/isEmpty'

const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: 300
  }
}))

const DropdownSuppliersPoint = ({
  error,
  helperText,
  supplierId = '',
  defaultValue = {},
  value = { id: '', name: '' },
  onChange,
  label = '請求先名',
  disabled = false,
  readOnly = false,
  selectorSelectedKey = 'name'
}) => {
  const classes = useStyles()
  const [suppliersPoint, setSuppliersPoint] = useState([])

  useGetAdminSuppliersDetail(supplierId, {
    enabled: !!supplierId,
    onSuccess: data => {
      if (data?.data) {
        setSuppliersPoint(data?.data?.points?.map(e => ({ id: e?.id, name: e?.name })))
      }
    }
  })

  const options = suppliersPoint?.filter(e => e?.id != defaultValue?.id)

  return (
    <CustomTextField
      error={error}
      helperText={helperText}
      disabled={disabled}
      fullWidth
      select
      SelectProps={{
        readOnly: readOnly,
        defaultValue,
        value,
        onChange,
        MenuProps: {
          classes: {
            paper: classes.menuPaper
          }
        }
      }}
      label={label}
      id='suppliersPointDropdown'
    >
      {!isEmpty(defaultValue) && <MenuItem value={defaultValue}>{defaultValue?.[selectorSelectedKey]}</MenuItem>}

      {options?.map((option, idx) => {
        return (
          <MenuItem key={idx} value={option}>
            {option?.[selectorSelectedKey]}
          </MenuItem>
        )
      })}
    </CustomTextField>
  )
}

export default DropdownSuppliersPoint
