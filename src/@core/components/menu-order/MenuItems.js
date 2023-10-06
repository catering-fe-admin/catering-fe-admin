import React, { useCallback, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';
import { v4 as uuidv4 } from 'uuid';

import { getListFacilityNames } from 'src/@core/utils/helper';
import { getAdminItems } from 'src/client/adminItemsClient';
import queries from 'src/consts/queries';
import {
  useGetAdminCustomerPurchaseMenus,
  usePostAdminCustomerPurchaseMenus
} from 'src/hooks/api/useAdminCustomerPurchaseMenus';
import { useGetAdminTimeSections } from 'src/hooks/api/useAdminTimeSections';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import BottomNavigation from '../shared/BottomNavigation';
import FallbackSpinner from '../spinner';
import Content from './Content';

const MenuItems = ({ filterApplied }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutate: postPurchaseMenus } = usePostAdminCustomerPurchaseMenus();

  const { customerFacilityId, issueAtPeriodFrom, issueAtPeriodTo } =
    router.query || {};

  const [orderList, setOrderList] = useState([]);
  const [editedOrderList, setEditedOrderList] = useState([]);

  const [listFacilities, setListFacilities] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [timeSections, setTimeSections] = useState([]);

  const onChangeTotalServe = useCallback((editUuid, value) => {
    setOrderList((prevData) => {
      return prevData?.map((prev) => {
        if (prev?.uuid === editUuid) {
          const newData = {
            ...prev,
            totalServeQtyGlobal: value,
            isEdited: true
          };

          return newData;
        }

        return prev;
      });
    });
  }, []);

  const onClickPlusMinus = useCallback((editUuid, isClickPlus = false) => {
    setOrderList((prevData) => {
      return prevData?.map((prev) => {
        if (prev?.uuid === editUuid) {
          const newData = {
            ...prev,
            totalServeQtyGlobal: isClickPlus
              ? parseFloat(prev.totalServeQtyGlobal) + 1
              : parseFloat(prev.totalServeQtyGlobal) - 1,
            isEdited: true
          };

          return newData;
        }

        return prev;
      });
    });
  }, []);

  const onChangeTimeSection = useCallback(
    (editUuid) => {
      setOrderList((prevData) => {
        return prevData?.map((prev) => {
          if (prev?.uuid === editUuid) {
            const listTimeSections = timeSections?.filter(
              (time) => time?.type === prev?.timeSection?.type
            );

            const currentIndex = listTimeSections?.findIndex(
              (time) => time?.id === prev?.timeSection?.id
            );
            const isLastIndex = currentIndex === listTimeSections?.length - 1;
            const nextIndex = isLastIndex ? 0 : currentIndex + 1;

            const newData = {
              ...prev,
              timeSection: listTimeSections[nextIndex],
              isEdited: true
            };

            return newData;
          }

          return prev;
        });
      });
    },
    [timeSections]
  );

  const getAdminItemsData = async (courseId) => {
    const params = {
      page: 1,
      size: 1,
      courseId
    };

    const { data } = await getAdminItems(params);

    const firstItem = data?.content?.[0];

    if (firstItem) {
      return {
        id: firstItem?.id,
        name: firstItem?.name
      };
    }

    return null;
  };

  const onChangeCourse = useCallback(async (editUuid, newValue, itemIndex) => {
    let firstItem;

    if (newValue?.id) {
      firstItem = await getAdminItemsData(newValue?.id);
    }

    setOrderList((prevData) => {
      return prevData?.map((prev) => {
        if (prev?.uuid === editUuid) {
          const newItems = [...(prev?.items || [])];
          newItems[itemIndex].item.course = newValue;

          newItems[itemIndex].item.id = firstItem?.id || '';
          newItems[itemIndex].item.name = firstItem?.name || '';

          const newData = {
            ...prev,
            items: newItems,
            isEdited: true
          };

          return newData;
        }

        return prev;
      });
    });
  }, []);

  const onChangeProduct = useCallback((editUuid, newValue, itemIndex) => {
    setOrderList((prevData) => {
      return prevData?.map((prev) => {
        if (prev?.uuid === editUuid) {
          const newItems = [...(prev?.items || [])];

          newItems[itemIndex].item.id = newValue?.id || '';
          newItems[itemIndex].item.name = newValue?.name || '';

          const newData = {
            ...prev,
            items: newItems,
            isEdited: true
          };

          return newData;
        }

        return prev;
      });
    });
  }, []);

  const onClickAppend = useCallback((editUuid) => {
    setOrderList((prevData) => {
      return prevData?.map((prev) => {
        if (prev?.uuid === editUuid) {
          const newItem = {
            id: null,
            item: {
              id: null,
              name: '',
              course: {}
            }
          };

          const newItems = [...(prev?.items || []), newItem];

          const newData = {
            ...prev,
            items: newItems,
            isEdited: true
          };

          return newData;
        }

        return prev;
      });
    });
  }, []);

  const onClickSave = useCallback(() => {
    if (editedOrderList?.length === 0) return;

    const formattedBody = editedOrderList?.map((order) => {
      return {
        id: order?.id,
        requireAt: order?.requireAt,
        timeSection: {
          id: order?.timeSection?.id
        },
        customerFacility: {
          id: order?.customerFacility?.id
        },
        totalServeQtyGlobal: parseFloat(order?.totalServeQtyGlobal || 0),
        items: order?.items
          ?.filter((item) => {
            return !isEmpty(item?.item?.id);
          })
          ?.map((item) => {
            return {
              id: item?.id,
              item: {
                id: item?.item?.id
              }
            };
          })
      };
    });

    setDisabled(true);

    postPurchaseMenus(formattedBody, {
      onSuccess: async () => {
        await queryClient.refetchQueries(
          queries.adminCustomerPurchaseMenus._def
        );
        setEditedOrderList([]);
        setDisabled(false);
      }
    });
  }, [editedOrderList, postPurchaseMenus, queryClient]);

  // Params For Time Sections
  const timeSectionsParams = {
    size: 2147483647
  };

  // Fetch Time Sections
  const { isFetching: isFetchingTimeSections } = useGetAdminTimeSections(
    timeSectionsParams,
    {
      select: (data) => {
        return data?.data?.content || [];
      },
      onSuccess: (data) => {
        setTimeSections(data);
      }
    }
  );

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

  const params = {
    size: 2147483647,
    ...filterApplied,
    ...appendQueryParamsFilter(),
    sort: ['requireAt,asc', 'timeSection.typeOrder,asc', 'timeSection.name,asc']
  };

  // Fetch Customer Purchase Menus
  const { isFetching } = useGetAdminCustomerPurchaseMenus(params, {
    enabled: !isFetchingTimeSections,
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
    }
  });

  useEffect(() => {
    if (orderList?.length === 0) return;
    if (!orderList) return;

    const filteredData = orderList?.filter((order) => order?.isEdited);
    setEditedOrderList(filteredData);
  }, [orderList]);

  return (
    <>
      <Grid container xs={12} alignItems="center">
        {isFetching || !isReady ? (
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
          <>
            {listFacilities?.map((facility) => {
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
                  onChangeTotalServe={onChangeTotalServe}
                  onClickPlusMinus={onClickPlusMinus}
                  onChangeTimeSection={onChangeTimeSection}
                  onChangeCourse={onChangeCourse}
                  onChangeProduct={onChangeProduct}
                  onClickAppend={onClickAppend}
                  key={facility?.id}
                />
              );
            })}
          </>
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

      <BottomNavigation onClick={onClickSave} disabled={disabled} />
    </>
  );
};

export default MenuItems;
