import React, { memo } from 'react';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Box, Button, Typography } from '@mui/material';

import SingleItemMenuTable from './table/SingleItemMenuTable';

const CreateContent = memo(
  ({
    orderList,
    totalOrder,
    onChangeProduct,
    onChangeInternalVolume,
    onChangeDateInput,
    onChangeTotalPack,
    onClickPlusMinus,
    onChangeIsHaveOrdered,
    onChangeCourses,
    appendOrderList,
    showCreateConfirmation,
    onClickDeleteRow,
    type
  }) => {
    return (
      <>
        {showCreateConfirmation && (
          <Box sx={{ paddingLeft: '36px', marginBottom: '24px' }}>
            <Typography>単品のご注文は以下の通りです。</Typography>
            <Typography>
              ご確認のうえ「確定する」ボタンをクリックしてください。
            </Typography>
          </Box>
        )}
        <SingleItemMenuTable
          filteredOrderList={orderList}
          totalOrder={totalOrder}
          onChangeProduct={onChangeProduct}
          onChangeInternalVolume={onChangeInternalVolume}
          onChangeDateInput={onChangeDateInput}
          onChangeTotalPack={onChangeTotalPack}
          onClickPlusMinus={onClickPlusMinus}
          onChangeIsHaveOrdered={onChangeIsHaveOrdered}
          onChangeCourses={onChangeCourses}
          showCreateConfirmation={showCreateConfirmation}
          onClickDeleteRow={onClickDeleteRow}
          type={type}
          isCreate
        />
        {!showCreateConfirmation && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '50px'
            }}
          >
            <Button
              sx={{ height: '100%', width: '100%' }}
              onClick={appendOrderList}
            >
              <AddOutlinedIcon fontSize="small" />
            </Button>
          </Box>
        )}
      </>
    );
  }
);

CreateContent.displayName = 'CreateContent';

export default CreateContent;
