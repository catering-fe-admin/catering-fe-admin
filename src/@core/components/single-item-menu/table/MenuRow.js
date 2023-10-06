import { memo } from 'react';
import DatePicker from 'react-datepicker';

import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { formattedThousand } from 'src/@core/utils/helper';
import { useGetAdminItemPacksDetail } from 'src/hooks/api/useAdminItemPacks';
import { useGetAdminItemsDetail } from 'src/hooks/api/useAdminItems';

import CustomTextField from 'components/mui/text-field';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

import CustomDateInput from '../../bulletins/bulletins-detail/CustomDateInput';
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

const MenuRow = memo(
  ({
    row,
    idx,
    onChangeProduct,
    onChangeInternalVolume,
    onChangeDateInput,
    onChangeTotalPack,
    onClickPlusMinus,
    onChangeCourses,
    onClickDeleteRow,
    isCreate
  }) => {
    const classes = useStyles();
    const { itemPacks, uuid } = row || {};

    const singleItemPack = itemPacks?.[idx];

    const { itemPack, requireAt, totalPackQty } = singleItemPack || {};

    const selectedItem = {
      id: itemPack?.item?.id,
      name: itemPack?.item?.name
    };

    const { data: selectedItemPackData } = useGetAdminItemPacksDetail(
      itemPack?.id,
      {
        enabled: !isEmpty(itemPack?.id)
      }
    );
    const { data: selectedItemDetail } = useGetAdminItemsDetail(
      itemPack?.item?.id,
      {
        enabled: !isEmpty(itemPack?.item?.id)
      }
    );

    const unitPrice = selectedItemPackData?.data?.unitPrice
      ? parseFloat(selectedItemPackData?.data?.unitPrice)
      : 0;
    const numberOfOrders = totalPackQty ? parseFloat(totalPackQty) : 0;
    const subTotal = unitPrice * numberOfOrders;

    const contentsModifier = (contents) => {
      // Only return items pack that isAlaCarteAllowed = true
      return contents?.filter((content) => content?.isAlaCarteAllowed);
    };

    return (
      <TableRow hover>
        <TableCell>
          <DropdownCourses
            defaultValue={itemPack?.item?.course}
            value={itemPack?.item?.course}
            onChange={(newValue) => onChangeCourses(uuid, newValue, idx)}
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
            additionalParams={
              itemPack?.item?.course?.id
                ? {
                    courseId: itemPack?.item?.course?.id,
                    type: 'NORMAL'
                  }
                : null
            }
            disabled={isEmpty(itemPack?.item?.course)}
          />
        </TableCell>
        <TableCell>
          {selectedItemDetail?.data?.allergens?.length > 0
            ? selectedItemDetail?.data?.allergens?.map((allergen, index) => {
                const isLastIndex =
                  selectedItemDetail?.data?.allergens?.length - 1 === index;

                return `${allergen?.allergen?.name}${isLastIndex ? '' : ','}`;
              })
            : '-'}
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <DropdownItemPacks
              withAdditionalParams
              additionalParams={{
                itemId: itemPack?.item?.id,
                type: 'NORMAL'
              }}
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
              contentsModifier={contentsModifier}
              disabled={isEmpty(selectedItem?.id)}
            />
            切
          </Box>
        </TableCell>
        <TableCell>
          {selectedItemPackData?.data?.unitPrice
            ? `${formattedThousand(selectedItemPackData?.data?.unitPrice)}円`
            : '-'}
        </TableCell>
        <TableCell>
          {selectedItemPackData?.data?.isAvailable ? '有' : '無'}
        </TableCell>
        <TableCell>
          <DatePickerWrapper>
            <DatePicker
              id={`requireDate-${idx}`}
              showYearDropdown
              showMonthDropdown
              selected={
                requireAt ? new Date(requireAt?.split('/').join('-')) : null
              }
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
              customInput={<CustomDateInput fullWidth />}
              onChange={(newDateValue) =>
                onChangeDateInput(uuid, newDateValue, idx)
              }
            />
          </DatePickerWrapper>
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CustomTextField
              fullWidth
              type="number"
              inputProps={{ style: { textAlign: 'center' } }}
              defaultValue={totalPackQty}
              value={totalPackQty}
              id={`totalPackQty-${idx}`}
              onChange={(e) => onChangeTotalPack(uuid, e.target.value, idx)}
              className={classes.input}
            />
            食
          </Box>
        </TableCell>
        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => onClickPlusMinus(uuid, true, idx)}>
              <AddOutlinedIcon fontSize="small" />
            </IconButton>
            <IconButton onClick={() => onClickPlusMinus(uuid, false, idx)}>
              <RemoveOutlinedIcon fontSize="small" />
            </IconButton>
          </Box>
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

MenuRow.displayName = 'MenuRow';

export default MenuRow;
