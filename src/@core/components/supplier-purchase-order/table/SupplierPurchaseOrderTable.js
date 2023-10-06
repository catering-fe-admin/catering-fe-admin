import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

import { formattedThousand } from 'src/@core/utils/helper';
import { useGetAdminSupplierInvoiceMonthlies } from 'src/hooks/api/useAdminSupplierInvoiceMonthlies';

import ConditionalWrapper from 'components/shared/ConditionalWrapper';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { useTheme } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

import columns from './columns';

const SupplierPurchaseOrderTable = ({ additionalParams }) => {
  const { palette } = useTheme();

  const router = useRouter();
  const type = router.query.type;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('issueAtPeriod');

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

  const { data } = useGetAdminSupplierInvoiceMonthlies(params);
  const currentPageData = data?.data;
  const supplierPurchaseOrder = currentPageData?.content || [];
  const totalElements = currentPageData?.totalElements;

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
            {supplierPurchaseOrder?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              supplierPurchaseOrder?.map((item) => {
                const issueAtParam = dayjs(item?.issueAtPeriod)
                  ?.startOf('month')
                  ?.format('YYYY-MM-DD');

                return (
                  <TableRow hover key={item?.id}>
                    <TableCell align="left">
                      {dayjs(item?.issueAtPeriod)
                        ?.locale(ja)
                        ?.format('YYYY年M月')}
                    </TableCell>
                    <TableCell align="right">
                      <p
                        style={{
                          color: type == 'normal' ? palette.primary.main : ''
                        }}
                      >
                        {formattedThousand(item?.totalRestAccumulative)}
                      </p>
                    </TableCell>
                    <TableCell align="right">
                      <ConditionalWrapper
                        condition={type == 'normal'}
                        wrapper={(children) => (
                          <Link
                            href={{
                              pathname: `/purchase-order-details/[detail]`,
                              query: {
                                detail: item?.supplier?.id,
                                issueat: issueAtParam
                              }
                            }}
                            as={`/purchase-order-details/${item?.supplier?.id}?issueat=${issueAtParam}`}
                          >
                            {children}
                          </Link>
                        )}
                      >
                        <p
                          style={{
                            color: type == 'normal' ? palette.primary.main : ''
                          }}
                        >
                          {formattedThousand(item?.totalInvoiced)}
                        </p>
                      </ConditionalWrapper>
                    </TableCell>
                    <TableCell align="right">
                      <p
                        style={{
                          color: type == 'normal' ? palette.primary.main : ''
                        }}
                      >
                        {formattedThousand(item?.totalPayed)}
                      </p>
                    </TableCell>
                    <TableCell align="right">
                      <p
                        style={{
                          color: type == 'normal' ? palette.primary.main : ''
                        }}
                      >
                        {formattedThousand(item?.totalRestFinal)}
                      </p>
                    </TableCell>
                  </TableRow>
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
      />
    </Paper>
  );
};

export default SupplierPurchaseOrderTable;
