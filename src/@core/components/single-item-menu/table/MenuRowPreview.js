import { memo } from 'react';

import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';

import { formattedThousand } from 'src/@core/utils/helper';
import { useGetAdminItemPacksDetail } from 'src/hooks/api/useAdminItemPacks';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const MenuRowPreview = memo(({ row, idx }) => {
  const { itemPacks } = row || {};

  const singleItemPack = itemPacks?.[idx];

  const { data: selectedItemPackData } = useGetAdminItemPacksDetail(
    singleItemPack?.itemPack?.id,
    {
      enabled: !isEmpty(singleItemPack?.itemPack?.id)
    }
  );

  return (
    <TableRow hover>
      <TableCell>{singleItemPack?.itemPack?.item?.course?.name}</TableCell>
      <TableCell>{singleItemPack?.itemPack?.item?.name}</TableCell>
      <TableCell>
        {singleItemPack?.itemPack?.item?.allergens?.length > 0
          ? singleItemPack?.itemPack?.item?.allergens?.map(
              (allergen, index) => {
                const isLastIndex =
                  singleItemPack?.itemPack?.item?.allergens?.length - 1 ===
                  index;

                return `${allergen?.allergen?.name}${isLastIndex ? '' : ','}`;
              }
            )
          : '-'}
      </TableCell>
      <TableCell>
        {singleItemPack?.masterUnitQtyOnPack}
        {singleItemPack?.itemPack?.item?.serve?.name || ''}
      </TableCell>
      <TableCell>{singleItemPack?.masterPackPrice}切</TableCell>
      <TableCell>
        {selectedItemPackData?.data?.isAvailable ? '有' : '没有'}
      </TableCell>
      <TableCell>
        {singleItemPack?.requireAt
          ? dayjs(singleItemPack?.requireAt).format('YYYY年MM月DD日')
          : '-'}
      </TableCell>
      <TableCell>{singleItemPack?.totalPackQty}食</TableCell>
      <TableCell>
        {formattedThousand(singleItemPack?.subTotalPackPrice)}円
      </TableCell>
    </TableRow>
  );
});

MenuRowPreview.displayName = 'MenuRowPreview';

export default MenuRowPreview;
