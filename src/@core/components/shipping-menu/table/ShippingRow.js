import React, { memo, useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import fileDownload from 'js-file-download';
import { indexOf, orderBy } from 'lodash';

import { formattedThousand } from 'src/@core/utils/helper';
import queries from 'src/consts/queries';
import {
  useGetAdminCustomerDeliveriesDeliver,
  useGetAdminCustomerDeliveriesExportDeliverySlip
} from 'src/hooks/api/useAdminCustomerDeliveries';

import CustomTextField from 'components/mui/text-field';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Button, Grid, IconButton } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import DropdownCourses from '../../dropdown/DropdownCourses';
import DropdownItemPacks from '../../dropdown/DropdownItemPacks';
import DropdownItems from '../../dropdown/DropdownItems';
import DropdownTimezone from '../../dropdown/DropdownTimezone';

const cellStyle = {
  borderLeft: (theme) => `1px solid ${theme.palette.divider}`
};

const ShippingRow = memo(
  ({
    row,
    type,
    disableSelectCategory,
    onChangeTotalPackQty,
    onChangeMasterPackQty,
    onClickAppend,
    onChangeTimeSection,
    onChangeCourse,
    onChangeItems
  }) => {
    const [sumTotal, setSumTotal] = useState(0);
    const [isDisabledItemPacks, setIsDisabledItemPacks] = useState(false);
    const queryClient = useQueryClient();

    const {
      uuid,
      requireAt,
      deliveryAt,
      itemPacks,
      customerFacility,
      id,
      isDelivered
    } = row || {};

    const { refetch: exportDeliverySlip } =
      useGetAdminCustomerDeliveriesExportDeliverySlip(
        {
          id
        },
        {
          enabled: false,
          onSuccess: (data) => {
            if (data?.data) {
              fileDownload(data?.data, '書データ.zip');
              queryClient.refetchQueries(queries.adminCustomerDeliveries._def);
            }
          }
        }
      );

    const { refetch: handleDownloadCustomerDeliveries } =
      useGetAdminCustomerDeliveriesDeliver(
        { id },
        {
          enabled: false,
          onSuccess: (data) => {
            if (data?.data?.message === 'OPERATION.DELIVER.SUCCESS') {
              exportDeliverySlip();
            }
          }
        }
      );

    const contentsModifier = (contents) => {
      return contents?.map((content) => {
        return {
          ...content,
          modifiedLabel: content?.unitQtyOnPack / +content?.item?.unitQtyOnServe
        };
      });
    };

    useEffect(() => {
      let sum = 0;

      itemPacks?.forEach((itemPack) => {
        const calculatedMasterTotal =
          (itemPack?.masterServeQtyOnPack || 0) * (itemPack?.totalPackQty || 0);

        sum += calculatedMasterTotal;

        setSumTotal(sum);
      });
    }, [itemPacks]);

    const order = ['MORNING', 'NOON', 'NIGHT'];

    return (
      <>
        <TableRow>
          {type === 'MENU' && (
            <TableCell align="center" rowSpan={itemPacks?.length + 1}>
              {requireAt}
            </TableCell>
          )}
          <TableCell align="center" rowSpan={itemPacks?.length + 1}>
            {deliveryAt}
          </TableCell>
          <TableCell align="center" rowSpan={itemPacks?.length + 1}>
            {customerFacility?.name}
          </TableCell>
        </TableRow>

        {orderBy(row?.itemPacks, (item) =>
          indexOf(order, item?.timeSection?.type)
        )?.map((itemPack, index) => {
          const newItemPack = {
            ...itemPack,
            modifiedLabel:
              itemPack?.masterUnitQtyOnPack / itemPack?.masterUnitQtyOnServe
          };
          const calculatedMasterTotal =
            (newItemPack?.masterServeQtyOnPack || 0) *
            (newItemPack?.totalPackQty || 0);

          return (
            <TableRow
              key={index}
              style={{
                background: `${newItemPack?.id == null ? '#ffe4c4' : ''}`
              }}
            >
              <TableCell sx={cellStyle}>
                <Grid container alignItems="center" justifyContent="center">
                  <Grid item xs={8} lg={8}>
                    {type === 'MENU'
                      ? newItemPack?.purchase?.totalServeQtyGlobal || 0
                      : ''}
                    {!isDelivered && (
                      <IconButton
                        onClick={() => onClickAppend(id, newItemPack, index)}
                      >
                        <AddOutlinedIcon fontSize="small" />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>
              </TableCell>
              {type === 'MENU' && (
                <TableCell sx={cellStyle}>
                  <DropdownTimezone
                    value={newItemPack?.timeSection?.name}
                    defaultValue={newItemPack?.timeSection?.name}
                    onChange={(newValue) =>
                      onChangeTimeSection(uuid, newValue, index)
                    }
                    label=""
                    readOnly={isDelivered}
                  />
                </TableCell>
              )}
              <TableCell sx={cellStyle}>
                <DropdownCourses
                  value={{
                    id: newItemPack?.itemPack?.item?.course?.id,
                    name: newItemPack?.itemPack?.item?.course?.name
                  }}
                  defaultValue={{
                    id: newItemPack?.itemPack?.item?.course?.id,
                    name: newItemPack?.itemPack?.item?.course?.name
                  }}
                  label=""
                  onChange={(newValue) => {
                    onChangeCourse(uuid, newValue, index);
                    setIsDisabledItemPacks(true);
                  }}
                  disabled={isDelivered || disableSelectCategory}
                />
              </TableCell>
              <TableCell sx={cellStyle}>
                <DropdownItems
                  label=""
                  value={newItemPack?.itemPack?.item}
                  defaultValue={newItemPack?.itemPack?.item}
                  onChange={(newValue) => {
                    onChangeItems(uuid, newValue, index);
                    setIsDisabledItemPacks(false);
                  }}
                  disabled={isDelivered}
                />
              </TableCell>
              <TableCell sx={cellStyle}>
                {newItemPack?.masterUnitQtyOnPack
                  ? `${newItemPack?.masterUnitQtyOnPack}g`
                  : '-'}
              </TableCell>
              <TableCell sx={cellStyle}>
                {newItemPack?.masterUnitQtyOnServe
                  ? `${newItemPack?.masterUnitQtyOnServe}g`
                  : '-'}
              </TableCell>
              <TableCell sx={cellStyle}>
                <DropdownItemPacks
                  disabled={isDelivered || isDisabledItemPacks}
                  withAdditionalParams
                  additionalParams={{
                    itemId: newItemPack?.itemPack?.item?.id
                  }}
                  disableClearable
                  defaultValue={{
                    id: newItemPack?.id,
                    modifiedLabel: newItemPack?.modifiedLabel
                  }}
                  value={{
                    id: newItemPack?.id,
                    modifiedLabel: newItemPack?.modifiedLabel
                  }}
                  onChange={(val) => onChangeMasterPackQty(uuid, val, index)}
                  selectorSelectedKey="modifiedLabel"
                  contentsModifier={contentsModifier}
                />
                人前
              </TableCell>
              <TableCell sx={cellStyle}>
                {newItemPack?.masterPackPrice
                  ? `¥${formattedThousand(newItemPack?.masterPackPrice)}`
                  : '-'}
              </TableCell>
              <TableCell sx={cellStyle}>
                <CustomTextField
                  disabled={isDelivered}
                  fullWidth
                  type="number"
                  inputProps={{ style: { textAlign: 'center' } }}
                  defaultValue={newItemPack?.totalPackQty}
                  value={newItemPack?.totalPackQty}
                  id={`totalPackQty-mousse-${index}`}
                  onChange={(e) =>
                    onChangeTotalPackQty(uuid, e.target.value, index)
                  }
                />
                袋
              </TableCell>
              <TableCell sx={cellStyle}>{calculatedMasterTotal}人前</TableCell>

              {index === 0 && (
                <>
                  <TableCell sx={cellStyle} rowSpan={itemPacks?.length}>
                    {sumTotal}袋
                  </TableCell>
                  <TableCell sx={cellStyle} rowSpan={itemPacks?.length}>
                    {/* Need to translate to JA wording */}
                    {isDelivered ? '済' : '-'}
                  </TableCell>
                  <TableCell sx={cellStyle} rowSpan={itemPacks?.length}>
                    <Button onClick={handleDownloadCustomerDeliveries}>
                      ダウンロード
                    </Button>
                  </TableCell>
                </>
              )}
            </TableRow>
          );
        })}
      </>
    );
  }
);

ShippingRow.displayName = 'ShippingRow';

export default ShippingRow;
