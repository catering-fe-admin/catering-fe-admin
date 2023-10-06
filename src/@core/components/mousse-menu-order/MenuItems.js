import Image from 'next/image';
import { useRouter } from 'next/router';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import MenuTable from './table/MenuTable';

const CompanyProfile = () => {
  return (
    <Grid container item xs={12} spacing={2}>
      <Grid item>
        <Typography variant="h5" component="p">
          リールホーム学園前
        </Typography>
      </Grid>

      <Grid item>
        <Image
          src="/images/logo/gakuenmae.png"
          width={24}
          height={24}
          alt="gakuenmae"
        />
      </Grid>
    </Grid>
  );
};

const MenuItems = ({ filterApplied }) => {
  const router = useRouter();
  const customerFacilityId = router.query.customerFacilityId;

  return (
    <Grid container xs={12} alignItems="center">
      {!customerFacilityId && (
        <Grid item paddingLeft="24px" paddingBottom="24px">
          <CompanyProfile />
        </Grid>
      )}

      <Grid item xs={12}>
        <MenuTable filterApplied={filterApplied} />
      </Grid>
    </Grid>
  );
};

export default MenuItems;
