import React from 'react';
import DatePicker from 'react-datepicker';

import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { useGetAdminCustomersFacilitiesDetail } from 'src/hooks/api/useAdminCustomersFacilities';

import CustomTextField from 'components/mui/text-field';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Checkbox } from '@mui/material';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import DropdownItems from '../../dropdown/DropdownItems';

const MenuRow = ({
  displayedRow,
  idx,
  editedPurchaseList,
  purchaseList,
  setEditedPurchaseList
}) => {
  const {
    uuid,
    isHaveOrdered,
    items,
    totalKiloGlobal,
    customerFacility,
    requireAt
  } = displayedRow || {};

  const { data } = useGetAdminCustomersFacilitiesDetail(customerFacility?.id);
  const listProductName =
    data?.data?.items?.length > 0
      ? data?.data?.items?.map((item) => item?.item)
      : [];
  const selectedProduct = data?.data?.items?.find((item) => {
    return item?.item?.id === items?.[0]?.item?.id;
  });

  const updateEditedPurchaseList = (
    editedIndex,
    newEditedPurchaseList,
    newData
  ) => {
    if (editedIndex >= 0) {
      newEditedPurchaseList[editedIndex] = newData;
      setEditedPurchaseList(newEditedPurchaseList);

      return;
    }

    newEditedPurchaseList = [...newEditedPurchaseList, newData];
    setEditedPurchaseList(newEditedPurchaseList);
  };

  const getNewNumberOfOrders = ({
    isClickPlus,
    isClickMinus,
    newData,
    inputValue
  }) => {
    const currentTotalServe = parseFloat(newData.totalKiloGlobal);

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
    const newEditedPurchaseList = cloneDeep(editedPurchaseList);
    const copyPurchaseList = cloneDeep(purchaseList);

    const newData =
      newEditedPurchaseList?.find((purchase) => purchase?.uuid === uuid) ||
      copyPurchaseList?.find((purchase) => purchase?.uuid === uuid);

    const newValue = getNewNumberOfOrders({
      isClickPlus,
      isClickMinus,
      newData,
      inputValue
    });

    newData.totalKiloGlobal = newValue;

    const editedIndex = editedPurchaseList?.findIndex(
      (purchase) => purchase?.uuid === uuid
    );
    updateEditedPurchaseList(editedIndex, newEditedPurchaseList, newData);
  };

  const onChangeIsHaveOrderedCheckbox = (e) => {
    const newEditedPurchaseList = cloneDeep(editedPurchaseList);
    const copyPurchaseList = cloneDeep(purchaseList);

    const newData =
      newEditedPurchaseList?.find((purchase) => purchase?.uuid === uuid) ||
      copyPurchaseList?.find((purchase) => purchase?.uuid === uuid);

    newData.isHaveOrdered = e.target.checked;

    const editedIndex = editedPurchaseList?.findIndex(
      (purchase) => purchase?.uuid === uuid
    );
    updateEditedPurchaseList(editedIndex, newEditedPurchaseList, newData);
  };

  const onChangeDateInput = (newDateValue) => {
    const newEditedPurchaseList = cloneDeep(editedPurchaseList);
    const copyPurchaseList = cloneDeep(purchaseList);

    const newData =
      newEditedPurchaseList?.find((purchase) => purchase?.uuid === uuid) ||
      copyPurchaseList?.find((purchase) => purchase?.uuid === uuid);

    newData.requireAt = newDateValue
      ? dayjs(newDateValue).format('YYYY-MM-DD')
      : null;

    const editedIndex = editedPurchaseList?.findIndex(
      (purchase) => purchase?.uuid === uuid
    );
    updateEditedPurchaseList(editedIndex, newEditedPurchaseList, newData);
  };

  const onChangeDropdownItems = (newValue) => {
    const newEditedPurchaseList = cloneDeep(editedPurchaseList);
    const copyPurchaseList = cloneDeep(purchaseList);

    const newData =
      newEditedPurchaseList?.find((purchase) => purchase?.uuid === uuid) ||
      copyPurchaseList?.find((purchase) => purchase?.uuid === uuid);

    newData.items[0].item = newValue;

    const editedIndex = editedPurchaseList?.findIndex(
      (purchase) => purchase?.uuid === uuid
    );
    updateEditedPurchaseList(editedIndex, newEditedPurchaseList, newData);
  };

  return (
    <TableRow hover>
      <TableCell>
        <Checkbox
          checked={isHaveOrdered}
          onChange={onChangeIsHaveOrderedCheckbox}
        />
      </TableCell>
      <TableCell>
        <DropdownItems
          withAdditionalParams
          customOptions={listProductName}
          value={selectedProduct?.item}
          defaultValue={selectedProduct?.item}
          onChange={onChangeDropdownItems}
        />
      </TableCell>
      <TableCell>
        {selectedProduct?.kiloPrice ? `${selectedProduct?.kiloPrice}円` : '-'}
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
            customInput={<CustomTextField fullWidth />}
            onChange={onChangeDateInput}
          />
        </DatePickerWrapper>
      </TableCell>
      <TableCell>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <CustomTextField
              fullWidth
              type="number"
              inputProps={{ style: { textAlign: 'center' } }}
              defaultValue={totalKiloGlobal}
              value={totalKiloGlobal}
              id={`totalKiloGlobal-${idx}`}
              onChange={(e) =>
                onChangeNumberOfOrders({ inputValue: e.target.value })
              }
            />
          </Grid>
          <Grid item>食</Grid>
        </Grid>
      </TableCell>
      <TableCell>
        <Grid
          container
          justifyContent="right"
          alignItems="center"
          minHeight="70px"
        >
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
      </TableCell>
    </TableRow>
  );
};

export default MenuRow;
