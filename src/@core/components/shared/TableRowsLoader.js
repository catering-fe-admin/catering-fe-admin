import { TableRow, TableCell, Skeleton } from '@mui/material'
import React from 'react'

const TableRowsLoader = ({ rowsNum, cellsNum }) => {
  return [...Array(rowsNum)].map((_, index) => (
    <TableRow key={index}>
      {[...Array(cellsNum)].map((_, index) => (
        <TableCell key={index}>
          <Skeleton animation='wave' variant='text' />
        </TableCell>
      ))}
    </TableRow>
  ))
}

export default TableRowsLoader
