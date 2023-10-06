import { useState } from 'react';

import Link from 'next/link';

import { useGetAdminCustomersFacilties } from 'src/hooks/api/useAdminCustomersFacilities';

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
import { visuallyHidden } from '@mui/utils';

import TableRowsLoader from '../../shared/TableRowsLoader';
import columns from './columns';

const TableFacilities = ({ additionalParams }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('createdAt');

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

  const { data, isFetching } = useGetAdminCustomersFacilties(params);
  const currentPageData = data?.data;
  const facilities = currentPageData?.content || [];
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
            ) : facilities?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              facilities?.map((row) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row?.code || '--'}</TableCell>
                  <TableCell>{row?.name || '--'}</TableCell>
                  <TableCell>{row?.customer?.code || '--'}</TableCell>
                  <TableCell>{row?.customer?.name || '--'}</TableCell>
                  <TableCell>{row?.telephone || '--'}</TableCell>
                  <TableCell>{row?.fax || '--'}</TableCell>
                  <TableCell>{row?.pic || '--'}</TableCell>
                  <TableCell align="center" sx={{ gap: '12px' }}>
                    <Link href={`/customer-facilities/${row?.id}`}>
                      <Button variant="contained" color="success">
                        詳細
                      </Button>
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

export default TableFacilities;
