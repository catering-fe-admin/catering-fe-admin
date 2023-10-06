import { forwardRef, useState } from 'react';
import DatePicker from 'react-datepicker';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

import CustomTextField from 'components/mui/text-field';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import columns from './columns';
import dataDummy from './dataDummy';

const CustomDateInput = forwardRef((props, ref) => {
  return (
    <CustomTextField
      {...props}
      inputRef={ref}
      label={props?.label}
      autoComplete="off"
    />
  );
});

CustomDateInput.displayName = 'CustomDateInput';

const MousseFoodTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  return (
    <TableContainer>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="center"
                style={{ width: column?.width, padding: '8px' }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {dataDummy
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, idx) => {
              const {
                id,
                orderToManufacture,
                category,
                productName,
                unitPrice,
                desiredDeliveryDate,
                quantity
              } = row;

              return (
                <TableRow hover key={`${id}-${idx}`}>
                  <TableCell>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={orderToManufacture == 'isChecked'}
                          name={`${orderToManufacture}-${id}`}
                        />
                      }
                    />
                  </TableCell>
                  <TableCell align="center">{category}</TableCell>
                  <TableCell align="center">{productName}</TableCell>
                  <TableCell align="center">{unitPrice}円</TableCell>
                  <TableCell align="center">
                    <DatePickerWrapper>
                      <DatePicker
                        id={`${desiredDeliveryDate}-${idx}`}
                        showYearDropdown
                        showMonthDropdown
                        selected={desiredDeliveryDate}
                        placeholderText="YYYY/MM/DD"
                        dateFormat="yyyy/MM/dd"
                        customInput={<CustomDateInput fullWidth />}
                      />
                    </DatePickerWrapper>
                  </TableCell>

                  <TableCell>
                    <Grid
                      container
                      spacing={2}
                      justifyContent="right"
                      alignItems="center"
                    >
                      <Grid item xs={8}>
                        <CustomTextField
                          fullWidth
                          type="text"
                          inputProps={{ style: { textAlign: 'center' } }}
                          defaultValue={quantity}
                          id={`quantity-${idx}`}
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
                        <IconButton>
                          <AddOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                      <Grid item>
                        <IconButton>
                          <RemoveOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MousseFoodTable;
