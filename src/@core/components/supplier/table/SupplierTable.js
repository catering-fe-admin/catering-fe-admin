import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import upperCase from 'lodash/upperCase';

import { useGetAdminSuppliers } from 'src/hooks/api/useAdminSuppliers';

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

const SupplierTable = ({ filterApplied }) => {
  const router = useRouter();
  const type = router.query.type;

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
    type: upperCase(type),
    page: page + 1,
    size: rowsPerPage,
    sort: `${orderBy},${order}`,
    ...filterApplied
  };

  // Remove empty object value
  Object.keys(params).map((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const { data, isFetching } = useGetAdminSuppliers(params, {
    enabled: !!type
  });
  const currentPageData = data?.data;
  const suppliers = currentPageData?.content || [];
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
                  style={{ width: column?.width, padding: '8px' }}
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
            ) : suppliers?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              suppliers?.map((item) => {
                return (
                  <TableRow hover key={item?.id}>
                    <TableCell align="left">{item?.code}</TableCell>
                    <TableCell align="left">{item?.name}</TableCell>
                    <TableCell align="left">{item?.address}</TableCell>
                    <TableCell align="left">{item?.telephone}</TableCell>
                    <TableCell align="left">{item?.fax}</TableCell>
                    <TableCell align="left">{item?.manager || '--'}</TableCell>
                    <TableCell align="left">
                      {item?.mailAddress || '--'}
                    </TableCell>
                    <TableCell align="right">
                      <Link href={`/supplier/${type}/${item?.id}`}>
                        <Button variant="contained" color="success">
                          詳細
                        </Button>
                      </Link>
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
        labelRowsPerPage="表示件数"
      />
    </Paper>
  );
};

export default SupplierTable;
