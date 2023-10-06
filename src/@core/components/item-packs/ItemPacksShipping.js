import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import dayjs from 'dayjs';
import ja from 'dayjs/locale/ja';

import { useGetInfiniteAdminItemPackLogs } from 'src/hooks/api/useAdminItemPackLogs';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import ItemPacksPopup from './popup/ItemPacksPopup';

const ItemPacksShipping = ({ itemPackId, inventory }) => {
  const { palette } = useTheme();
  const { stockPackQty, processPackQty, allocatedPackQty, theoreticalPackQty } =
    inventory || {};

  const [showPopup, setShowPopup] = useState(false);
  const [popUpProps, setPopupProps] = useState({});

  const params = {
    itemPackId,
    size: 10
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfiniteAdminItemPackLogs(params, {
      select: (data) => {
        return data?.pages?.flatMap((x) => {
          return x?.data?.content;
        });
      }
    });

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
    <Grid
      container
      item
      xs={12}
      justifyContent="center"
      marginTop="2rem"
      spacing={5}
    >
      <ItemPacksPopup open={showPopup} setOpen={setShowPopup} {...popUpProps} />
      <Grid container item justifyContent="center">
        <Grid item xs={2}>
          <Typography textAlign="center" variant="body1">
            {`実在個数 ${stockPackQty || 0}`}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography textAlign="center" variant="body1">
            {`発注数 ${processPackQty || 0}`}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography textAlign="center" variant="body1">
            {`引当数 ${allocatedPackQty || 0}`}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography textAlign="center" variant="body1">
            {`理論在庫数 ${theoreticalPackQty || 0}`}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={8} justifyContent="center">
        <TableContainer component={Paper} sx={{ maxHeight: 300 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableBody>
              {data?.map((item, idx) => {
                const { referenceId, totalPackQty, type, logAt } = item || {};

                const wording = {
                  CUSTOMER_DELIVERY: `${totalPackQty} packs in stock`,
                  CUSTOMER_PURCHASE_MENU_ADD: `(Add) Ordered ${totalPackQty} pack menu`,
                  CUSTOMER_PURCHASE_MENU_EDIT: `(Edit) Ordered ${totalPackQty} pack menu`,
                  SUPPLIER_PURCHASE_ADD: `(Add) I ordered ${totalPackQty} packs`,
                  SUPPLIER_PURCHASE_EDIT: `(Edit) I ordered ${totalPackQty} packs`,
                  CUSTOMER_PURCHASE_SINGLE_ADD: `(Add) Ordered ${totalPackQty} packs`,
                  CUSTOMER_PURCHASE_SINGLE_EDIT: `(Edit) Ordered ${totalPackQty} packs`
                };

                return (
                  <TableRow hover key={idx}>
                    <TableCell align="center">
                      {' '}
                      {logAt
                        ? dayjs(logAt)?.locale(ja)?.format('YYYY年M月')
                        : null}
                    </TableCell>
                    <TableCell align="center">
                      <p
                        onClick={() => {
                          setShowPopup(true);
                          setPopupProps({
                            referenceId,
                            logAt,
                            type,
                            totalPackQty
                          });
                        }}
                        style={{
                          color: palette.primary.main,
                          cursor: 'pointer'
                        }}
                      >
                        {wording[type]}
                      </p>
                    </TableCell>
                  </TableRow>
                );
              })}

              <div ref={ref} style={{ width: '100%', height: '50px' }} />
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ItemPacksShipping;
