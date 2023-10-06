import cloneDeep from 'lodash/cloneDeep';

import { formattedThousand } from 'src/@core/utils/helper';

import DropdownItemPacks from 'components/dropdown/DropdownItemPacks';
import CustomTextField from 'components/mui/text-field';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const ItemPacks = ({
  isEdit,
  supplier,
  defaultValue,
  items,
  idx,
  itemPacks,
  setItemPacks,
  setPrices
}) => {
  const handleChangeItemPack = (key, value) => {
    const newItemPacks = cloneDeep(itemPacks);

    const items = newItemPacks[idx];
    const boxPrice =
      (items?.packPrice && items?.packQtyOnBox
        ? items?.packPrice * items?.packQtyOnBox
        : items?.masterBoxPrice) || 0;

    if (key == 'totalBoxQty') {
      newItemPacks[idx] = {
        ...newItemPacks[idx],
        totalBoxPrice: parseFloat(value * boxPrice)
      };

      const newPrices = {
        subTotalPrice: 0,
        subTotalTax: 0,
        totalPrice: 0
      };

      newItemPacks.forEach((e) => {
        if (e) {
          const totalBoxPrice = e?.totalBoxPrice;
          const totalTax = (totalBoxPrice * 10) / 100;

          newPrices.subTotalPrice = parseFloat(
            newPrices.subTotalPrice + totalBoxPrice
          );
          newPrices.subTotalTax = parseFloat(newPrices.subTotalTax + totalTax);
          newPrices.totalPrice = parseFloat(
            newPrices.totalPrice + totalBoxPrice + totalTax
          );
        }
      });

      setPrices(newPrices);
    }

    newItemPacks[idx] = { ...newItemPacks[idx], [key]: value };
    setItemPacks(newItemPacks);
  };

  const handleChangeDropdownItemPack = (value) => {
    const newItemPacks = cloneDeep(itemPacks);
    newItemPacks[idx] = { ...value, totalBoxPrice: 0 };
    setItemPacks(newItemPacks);
  };

  const isLastIndex = itemPacks?.length - 1 == idx;

  const {
    // Edit
    masterPackQtyOnBox,
    masterUnitQtyOnPack,
    masterPackPrice,
    masterBoxPrice,
    totalBoxPrice,
    totalBoxQty = 0,

    // Create New
    unitQtyOnPack,
    packQtyOnBox,
    packPrice
  } = items;

  const unitQuantity = isEdit ? masterUnitQtyOnPack : unitQtyOnPack;
  const perPackPrice = isEdit ? masterPackPrice : packPrice;
  const perBoxPrice = isEdit ? masterBoxPrice : packPrice * packQtyOnBox;
  const isDisabled = isEdit || !supplier?.id;

  return (
    <>
      <TableRow hover key={idx}>
        <TableCell align="center">
          <DropdownItemPacks
            disabled={isDisabled}
            withAdditionalParams
            additionalParams={{
              supplierId: supplier?.id
            }}
            defaultValue={defaultValue?.itemPacks?.[idx]}
            value={items?.itemPack ?? items}
            onChange={(val) => handleChangeDropdownItemPack(val)}
            selectorSelectedKey="name"
          />
        </TableCell>
        <TableCell align="center">
          <DropdownItemPacks
            disabled={isDisabled}
            withAdditionalParams
            additionalParams={{
              supplierId: supplier?.id
            }}
            defaultValue={defaultValue?.itemPacks?.[idx]}
            value={items?.itemPack ?? items}
            onChange={(val) => handleChangeDropdownItemPack(val)}
            selectorSelectedKey="code"
          />
        </TableCell>
        <TableCell align="center">
          {unitQuantity ? formattedThousand(unitQuantity) + '袋' : ''}
        </TableCell>
        <TableCell align="center">
          {perPackPrice ? formattedThousand(perPackPrice) + '円' : ''}
        </TableCell>
        <TableCell align="center">
          {perBoxPrice ? formattedThousand(perBoxPrice) + '円' : ''}
        </TableCell>
        <TableCell align="center">
          <CustomTextField
            disabled={isEdit ? !supplier?.id : isDisabled}
            fullWidth
            inputProps={{ style: { textAlign: 'center' } }}
            type="text"
            value={totalBoxQty}
            onChange={(e) =>
              handleChangeItemPack('totalBoxQty', e?.target?.value)
            }
            id="itemName"
          />
        </TableCell>
        <TableCell align="center">
          {totalBoxPrice ? formattedThousand(totalBoxPrice) + '円' : ''}
        </TableCell>
      </TableRow>

      {!isDisabled && isLastIndex && (
        <TableRow key={idx + 1}>
          <TableCell colSpan={2} align="center" />
          <TableCell colSpan={3} align="center">
            <Button fullWidth onClick={() => setItemPacks([...itemPacks, {}])}>
              <AddOutlinedIcon fontSize="medium" />
            </Button>
          </TableCell>
          <TableCell colSpan={2} align="center" />
        </TableRow>
      )}
    </>
  );
};

export default ItemPacks;
