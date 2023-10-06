import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

import { formattedThousand } from 'src/@core/utils/helper';
import queries from 'src/consts/queries';
import { useDeleteAdminPrefectures } from 'src/hooks/api/useAdminPrefectures';
import { useGetAdminSupplierInvoiceMonthlies } from 'src/hooks/api/useAdminSupplierInvoiceMonthlies';
import {
  useEditAdminSupplierPayments,
  usePostAdminSupplierPayments
} from 'src/hooks/api/useAdminSupplierPayments';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import CustomTextField from '../../mui/text-field';
import ConfirmDialog from '../../shared/ConfirmDialog';
import TableRowsLoader from '../../shared/TableRowsLoader';
import columns from './columns';

const PurchasePaymentTable = ({ filterApplied }) => {
  const queryClient = useQueryClient();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdAt');

  const [listPayments, setListPayments] = useState(null);
  const [listEditedPayments, setListEditedPayments] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const { mutateAsync: postPayment } = usePostAdminSupplierPayments();
  const { mutateAsync: editPayment } = useEditAdminSupplierPayments();

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onClickSave = async () => {
    const newPayments = listEditedPayments?.filter((editedPayment, index) => {
      return (
        parseFloat(editedPayment?.totalPayed || 0) !==
        listPayments?.[index]?.totalPayed
      );
    });

    if (newPayments?.length <= 0) return;

    newPayments?.map(async (payment) => {
      const supplierPaymentId = payment?.supplierPayment?.id;
      const totalPayed = parseFloat(payment?.totalPayed || 0);

      // Edit Payment
      setDisabled(true);
      if (supplierPaymentId) {
        const body = {
          totalPayed
        };

        await editPayment({ id: supplierPaymentId, body });
      } else {
        // Create Payment
        const body = {
          supplier: {
            id: payment?.supplier?.id
          },
          supplierPoint: {
            id: payment?.supplierPoint?.id
          },
          issueAtPeriod: payment?.issueAtPeriod,
          totalPayed
        };

        await postPayment({ body });
        setDisabled(false);
      }
    });

    await Promise.all(newPayments);

    queryClient.refetchQueries(queries.adminSupplierInvoiceMonthlies.key);
  };

  const { isFetching } = useGetAdminSupplierInvoiceMonthlies(filterApplied, {
    onSuccess: (data) => {
      const payments = data?.data?.content;
      setListPayments(payments);
      setListEditedPayments(payments);
    }
  });

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ width: column?.width }}
                >
                  {column?.withSort ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      {column.label}
                      {orderBy === column.id ? (
                        <Box component="span" sx={visuallyHidden}>
                          {order === 'desc'
                            ? 'sorted descending'
                            : 'sorted ascending'}
                        </Box>
                      ) : null}
                    </TableSortLabel>
                  ) : (
                    column.label
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {isFetching ? (
              <TableRowsLoader rowsNum={10} cellsNum={8} />
            ) : listEditedPayments?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              listEditedPayments?.map((row, index) => (
                <Row
                  key={row.id}
                  index={index}
                  row={row}
                  listEditedPayments={listEditedPayments}
                  setListEditedPayments={setListEditedPayments}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '24px' }}>
        <Button variant="contained" onClick={onClickSave} disabled={disabled}>
          保存
        </Button>
      </Box>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
};

const Row = ({ row, index, listEditedPayments, setListEditedPayments }) => {
  const queryClient = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);

  const { mutate } = useDeleteAdminPrefectures();

  const totalRestFinal = row?.totalInvoiced - parseFloat(row?.totalPayed || 0);

  const onSubmitDelete = () => {
    mutate(row?.id, {
      onSuccess: () => {
        setShowDialog(false);
        queryClient.refetchQueries(queries.adminPrefectures._def);
      }
    });
  };

  const onChangeTotalPayed = (value) => {
    const newListEditedPayments = cloneDeep(listEditedPayments);
    newListEditedPayments[index].totalPayed = value;
    setListEditedPayments(newListEditedPayments);
  };

  return (
    <>
      <TableRow hover>
        <TableCell>{row?.supplier?.name}</TableCell>
        <TableCell>{row?.supplierPoint?.name}</TableCell>
        <TableCell>{row?.issueAtPeriod}</TableCell>
        <TableCell>{formattedThousand(row?.totalRestAccumulative)}</TableCell>
        <TableCell>{formattedThousand(row?.totalInvoiced)}</TableCell>
        <TableCell>{formattedThousand(row?.totalRestResult)}</TableCell>
        <TableCell>
          <CustomTextField
            fullWidth
            type="number"
            value={row?.totalPayed}
            onChange={(e) => onChangeTotalPayed(e.target.value)}
          />
        </TableCell>
        <TableCell>{formattedThousand(totalRestFinal)}</TableCell>
      </TableRow>

      <ConfirmDialog
        show={showDialog}
        setShow={setShowDialog}
        onClickSubmit={onSubmitDelete}
        title="都道府県"
        description="本当によろしいでしょうか？"
      />
    </>
  );
};

export default PurchasePaymentTable;
