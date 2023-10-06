import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useQueryClient } from '@tanstack/react-query';
import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';

import { formattedThousand } from 'src/@core/utils/helper';
import queries from 'src/consts/queries';
import {
  useEditAdminItemPacksInventories,
  useGetAdminItemPacksInventories
} from 'src/hooks/api/useAdminItemPacksInventories';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Button, Grid, TablePagination } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';

import CustomTextField from '../../mui/text-field';
import TableRowsLoader from '../../shared/TableRowsLoader';
import columns from './columns';

const InventoryListTable = ({ params }) => {
  const queryClient = useQueryClient();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [inventoryList, setInventoryList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [editedInvetoriesList, setEditedInventoriesList] = useState([]);
  const filter = {
    page: page + 1,
    size: rowsPerPage,
    ...(params?.name && {
      name: params?.name
    }),
    ...(params?.isTheoreticalPackQtyNegative && {
      isTheoreticalPackQtyNegative: params?.isTheoreticalPackQtyNegative
    })
  };

  const { data, isFetching } = useGetAdminItemPacksInventories(filter);
  const currentData = data?.data;
  const listInventories = currentData?.content || [];
  const totalElements = currentData?.totalElements;

  const { mutate: editInventorySingles } = useEditAdminItemPacksInventories();

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onClickSave = async () => {
    setDisabled(true);
    const newInventory = editedInvetoriesList?.filter(
      (editedInventory, index) => {
        return (
          parseFloat(editedInventory?.stockPackQty || 0) !==
          inventoryList?.[index]?.stockPackQty
        );
      }
    );

    if (newInventory?.length == 0) return;

    newInventory?.map(async (inventory) => {
      const inventoryId = inventory?.id;
      if (inventoryId) {
        const body = [
          {
            id: inventoryId,
            stockPackQty: inventory?.stockPackQty
          }
        ];

        await editInventorySingles({ body });
      }
    });

    await Promise.all(editedInvetoriesList);

    setDisabled(false);
  };

  useEffect(() => {
    if (!data) return;
    if (isFetching) return;

    const key = queries.adminItemPacksInventories.list(filter).queryKey;

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
    setInventoryList(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listInventories, isFetching]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries(queries.adminItemPacksInventories._def);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  style={{ width: column?.width }}
                  align={column?.align}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableRowsLoader rowsNum={10} cellsNum={9} />
            ) : listInventories?.length == 0 ? (
              <TableRow>
                <TableCell colSpan={columns?.length} align="center">
                  「該当する品目はありません。」
                </TableCell>
              </TableRow>
            ) : (
              listInventories?.map((row) => {
                const displayedRow =
                  editedInvetoriesList?.find(
                    (inventory) => inventory?.uuid === row?.uuid
                  ) || row;

                return (
                  <Row
                    row={displayedRow}
                    key={row?.uuid}
                    editedInvetoriesList={editedInvetoriesList}
                    setEditedInventoriesList={setEditedInventoriesList}
                    inventoryList={inventoryList}
                  />
                );
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

      <Grid item container xs={12} justifyContent="center" padding="24px">
        <Grid item xs={2}>
          <Button
            fullWidth
            color="success"
            variant="contained"
            onClick={onClickSave}
            disabled={disabled}
          >
            登録
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

const Row = ({
  row,
  editedInvetoriesList,
  setEditedInventoriesList,
  inventoryList
}) => {
  const { palette } = useTheme();
  const {
    uuid,
    item,
    unitQtyOnPack,
    serveOnPack,
    packQtyOnBox,
    stockPackQty,
    processPackQty,
    allocatedPackQty,
    theoreticalPackQty
  } = row || {};

  const updateEditedInventoriesList = (
    editedIndex,
    newEditedInventoriesList,
    newData
  ) => {
    if (editedIndex >= 0) {
      newEditedInventoriesList[editedIndex] = newData;
      setEditedInventoriesList(newEditedInventoriesList);

      return;
    }

    newEditedInventoriesList = [...newEditedInventoriesList, newData];
    setEditedInventoriesList(newEditedInventoriesList);
  };

  const getNewNumberOfOrders = ({
    isClickPlus,
    isClickMinus,
    newData,
    inputValue
  }) => {
    const currentTotalServe = parseFloat(newData.stockPackQty);

    if (isClickPlus) {
      const incrementTotalServe = currentTotalServe + 1;

      return incrementTotalServe;
    }

    if (isClickMinus) {
      const decrementTotalServe = currentTotalServe - 1;

      return decrementTotalServe;
    }

    return inputValue;
  };

  const onChangeNumberOfOrders = ({
    inputValue,
    isClickPlus,
    isClickMinus
  }) => {
    const newEditedInventorieList = cloneDeep(editedInvetoriesList);
    const copyInventoryList = cloneDeep(inventoryList);

    const newData =
      newEditedInventorieList?.find((inventory) => inventory?.uuid === uuid) ||
      copyInventoryList?.find((invetory) => invetory?.uuid === uuid);
    const newValue = getNewNumberOfOrders({
      isClickPlus,
      isClickMinus,
      newData,
      inputValue
    });
    newData.stockPackQty = newValue;

    const editedIndex = editedInvetoriesList?.findIndex(
      (inventory) => inventory?.uuid === uuid
    );
    updateEditedInventoriesList(editedIndex, newEditedInventorieList, newData);
  };

  return (
    <TableRow hover>
      <TableCell align="center">
        <Link
          target="_blank"
          href={{
            pathname: `/item-packs/${row?.id}/`
          }}
        >
          <p style={{ color: palette.primary.main }}>{item?.name}</p>
        </Link>
      </TableCell>
      <TableCell align="center">{item?.course?.name}</TableCell>
      <TableCell align="center">{unitQtyOnPack}</TableCell>
      <TableCell align="center">{serveOnPack}</TableCell>
      <TableCell align="center">{packQtyOnBox}</TableCell>
      <TableCell align="center">
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={8}>
            <CustomTextField
              fullWidth
              type="number"
              inputProps={{ style: { textAlign: 'center' } }}
              defaultValue={stockPackQty}
              value={stockPackQty}
              onChange={(e) =>
                onChangeNumberOfOrders({ inputValue: e.target.value })
              }
            />
          </Grid>
          <Grid>
            <Grid item>
              <IconButton
                onClick={() => onChangeNumberOfOrders({ isClickPlus: true })}
              >
                <AddOutlinedIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => onChangeNumberOfOrders({ isClickMinus: true })}
              >
                <RemoveOutlinedIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </TableCell>
      <TableCell align="center">{processPackQty}</TableCell>
      <TableCell align="center">
        {formattedThousand(allocatedPackQty)}
      </TableCell>
      <TableCell align="center">
        {formattedThousand(theoreticalPackQty)}
      </TableCell>
    </TableRow>
  );
};

export default InventoryListTable;
