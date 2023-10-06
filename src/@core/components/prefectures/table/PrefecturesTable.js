import { useState } from 'react';

import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';

import queries from 'src/consts/queries';
import {
  useDeleteAdminPrefectures,
  useGetAdminPrefectures
} from 'src/hooks/api/useAdminPrefectures';

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

import ConfirmDialog from '../../shared/ConfirmDialog';
import TableRowsLoader from '../../shared/TableRowsLoader';
import columns from './columns';

const PrefecturesTable = () => {
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

  const { data, isFetching } = useGetAdminPrefectures(params);
  const currentPageData = data?.data;
  const prefectures = currentPageData?.content || [];
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
              <TableRowsLoader rowsNum={10} cellsNum={2} />
            ) : prefectures?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              prefectures?.map((row) => <Row row={row} key={row.id} />)
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

const Row = ({ row }) => {
  const queryClient = useQueryClient();
  const [showDialog, setShowDialog] = useState(false);

  const { mutate } = useDeleteAdminPrefectures();

  const onClickDelete = () => {
    setShowDialog(true);
  };

  const onSubmitDelete = () => {
    mutate(row?.id, {
      onSuccess: () => {
        setShowDialog(false);
        queryClient.refetchQueries(queries.adminPrefectures._def);
      }
    });
  };

  return (
    <>
      <TableRow hover>
        <TableCell>{row?.name}</TableCell>
        <TableCell align="center" sx={{ gap: '12px' }}>
          <Link href={`/prefectures/${row?.id}`}>
            <Button variant="contained" color="success">
              詳細
            </Button>
          </Link>
          {/* <Button variant='contained' color='error' onClick={onClickDelete}>
            削除
          </Button> */}
        </TableCell>
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

export default PrefecturesTable;
