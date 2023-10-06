import { useState } from 'react';
import DatePicker from 'react-datepicker';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import cloneDeep from 'lodash/cloneDeep';
import { v4 as uuidv4 } from 'uuid';

import Icon from 'src/@core/components/icon';
import Repeater from 'src/@core/components/repeater';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import queries from 'src/consts/queries';
import {
  useEditAdminMenus,
  usePostAdminMenus
} from 'src/hooks/api/useAdminMenus';

import CustomTextField from 'components/mui/text-field';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

import DropdownCourses from '../dropdown/DropdownCourses';
import DropdownItems from '../dropdown/DropdownItems';
import DropdownTimeSection from '../dropdown/DropdownTimeSection';

const initialValues = {
  date: '',
  timeSection: {},
  items: [{ uuid: uuidv4() }]
};

const RepeatingContent = styled(Grid)(({ theme }) => ({
  paddingRight: 0,
  display: 'flex',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  '& .col-title': {
    top: '-2.375rem',
    position: 'absolute'
  },
  [theme.breakpoints.down('md')]: {
    '& .col-title': {
      top: '0',
      position: 'relative'
    }
  }
}));

const ActionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-center',
  alignItems: 'center',
  padding: theme.spacing(2, 1),
  borderLeft: `1px solid ${theme.palette.divider}`
}));

const MenuDetail = ({ isEdit, defaultValues }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [values, setValues] = useState(isEdit ? defaultValues : initialValues);

  const { mutate: createMenus } = usePostAdminMenus();
  const { mutate: editMenus } = useEditAdminMenus(defaultValues?.id);
  const [disabled, setDisabled] = useState(false);

  const handleChange = (prop) => (event) => {
    const value = prop == 'date' ? event : event?.target?.value ?? event;

    setValues({ ...values, [prop]: value });
  };

  const handleChangeItems = (key, value, index) => {
    const newValues = cloneDeep(values);

    const newItem = {
      ...values.items[index],
      [key]: value
    };

    newValues.items[index] = newItem;

    setValues(newValues);
  };

  const appendItems = () => {
    const newValues = cloneDeep(values);
    const newItems = [...newValues.items, { uuid: uuidv4() }];
    newValues.items = newItems;
    setValues(newValues);
  };

  const removeItems = (removeIndex) => {
    const newValues = cloneDeep(values);
    const newItems = cloneDeep(newValues.items);
    newItems.splice(removeIndex, 1);
    newValues.items = newItems;
    setValues(newValues);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formattedItems = values?.items?.map((item) => {
      return {
        item: {
          id: item?.item?.id
        }
      };
    });

    const formattedValues = {
      date: dayjs(values?.date).format('YYYY-MM-DD'),
      timeSection: {
        id: values?.timeSection?.id
      },
      items: formattedItems
    };

    const mutateFn = isEdit ? editMenus : createMenus;

    setDisabled(true);
    mutateFn(formattedValues, {
      onSuccess: () => {
        setDisabled(false);
        queryClient.removeQueries(queries.adminMenus._def);
        router.push('/menu');
      }
    });
  };

  return (
    <Card>
      <CardHeader title={isEdit ? '詳細ページ' : '献立登録'} />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container xs={12} md={3} spacing={5} direction="column">
            <Grid item lg={6} md={12} xs={12}>
              <DatePickerWrapper>
                <DatePicker
                  isClearable
                  selected={values?.date}
                  showYearDropdown
                  showMonthDropdown
                  placeholderText="YYYY/MM/DD"
                  dateFormat="yyyy/MM/dd"
                  customInput={
                    <CustomTextField
                      fullWidth
                      label="年月日"
                      autoComplete="off"
                    />
                  }
                  id="date"
                  onChange={handleChange('date')}
                  clearIcon={
                    <IconButton edge="end" onClick={handleChange('date')}>
                      <Icon fontSize="1.25rem" icon="ic:baseline-clear" />
                    </IconButton>
                  }
                />
              </DatePickerWrapper>
            </Grid>

            <Grid item lg={6} md={12} xs={12}>
              <DropdownTimeSection
                defaultValue={values?.timeSection}
                value={values?.timeSection}
                onChange={handleChange('timeSection')}
              />
            </Grid>
          </Grid>

          <Box sx={{ marginTop: '24px' }}>
            <Repeater count={values?.items?.length}>
              {(i) => {
                const Tag = i === 0 ? Box : Collapse;

                return (
                  <Tag
                    key={values?.items?.[i]?.uuid}
                    className="repeater-wrapper"
                    {...(i !== 0 ? { in: true } : {})}
                    sx={{ marginTop: '8px' }}
                  >
                    <Grid container>
                      <RepeatingContent item xs={12}>
                        <Grid
                          container
                          sx={{ py: 4, width: '100%', pr: { lg: 0, xs: 4 } }}
                        >
                          <Grid
                            item
                            lg={6}
                            md={5}
                            xs={12}
                            sx={{ px: 4, my: { lg: 0, xs: 2 } }}
                          >
                            <DropdownCourses
                              defaultValue={values?.items?.[i]?.course}
                              value={values?.items?.[i]?.course}
                              onChange={(newValue) =>
                                handleChangeItems('course', newValue, i)
                              }
                              label="カテゴリー"
                            />
                          </Grid>
                          <Grid
                            item
                            lg={2}
                            md={3}
                            xs={12}
                            sx={{ px: 4, my: { lg: 0, xs: 2 } }}
                          >
                            <DropdownItems
                              withParams
                              params={
                                values?.items?.[i]?.course?.id && {
                                  courseId: values?.items?.[i]?.course?.id
                                }
                              }
                              defaultValue={values?.items?.[i]?.item}
                              value={values?.items?.[i]?.item}
                              onChange={(newValue) =>
                                handleChangeItems('item', newValue, i)
                              }
                              label="品目CD"
                              selectorSelectedKey="code"
                            />
                          </Grid>
                          <Grid
                            item
                            lg={3}
                            md={3}
                            xs={12}
                            sx={{ px: 4, my: { lg: 0, xs: 2 } }}
                          >
                            <CustomTextField
                              fullWidth
                              type="text"
                              label="品目名"
                              value={values?.items?.[i]?.item?.name}
                              disabled
                            />
                          </Grid>
                        </Grid>
                        <ActionContainer>
                          <Tooltip title="Remove">
                            <IconButton size="small" onClick={removeItems}>
                              <Icon icon="tabler:x" fontSize="1.25rem" />
                            </IconButton>
                          </Tooltip>
                        </ActionContainer>
                      </RepeatingContent>
                    </Grid>
                  </Tag>
                );
              }}
            </Repeater>

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '24px'
              }}
            >
              <Tooltip title="Add">
                <IconButton
                  color="success"
                  variant="contained"
                  onClick={appendItems}
                >
                  <Icon icon="ep:circle-plus-filled" fontSize={50} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          <Button
            type="submit"
            variant="contained"
            style={{ marginTop: '1.5rem' }}
            disabled={disabled}
          >
            登録
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default MenuDetail;
