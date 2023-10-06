import { memo } from 'react';

import dayjs from 'dayjs';

import { formattedThousand } from 'src/@core/utils/helper';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const MenuRowMoussePreview = memo(({ row, idx }) => {
  const { itemPacks, additionals } = row || {};

  const singleAdditionals = additionals?.[idx];
  const singleItemPack = itemPacks?.[idx];

  return (
    <>
      <TableRow hover>
        <TableCell>{singleItemPack?.itemPack?.item?.course?.name}</TableCell>
        <TableCell>{singleItemPack?.itemPack?.item?.name}</TableCell>
        <TableCell>
          {singleItemPack?.masterUnitQtyOnPack}
          {singleItemPack?.itemPack?.item?.serve?.name || ''}
        </TableCell>
        <TableCell>{singleItemPack?.masterPackPrice}切</TableCell>
        <TableCell>
          {singleItemPack?.requireAt
            ? dayjs(singleItemPack?.requireAt).format('YYYY年MM月DD日')
            : '-'}
        </TableCell>
        <TableCell>{singleItemPack?.totalPackQty}食</TableCell>
        <TableCell>{singleItemPack?.subTotalPackPrice}円</TableCell>
      </TableRow>

      <TableRow hover>
        <TableCell />
        <TableCell>ムース食送料</TableCell>
        <TableCell />
        <TableCell />
        <TableCell>
          {singleAdditionals?.requireAt
            ? dayjs(singleAdditionals?.requireAt).format('YYYY年MM月DD日')
            : '-'}
        </TableCell>
        <TableCell />
        <TableCell>
          {singleAdditionals?.subTotalPrice
            ? `${formattedThousand(singleAdditionals?.subTotalPrice)}円`
            : ''}
        </TableCell>
      </TableRow>
    </>
  );
});

MenuRowMoussePreview.displayName = 'MenuRowMoussePreview';

export default MenuRowMoussePreview;
