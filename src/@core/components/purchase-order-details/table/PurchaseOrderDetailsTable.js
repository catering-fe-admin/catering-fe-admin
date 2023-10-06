import { useState } from 'react';

import Link from 'next/link';

import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

import { formattedThousand } from 'src/@core/utils/helper';
import { useGetAdminSupplierPurchases } from 'src/hooks/api/useAdminSupplierPurchases';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Typography from '@mui/material/Typography';
import visuallyHidden from '@mui/utils/visuallyHidden';

import columns from './columns';

const PurchaseOrderDetailsTable = ({ additionalParams }) => {
  const { supplierId, issueAt } = additionalParams || {};

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('issueAt');

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

  const params = {
    page: page + 1,
    size: rowsPerPage,
    sort: `${orderBy},${order}`,
    ...additionalParams
  };

  // Remove empty object value
  Object.keys(params).map((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const [purchaseOrderDetail, setPurchaseOrderDetail] = useState([]);
  const [grandTotal, setGrandTotal] = useState({});
  const [totalElements, setTotalElements] = useState(null);

  useGetAdminSupplierPurchases(params, {
    enabled: !!supplierId && !!issueAt,
    onSuccess: (data) => {
      if (data?.data) {
        let grandSubTotalPrice = 0;
        let grandSubTotalTax = 0;
        let grandTotalPrice = 0;

        const { content, totalElements } = data?.data || {};

        content?.forEach((e) => {
          grandSubTotalPrice = grandSubTotalPrice + (e?.subTotalPrice || 0);
          grandSubTotalTax = grandSubTotalTax + (e?.subTotalTax || 0);
          grandTotalPrice = grandTotalPrice + (e?.totalPrice || 0);
        });

        setPurchaseOrderDetail(content || []);
        setTotalElements(totalElements);
        setGrandTotal({
          subTotalPrice: grandSubTotalPrice,
          subTotalTax: grandSubTotalTax,
          totalPrice: grandTotalPrice
        });
      }
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
                  align={column?.align}
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
            {purchaseOrderDetail?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              purchaseOrderDetail?.map((item, idx) => {
                const isLastIndex = purchaseOrderDetail?.length - 1 == idx;

                return (
                  <>
                    <TableRow hover key={item?.id}>
                      <TableCell align="left">
                        {dayjs(item?.deliveryAt)?.locale(ja)?.format('D')}日
                      </TableCell>
                      <TableCell align="left">
                        {formattedThousand(item?.subTotalPrice)}
                      </TableCell>
                      <TableCell align="left">
                        {formattedThousand(item?.subTotalTax)}
                      </TableCell>
                      <TableCell align="left">
                        {formattedThousand(item?.totalPrice)}
                      </TableCell>
                      <TableCell align="right">
                        <Link
                          href={{
                            pathname: `/purchase-order/[id]`,
                            query: {
                              id: item?.id
                            }
                          }}
                          as={`/purchase-order/${item?.id}`}
                        >
                          <Button variant="contained" color="success">
                            詳細
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                    {isLastIndex && (
                      <TableRow key={purchaseOrderDetail?.length}>
                        <TableCell align="left" sx={{ border: 0 }}>
                          <Typography variant="h6">総合計</Typography>
                        </TableCell>
                        <TableCell align="left" sx={{ border: 0 }}>
                          <Typography variant="h6">
                            {formattedThousand(grandTotal?.subTotalPrice)}
                          </Typography>
                        </TableCell>
                        <TableCell align="left" sx={{ border: 0 }}>
                          <Typography variant="h6">
                            {formattedThousand(grandTotal?.subTotalTax)}
                          </Typography>
                        </TableCell>
                        <TableCell align="left" sx={{ border: 0 }}>
                          <Typography variant="h6">
                            {formattedThousand(grandTotal?.totalPrice)}
                          </Typography>
                        </TableCell>
                        <TableCell sx={{ border: 0 }} />
                      </TableRow>
                    )}
                  </>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="表示件数"
      />
    </Paper>
  );
};

export default PurchaseOrderDetailsTable;
