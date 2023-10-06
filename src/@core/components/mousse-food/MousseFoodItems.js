import Image from 'next/image'

import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

import MenuTable from './table/MousseFoodTable'

const CompanyProfile = () => {
  return (
    <Grid container item xs={12} spacing={2}>
      <Grid item>
        <Typography variant='h5' component='p'>
          リールホーム学園前
        </Typography>
      </Grid>

      <Grid item>
        <Image src='/images/logo/gakuenmae.png' width={24} height={24} alt='gakuenmae' />
      </Grid>
    </Grid>
  )
}

const MousseFoodItems = () => {
  return (
    <Grid container xs={12} alignItems='center'>
      <Grid item paddingLeft='24px' paddingBottom='24px'>
        <CompanyProfile />
      </Grid>

      <Grid item xs={12}>
        <MenuTable />
      </Grid>

      <Grid container height='52px' padding='0 24px' alignItems='center'>
        <Grid item lg={5} md={5} xs={5}>
          <CompanyProfile />
        </Grid>

        <Grid item lg={2} md={2} xs={2}>
          <Button fullWidth variant='contained' color='success'>
            保存
          </Button>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default MousseFoodItems
