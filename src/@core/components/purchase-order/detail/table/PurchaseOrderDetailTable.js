import { forwardRef, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import DropdownSuppliersPoint from 'src/@core/components/dropdown/DropdownSuppliersPoint';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import queries from 'src/consts/queries';
import {
  useEditAdminSupplierPurchases,
  usePostAdminSupplierPurchases
} from 'src/hooks/api/useAdminSupplierPurchases';

import CustomTextField from 'components/mui/text-field';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Footer from './Footer';
import ItemPacks from './ItemPacks';
import columns from './columns';

const CustomDateInput = forwardRef((props, ref) => {
  return (
    <CustomTextField
      {...props}
      inputRef={ref}
      label={props?.label}
      autoComplete="off"
    />
  );
});

CustomDateInput.displayName = 'CustomDateInput';

const PurchaseOrderDetailTable = ({
  defaultValue = {},
  additionalParams = {}
}) => {
  const router = useRouter();
  const id = router.query.id;
  const isEdit = !!id;

  const queryClient = useQueryClient();
  const { mutate: createSupplierPurchases } = usePostAdminSupplierPurchases();
  const { mutate: editSupplierPurchases } = useEditAdminSupplierPurchases(id);

  const [deliveryAt, setDeliveryAt] = useState(
    defaultValue?.deliveryAt
      ? new Date(defaultValue?.deliveryAt?.split('/').join('-'))
      : new Date()
  );
  const [supplier, setSupplier] = useState(defaultValue?.supplier || {});
  const [supplierPoint, setSupplierPoint] = useState(
    defaultValue?.supplierPoint || {}
  );
  const [itemPacks, setItemPacks] = useState(
    isEdit ? defaultValue.itemPacks : [{}]
  );
  const [prices, setPrices] = useState({
    subTotalPrice: defaultValue?.subTotalPrice,
    subTotalTax: defaultValue?.subTotalTax,
    totalPrice: defaultValue?.totalPrice
  });

  const [disabled, setDisabled] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    const payloadEdit = {
      deliveryAt: dayjs(deliveryAt)?.format('YYYY-MM-DD'),
      itemPacks: itemPacks?.map((e) => {
        return {
          id: e?.id,
          totalBoxQty: e?.totalBoxQty
        };
      })
    };

    const payloadCreate = {
      issueAt: dayjs(additionalParams?.issueAt)?.format('YYYY-MM-DD'),
      deliveryAt: dayjs(deliveryAt)?.format('YYYY-MM-DD'),
      supplier: {
        id: supplier?.id
      },
      supplierPoint: {
        id: supplierPoint?.id
      },
      itemPacks: itemPacks
        ?.filter((e) => e?.id)
        ?.map((e) => {
          return {
            itemPack: {
              id: e?.id
            },
            totalBoxQty: e?.totalBoxQty
          };
        })
    };

    const mutateFn = isEdit ? editSupplierPurchases : createSupplierPurchases;

    setDisabled(true);
    mutateFn(isEdit ? payloadEdit : payloadCreate, {
      onSuccess: () => {
        setDisabled(false);
        queryClient.removeQueries(queries.adminSupplierPurchases._def);
        router.push(`/purchase-order`);
      }
    });
  };

  useEffect(() => {
    if (additionalParams?.supplier != supplier) {
      setSupplier(additionalParams?.supplier);
      setSupplierPoint({});
      setItemPacks([{}]);
    }
  }, [additionalParams?.supplier]);

  return (
    <Grid container spacing={5}>
      <Grid container item marginX="24px">
        <Grid item container spacing={5} justifyContent="space-between">
          <Grid item xs={isEdit ? 6 : 4.5}>
            <DropdownSuppliersPoint
              supplierId={supplier?.id || ''}
              disabled={isEdit || !supplier?.id}
              defaultValue={defaultValue?.supplierPoint || {}}
              value={supplierPoint}
              onChange={(e) => setSupplierPoint(e?.target?.value)}
            />
          </Grid>

          <Grid item xs={isEdit ? 6 : 4.5}>
            <DatePickerWrapper>
              <DatePicker
                id="deliveryAt"
                selected={deliveryAt}
                dateFormat="yyyy/MM/dd"
                placeholderText="YYYY/MM/DD"
                onChange={(value) => setDeliveryAt(value)}
                customInput={
                  <CustomDateInput
                    InputProps={{ readOnly: true }}
                    fullWidth
                    label="納品日"
                  />
                }
              />
            </DatePickerWrapper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column?.align}
                      style={{ width: column?.width }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {itemPacks?.length == 0 ? (
                  <TableRow>
                    <TableCell colSpan={columns?.length} align="center">
                      「該当する品目はありません。」
                    </TableCell>
                  </TableRow>
                ) : (
                  itemPacks?.map((items, idx) => {
                    return (
                      <ItemPacks
                        key={idx}
                        isEdit={isEdit}
                        supplier={supplier}
                        defaultValue={defaultValue}
                        items={items}
                        idx={idx}
                        itemPacks={itemPacks}
                        setItemPacks={setItemPacks}
                        setPrices={setPrices}
                      />
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <Footer
            isEdit={isEdit}
            id={id}
            prices={prices}
            handleRegister={onSubmit}
            disabledButton={disabled}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PurchaseOrderDetailTable;
