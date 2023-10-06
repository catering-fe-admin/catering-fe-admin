import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import BottomNavigation from '../shared/BottomNavigation';
import FallbackSpinner from '../spinner';
import CreateContent from './CreateContent';
import EditContent from './EditContent';
import useSingleItemMenuItems from './helper';

const SingleItemMenuItems = ({
  filterApplied,
  isCreate = false,
  facilityId,
  type
}) => {
  const [orderList, setOrderList] = useState([]);
  const [totalOrder, setTotalOrder] = useState({
    subTotal: 0,
    tax: 0,
    total: 0
  });
  const [editedOrderList, setEditedOrderList] = useState([]);

  const [listFacilities, setListFacilities] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const [showCreateConfirmation, setShowCreateConfirmation] = useState(false);

  const {
    isFetching,
    onChangeProduct,
    onChangeInternalVolume,
    onChangeDateInput,
    onChangeTotalPack,
    onClickPlusMinus,
    onChangeIsHaveOrdered,
    onChangeCourses,
    onClickBottomNavigation,
    appendOrderList,
    onClickDeleteRow
  } = useSingleItemMenuItems({
    isCreate,
    type,
    facilityId,
    filterApplied,
    orderList,
    setOrderList,
    editedOrderList,
    setEditedOrderList,
    showCreateConfirmation,
    setShowCreateConfirmation,
    setListFacilities,
    setIsReady,
    setTotalOrder
  });

  return (
    <>
      <Grid container xs={12} alignItems="center">
        {isCreate ? (
          <CreateContent
            orderList={orderList}
            totalOrder={totalOrder}
            onChangeProduct={onChangeProduct}
            onChangeInternalVolume={onChangeInternalVolume}
            onChangeDateInput={onChangeDateInput}
            onChangeTotalPack={onChangeTotalPack}
            onClickPlusMinus={onClickPlusMinus}
            onChangeIsHaveOrdered={onChangeIsHaveOrdered}
            onChangeCourses={onChangeCourses}
            appendOrderList={appendOrderList}
            showCreateConfirmation={showCreateConfirmation}
            onClickDeleteRow={onClickDeleteRow}
            type={type}
          />
        ) : isFetching || !isReady ? (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '36px 0'
            }}
          >
            <FallbackSpinner sx={{ height: 'auto' }} />
          </Box>
        ) : listFacilities?.length > 0 ? (
          <EditContent
            listFacilities={listFacilities}
            orderList={orderList}
            editedOrderList={editedOrderList}
            onChangeProduct={onChangeProduct}
            onChangeInternalVolume={onChangeInternalVolume}
            onChangeDateInput={onChangeDateInput}
            onChangeTotalPack={onChangeTotalPack}
            onClickPlusMinus={onClickPlusMinus}
            onChangeIsHaveOrdered={onChangeIsHaveOrdered}
            onChangeCourses={onChangeCourses}
            type={type}
          />
        ) : (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              marginTop: '20px'
            }}
          >
            <Typography sx={{ mb: 6, color: 'text.secondary' }}>
              「該当する品目はありません。」
            </Typography>
          </Box>
        )}
      </Grid>

      <BottomNavigation
        action={
          <>
            {isCreate && showCreateConfirmation && (
              <Button
                variant="contained"
                color="success"
                sx={{ marginRight: '8px' }}
                onClick={() => {
                  setEditedOrderList(orderList);
                  setShowCreateConfirmation(false);
                }}
              >
                戻る
              </Button>
            )}
            <Button
              variant="contained"
              color="success"
              onClick={onClickBottomNavigation}
              disabled={isFetching}
            >
              {isCreate
                ? showCreateConfirmation
                  ? '確定する'
                  : '注文する'
                : '登録'}
            </Button>
          </>
        }
      />
    </>
  );
};

export default SingleItemMenuItems;
