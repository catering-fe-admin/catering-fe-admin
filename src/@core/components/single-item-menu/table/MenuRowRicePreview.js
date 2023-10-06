import { memo } from 'react';

import dayjs from 'dayjs';

import { formattedThousand } from 'src/@core/utils/helper';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const MenuRowRicePreview = memo(({ row, idx }) => {
  const { items } = row || {};

  const singleItem = items?.[idx];

  return (
    <TableRow hover>
      <TableCell>{singleItem?.item?.name}</TableCell>
      <TableCell>
        {singleItem?.masterKiloPrice ? `${singleItem?.masterKiloPrice}円` : '-'}
      </TableCell>
      <TableCell>
        {singleItem?.requireAt
          ? dayjs(singleItem?.requireAt).format('YYYY年MM月DD日')
          : '-'}
      </TableCell>
      <TableCell>{`${singleItem?.totalKilo}食`}</TableCell>
      <TableCell>{`${formattedThousand(
        singleItem?.subTotalKiloPrice
      )}円`}</TableCell>
    </TableRow>
  );
});

MenuRowRicePreview.displayName = 'MenuRowRicePreview';

export default MenuRowRicePreview;
