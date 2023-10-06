import { memo, useState } from 'react';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import MenuRow from './MenuRow';
import columns from './columns';

const MenuTable = memo(
  ({
    filteredOrderList,
    onChangeTotalServe,
    onClickPlusMinus,
    onChangeTimeSection,
    onChangeCourse,
    onChangeProduct,
    onClickAppend
  }) => {
    const [order, setOrder] = useState('desc');
    const [orderBy, setOrderBy] = useState('');

    const handleRequestSort = (property) => {
      const isAsc = orderBy === property && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(property);
    };

    return (
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
            {filteredOrderList?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              filteredOrderList?.map((row, idxOrder) => {
                return row?.items?.map((_, idx) => {
                  const isFirstRow = idx == 0;
                  const isLastRow = idx == row?.items?.length - 1;

                  return (
                    <MenuRow
                      isFirstRow={isFirstRow}
                      isLastRow={isLastRow}
                      row={row}
                      idx={idx}
                      onChangeTotalServe={onChangeTotalServe}
                      onClickPlusMinus={onClickPlusMinus}
                      onChangeTimeSection={onChangeTimeSection}
                      onChangeCourse={onChangeCourse}
                      onChangeProduct={onChangeProduct}
                      onClickAppend={onClickAppend}
                      key={`${row?.uuid}-${idxOrder}-${idx}`}
                    />
                  );
                });
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);

MenuTable.displayName = 'MenuTable';

export default MenuTable;
