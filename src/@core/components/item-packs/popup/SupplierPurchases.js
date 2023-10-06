import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

import { useGetAdminSupplierPurchasesDetail } from 'src/hooks/api/useAdminSupplierPurchases';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import TableRowsLoader from '../../shared/TableRowsLoader';

const SupplierPurchases = ({ referenceId }) => {
  const router = useRouter();
  const { id: itemPackId } = router.query;

  const { data, isLoading } = useGetAdminSupplierPurchasesDetail(referenceId, {
    select: (data) => {
      return data?.data?.itemPacks
        ?.filter((e) => e?.itemPack?.id === itemPackId)
        ?.flatMap((e) => {
          return {
            date: data?.data?.deliveryAt,
            name: data?.data?.supplier?.name,
            total: e?.totalBoxQty
          };
        });
    }
  });

  return (
    <div style={{ width: '400px' }}>
      <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableBody>
            {isLoading ? (
              <TableRowsLoader rowsNum={3} cellsNum={1} />
            ) : data?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={10} align="center" sx={{ border: '0' }}>
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              <>
                {data?.map((item, idx) => {
                  const isLast = idx === data?.length - 1;
                  return (
                    <TableRow hover key={idx}>
                      <TableCell
                        align="left"
                        sx={{ ...(isLast && { border: '0' }) }}
                      >
                        <Grid container spacing={5}>
                          <Grid item xs={12}>
                            {item?.date
                              ? dayjs(item?.date)
                                  ?.locale(ja)
                                  ?.format('YYYY年M月D日')
                              : null}
                          </Grid>
                          <Grid item container>
                            <Grid item xs={6}>
                              {item?.name || ''}
                            </Grid>
                            <Grid item xs={6}>
                              {item?.total || ''}
                            </Grid>
                          </Grid>
                        </Grid>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default SupplierPurchases;
