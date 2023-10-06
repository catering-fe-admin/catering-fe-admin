import { useCallback, useEffect, useMemo, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { indexOf, orderBy } from 'lodash';
import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';

import { getFormattedParamsDate } from 'src/@core/utils/helper';
import { getAdminCustomerDeliveriesGenerate } from 'src/client/adminCustomerDeliveriesClient';
import queries from 'src/consts/queries';
import {
  useGetAdminCustomerDeliveries,
  usePostAdminCustomerDeliveries
} from 'src/hooks/api/useAdminCustomerDeliveries';

import { Box, Button, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import BottomNavigation from '../../../../@core/components/shared/BottomNavigation';
import TableRowsLoader from '../../shared/TableRowsLoader';
import ShippingRow from './ShippingRow';
import columns from './columns';

// Perlu dummyItemPacks agar row nya tidak kosong
const dummyItemPacks = [
  {
    id: '',
    itemPack: {},
    masterPackPrice: 0,
    masterServeQtyOnPack: 0,
    masterUnitQtyOnPack: 0,
    masterUnitQtyOnServe: 0,
    purchase: {},
    timeSection: {},
    totalPackPrice: 0,
    totalPackQty: 0
  }
];

const ShippingTable = ({
  params,
  type,
  tabValue,
  showGenerateBtn = true,
  disableSelectCategory = false,
  dateKey = ''
}) => {
  // State yang digunakan untuk mapping shipping lists
  const [shippingList, setShippingList] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const { mutate: postCustomerDeliveries } = usePostAdminCustomerDeliveries();
  const queryClient = useQueryClient();

  // Digunakan untuk dikirim ke backend
  const [editedShippingList, setEditedShippingList] = useState([]);

  const dateFromKey = {
    require: 'requireAtFrom',
    work: 'workAtFrom',
    delivery: 'deliveryAtFrom'
  };

  const dateToKey = {
    require: 'requireAtTo',
    work: 'workAtTo',
    delivery: 'deliveryAtTo'
  };

  const menuDateValue = params?.menuDate?.value || dateKey;

  const dateFromSelectedKey = dateFromKey?.[menuDateValue];
  const dateToSelectedKey = dateToKey?.[menuDateValue];

  const filter = {
    ...(params?.type && { type: params?.type }),
    ...(params?.id && { id: params?.id }),
    ...(params?.customerFacility?.id && {
      customerFacilityId: params?.customerFacility?.id
    }),
    ...(type == 'all' && {
      [dateFromSelectedKey]: getFormattedParamsDate(
        params?.[dateFromSelectedKey]
      ),
      [dateToSelectedKey]: getFormattedParamsDate(params?.[dateToSelectedKey])
    }),
    ...(type === 'current' && {
      [dateFromSelectedKey]: dayjs().format('YYYY-MM-DD'),
      [dateToSelectedKey]: dayjs().format('YYYY-MM-DD')
    }),
    ...(type === 'old' && {
      [dateToSelectedKey]: dayjs().format('YYYY-MM-DD')
    })
  };

  const order = useMemo(() => ['MORNING', 'NOON', 'NIGHT'], []);

  // Function untuk mengubah total pack qty data
  // Perlu ditambahkan callback untuk optimasi rendering
  const onChangeTotalPackQty = useCallback(
    (editUuid, newValue, itemIndex) => {
      setShippingList((prevData) => {
        return prevData?.map((prev) => {
          // Edit specific row
          if (prev?.uuid === editUuid) {
            const orderedItemPacks = orderBy(prev?.itemPacks, (item) =>
              indexOf(order, item?.timeSection?.type)
            );
            const newItemPacks = [...(orderedItemPacks || [])];
            newItemPacks[itemIndex].totalPackQty = newValue;
            console.log(
              newValue,
              itemIndex,
              newItemPacks[itemIndex].id,
              newItemPacks
            );

            console.log('item', newItemPacks[itemIndex].totalPackQty);
            return {
              ...prev,
              itemPacks: newItemPacks,
              isEdited: true // gunanya untuk menandai kalau row ini sudah di edit
            };
          }

          // Mengembalikan row yang tidak diedit
          return prev;
        });
      });
    },
    [order]
  );

  // Function untuk mengubah master pack qty data
  // Perlu ditambahkan callback untuk optimasi rendering
  const onChangeMasterPackQty = useCallback(
    (editUuid, newValue, itemIndex) => {
      setShippingList((prevData) => {
        return prevData?.map((prev) => {
          // Edit specific row
          if (prev?.uuid === editUuid) {
            const orderedItemPacks = orderBy(prev?.itemPacks, (item) =>
              indexOf(order, item?.timeSection?.type)
            );
            const newItemPacks = [...(orderedItemPacks || [])];
            newItemPacks[itemIndex].masterServeQtyOnPack =
              newValue?.unitQtyOnPack;
            newItemPacks[itemIndex].masterUnitQtyOnPack =
              newValue?.unitQtyOnPack +
              (Number(newValue?.item?.serve?.name) || 0);
            newItemPacks[itemIndex].masterUnitQtyOnServe =
              Number(newValue?.item?.unitQtyOnServe) +
              (Number(newValue?.item?.serve?.name) || 0);
            return {
              ...prev,
              itemPacks: newItemPacks,
              isEdited: true // gunanya untuk menandai kalau row ini sudah di edit
            };
          }

          // Mengembalikan row yang tidak diedit
          return prev;
        });
      });
    },
    [order]
  );

  const onChangeTimeSection = useCallback(
    (editUuid, newValue, itemIndex) => {
      const value = newValue?.target?.value;
      setShippingList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const orderedItemPacks = orderBy(prev?.itemPacks, (item) =>
              indexOf(order, item?.timeSection?.type)
            );
            const newItemPacks = [...(orderedItemPacks || [])];
            newItemPacks[itemIndex].timeSection = {
              ...newItemPacks[itemIndex].timeSection,
              name: value?.label,
              type: value?.value
            };
            return {
              ...prev,
              itemPacks: newItemPacks,
              isEdited: true
            };
          }

          return prev;
        });
      });
    },
    [order]
  );

  const onChangeCourse = useCallback(
    (editUuid, newValue, itemIndex) => {
      setShippingList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const orderedItemPacks = orderBy(prev?.itemPacks, (item) =>
              indexOf(order, item?.timeSection?.type)
            );
            const newItemPacks = [...(orderedItemPacks || [])];
            delete newItemPacks[itemIndex].itemPack.item.code;
            delete newItemPacks[itemIndex].itemPack.item.id;
            delete newItemPacks[itemIndex].itemPack.item.name;
            delete newItemPacks[itemIndex].itemPack.item.serve;
            delete newItemPacks[itemIndex].itemPack.item.type;
            delete newItemPacks[itemIndex].masterServeQtyOnPack;

            newItemPacks[itemIndex].itemPack.item.course = newValue;
            return {
              ...prev,
              itemPacks: newItemPacks,
              isEdited: true
            };
          }

          return prev;
        });
      });
    },
    [order]
  );
  const onChangeItems = useCallback(
    (editUuid, newValue, itemIndex) => {
      setShippingList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const orderedItemPacks = orderBy(prev?.itemPacks, (item) =>
              indexOf(order, item?.timeSection?.type)
            );
            const newItemPacks = [...(orderedItemPacks || [])];

            newItemPacks[itemIndex].itemPack.item = {
              ...newValue,
              course: prev?.itemPacks[itemIndex].itemPack.item.course
            };

            return {
              ...prev,
              itemPacks: newItemPacks,
              isEdited: true
            };
          }

          return prev;
        });
      });
    },
    [order]
  );

  const onClickAppend = useCallback(
    (id, itemPack) => {
      setShippingList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.id == id) {
            const newFiltered = cloneDeep(itemPack);

            const newItemPack = {
              ...newFiltered,
              id: null
            };

            const orderedItemPacks = orderBy(prev?.itemPacks, (item) =>
              indexOf(order, item?.timeSection?.type)
            );
            const newItemPacks = [...orderedItemPacks, newItemPack];
            return { ...prev, itemPacks: newItemPacks, isEdited: true };
          }

          return prev;
        });
      });
    },
    [order]
  );

  const { isFetching } = useGetAdminCustomerDeliveries(filter, {
    onSuccess: (data) => {
      const newData = data?.data?.content?.map((item) => {
        return {
          ...item,
          itemPacks:
            item?.itemPacks?.length > 0 ? item?.itemPacks : dummyItemPacks,
          uuid: uuidv4()
        };
      });

      setShippingList(newData);
      setEditedShippingList([]);
    }
  });

  const getFormattedBody = () => {
    return editedShippingList
      ?.filter((shipping) => {
        return shipping.isDelivered !== true;
      })
      .map((shipping) => {
        return {
          id: shipping?.id,
          itemPacks: shipping?.itemPacks?.map((item) => {
            return {
              id: item?.id,
              timeSection: {
                id: item?.timeSection?.id
              },
              itemPack: {
                id: item?.itemPack?.id
              },
              totalPackQty: +item?.totalPackQty,
              purchase: {
                id: item?.purchase?.id
              }
            };
          })
        };
      });
  };

  console.log('body', getFormattedBody());

  const saveAndRefetch = async () => {
    setDisabled(true);
    const formattedBody = getFormattedBody();
    postCustomerDeliveries(formattedBody, {
      onSuccess: async () => {
        await queryClient.refetchQueries(queries.adminCustomerDeliveries._def);
        setDisabled(false);
      }
    });
  };

  const handleGenerate = async () => {
    const { data } = await getAdminCustomerDeliveriesGenerate(filter);
    if (data) {
      await queryClient.refetchQueries(queries.adminCustomerDeliveries._def);
    }
  };

  // Digunakan untuk setEditedShippingList
  // Hanya set list yang isEdited = true
  useEffect(() => {
    if (shippingList?.length === 0) return;
    if (!shippingList) return;

    const filteredData = shippingList?.filter((shipping) => shipping?.isEdited);
    setEditedShippingList(filteredData);
  }, [shippingList]);

  const columnsTable = columns[params?.type === 'ADD' ? 'SINGLE' : params.type];

  return (
    <>
      {shippingList?.length > 0 ? (
        <TableContainer>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{
              width: 'max-content'
            }}
          >
            <TableHead>
              <TableRow>
                {columnsTable?.map((column) => (
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
                <TableRowsLoader rowsNum={16} cellsNum={16} />
              ) : (
                shippingList?.map((row) => {
                  return (
                    <ShippingRow
                      key={row?.uuid}
                      row={row}
                      type={params?.type}
                      disableSelectCategory={disableSelectCategory}
                      onChangeTotalPackQty={onChangeTotalPackQty}
                      onChangeMasterPackQty={onChangeMasterPackQty}
                      onChangeTimeSection={onChangeTimeSection}
                      onChangeCourse={onChangeCourse}
                      onChangeItems={onChangeItems}
                      onClickAppend={onClickAppend}
                      setShippingList={setShippingList}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            marginTop: '20px'
          }}
        >
          <Typography sx={{ mb: 6, color: 'text.secondary' }}>
            「該当する品目はありません。」
          </Typography>
        </Box>
      )}

      {tabValue !== 'old' && (
        <BottomNavigation
          action={
            <>
              <Button
                sx={{ marginRight: '8px' }}
                variant="contained"
                color="success"
                onClick={saveAndRefetch}
                disabled={disabled}
              >
                保存
              </Button>
              {showGenerateBtn && (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleGenerate}
                >
                  再組合せ
                </Button>
              )}
            </>
          }
        />
      )}
    </>
  );
};

export default ShippingTable;
