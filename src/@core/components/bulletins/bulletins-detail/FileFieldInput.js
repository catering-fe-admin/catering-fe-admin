import Grid from '@mui/material/Grid'
import CustomTextField from 'components/mui/text-field'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Button from '@mui/material/Button'

import Icon from 'components/icon'

const FileFieldInput = ({ label, value, onChange, fileId = 'file1' }) => {
  const handleClear = () => {
    document.getElementById(fileId).value = ''
    onChange(null)
  }

  return (
    <Grid item container spacing={5} alignItems='flex-end'>
      <Grid item xs={6} row>
        <CustomTextField
          fullWidth
          disabled
          type='text'
          label={label}
          value={value?.name || ''}
          sx={{
            '& .MuiInputBase-root.Mui-disabled': {
              backgroundColor: 'transparent !important'
            }
          }}
          InputProps={{
            ...(value?.name && {
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton edge='end' onClick={handleClear}>
                    <Icon fontSize='1.25rem' icon='ic:baseline-clear' />
                  </IconButton>
                </InputAdornment>
              )
            })
          }}
        />
      </Grid>
      <Grid item xs={4} row>
        <Button variant='contained' color='success' component='label'>
          ファイル選択
          <input type='file' hidden onChange={onChange} id={fileId} />
        </Button>
      </Grid>
    </Grid>
  )
}

export default FileFieldInput
