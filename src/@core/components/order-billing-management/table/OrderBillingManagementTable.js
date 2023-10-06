import { useState } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import queries from 'src/consts/queries';
import { useGetAdminCustomerInvoiceMonthlies } from 'src/hooks/api/useAdminCustomerInvoiceMonthlies';
import {
  useEditAdminCustomerPayments,
  usePostAdminCustomerPayments
} from 'src/hooks/api/useAdminCustomerPayments';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import TableRowsLoader from '../../shared/TableRowsLoader';
import OrderBillingRow from './OrderBillingRow';
import columns from './columns';
import useOrderBillingManagement from './useOrderBillingManagement';

const OrderBillingManagementTable = ({ filterApplied }) => {
  const router = useRouter();
  const [order, setOrder] = useState([]);
  const [disabled, setDisabled] = useState(false);

  const queryClient = useQueryClient();

  const { mutate: createPayment } = usePostAdminCustomerPayments();
  const { mutate: editPayment } = useEditAdminCustomerPayments();
  const { data: initialData, isFetching } = useGetAdminCustomerInvoiceMonthlies(
    {
      ...filterApplied,
      size: 2147483647
    },
    {
      onSuccess: (data) => {
        if (data?.data?.content) {
          return setOrder(formatData(data?.data?.content));
        }
      }
    }
  );

  const {
    handleChangeTotalPayed,
    formatData,
    reformatData,
    findTotalPayedDifferences
  } = useOrderBillingManagement({
    order,
    setOrder
  });

  const initialContent = initialData?.data?.content || [];

  const handleSubmit = () => {
    const differencesTotalPayed = findTotalPayedDifferences(
      initialContent,
      reformatData(order)
    );

    differencesTotalPayed?.length > 0 &&
      differencesTotalPayed.forEach((item, idx) => {
        let mutateFn;
        let body;

        if (item?.customerPayment?.id) {
          mutateFn = editPayment;
          body = {
            id: item?.customerPayment?.id,
            body: { totalPayed: item?.totalPayed }
          };
        } else {
          mutateFn = createPayment;
          body = {
            customer: {
              id: item?.customer?.id
            },
            customerBilling: {
              id: item?.customerBilling?.id
            },
            issueAtPeriod: item?.issueAtPeriod,
            totalPayed: item?.totalPayed
          };
        }

        setDisabled(true);
        mutateFn(body, {
          onSuccess: () => {
            setDisabled(false);
            if (idx == differencesTotalPayed?.length - 1) {
              queryClient.removeQueries(
                queries.adminCustomerInvoiceMonthlies._def
              );
              router.push('/order-billing-management');
            }
          }
        });
      });
  };

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align="center"
                  style={{ width: column?.width, padding: '8px' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isFetching ? (
              <TableRowsLoader rowsNum={10} cellsNum={8} />
            ) : order?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              order?.map((row, rowIdx) => {
                return row?.content?.map((item, contentIdx) => {
                  return (
                    <OrderBillingRow
                      key={contentIdx}
                      customer={row?.customer}
                      customerBilling={row?.customerBilling}
                      item={item}
                      handleChangeTotalPayed={handleChangeTotalPayed(
                        rowIdx,
                        contentIdx
                      )}
                      isOdd={rowIdx % 2 === 1}
                      isFirst={contentIdx == 0}
                      isLast={contentIdx == row?.content?.length - 1}
                    />
                  );
                });
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid
        item
        container
        xs={12}
        justifyContent="flex-end"
        alignItems="center"
        padding="24px"
      >
        <Grid item xs={2}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={handleSubmit}
            disabled={disabled}
          >
            保存
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderBillingManagementTable;
