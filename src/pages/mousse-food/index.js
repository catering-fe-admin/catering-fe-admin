import { useState } from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

import MousseFoodItems from 'components/mousse-food/MousseFoodItems'
import FilterMousseFood from 'components/mousse-food/FilterMousseFood'

const MousseFood = () => {
  const [filter, setFilter] = useState({
    startDate: null,
    endDate: null,
    facilityName: '',
    orderType: '発注未済'
  })

  const handleChange = prop => event => {
    const valueList = {
      startDate: event,
      endDate: event,
      facilityName: event?.target?.value,
      orderType: event?.target?.value
    }

    const newValue = valueList?.[prop]

    setFilter({ ...filter, [prop]: newValue })
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='「ムース食」注文検索/一覧' />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterMousseFood filter={filter} handleChange={handleChange} />
            <MousseFoodItems />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MousseFood
