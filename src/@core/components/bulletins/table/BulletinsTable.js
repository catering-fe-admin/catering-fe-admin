import { useState } from 'react';

import Link from 'next/link';

import { formattedDate, statusLocale } from 'src/@core/utils/helper';
import { useGetAdminBulletins } from 'src/hooks/api/useAdminBulletins';

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

const BulletinsTable = () => {
  const [bulletins, setBulletins] = useState(null);
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
    ...(orderBy && { sort: `${orderBy},${order}` })
  };

  const { isFetching } = useGetAdminBulletins(params, {
    onSuccess: (data) => {
      if (data) {
        setBulletins(data?.data);
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
              <TableRowsLoader rowsNum={10} cellsNum={4} />
            ) : bulletins?.content?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              bulletins?.content?.map((bulletin) => {
                const status = statusLocale[bulletin?.status];
                const date = formattedDate(bulletin?.date);

                return (
                  <TableRow hover key={bulletin?.id}>
                    <TableCell>{status}</TableCell>
                    <TableCell>{date}</TableCell>
                    <TableCell>{bulletin?.subject}</TableCell>
                    <TableCell align="center">
                      <Link href={`/bulletins/${bulletin?.id}`}>
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
        count={bulletins?.totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="表示件数"
      />
    </Paper>
  );
};

export default BulletinsTable;
