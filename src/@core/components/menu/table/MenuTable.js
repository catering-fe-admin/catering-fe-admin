import { useState } from 'react';

import Link from 'next/link';

import dayjs from 'dayjs';

import { useGetAdminMenus } from 'src/hooks/api/useAdminMenus';

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

const MenuTable = ({ filterApplied }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('date');

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

  const appendDateFilter = () => {
    return {
      dateFrom: filterApplied?.dateFrom
        ? dayjs(filterApplied.dateFrom).format('YYYY-MM-DD')
        : '',
      dateTo: filterApplied?.dateTo
        ? dayjs(filterApplied.dateTo).format('YYYY-MM-DD')
        : ''
    };
  };

  const fixedSortParams = ['timeSection.typeOrder,asc', 'timeSection.name,asc'];

  const params = {
    page: page + 1,
    size: rowsPerPage,
    sort: [`${orderBy},${order}`, ...fixedSortParams],
    ...appendDateFilter()
  };

  // Remove empty object value
  Object.keys(params).map((key) => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const restructureMenus = (menus) => {
    if (menus?.length > 0) {
      const newMenus = [];

      menus?.map((menu) => {
        menu?.items?.map((item, index) => {
          const isLastIndex = menu?.items?.length - 1 == index;

          newMenus.push({
            menuId: menu?.id,
            date: index == 0 ? menu?.date : null,
            timeSection: index == 0 ? menu?.timeSection : null,
            withBorder: isLastIndex ? true : false,
            isFirstItem: index == 0,
            ...item
          });
        });
      });

      return newMenus;
    }
  };

  const { data, isFetching } = useGetAdminMenus(params);
  const currentPageData = data?.data;
  const menus = currentPageData?.content || [];
  const totalElements = currentPageData?.totalElements;

  const restructuredMenus = restructureMenus(menus);

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
              <TableRowsLoader rowsNum={10} cellsNum={7} />
            ) : (
              restructuredMenus?.map((menu) => {
                return (
                  <TableRow hover key={menu?.item?.id}>
                    <TableCell
                      align="left"
                      sx={{ border: menu?.withBorder ? '1' : '0' }}
                    >
                      {menu?.date}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ border: menu?.withBorder ? '1' : '0' }}
                    >
                      {menu?.timeSection?.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ border: menu?.withBorder ? '1' : '0' }}
                    >
                      {menu?.item?.course?.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ border: menu?.withBorder ? '1' : '0' }}
                    >
                      {menu?.item?.name}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ border: menu?.withBorder ? '1' : '0' }}
                    >
                      {menu?.item?.allergens?.map((item, index) => {
                        const isLastIndex =
                          menu?.item?.allergens?.length - 1 == index;

                        return `${item?.allergen?.name}${
                          !isLastIndex ? ',' : ''
                        }`;
                      })}
                    </TableCell>
                    <TableCell
                      align="left"
                      sx={{ border: menu?.withBorder ? '1' : '0' }}
                    >
                      {menu?.item?.cookMethod}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ border: menu?.withBorder ? '1' : '0' }}
                      rowSpan={1}
                    >
                      {menu?.isFirstItem && (
                        <Link href={`/menu/${menu?.menuId}`}>
                          <Button variant="contained" color="success">
                            詳細
                          </Button>
                        </Link>
                      )}
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

export default MenuTable;
