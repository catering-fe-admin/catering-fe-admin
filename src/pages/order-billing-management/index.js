import { useState } from 'react';

import fileDownload from 'js-file-download';
import pickBy from 'lodash/pickBy';
import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'utils/helper';

import { useExportAdminCustomerInvoiceMonthlies } from 'src/hooks/api/useAdminCustomerInvoiceMonthlies';

import FilterOrderBillingManagement from 'components/order-billing-management/FilterOrderBillingManagement';
import OrderBillingManagementTable from 'components/order-billing-management/table/OrderBillingManagementTable';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const OrderBillingManagement = () => {
  const [filterApplied, setFilterApplied] = useState({
    issueAtPeriodFrom: getFormattedParamsDate(firstDateCurrentMonth),
    issueAtPeriodTo: getFormattedParamsDate(lastDateCurrentMonth)
  });

  const handleSetFilterApplied = (filter) => {
    const issueAtPeriodFrom = getFormattedParamsDate(filter?.issueAtPeriodFrom);
    const issueAtPeriodTo = getFormattedParamsDate(filter?.issueAtPeriodTo);

    const newFilter =
      pickBy(
        {
          ...filter,
          issueAtPeriodFrom: issueAtPeriodFrom,
          issueAtPeriodTo: issueAtPeriodTo
        },
        (value) => !!value
      ) || {};

    setFilterApplied(newFilter);
  };

  const { refetch: handleBatchExport } = useExportAdminCustomerInvoiceMonthlies(
    filterApplied,
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
    <Card>
      <CardHeader
        title="売上/請求管理"
        action={
          <Button variant="contained" color="info" onClick={handleBatchExport}>
            請求書一括ダウンロード
          </Button>
        }
      />
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <FilterOrderBillingManagement
          handleSetFilterApplied={handleSetFilterApplied}
        />
        <OrderBillingManagementTable filterApplied={filterApplied} />
      </CardContent>
    </Card>
  );
};

export default OrderBillingManagement;
