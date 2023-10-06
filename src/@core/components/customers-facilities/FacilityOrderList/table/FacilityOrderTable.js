import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import dayjs from 'dayjs';

import TableRowsLoader from 'src/@core/components/shared/TableRowsLoader';
import { useGetAdminCustomerPurchaseMonthlies } from 'src/hooks/api/useGetAdminCustomerPurchaseMonthlies';

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
import { visuallyHidden } from '@mui/utils';

import columns from './columns';

const FacilityOrderTable = ({ filterApplied }) => {
  const router = useRouter();
  const { customerId, facility_id: facilityId } = router.query || {};

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdAt');

  const { issueAtPeriodFrom, issueAtPeriodTo } = filterApplied || {};

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

  const formatNumber = (number) => {
    if (!number) return 0;

    return number.toLocaleString();
  };

  const getPeriodParams = () => {
    return {
      ...(issueAtPeriodFrom && {
        issueAtPeriodFrom: dayjs(issueAtPeriodFrom).format('YYYY-MM-DD')
      }),
      ...(issueAtPeriodTo && {
        issueAtPeriodTo: dayjs(issueAtPeriodTo).format('YYYY-MM-DD')
      })
    };
  };

  const getHref = (pathname) => {
    const type = {
      '/single-item-menu': 'normal',
      '/rice-menu-order': 'rice',
      '/mousse-menu-order': 'mousse'
    };

    const queryParams = {
      customerId,
      customerFacilityId: facilityId,
      type: type[pathname],
      ...getPeriodParams()
    };

    return { pathname, query: queryParams };
  };

  const params = {
    facilityId,
    page: page + 1,
    size: rowsPerPage,
    ...getPeriodParams()
  };

  const { data, isFetching } = useGetAdminCustomerPurchaseMonthlies(params, {
    enabled: !!facilityId
  });
  const currentPageData = data?.data;
  const purchaseMonthlies = currentPageData?.content || [];
  const totalElements = currentPageData?.totalElements;

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: '24px' }}>
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
              <TableRowsLoader rowsNum={10} cellsNum={5} />
            ) : purchaseMonthlies?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              purchaseMonthlies?.map((row, index) => (
                <TableRow hover key={index}>
                  <TableCell>{row?.issueAtPeriod}</TableCell>
                  <TableCell>
                    <Link href={getHref('/menu-order')}>
                      {formatNumber(row?.totalMenu)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={getHref('/mousse-menu-order')}>
                      {formatNumber(row?.totalMousse)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={getHref('/rice-menu-order')}>
                      {formatNumber(row?.totalRice)}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={getHref('/single-item-menu')}>
                      {formatNumber(row?.totalSingle)}
                    </Link>
                  </TableCell>
                </TableRow>
              ))
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

export default FacilityOrderTable;
