import { Box, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import React, { Fragment } from 'react'
import DropdownItems from '../dropdown/DropdownItems'
import CustomTextField from '../mui/text-field'

import Icon from 'src/@core/components/icon'
import { cloneDeep } from 'lodash'

const RiceSellingPrice = ({ values, setValues }) => {
  const onChangeItems = (newValue, index) => {
    const newValues = cloneDeep(values)
    const newItems = cloneDeep(newValues.items)

    newItems[index].item = newValue

    setValues({ ...values, items: newItems })
  }

  const onChangePrice = (key, newValue, index) => {
    const newValues = cloneDeep(values)
    const newItems = cloneDeep(newValues.items)

    newItems[index][key] = newValue

    setValues({ ...values, items: newItems })
  }

  const appendItems = () => {
    const newValues = cloneDeep(values)
    const newItems = [
      ...newValues.items,
      {
        id: null,
        item: {},
        kiloPrice: 0
      }
    ]

    setValues({ ...values, items: newItems })
  }

  return (
    <>
      <Grid item xs={12} sx={{ marginTop: '24px' }}>
        <Typography variant='h5'>【米の販売価格】</Typography>
      </Grid>

      {values?.items?.map((item, index) => (
        <Fragment key={index}>
          <Grid container item direction='row' spacing={5}>
            <Grid item xs={6}>
              <DropdownItems
                value={item?.item}
                defaultValue={item?.item}
                onChange={newValue => onChangeItems(newValue, index)}
                withAdditionalParams
                additionalParams={{ type: 'RICE' }}
              />
            </Grid>
            <Grid item xs={6}>
              <CustomTextField
                fullWidth
                type='text'
                label='キロ価格'
                value={item?.kiloPrice}
                onChange={e => onChangePrice('kiloPrice', e.target.value, index)}
              />
            </Grid>
          </Grid>
        </Fragment>
      ))}

      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
        <Tooltip title='Add Rice Selling Price'>
          <IconButton color='success' variant='contained' onClick={appendItems}>
            <Icon icon='ep:circle-plus-filled' fontSize={50} />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  )
}

export default RiceSellingPrice
