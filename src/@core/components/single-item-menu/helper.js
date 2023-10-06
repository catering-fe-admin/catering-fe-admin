import { useCallback, useEffect } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import compact from 'lodash/compact';
import { v4 as uuidv4 } from 'uuid';

import { getListFacilityNames } from 'src/@core/utils/helper';
import queries from 'src/consts/queries';
import {
  useGetAdminCustomerPurchaseMousses,
  usePostAdminCustomerPurchaseMousses,
  usePostAdminCustomerPurchaseMoussesPreview,
  usePutAdminCustomerPurchaseMousses
} from 'src/hooks/api/useAdminCustomerPurchaseMousses';
import {
  useGetAdminCustomerPurchaseRices,
  usePostAdminCustomerPurchaseRices,
  usePostAdminCustomerPurchaseRicesPreview,
  usePutAdminCustomerPurchaseRices
} from 'src/hooks/api/useAdminCustomerPurchaseRices';
import {
  useGetAdminCustomerPurchaseSingles,
  usePostAdminCustomerPurchaseSingles,
  usePostAdminCustomerPurchaseSinglesPreview,
  usePutAdminCustomerPurchaseSingles
} from 'src/hooks/api/useAdminCustomerPurchaseSingles';

const FETCHER = {
  normal: useGetAdminCustomerPurchaseSingles,
  mousse: useGetAdminCustomerPurchaseMousses,
  rice: useGetAdminCustomerPurchaseRices
};

const appendItemPacks = (type) => {
  return {
    itemPacks: [
      {
        id: '',
        itemPack: {
          item: {
            course: {}
          }
        },
        totalPackQty: 1,
        requireAt: '',
        ...(type === 'mousse' && { isHaveOrdered: false })
      }
    ]
  };
};

const appendItems = () => {
  return {
    items: [
      {
        id: '',
        item: {},
        totalKilo: 1,
        requireAt: '',
        isHaveOrdered: false
      }
    ]
  };
};

const getInitialCreateList = (facilityId, uuid, type) => {
  return [
    {
      uuid,
      id: '',
      customerFacility: {
        id: facilityId
      },
      ...(type === 'normal' || type === 'mousse'
        ? appendItemPacks(type)
        : appendItems())
    }
  ];
};

