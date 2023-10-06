import { useState } from 'react';

import Link from 'next/link';

import fileDownload from 'js-file-download';

import { useExportAdminItems } from 'src/hooks/api/useAdminItems';

import FilterItems from 'components/items/FilterItems';
import ItemsTable from 'components/items/table/ItemsTable';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const Items = () => {
  const [params, setParams] = useState({});

  const { refetch: handleExport } = useExportAdminItems(params, {
    enabled: false,
    onSuccess: (data) => {
      if (data?.data) {
        fileDownload(data?.data, '品目マスタ.csv');
      }
    }
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="品目マスター"
            action={
              <Grid container spacing={5}>
                <Grid item>
                  <Button
                    variant="contained"
                    color="info"
                    onClick={handleExport}
                  >
                    CSVダウンロード
                  </Button>
                </Grid>

                <Grid item>
                  <Link href="/items/create">
                    <Button variant="contained" color="info">
                      品目追加
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            }
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterItems setParams={setParams} />
            <ItemsTable params={params} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Items;
