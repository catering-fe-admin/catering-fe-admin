import { memo } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import MenuRow from './MenuRow';
import MenuRowMousse from './MenuRowMousse';
import MenuRowMoussePreview from './MenuRowMoussePreview';
import MenuRowPreview from './MenuRowPreview';
import MenuRowRice from './MenuRowRice';
import MenuRowRicePreview from './MenuRowRicePreview';
import TotalOrderRow from './TotalOrderRow';
import getColumns from './columns';

const LIST_MENU_ROW = {
  normal: MenuRow,
  mousse: MenuRowMousse,
  rice: MenuRowRice
};

const LIST_MENU_PREVIEW_ROW = {
  normal: MenuRowPreview,
  mousse: MenuRowMoussePreview,
  rice: MenuRowRicePreview
};

const SingleItemMenuTable = memo(
  ({
    filteredOrderList,
    totalOrder,
    onChangeProduct,
    onChangeInternalVolume,
    onChangeDateInput,
    onChangeTotalPack,
    onClickPlusMinus,
    onChangeIsHaveOrdered,
    showCreateConfirmation,
    onChangeCourses,
    onClickDeleteRow,
    type,
    isCreate = false
  }) => {
    const DisplayMenuRow = showCreateConfirmation
      ? LIST_MENU_PREVIEW_ROW[type]
      : LIST_MENU_ROW[type];

    const columns = getColumns(type, isCreate, showCreateConfirmation);

    const getItems = (row) => {
      if (type === 'normal' || type === 'mousse') {
        return row?.itemPacks || [];
      }

      return row?.items || [];
    };

    return (
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns?.map((column, index) => {
                const isLastIndex = columns.length - 1 === index;

                return (
                  <TableCell key={column.id} style={{ width: column?.width }}>
                    {isLastIndex && showCreateConfirmation
                      ? '小計'
                      : column?.label}
                  </TableCell>
                );
              })}
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
              <>
                {filteredOrderList?.map((row, idxPurchase) => {
                  const items = getItems(row);

                  return items?.map((_, idx) => {
                    return (
                      <DisplayMenuRow
                        key={`${row?.uuid}-${idxPurchase}-${idx}`}
                        idx={idx}
                        row={row}
                        onChangeProduct={onChangeProduct}
                        onChangeInternalVolume={onChangeInternalVolume}
                        onChangeDateInput={onChangeDateInput}
                        onChangeTotalPack={onChangeTotalPack}
                        onClickPlusMinus={onClickPlusMinus}
                        onChangeIsHaveOrdered={onChangeIsHaveOrdered}
                        onChangeCourses={onChangeCourses}
                        showCreateConfirmation={showCreateConfirmation}
                        onClickDeleteRow={onClickDeleteRow}
                        isCreate={isCreate}
                      />
                    );
                  });
                })}

                {showCreateConfirmation && (
                  <TotalOrderRow totalOrder={totalOrder} type={type} />
                )}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
);

SingleItemMenuTable.displayName = 'SingleItemMenuTable';

export default SingleItemMenuTable;
