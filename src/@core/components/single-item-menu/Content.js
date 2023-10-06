import React, { memo, useState } from 'react';
// import MenuTable from './table/MenuTable'
import AnimateHeight from 'react-animate-height';

import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import SingleItemMenuTable from './table/SingleItemMenuTable';

const CompanyProfile = memo(({ facility, isTableOpen, toggleShowTable }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography variant="h5" component="p" sx={{ marginRight: '8px' }}>
        {facility?.name}
      </Typography>

      <IconButton onClick={toggleShowTable}>
        {isTableOpen ? <ArrowDropUp /> : <ArrowDropDown />}
      </IconButton>
    </Box>
  );
});

CompanyProfile.displayName = 'CompanyProfile';

const Content = memo(
  ({
    facility,
    filteredOrderList,
    onChangeProduct,
    onChangeInternalVolume,
    onChangeDateInput,
    onChangeTotalPack,
    onClickPlusMinus,
    onChangeIsHaveOrdered,
    onChangeCourses,
    type
  }) => {
    const [height, setHeight] = useState('auto');

    const isTableOpen = height == 'auto';

    const toggleShowTable = () => {
      return setHeight(height === 0 ? 'auto' : 0);
    };

    return (
      <>
        <Grid
          item
          xs={12}
          paddingLeft="24px"
          marginTop="24px"
          marginBottom="24px"
        >
          <CompanyProfile
            facility={facility}
            isTableOpen={isTableOpen}
            toggleShowTable={toggleShowTable}
          />
        </Grid>

        <AnimateHeight duration={250} height={height} style={{ width: '100%' }}>
          <Grid item xs={12}>
            <SingleItemMenuTable
              filteredOrderList={filteredOrderList}
              onChangeProduct={onChangeProduct}
              onChangeInternalVolume={onChangeInternalVolume}
              onChangeDateInput={onChangeDateInput}
              onChangeTotalPack={onChangeTotalPack}
              onClickPlusMinus={onClickPlusMinus}
              onChangeIsHaveOrdered={onChangeIsHaveOrdered}
              onChangeCourses={onChangeCourses}
              type={type}
            />
          </Grid>
        </AnimateHeight>
      </>
    );
  }
);

Content.displayName = 'Content';

export default Content;
