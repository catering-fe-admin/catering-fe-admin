import { memo } from 'react';
import DatePicker from 'react-datepicker';

import { useRouter } from 'next/router';

import { makeStyles } from '@material-ui/core/styles';
import isEmpty from 'lodash/isEmpty';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { formattedThousand } from 'src/@core/utils/helper';
import { useGetAdminCustomersFacilitiesDetail } from 'src/hooks/api/useAdminCustomersFacilities';

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

const MenuRowRice = memo(
  ({
    row,
    idx,
    onChangeIsHaveOrdered,
    onChangeProduct,
    onChangeDateInput,
    onChangeTotalPack,
    onClickPlusMinus,
    onClickDeleteRow,
    isCreate
  }) => {
    const classes = useStyles();

    const router = useRouter();
    const { uuid, customerFacility, items } = row || {};

    const facilityId = isCreate
      ? router.query.facility_id
      : customerFacility?.id;

    const singleItem = items?.[idx];
    const { isHaveOrdered, requireAt, totalKilo } = singleItem || {};

    const { data } = useGetAdminCustomersFacilitiesDetail(facilityId, {
      enabled: !isEmpty(facilityId)
    });

    const listProducts = data?.data?.items;

    const listProductName =
      listProducts?.length > 0 ? listProducts?.map((item) => item?.item) : [];

    const selectedProduct = listProducts?.find((item) => {
      return item?.item?.id === items?.[idx]?.item?.id;
    });

    return (
      <TableRow hover>
        {!isCreate && (
          <TableCell>
            <Checkbox
              checked={isHaveOrdered}
              onChange={(e) =>
                onChangeIsHaveOrdered(uuid, e.target.checked, idx, true)
              }
            />
          </TableCell>
        )}
        <TableCell>
          <DropdownItems
            withAdditionalParams
            customOptions={listProductName}
            value={singleItem?.item}
            defaultValue={singleItem?.item}
            onChange={(newValue) => onChangeProduct(uuid, newValue, idx, true)}
          />
        </TableCell>
        <TableCell>
          {selectedProduct?.kiloPrice
            ? `${formattedThousand(selectedProduct?.kiloPrice)}円`
            : '-'}
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
              placeholderText="YYYY-MM-DD"
              customInput={<CustomTextField fullWidth />}
              onChange={(newDateValue) =>
                onChangeDateInput(uuid, newDateValue, idx, true)
              }
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
                defaultValue={totalKilo}
                value={totalKilo}
                id={`totalKilo-${idx}`}
                onChange={(e) =>
                  onChangeTotalPack(uuid, e.target.value, idx, true)
                }
                className={classes.input}
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
                onClick={() => onClickPlusMinus(uuid, true, idx, true)}
              >
                <AddOutlinedIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                onClick={() => onClickPlusMinus(uuid, false, idx, true)}
              >
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

MenuRowRice.displayName = 'MenuRowRice';

export default MenuRowRice;
