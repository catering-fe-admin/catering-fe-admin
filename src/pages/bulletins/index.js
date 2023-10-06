import Link from 'next/link';

import BulletinsTable from 'src/@core/components/bulletins/table/BulletinsTable';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const Bulletins = () => {
  console.log('Coba force-dynamic');
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="掲示板"
            action={
              <Link href="/bulletins/create">
                <Button variant="contained" color="info">
                  新規お知らせ追加
                </Button>
              </Link>
            }
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <BulletinsTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Bulletins;
