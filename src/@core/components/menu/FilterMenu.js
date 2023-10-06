import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import Icon from 'src/@core/components/icon';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import {
  firstDateCurrentMonth,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

const FilterMenu = ({ handleSetFilterApplied }) => {
  const [filter, setFilter] = useState({
    dateFrom: firstDateCurrentMonth,
    dateTo: lastDateCurrentMonth
  });

  return (
    <Grid container spacing={5} padding="24px" justifyContent="center">
      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Item Name ( Name ) */}
        <Grid item lg={6} md={6} xs={12}>
          <DatePickerWrapper>
            <DatePicker
              selected={filter?.dateFrom}
              showYearDropdown
              showMonthDropdown
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
              customInput={
                <CustomTextField fullWidth label="年月日" autoComplete="off" />
              }
              id="dateFrom"
              onChange={(value) => setFilter({ ...filter, dateFrom: value })}
              clearIcon={
                <IconButton
                  edge="end"
                  onClick={(value) => setFilter({ ...filter, dateFrom: value })}
                >
                  <Icon fontSize="1.25rem" icon="ic:baseline-clear" />
                </IconButton>
              }
            />
          </DatePickerWrapper>
        </Grid>

        {/* Filter Supplier Name  */}
        <Grid item lg={6} md={6} xs={12}>
          <DatePickerWrapper>
            <DatePicker
              selected={filter?.dateTo}
              showYearDropdown
              showMonthDropdown
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
              customInput={
                <CustomTextField fullWidth label="年月日" autoComplete="off" />
              }
              id="date"
              onChange={(value) => setFilter({ ...filter, dateTo: value })}
              clearIcon={
                <IconButton
                  edge="end"
                  onClick={(value) => setFilter({ ...filter, dateTo: value })}
                >
                  <Icon fontSize="1.25rem" icon="ic:baseline-clear" />
                </IconButton>
              }
            />
          </DatePickerWrapper>
        </Grid>
      </Grid>

      <Grid item container xs={12} justifyContent="center">
        <Grid item xs={2}>
          <Button
            fullWidth
            color="warning"
            variant="contained"
            onClick={() => handleSetFilterApplied(filter)}
          >
            検索
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterMenu;
