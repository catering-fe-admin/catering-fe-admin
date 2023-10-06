import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import pickBy from 'lodash/pickBy';

import SupplierTable from 'src/@core/components/supplier/table/SupplierTable';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const Items = () => {
  const router = useRouter();
  const type = router.query.type;

  const cardTitle = {
    rice: 'お米仕入先一覧',
    normal: '仕入先一覧',
    mousse: 'ムース食仕入先一覧'
  };

  const [filter, setFilter] = useState({
    code: '',
    name: ''
  });

  const [filterApplied, setFilterApplied] = useState(filter);

  const handleChange = (prop) => (event) => {
    const newValue = event?.target?.value;

    setFilter({ ...filter, [prop]: newValue });
  };

  const handleSetFilterApplied = () => {
    const newFilter = pickBy(filter, (value) => !!value) || {};

    setFilterApplied(newFilter);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title={cardTitle[type]}
            action={
              <Link href={`/supplier/${type}/create`}>
                <Button variant="contained" color="info">
                  仕入先追加
                </Button>
              </Link>
            }
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <Grid container spacing={5} padding="24px" justifyContent="center">
              <Grid item container spacing={5} alignItems="flex-end">
                {/* Filter Item Name ( Name ) */}
                <Grid item lg={6} md={6} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    value={filter?.code}
                    onChange={handleChange('code')}
                    label="仕入先CD"
                    id="name"
                  />
                </Grid>

                {/* Filter Supplier Name  */}
                <Grid item lg={6} md={6} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    value={filter?.name}
                    onChange={handleChange('name')}
                    label="仕入先名"
                    id="supplierName"
                  />
                </Grid>
              </Grid>

              <Grid item container xs={12} justifyContent="center">
                <Grid item xs={2}>
                  <Button
                    fullWidth
                    color="warning"
                    variant="contained"
                    onClick={handleSetFilterApplied}
                  >
                    検索
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <SupplierTable filterApplied={filterApplied} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Items;
