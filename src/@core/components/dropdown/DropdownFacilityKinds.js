import { useEffect } from 'react'

import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@mui/material/MenuItem'
import CustomTextField from 'components/mui/text-field'

import { useInView } from 'react-intersection-observer'
import { useGetInfiniteFacilityKinds } from 'src/hooks/api/useAdminFacilityKinds'

import isEmpty from 'lodash/isEmpty'

const useStyles = makeStyles(() => ({
  menuPaper: {
    maxHeight: 300
  }
}))

const DropdownFacilityKinds = ({
  error,
  helperText,
  defaultValue = {},
  value = { id: '', name: '' },
  onChange,
  label = '施設種類',
  readOnly = false
}) => {
  const classes = useStyles()

  const params = {
    page: 1,
    size: 10
  }

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetInfiniteFacilityKinds(params, {
    select: data => {
      return data?.pages?.flatMap(x => {
        return x?.data?.content
      })
    }
  })

  const options = data?.filter(e => e?.id != defaultValue?.id)

  const { ref, inView } = useInView({
    /* = Optional options */
    threshold: 0.1
  })

  useEffect(() => {
    if (!inView) return
    if (!hasNextPage) return
    if (isFetchingNextPage) return

    fetchNextPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, inView, isFetchingNextPage])

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
        onChange,
        MenuProps: {
          classes: {
            paper: classes.menuPaper
          }
        }
      }}
      label={label}
      id='DropdownFacilityKinds'
    >
      {!isEmpty(defaultValue) && <MenuItem value={defaultValue}>{defaultValue?.name}</MenuItem>}

      {options?.map((option, idx) => {
        return (
          <MenuItem key={idx} value={option}>
            {option?.name}
          </MenuItem>
        )
      })}

      <div ref={ref}></div>
    </CustomTextField>
  )
}

export default DropdownFacilityKinds
