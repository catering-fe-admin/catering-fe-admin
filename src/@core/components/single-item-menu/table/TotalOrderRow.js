import React, { memo } from 'react';

import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const DUMMY_CELLS_COUNT = {
  normal: 7,
  mousse: 5,
  rice: 3
};

const TotalOrderRow = memo(({ totalOrder, type }) => {
  const dummyCells = Array(DUMMY_CELLS_COUNT[type]).fill(1);
  return (
    <>
      <TableRow>
        {dummyCells.map((_, index) => (
          <TableCell key={index} sx={{ border: 0 }}></TableCell>
        ))}
        <TableCell sx={{ border: 0 }}>合計</TableCell>
        <TableCell sx={{ border: 0 }}>{totalOrder?.subTotal}円</TableCell>
      </TableRow>
      {totalOrder?.tax?.map((e, idx) => {
        return (
          <TableRow key={idx}>
            {dummyCells.map((_, index) => (
              <TableCell key={index} sx={{ border: 0 }}></TableCell>
            ))}
            <TableCell
              sx={{ border: 0 }}
            >{`消費税 (${e?.masterTax}%)`}</TableCell>
            <TableCell sx={{ border: 0 }}>{e?.subTotalTax}円</TableCell>
          </TableRow>
        );
      })}
      <TableRow>
        {dummyCells.map((_, index) => (
          <TableCell key={index} sx={{ border: 0 }}></TableCell>
        ))}
        <TableCell sx={{ border: 0 }}>総合計</TableCell>
        <TableCell sx={{ border: 0 }}>{totalOrder?.total}円</TableCell>
      </TableRow>
    </>
  );
});

TotalOrderRow.displayName = 'TotalOrderRow';

export default TotalOrderRow;
