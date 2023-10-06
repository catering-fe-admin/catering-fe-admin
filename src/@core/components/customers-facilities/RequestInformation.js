import React from 'react'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DropdownBillingAddress from '../dropdown/DropdownBillingAddress'
import isEmpty from 'lodash/isEmpty'

const RequestInformation = ({ customerId, defaultValues, values, handleChange, errors }) => {
  return (
    <>
      <Grid item xs={12} sx={{ marginTop: '24px' }}>
        <Typography variant='h5'>【請求情報】</Typography>
      </Grid>

      <Grid item xs={12}>
        <DropdownBillingAddress
          error={!isEmpty(errors?.billing)}
          helperText={errors?.billing ?? ''}
          customerId={customerId}
          defaultValue={defaultValues?.billing}
          value={values?.billing}
          onChange={handleChange('billing')}
          label='Billing'
        />
      </Grid>
    </>
  )
}

export default RequestInformation
