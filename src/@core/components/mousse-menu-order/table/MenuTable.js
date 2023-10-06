import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';

import queries from 'src/consts/queries';
import {
  useGetAdminCustomerPurchaseMousses,
  usePostAdminCustomerPurchaseMousses
} from 'src/hooks/api/useAdminCustomerPurchaseMousses';

import { TablePagination } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';

import TableRowsLoader from '../../shared/TableRowsLoader';
import MenuRow from './MenuRow';
import columns from './columns';

const MenuTable = ({ filterApplied }) => {
  const queryClient = useQueryClient();

  const router = useRouter();
  const { customerFacilityId, issueAtPeriodFrom, issueAtPeriodTo } =
    router.query || {};

  const { mutate: postPurchaseMousses } = usePostAdminCustomerPurchaseMousses();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [order, setOrder] = useState('desc');
  const [orderBy, setOrderBy] = useState('');

  const [purchaseList, setPurchaseList] = useState([]);
  const [editedPurchaseList, setEditedPurchaseList] = useState([]);

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

  const onClickSave = () => {
    if (editedPurchaseList?.length === 0) return;

    const formattedBody = editedPurchaseList?.map((purchase) => {
      return {
        id: purchase?.id || null,
        requireAt: purchase?.requireAt || null,
        customerFacility: {
          id: purchase?.customerFacility?.id
        },
        totalPackQtyGlobal: purchase?.totalPackQtyGlobal
          ? parseFloat(purchase?.totalPackQtyGlobal)
          : 0,
        itemPacks: purchase?.itemPacks?.map((item) => {
          return {
            id: item?.id || null,
            itemPack: {
              id: item?.itemPack?.id || null
            }
          };
        }),
        isHaveOrdered: purchase?.isHaveOrdered
      };
    });

    postPurchaseMousses(formattedBody, {
      onSuccess: async () => {
        await queryClient.refetchQueries(
          queries.adminCustomerPurchaseMousses._def
        );
        setEditedPurchaseList([]);
      }
    });
  };

  // Params from state
  const appendAppliedFilter = () => {
    return {
      ...(filterApplied?.requireAtFrom && {
        requireAtFrom: dayjs(filterApplied?.requireAtFrom).format('YYYY-MM-DD')
      }),
      ...(filterApplied?.requireAtTo && {
        requireAtTo: dayjs(filterApplied?.requireAtTo).format('YYYY-MM-DD')
      }),
      ...(filterApplied?.customerFacility?.id && {
        customerFacilityId: filterApplied?.customerFacility?.id
      }),
      ...(filterApplied?.orderStatus != 'all' && {
        isHaveOrdered: filterApplied?.orderStatus === 'completed'
      })
    };
  };

  // Params from url
  const appendQueryParamsFilter = () => {
    return {
      ...(customerFacilityId && {
        customerFacilityId
      }),
      ...(issueAtPeriodFrom && {
        requireAtFrom: issueAtPeriodFrom
      }),
      ...(issueAtPeriodTo && { requireAtTo: issueAtPeriodTo })
    };
  };

  const params = {
    page: page + 1,
    size: rowsPerPage,
    ...appendAppliedFilter(),
    ...appendQueryParamsFilter(),
    ...(orderBy && { sort: `${orderBy},${order}` })
  };

  const { data, isFetching } = useGetAdminCustomerPurchaseMousses(params, {
    staleTime: Infinity
  });

  const currentPageData = data?.data;
  const content = currentPageData?.content;
  const totalElements = currentPageData?.totalElements;

  useEffect(() => {
    if (!data) return;
    if (isFetching) return;

    const key = queries.adminCustomerPurchaseMousses.list(params).queryKey;

    const queryData = queryClient.getQueryData(key);

    queryClient.setQueryData(key, () => {
      const oldData = queryData;
      if (!oldData) return;

      const newData = cloneDeep(oldData);
      newData.data.content = newData.data.content?.map((content) => {
        if (content?.uuid) {
          return content;
        }

        return {
          uuid: uuidv4(),
          ...content
        };
      });

      return newData;
    });

    const content = queryData?.data?.content;
    setPurchaseList(content);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content, isFetching]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(queries.adminCustomerPurchaseMousses._def);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
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
              <TableRowsLoader rowsNum={10} cellsNum={8} />
            ) : purchaseList?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              purchaseList?.map((row, idxPurchase) => {
                const displayedRow =
                  editedPurchaseList?.find(
                    (order) => order?.uuid === row?.uuid
                  ) || row;

                return displayedRow?.itemPacks?.map((_, idx) => {
                  return (
                    <MenuRow
                      key={`${displayedRow?.uuid}-${idxPurchase}-${idx}`}
                      idx={idx}
                      displayedRow={displayedRow}
                      editedPurchaseList={editedPurchaseList}
                      purchaseList={purchaseList}
                      setEditedPurchaseList={setEditedPurchaseList}
                    />
                  );
                });
              })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={totalElements}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="表示件数"
      />

      <Grid
        container
        xs={12}
        height="52px"
        padding="0 24px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item></Grid>

        <Grid item xs={2}>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={onClickSave}
          >
            登録
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default MenuTable;
