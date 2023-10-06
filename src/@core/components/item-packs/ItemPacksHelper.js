export const getPopupDataFormatted = ({ data, itemPackId, type }) => {
  const getDate = (e, i) => {
    if (
      ['CUSTOMER_PURCHASE_MENU_ADD', 'CUSTOMER_PURCHASE_MENU_EDIT'].includes(
        type
      )
    ) {
      return e?.requireAt;
    }

    if (
      [
        'CUSTOMER_PURCHASE_SINGLE_ADD',
        'CUSTOMER_PURCHASE_SINGLE_EDIT'
      ].includes(type)
    ) {
      return i?.requireAt;
    }

    return e?.deliveryAt; // type === 'CUSTOMER_DELIVERY'
  };

  return data?.flatMap((x) => {
    return x?.data?.content?.flatMap((e, edx) => {
      return e?.itemPacks
        ?.filter((i) => i?.itemPack?.id === itemPackId)
        ?.flatMap((i) => {
          return {
            date: getDate(e, i),
            name: e?.customerFacility?.name,
            total: i?.totalPackQty
          };
        });
    });
  });
};