const useSingleItemMenuItems = ({
  isCreate,
  type,
  facilityId,
  filterApplied,
  showCreateConfirmation,
  orderList,
  setOrderList,
  editedOrderList,
  setEditedOrderList,
  setShowCreateConfirmation,
  setListFacilities,
  setIsReady,
  setTotalOrder
}) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { customerFacilityId, issueAtPeriodFrom, issueAtPeriodTo } =
    router.query || {};

  // Singles Mutation
  const { mutate: editPurchaseSingles } = usePutAdminCustomerPurchaseSingles();
  const { mutate: postPurchaseSingles } = usePostAdminCustomerPurchaseSingles();
  const { mutate: postPurchaseSinglesPreview } =
    usePostAdminCustomerPurchaseSinglesPreview();

  // Mousses Mutation
  const { mutate: postPurchaseMousses } = usePostAdminCustomerPurchaseMousses();
  const { mutate: editPurchaseMousses } = usePutAdminCustomerPurchaseMousses();
  const { mutate: postPurchaseMoussesPreview } =
    usePostAdminCustomerPurchaseMoussesPreview();

  // Rices Mutation
  const { mutate: postPurchaseRices } = usePostAdminCustomerPurchaseRices();
  const { mutate: editPurchaseRices } = usePutAdminCustomerPurchaseRices();
  const { mutate: postPurchaseRicesPreview } =
    usePostAdminCustomerPurchaseRicesPreview();

  const onChangeProduct = useCallback(
    async (editUuid, newValue, itemIndex, isRice = false) => {
      setOrderList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const newItems = isRice ? prev?.items : prev?.itemPacks;

            // Set dropdown item
            if (isRice) {
              newItems[itemIndex].item = newValue;
            } else {
              newItems[itemIndex].itemPack = {
                item: newValue
              };

              if (type === 'mousse') {
                newItems[itemIndex].requireAt = '';
              }
            }

            return {
              ...prev,
              ...(isRice ? { items: newItems } : { itemPacks: newItems }),
              isEdited: true
            };
          }

          return prev;
        });
      });
    },
    [setOrderList, type]
  );

  const onChangeInternalVolume = useCallback(
    (editUuid, newValue, itemIndex) => {
      setOrderList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const newItemPacks = [...(prev?.itemPacks || [])];

            newItemPacks[itemIndex].itemPack = newValue;

            return {
              ...prev,
              itemPacks: newItemPacks,
              isEdited: true
            };
          }

          return prev;
        });
      });
    },
    [setOrderList]
  );

  const onChangeDateInput = useCallback(
    (editUuid, newDateValue, itemIndex, isRice = false) => {
      setOrderList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const newItems = isRice ? prev?.items : prev?.itemPacks;

            newItems[itemIndex].requireAt = newDateValue
              ? dayjs(newDateValue).format('YYYY-MM-DD')
              : null;

            return {
              ...prev,
              ...(isRice ? { items: newItems } : { itemPacks: newItems }),
              isEdited: true
            };
          }

          return prev;
        });
      });
    },
    [setOrderList]
  );

  const onChangeTotalPack = useCallback(
    (editUuid, newValue, itemIndex, isRice) => {
      setOrderList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const newItems = isRice ? prev?.items : prev?.itemPacks;

            if (isRice) {
              newItems[itemIndex].totalKilo = newValue;
            } else {
              newItems[itemIndex].totalPackQty = newValue;
            }

            return {
              ...prev,
              ...(isRice ? { items: newItems } : { itemPacks: newItems }),
              isEdited: true
            };
          }

          return prev;
        });
      });
    },
    [setOrderList]
  );

  const onClickPlusMinus = useCallback(
    (editUuid, isClickPlus = false, itemIndex, isRice) => {
      setOrderList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const newItems = isRice ? prev?.items : prev?.itemPacks;

            const prevTotalPackQty =
              newItems[itemIndex][isRice ? 'totalKilo' : 'totalPackQty'];

            const value = isClickPlus
              ? parseFloat(prevTotalPackQty) + 1
              : parseFloat(prevTotalPackQty) - 1;

            newItems[itemIndex][isRice ? 'totalKilo' : 'totalPackQty'] =
              value > 0 ? value : prevTotalPackQty;

            return {
              ...prev,
              ...(isRice ? { items: newItems } : { itemPacks: newItems }),
              isEdited: true
            };
          }

          return prev;
        });
      });
    },
    [setOrderList]
  );

  const onChangeIsHaveOrdered = useCallback(
    (editUuid, isChecked, itemIndex, isRice = false) => {
      setOrderList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const newItems = isRice ? prev?.items : prev?.itemPacks;
            newItems[itemIndex].isHaveOrdered = isChecked;

            return {
              ...prev,
              ...(isRice ? { items: newItems } : { itemPacks: newItems }),
              isEdited: true
            };
          }

          return prev;
        });
      });
    },
    [setOrderList]
  );

  const onChangeCourses = useCallback(
    (editUuid, value, itemIndex) => {
      setOrderList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const newItemPacks = prev?.itemPacks;
            newItemPacks[itemIndex].itemPack = { item: { course: value } };

            return {
              ...prev,
              itemPacks: newItemPacks,
              isEdited: true
            };
          }

          return prev;
        });
      });
    },
    [setOrderList]
  );

  const onClickDeleteRow = useCallback(
    (editUuid) => {
      setOrderList((prevData) => {
        return compact(
          prevData?.map((prev) => {
            if (prev?.uuid === editUuid) {
              return null;
            }

            return prev;
          })
        );
      });
    },
    [setOrderList]
  );

  const getFormattedItemPacks = (order, type) => {
    return {
      itemPacks: order?.itemPacks?.map((itemPack) => {
        return {
          id: itemPack?.id,
          itemPack: {
            id: itemPack?.itemPack?.id
          },
          totalPackQty: itemPack?.totalPackQty
            ? parseFloat(itemPack?.totalPackQty)
            : 0,
          requireAt: itemPack?.requireAt,
          ...(type === 'mousse' && { isHaveOrdered: itemPack?.isHaveOrdered })
        };
      })
    };
  };

  const getFormattedItems = (order) => {
    return {
      items: order?.items?.map((item) => {
        return {
          id: item?.id,
          item: {
            id: item?.item?.id
          },
          totalKilo: item?.totalKilo,
          requireAt: item?.requireAt,
          isHaveOrdered: item?.isHaveOrdered
        };
      })
    };
  };

  const getFormattedBody = () => {
    return editedOrderList?.map((order) => {
      return {
        id: order?.id,
        customerFacility: {
          id: order?.customerFacility?.id
        },
        ...(type === 'normal' || type === 'mousse'
          ? getFormattedItemPacks(order, type)
          : getFormattedItems(order))
      };
    });
  };

  const postQuery = {
    normal: postPurchaseSingles,
    mousse: postPurchaseMousses,
    rice: postPurchaseRices
  };

  const postQueryPreview = {
    normal: postPurchaseSinglesPreview,
    mousse: postPurchaseMoussesPreview,
    rice: postPurchaseRicesPreview
  };

  const editQuery = {
    normal: editPurchaseSingles,
    mousse: editPurchaseMousses,
    rice: editPurchaseRices
  };

  const queryFn = isCreate ? postQuery[type] : editQuery[type];

  const submitAndRefetch = async () => {
    const formattedBody = getFormattedBody();

    queryFn(formattedBody, {
      onSuccess: async () => {
        if (isCreate) {
          router.back();
        } else {
          await queryClient.refetchQueries(
            queries.adminCustomerPurchaseSingles._def
          );
          await queryClient.refetchQueries(
            queries.adminCustomerPurchaseMousses._def
          );
          await queryClient.refetchQueries(
            queries.adminCustomerPurchaseRices._def
          );
        }
      }
    });
  };

  const queryPreviewFn = postQueryPreview[type];
  const submitPreview = async () => {
    const formattedBody = getFormattedBody();

    queryPreviewFn(formattedBody, {
      onSuccess: (data) => {
        const newData = [];

        let subTotal = 0;
        const tax = [];
        let total = 0;

        data?.data?.map((e) => {
          if (type === 'rice') {
            for (let itemIdx = 0; itemIdx < e?.items?.length; itemIdx++) {
              const currItems = e?.items?.[itemIdx];

              subTotal = subTotal + currItems?.subTotalKiloPrice;
              total = total + currItems?.totalKiloPrice;

              const taxItemIdx = tax?.findIndex(
                (e) => e?.masterTax == currItems?.masterTax
              );
              if (taxItemIdx !== -1) {
                tax[taxItemIdx].subTotalTax =
                  tax[taxItemIdx]?.subTotalTax + currItems?.subTotalKiloTax;
              } else {
                tax.push({
                  masterTax: currItems?.masterTax,
                  subTotalTax: currItems?.subTotalKiloTax
                });
              }
            }
          } else {
            for (
              let itemPacksIdx = 0;
              itemPacksIdx < e?.itemPacks?.length;
              itemPacksIdx++
            ) {
              const currItemPacks = e?.itemPacks?.[itemPacksIdx];

              subTotal = subTotal + currItemPacks?.subTotalPackPrice || 0;
              total = total + currItemPacks?.totalPackPrice || 0;

              const taxIdx = tax?.findIndex(
                (e) => e?.masterTax == currItemPacks?.masterTax
              );

              if (taxIdx !== -1) {
                tax[taxIdx].subTotalTax =
                  tax[taxIdx]?.subTotalTax + currItemPacks?.subTotalPackTax;
              } else {
                tax.push({
                  masterTax: currItemPacks?.masterTax,
                  subTotalTax: currItemPacks?.subTotalPackTax
                });
              }
            }

            if (type == 'mousse') {
              for (
                let additionalsIdx = 0;
                additionalsIdx < e?.additionals?.length;
                additionalsIdx++
              ) {
                const currAdditionals = e?.additionals?.[additionalsIdx];

                subTotal = subTotal + currAdditionals?.subTotalPrice || 0;
                total = total + currAdditionals?.totalPrice || 0;

                const additionalTaxIdx = tax?.findIndex(
                  (e) => e?.masterTax == currAdditionals?.masterTax
                );

                if (additionalTaxIdx !== -1) {
                  tax[additionalTaxIdx].subTotalTax =
                    tax[additionalTaxIdx]?.subTotalTax +
                    currAdditionals?.subTotalTax;
                } else {
                  tax.push({
                    masterTax: currAdditionals?.masterTax,
                    subTotalTax: currAdditionals?.subTotalTax
                  });
                }
              }
            }
          }

          newData.push({
            ...e,
            uuid: uuidv4(),
            isEdited: true
          });
        });

        setTotalOrder({
          subTotal,
          tax,
          total
        });
        setOrderList(newData);
        setShowCreateConfirmation(true);
      }
    });
  };

  const onClickBottomNavigation = () => {
    if (isCreate) {
      if (showCreateConfirmation) {
        submitAndRefetch();
      } else {
        submitPreview();
      }
    } else {
      if (editedOrderList?.length > 0) {
        submitAndRefetch();
      }
    }
  };

  // Params from state
  const appendAppliedFilter = () => {
    return {
      ...(filterApplied?.requireAtFrom && {
        requireAtFrom: dayjs(filterApplied?.requireAtFrom).format('YYYY-MM-DD')
      }),
      ...(filterApplied?.requireAtTo && {
        requireAtTo: dayjs(filterApplied?.requireAtTo).format('YYYY-MM-DD')
      }),
      ...(filterApplied?.customerFacility?.id && {
        customerFacilityId: filterApplied?.customerFacility?.id
      }),
      ...(filterApplied?.itemPack?.id && {
        itemPack: filterApplied?.itemPack?.id
      }),
      ...(filterApplied?.orderStatus != 'all' && {
        isHaveOrdered: filterApplied?.orderStatus === 'completed'
      })
    };
  };

  // Params from url
  const appendQueryParamsFilter = () => {
    return {
      ...(customerFacilityId && {
        customerFacilityId
      }),
      ...(issueAtPeriodFrom && {
        requireAtFrom: issueAtPeriodFrom
      }),
      ...(issueAtPeriodTo && { requireAtTo: issueAtPeriodTo })
    };
  };

  const appendOrderList = useCallback(() => {
    setOrderList((prevData) => {
      return [...prevData, ...getInitialCreateList(facilityId, uuidv4(), type)];
    });
  }, [facilityId, setOrderList, type]);

  const params = {
    size: 2147483647,
    ...appendAppliedFilter(),
    ...appendQueryParamsFilter()
  };

  const useGetCustomerPurchase = FETCHER[type];

  const { isFetching } = useGetCustomerPurchase(params, {
    onSuccess: (data) => {
      setIsReady(false);

      const newData = data?.data?.content?.map((item) => {
        return {
          ...item,
          uuid: uuidv4()
        };
      });

      setOrderList(newData);
      setEditedOrderList([]);
      setListFacilities(getListFacilityNames(newData));

      setIsReady(true);
    },
    enabled: !isCreate
  });

  useEffect(() => {
    if (orderList?.length === 0) {
      setEditedOrderList([]);

      return;
    }

    const filteredData = orderList?.filter((order) => order?.isEdited);
    setEditedOrderList(filteredData);
  }, [orderList, setEditedOrderList]);

  useEffect(() => {
    if (!isCreate) return;
    setIsReady(false);

    setOrderList(getInitialCreateList(facilityId, uuidv4(), type));

    setIsReady(true);
  }, [isCreate, facilityId, type, setIsReady, setOrderList]);

  return {
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
  };
};

export default useSingleItemMenuItems;
