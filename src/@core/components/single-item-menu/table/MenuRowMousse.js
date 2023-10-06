import { memo } from 'react';
import DatePicker from 'react-datepicker';

import { makeStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { formattedThousand } from 'src/@core/utils/helper';
import { useGetAdminItemPacksDetail } from 'src/hooks/api/useAdminItemPacks';
import { useGetAdminItemsDetail } from 'src/hooks/api/useAdminItems';
import { useGetAdminSuppliersHoliday } from 'src/hooks/api/useAdminSuppliers';

import CustomTextField from 'components/mui/text-field';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import DropdownCourses from '../../dropdown/DropdownCourses';
import DropdownItemPacks from '../../dropdown/DropdownItemPacks';
import DropdownItems from '../../dropdown/DropdownItems';

const useStyles = makeStyles({
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  }
});

const MenuRowMousse = memo(
  ({
    row,
    idx,
    onChangeIsHaveOrdered,
    onChangeDateInput,
    onChangeTotalPack,
    onClickPlusMinus,
    onChangeCourses,
    onChangeProduct,
    onChangeInternalVolume,
    onClickDeleteRow,
    isCreate
  }) => {
    const classes = useStyles();

    const { itemPacks, uuid } = row || {};

    const singleItemPack = itemPacks?.[idx];
    const { itemPack, isHaveOrdered, requireAt, totalPackQty } =
      singleItemPack || {};

    const selectedItem = {
      id: itemPack?.item?.id,
      name: itemPack?.item?.name
    };

    const { data: itemDetail } = useGetAdminItemsDetail(itemPack?.item?.id, {
      enabled: !!itemPack?.item?.id
    });

    const { data: supplierHoliday } = useGetAdminSuppliersHoliday(
      itemDetail?.data?.supplier?.id,
      {
        enabled: !!itemDetail?.data?.supplier?.id
      }
    );

    const listHolidayDate = supplierHoliday?.data?.map((d) => d?.holidayAt);
    const disabledDates = listHolidayDate?.map((date) => new Date(date));

    const { data: selectedItemPackData } = useGetAdminItemPacksDetail(
      itemPack?.id,
      {
        enabled: !!itemPack?.id
      }
    );

    const unitPrice = selectedItemPackData?.data?.unitPrice
      ? parseFloat(selectedItemPackData?.data?.unitPrice)
      : 0;
    const numberOfOrders = totalPackQty ? parseFloat(totalPackQty) : 0;
    const subTotal = unitPrice * numberOfOrders;

    const highlightHolidayDates = (date) => {
      const formatDate = dayjs(date).format('YYYY-MM-DD');

      if (listHolidayDate?.includes(formatDate)) {
        return 'delivery-date cursor-not-allowed';
      }

      return '';
    };

    return (
      <TableRow hover>
        {!isCreate && (
          <TableCell>
            <Checkbox
              checked={isHaveOrdered}
              onChange={(e) =>
                onChangeIsHaveOrdered(uuid, e.target.checked, idx)
              }
            />
          </TableCell>
        )}
        <TableCell>
          <DropdownCourses
            defaultValue={itemPack?.item?.course}
            value={itemPack?.item?.course}
            onChange={(newValue) => onChangeCourses(uuid, newValue, idx)}
            type="MOUSSE"
          />
        </TableCell>
        <TableCell>
          <DropdownItems
            defaultValue={selectedItem}
            value={selectedItem}
            id={`productName-${idx}`}
            onChange={(newValue) => onChangeProduct(uuid, newValue, idx)}
            disableClearable
            withAdditionalParams
            additionalParams={{
              type: 'MOUSSE',
              courseId: itemPack?.item?.course?.id
            }}
            disabled={isEmpty(itemPack?.item?.course?.id)}
          />
        </TableCell>
        <TableCell>
          <Grid container spacing={2} justifyContent="left" alignItems="center">
            <Grid item xs={8}>
              <DropdownItemPacks
                defaultValue={
                  itemPack?.id
                    ? {
                        id: itemPack?.id,
                        unitQtyOnPack: selectedItemPackData?.data?.unitQtyOnPack
                      }
                    : {}
                }
                value={
                  itemPack?.id
                    ? {
                        id: itemPack?.id,
                        unitQtyOnPack: selectedItemPackData?.data?.unitQtyOnPack
                      }
                    : {}
                }
                selectorSelectedKey="unitQtyOnPack"
                onChange={(newValue) =>
                  onChangeInternalVolume(uuid, newValue, idx)
                }
                disableClearable
                disabled={isEmpty(selectedItem?.id)}
                withAdditionalParams
                additionalParams={{
                  itemId: selectedItem?.id,
                  type: 'MOUSSE'
                }}
              />
            </Grid>
            <Grid item>切</Grid>
          </Grid>
        </TableCell>
        <TableCell>
          <Grid container justifyContent="left" alignItems="center">
            <Grid item paddingBottom="8px">
              {selectedItemPackData?.data?.unitPrice
                ? `${formattedThousand(
                    selectedItemPackData?.data?.unitPrice
                  )}円`
                : '-'}
            </Grid>
          </Grid>
        </TableCell>
        <TableCell>
          <DatePickerWrapper>
            <DatePicker
              id={`requireDate-mousse-${idx}`}
              showYearDropdown
              showMonthDropdown
              selected={
                requireAt ? new Date(requireAt?.split('/').join('-')) : null
              }
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
              customInput={<CustomTextField fullWidth />}
              onChange={(newDateValue) =>
                onChangeDateInput(uuid, newDateValue, idx)
              }
              dayClassName={highlightHolidayDates}
              excludeDates={disabledDates}
            />
          </DatePickerWrapper>
        </TableCell>
        <TableCell>
          <Grid container spacing={2} justifyContent="left" alignItems="center">
            <Grid item xs={8}>
              <CustomTextField
                fullWidth
                type="number"
                inputProps={{ style: { textAlign: 'center' } }}
                defaultValue={totalPackQty}
                value={totalPackQty}
                id={`totalPackQty-mousse-${idx}`}
                onChange={(e) => onChangeTotalPack(uuid, e.target.value, idx)}
                className={classes.input}
              />
            </Grid>
            <Grid item>食</Grid>
          </Grid>
        </TableCell>
        <TableCell>
          <Grid
            container
            justifyContent="left"
            alignItems="center"
            minHeight="70px"
          >
            <Grid item>
              <IconButton onClick={() => onClickPlusMinus(uuid, true, idx)}>
                <AddOutlinedIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton onClick={() => onClickPlusMinus(uuid, false, idx)}>
                <RemoveOutlinedIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </TableCell>
        {isCreate && (
          <TableCell>
            <Tooltip title="Delete">
              <IconButton
                size="small"
                onClick={() => onClickDeleteRow(uuid)}
                color="error"
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        )}
      </TableRow>
    );
  }
);

MenuRowMousse.displayName = 'MenuRowMousse';

export default MenuRowMousse;
