import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';
import fileDownload from 'js-file-download';
import pickBy from 'lodash/pickBy';
import { formattedThousand, getFormattedParamsDate } from 'utils/helper';

import { useExportAdminCustomerInvoiceMonthlies } from 'src/hooks/api/useAdminCustomerInvoiceMonthlies';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';

const OrderBillingRow = ({
  customer,
  customerBilling,
  item,
  handleChangeTotalPayed,
  isFirst,
  isLast,
  isOdd
}) => {
  const { palette } = useTheme();
  const {
    issueAtPeriod,
    totalRestAccumulative,
    totalInvoiced,
    totalRestResult,
    totalPayed,
    totalRestFinal
  } = item;

  const tableCellStyle = {
    ...(!isLast && { border: '0' }),
    ...(isOdd && { backgroundColor: palette.grey[50] })
  };

  const getParams = () => {
    const issueAtPeriodParams = getFormattedParamsDate(issueAtPeriod);

    const params =
      pickBy(
        {
          issueAtPeriod: issueAtPeriodParams,
          customerId: customer?.id,
          customerBillingId: customerBilling?.id
        },
        (value) => !!value
      ) || {};

    return params;
  };

  const params = getParams();

  const { refetch: handleRowExport } = useExportAdminCustomerInvoiceMonthlies(
    params,
    {
      enabled: false,
      onSuccess: (data) => {
        if (data?.data) {
          fileDownload(data?.data, '請求書データ.zip');
        }
      }
    }
  );

  return (
    <TableRow hover>
      <TableCell sx={tableCellStyle}>{isFirst ? customer?.name : ''}</TableCell>
      <TableCell sx={tableCellStyle}>
        {isFirst ? customerBilling?.name : ''}
      </TableCell>
      <TableCell sx={tableCellStyle} align="center">
        {issueAtPeriod
          ? dayjs(issueAtPeriod)?.locale(ja)?.format('YYYY年M月')
          : null}
      </TableCell>
      <TableCell sx={tableCellStyle} align="center">
        {totalRestAccumulative}
      </TableCell>
      <TableCell sx={tableCellStyle} align="center">
        {formattedThousand(totalInvoiced)}
      </TableCell>
      <TableCell sx={tableCellStyle} align="center">
        {formattedThousand(totalRestResult)}
      </TableCell>
      <TableCell sx={{ ...tableCellStyle, padding: '0px' }} align="center">
        {typeof totalPayed !== 'undefined' && (
          <CustomTextField
            fullWidth
            type="number"
            inputProps={{ style: { textAlign: 'center' } }}
            onChange={handleChangeTotalPayed}
            defaultValue={totalPayed}
            id="totalPayed"
          />
        )}
      </TableCell>
      <TableCell sx={tableCellStyle} align="center">
        {formattedThousand(totalRestFinal)}
      </TableCell>
      <TableCell sx={tableCellStyle} align="center">
        <Button
          variant="contained"
          color="info"
          onClick={handleRowExport}
          size="small"
        >
          ダウンロード
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OrderBillingRow;
