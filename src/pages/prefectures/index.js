import Link from 'next/link';

import PrefecturesTable from 'src/@core/components/prefectures/table/PrefecturesTable';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const Prefectures = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="都道府県マスター" />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <PrefecturesTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Prefectures;
