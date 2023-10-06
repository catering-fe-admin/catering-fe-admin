import { useState } from 'react'
import { useRouter } from 'next/router'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import FilterMenu from 'src/@core/components/mousse-menu-order/FilterMenu'
import MenuItems from 'src/@core/components/mousse-menu-order/MenuItems'
import { Box, Typography } from '@mui/material'

import { useGetAdminCustomersDetail } from 'src/hooks/api/useAdminCustomers'
import { useGetAdminCustomersFacilitiesDetail } from 'src/hooks/api/useAdminCustomersFacilities'

const MousseMenuOrderPages = () => {
  const router = useRouter()
  const { customerId, customerFacilityId } = router.query || {}

  const [filter, setFilter] = useState({
    requireAtFrom: null,
    requireAtTo: null,
    customerFacility: {},
    orderStatus: 'all'
  })

  const [filterApplied, setFilterApplied] = useState(filter)

  const handleChange = prop => event => {
    const valueList = {
      requireAtFrom: event,
      requireAtTo: event,
      customerFacility: event,
      orderStatus: event?.target?.value
    }

    const newValue = valueList?.[prop]

    setFilter({ ...filter, [prop]: newValue })
  }

  const { data: customerDetail } = useGetAdminCustomersDetail(customerId, {
    enabled: !!customerId
  })
  const customerName = customerDetail?.data?.name

  const { data: customerFacility } = useGetAdminCustomersFacilitiesDetail(customerFacilityId, {
    enabled: !!customerFacilityId
  })
  const customerFacilityName = customerFacility?.data?.name

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='「献立メニュー」注文検索/一覧' />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            {customerFacilityId ? (
              <Box sx={{ paddingLeft: '36px', marginBottom: '24px' }}>
                <Typography sx={{ marginBottom: '10px' }}>顧客名: {customerName}</Typography>
                <Typography>施設名: {customerFacilityName}</Typography>
              </Box>
            ) : (
              <FilterMenu filter={filter} handleChange={handleChange} setFilterApplied={setFilterApplied} />
            )}
            <MenuItems filterApplied={filterApplied} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default MousseMenuOrderPages
