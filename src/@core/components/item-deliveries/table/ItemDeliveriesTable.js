import { useState } from 'react';

import pickBy from 'lodash/pickBy';
import sortBy from 'lodash/sortBy';
import sum from 'lodash/sum';
import uniq from 'lodash/uniq';

import { useGetAdminItemDeliveries } from 'src/hooks/api/useAdminItemDeliveries';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';

import TableRowsLoader from '../../shared/TableRowsLoader';

const ItemDeliveriesTable = ({ params }) => {
  const { palette } = useTheme();
  const [columns, setColumns] = useState([]);
  const [itemDeliveriesIds, setItemDeliveriesIds] = useState([]);

  const [itemDeliveries, setItemDeliveries] = useState(null);

  const { isFetching } = useGetAdminItemDeliveries(
    pickBy(params, (value) => !!value),
    {
      onSuccess: (data) => {
        if (data) {
          setColumns(sortBy(uniq(data?.data?.map((e) => e?.masterServeQty))));
          setItemDeliveriesIds(uniq(data?.data?.map((e) => e?.item?.id)));
          setItemDeliveries(data?.data);
        }
      }
    }
  );

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table
          stickyHeader
          aria-label="sticky table"
          style={{ tableLayout: 'fixed' }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                style={{
                  width: '200px',
                  ...(columns?.length != 0 && {
                    borderRight: `1px solid ${palette.divider}`
                  }),
                  position: 'sticky',
                  left: 0,
                  background: `${palette.customColors.tableHeaderBg}`,
                  zIndex: '10'
                }}
              />

              {columns.map((column, idx) => (
                <TableCell
                  key={idx}
                  align="right"
                  style={{
                    width: '100px',
                    borderRight: `1px solid ${palette.divider}`
                  }}
                >
                  {column}人前
                </TableCell>
              ))}

              <TableCell
                align="right"
                style={{
                  width: '100px',
                  position: 'sticky',
                  right: 0,
                  background: `${palette.customColors.tableHeaderBg}`,
                  zIndex: '10'
                }}
              >
                {columns?.length != 0 ? '合計' : ''}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableRowsLoader rowsNum={10} cellsNum={4} />
            ) : itemDeliveries?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length + 2} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              itemDeliveriesIds.map((itemId) => {
                const itemName = itemDeliveries.find(
                  (e) => e?.item?.id == itemId
                )?.item?.name;

                const total = sum(
                  itemDeliveries
                    ?.filter((e) => e?.item?.id == itemId)
                    ?.map((e) => e?.totalServeQty)
                );

                return (
                  <TableRow hover key={itemId}>
                    <TableCell
                      align="left"
                      style={{
                        width: '200px',
                        borderRight: `1px solid ${palette.divider}`,
                        position: 'sticky',
                        left: 0,
                        background: 'white'
                      }}
                      component="th"
                      scope="row"
                    >
                      {itemName}
                    </TableCell>

                    {columns?.map((masterServeQty) => {
                      const totalServeQty = itemDeliveries?.find(
                        (e) =>
                          e?.item?.id == itemId &&
                          e?.masterServeQty == masterServeQty
                      )?.totalServeQty;

                      return (
                        <TableCell
                          key={`${itemId}-${masterServeQty}`}
                          align="right"
                          style={{
                            borderRight: `1px solid ${palette.divider}`
                          }}
                        >
                          {totalServeQty}
                        </TableCell>
                      );
                    })}

                    <TableCell
                      align="right"
                      style={{
                        width: '100px',
                        position: 'sticky',
                        right: 0,
                        background: 'white',
                        zIndex: '10'
                      }}
                      component="th"
                      scope="row"
                    >
                      {total}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default ItemDeliveriesTable;
