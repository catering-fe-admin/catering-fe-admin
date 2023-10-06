import { useState } from 'react';

import Link from 'next/link';

import fileDownload from 'js-file-download';
import pickBy from 'lodash/pickBy';

import FilterItemPacksMousse from 'src/@core/components/item-packs-mousse/FilterItemPacksMousse';
import { useExportAdminItemPacks } from 'src/hooks/api/useAdminItemPacks';

import ItemsPacksMousseTable from 'components/item-packs-mousse/table/ItemPacksMousseTable';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const ItemPacksMousse = () => {
  const [params, setParams] = useState({
    type: 'MOUSSE'
  });

  const { refetch: handleExport } = useExportAdminItemPacks(params, {
    enabled: false,
    onSuccess: (data) => {
      if (data?.data) {
        fileDownload(data?.data, '品目パックマスタ.csv');
      }
    }
  });

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="品目パックマスター（ムース食）"
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
                  <Link href="/packs-mousse/create">
                    <Button variant="contained" color="info">
                      品目追加
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            }
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterItemPacksMousse setParams={setParams} />
            <ItemsPacksMousseTable params={params} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ItemPacksMousse;
