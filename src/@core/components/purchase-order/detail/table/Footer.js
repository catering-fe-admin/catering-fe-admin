import fileDownload from 'js-file-download';

import { formattedThousand } from 'src/@core/utils/helper';
import { useExportAdminSupplierPurchases } from 'src/hooks/api/useAdminSupplierPurchases';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Footer = ({
  id,
  isEdit,
  prices,
  handleRegister,
  disabledButton = false
}) => {
  const { refetch: handleExport } = useExportAdminSupplierPurchases(id, {
    enabled: false,
    onSuccess: (data) => {
      if (data?.data) {
        fileDownload(data?.data, '発注書データ.xlsx');
      }
    }
  });
  return (
    <Grid
      container
      padding="24px"
      spacing={5}
      xs={12}
      justifyContent="flex-end"
    >
      <Grid container item xs={12} spacing={10}>
        <Grid item xs={10}>
          <Typography variant="h6" textAlign="right">
            小計
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" textAlign="left">
            {prices?.subTotalPrice
              ? formattedThousand(prices?.subTotalPrice)
              : ''}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={10}>
        <Grid item xs={10}>
          <Typography variant="h6" textAlign="right">
            消費税
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" textAlign="left">
            {prices?.subTotalTax ? formattedThousand(prices?.subTotalTax) : ''}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={10}>
        <Grid item xs={10}>
          <Typography variant="h6" textAlign="right">
            合計
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="h6" textAlign="left">
            {prices?.totalPrice ? formattedThousand(prices?.totalPrice) : ''}
          </Typography>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={10} justifyContent="flex-end">
        <Grid item xs={2}>
          <Button
            onClick={handleRegister}
            fullWidth
            color="warning"
            variant="contained"
            disabled={disabledButton}
          >
            登録
          </Button>
        </Grid>
        {isEdit && (
          <Grid item xs={2}>
            <Button
              fullWidth
              color="success"
              variant="contained"
              onClick={handleExport}
            >
              発注書 ダウンロード
            </Button>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default Footer;
