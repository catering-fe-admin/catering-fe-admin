import React, { memo } from 'react';

import Content from './Content';

const EditContent = memo(
  ({
    listFacilities,
    orderList,
    editedOrderList,
    onChangeProduct,
    onChangeInternalVolume,
    onChangeDateInput,
    onChangeTotalPack,
    onClickPlusMinus,
    onChangeIsHaveOrdered,
    onChangeCourses,
    type
  }) => {
    return listFacilities?.map((facility) => {
      const filteredOrderList = orderList
        ?.filter((item) => {
          return item?.customerFacility?.id === facility?.id;
        })
        ?.map((order) => {
          const editedIndex = editedOrderList?.findIndex(
            (editedData) => editedData?.uuid === order?.uuid
          );

          if (editedIndex >= 0) {
            return editedOrderList[editedIndex];
          }

          return order;
        });

      return (
        <Content
          facility={facility}
          filteredOrderList={filteredOrderList}
          onChangeProduct={onChangeProduct}
          onChangeInternalVolume={onChangeInternalVolume}
          onChangeDateInput={onChangeDateInput}
          onChangeTotalPack={onChangeTotalPack}
          onClickPlusMinus={onClickPlusMinus}
          onChangeIsHaveOrdered={onChangeIsHaveOrdered}
          onChangeCourses={onChangeCourses}
          type={type}
          key={facility?.id}
        />
      );
    });
  }
);

EditContent.displayName = 'EditContent';

export default EditContent;
