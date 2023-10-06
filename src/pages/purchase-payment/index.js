import { useState } from 'react';

import fileDownload from 'js-file-download';

import PurchasePaymentFilter from 'src/@core/components/purchase-payment/PurchasePaymentFilter';
import PurchasePaymentTable from 'src/@core/components/purchase-payment/table/PurchasePaymentTable';
import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';
import { useExportAdminSupplierInvoiceMonthlies } from 'src/hooks/api/useAdminSupplierInvoiceMonthlies';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

const PurchasePayment = () => {
  const [filterApplied, setFilterApplied] = useState({
    issueAtPeriodFrom: getFormattedParamsDate(firstDateCurrentMonth),
    issueAtPeriodTo: getFormattedParamsDate(lastDateCurrentMonth)
  });

  const { refetch: handleExport } = useExportAdminSupplierInvoiceMonthlies(
    filterApplied,
    {
      enabled: false,
      onSuccess: (data) => {
        if (data?.data) {
          fileDownload(data?.data, '仕入・支払管理.csv');
        }
      }
    }
  );

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader
            title="仕入/支払管理"
            action={
              <Button variant="contained" color="info" onClick={handleExport}>
                CSV ダウンロード
              </Button>
            }
          />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <PurchasePaymentFilter setFilterApplied={setFilterApplied} />
            <PurchasePaymentTable filterApplied={filterApplied} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PurchasePayment;
