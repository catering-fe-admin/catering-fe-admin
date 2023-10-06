import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

import { useGetInfiniteAdminCustomerPurchaseSingles } from 'src/hooks/api/useAdminCustomerPurchaseSingles';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

import TableRowsLoader from '../../shared/TableRowsLoader';
import { getPopupDataFormatted } from '../ItemPacksHelper';

const CustomerPurchaseSingles = ({ referenceId, type }) => {
  const router = useRouter();
  const { id: itemPackId } = router.query;

  const params = {
    size: 10,
    itemPackId
  };

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteAdminCustomerPurchaseSingles(
      {
        id: referenceId,
        ...params
      },
      {
        select: (data) => {
          return getPopupDataFormatted({
            data: data?.pages || [],
            itemPackId,
            type
          });
        }
      }
    );

  const { ref, inView } = useInView({
    /* = Optional options */
    threshold: 0.1
  });

  useEffect(() => {
    if (!inView) return;
    if (!hasNextPage) return;
    if (isFetchingNextPage) return;

    fetchNextPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasNextPage, inView, isFetchingNextPage]);

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
                          <Grid item container>
                            <Grid item xs={12}>
                              {item?.date
                                ? dayjs(item?.date)
                                    ?.locale(ja)
                                    ?.format('YYYY年M月D日')
                                : null}
                            </Grid>
                            <Grid item xs={12}>
                              受注一覧
                            </Grid>
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
                <div ref={ref} style={{ width: '100%', height: '10px' }} />
              </>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CustomerPurchaseSingles;
