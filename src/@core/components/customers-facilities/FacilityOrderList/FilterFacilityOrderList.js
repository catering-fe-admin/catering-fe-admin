import React from 'react';
import DatePicker from 'react-datepicker';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

import CustomTextField from 'components/mui/text-field';

import { Button, Grid, Typography } from '@mui/material';

const FilterFacilityOrderList = ({
  filter,
  handleChange,
  setFilterApplied
}) => {
  return (
    <>
      <Grid
        container
        spacing={5}
        paddingTop="24px"
        padding="0 24px"
        justifyContent="center"
        sx={{ marginTop: '16px' }}
      >
        <Grid item container spacing={5} alignItems="flex-end">
          {/* Filter Start Billing Month */}
          <Grid item md={5.825} xs={12}>
            <DatePickerWrapper>
              <DatePicker
                id="issueAtPeriodFrom"
                showYearDropdown
                showMonthDropdown
                selected={filter?.issueAtPeriodFrom}
                placeholderText="YYYY/MM/DD"
                dateFormat="yyyy/MM/dd"
                onChange={handleChange('issueAtPeriodFrom')}
                customInput={
                  <CustomTextField fullWidth label="　注文月（納品月)" />
                }
              />
            </DatePickerWrapper>
          </Grid>

          <Grid
            item
            lg={0.35}
            md={0.35}
            marginBottom={1}
            display={{ xs: 'none', lg: 'block', md: 'block' }}
          >
            〜
          </Grid>

          {/* Filter End Billing Month */}
          <Grid item md={5.825} xs={12}>
            <DatePickerWrapper>
              <DatePicker
                id="issueAtPeriodTo"
                showYearDropdown
                showMonthDropdown
                selected={filter?.issueAtPeriodTo}
                placeholderText="YYYY/MM/DD"
                dateFormat="yyyy/MM/dd"
                onChange={handleChange('issueAtPeriodTo')}
                customInput={<CustomTextField fullWidth />}
              />
            </DatePickerWrapper>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container xs={12} justifyContent="center">
        <Grid xs={2}>
          <Button
            fullWidth
            color="warning"
            variant="contained"
            onClick={() => setFilterApplied(filter)}
          >
            検索
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FilterFacilityOrderList;
