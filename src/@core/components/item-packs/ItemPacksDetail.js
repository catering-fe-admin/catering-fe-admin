import { useState } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';

import queries from 'src/consts/queries';
import {
  useEditAdminItemPacks,
  usePostAdminItemPacks
} from 'src/hooks/api/useAdminItemPacks';

import DropdownCourses from 'components/dropdown/DropdownCourses';
import DropdownItems from 'components/dropdown/DropdownItems';
import CustomTextField from 'components/mui/text-field';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ItemPacksShipping from './ItemPacksShipping';

const itemsLocale = {
  code: '品目パックCD',
  course: '品目CD',
  item: '品目名',
  packQtyOnBox: 'パック数',
  unitQtyOnPack: '入数',
  packPrice: '1パック単価',
  unitPrice: '1食単価',
  minUnitQtyAlaCarte: '理論在庫が',
  unitPriceAlaCarte: '売価',
  isAlaCarteAllowed: '単品販売'
};

const initialValue = {
  code: '',
  course: '',
  item: '',
  packQtyOnBox: '',
  unitQtyOnPack: '',
  packPrice: '',
  unitPrice: '',
  minUnitQtyAlaCarte: '',
  unitPriceAlaCarte: '',
  isAlaCarteAllowed: 'notAllow'
};

const ItemPacksDetail = ({ id, defaultValue }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [values, setValues] = useState(defaultValue ?? initialValue);
  const [errors, setErrors] = useState({});
  const { mutate: postItemPacks } = usePostAdminItemPacks({
    withToastError: false
  });

  const { mutate: editItemPacks } = useEditAdminItemPacks(id, {
    withToastError: false
  });
  const [disabled, setDisabled] = useState(false);

  const handleChange = (prop) => (event) => {
    const value = event?.target?.value ?? event;

    setErrors((prevErrors) => ({
      ...prevErrors,
      [prop]: ''
    }));

    setValues({ ...values, [prop]: value });
  };

  const validateFields = () => {
    const newErrors = {};

    const nonEmptyValues = {
      code: values?.code,
      course: values?.course,
      item: values?.item,
      packQtyOnBox: values?.packQtyOnBox,
      unitQtyOnPack: values?.unitQtyOnPack,
      packPrice: values?.packPrice,
      unitPrice: values?.unitPrice,
      unitPriceAlaCarte: values?.unitPriceAlaCarte
    };

    forEach(nonEmptyValues, (value, key) => {
      if (value == null || value == '') {
        newErrors[key] = `${itemsLocale[key]}は必須です。`;
      }
    });

    setErrors(newErrors);

    return isEmpty(newErrors);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isValid = validateFields();
    if (!isValid) return;

    const {
      code,
      unitPrice,
      packPrice,
      unitQtyOnPack,
      packQtyOnBox,
      minUnitQtyAlaCarte,
      isAlaCarteAllowed,
      item,
      unitPriceAlaCarte
    } = values || {};

    const formattedValues = {
      code,
      unitPrice,
      packPrice,
      unitQtyOnPack,
      packQtyOnBox,
      minUnitQtyAlaCarte,
      unitPriceAlaCarte,
      isAlaCarteAllowed: isAlaCarteAllowed == 'allow' ? true : false,
      item: { id: item?.id }
    };

    const mutateFn = id ? editItemPacks : postItemPacks;

    setDisabled(true);
    mutateFn(formattedValues, {
      onSuccess: () => {
        setDisabled(false);
        queryClient.removeQueries(queries.adminItemPacks._def);
        router.push('/item-packs');
      },
      onError: (error) => {
        setDisabled(false);
        if (
          error?.response?.data?.errors ===
          'EXCEPTION.VALIDATION.CODE.DUPLICATE'
        ) {
          setErrors((err) => ({ ...err, code: '品目CDは複製できません' }));
        }
      }
    });
  };

  return (
    <Card>
      <CardHeader title="品目マスター　詳細ページ" />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container spacing={5} direction="column">
            {/* Code */}
            <Grid container item direction="row">
              <Grid item lg={6} md={12} xs={12}>
                <CustomTextField
                  error={!isEmpty(errors?.code)}
                  helperText={errors?.code ?? ''}
                  fullWidth
                  type="text"
                  label={itemsLocale.code}
                  value={values?.code}
                  id="code"
                  onChange={handleChange('code')}
                />
              </Grid>
            </Grid>

            {/* Item Code A.K.A Course */}
            <Grid container item direction="row">
              <Grid item lg={6} md={12} xs={12}>
                <DropdownCourses
                  error={!isEmpty(errors?.course)}
                  helperText={errors?.course ?? ''}
                  defaultValue={defaultValue?.course}
                  value={values?.course}
                  onChange={handleChange('course')}
                  label={itemsLocale.course}
                  additionalParams={{ type: 'NORMAL' }}
                />
              </Grid>
            </Grid>

            {/* Item Name A.K.A admin/items */}
            <Grid container item direction="row">
              <Grid item lg={6} md={12} xs={12}>
                <DropdownItems
                  error={!isEmpty(errors?.item)}
                  helperText={errors?.item ?? ''}
                  withAdditionalParams
                  additionalParams={
                    (values?.course?.id && { courseId: values?.course?.id },
                    { type: 'NORMAL' })
                  }
                  defaultValue={defaultValue?.item}
                  value={values?.item}
                  onChange={handleChange('item')}
                  label={itemsLocale.item}
                />
              </Grid>
            </Grid>

            {/* Total Qty on Box & Qty */}
            <Grid container item spacing={5} direction="row">
              <Grid
                container
                item
                spacing={5}
                lg={6}
                md={12}
                xs={12}
                direction="row"
                alignItems="flex-end"
              >
                <Grid item lg={10.5} md={11} xs={11}>
                  <CustomTextField
                    error={!isEmpty(errors?.packQtyOnBox)}
                    helperText={errors?.packQtyOnBox ?? ''}
                    fullWidth
                    type="text"
                    label={itemsLocale.packQtyOnBox}
                    value={values?.packQtyOnBox}
                    id="packQtyOnBox"
                    onChange={handleChange('packQtyOnBox')}
                  />
                </Grid>
                <Grid item marginBottom="7.5px" lg={1.5} md={1} xs={1}>
                  <Typography variant="body2">人前</Typography>
                </Grid>
              </Grid>

              <Grid
                container
                item
                spacing={5}
                lg={6}
                md={12}
                xs={12}
                direction="row"
                alignItems="flex-end"
              >
                <Grid item lg={10.5} md={11} xs={11}>
                  <CustomTextField
                    error={!isEmpty(errors?.unitQtyOnPack)}
                    helperText={errors?.unitQtyOnPack ?? ''}
                    fullWidth
                    type="text"
                    label={itemsLocale.unitQtyOnPack}
                    value={values?.unitQtyOnPack}
                    id="unitQtyOnPack"
                    onChange={handleChange('unitQtyOnPack')}
                  />
                </Grid>
                <Grid item marginBottom="7.5px" lg={1.5} md={1} xs={1}>
                  <Typography variant="body2">パック</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* unitPrice & total unitPrice */}
            <Grid container item spacing={5} direction="row">
              <Grid
                container
                item
                spacing={5}
                lg={6}
                md={12}
                xs={12}
                direction="row"
                alignItems="flex-end"
              >
                <Grid item lg={10.5} md={11} xs={11}>
                  <CustomTextField
                    error={!isEmpty(errors?.packPrice)}
                    helperText={errors?.packPrice ?? ''}
                    fullWidth
                    type="text"
                    label={itemsLocale.packPrice}
                    value={values?.packPrice}
                    id="packPrice"
                    onChange={handleChange('packPrice')}
                  />
                </Grid>
                <Grid item marginBottom="7.5px" lg={1.5} md={1} xs={1}>
                  <Typography variant="body2">円</Typography>
                </Grid>
              </Grid>

              <Grid
                container
                item
                spacing={5}
                lg={6}
                md={12}
                xs={12}
                direction="row"
                alignItems="flex-end"
              >
                <Grid item lg={10.5} md={11} xs={11}>
                  <CustomTextField
                    error={!isEmpty(errors?.unitPrice)}
                    helperText={errors?.unitPrice ?? ''}
                    fullWidth
                    type="text"
                    label={itemsLocale.unitPrice}
                    value={values?.unitPrice}
                    id="unitPrice"
                    onChange={handleChange('unitPrice')}
                  />
                </Grid>
                <Grid item marginBottom="7.5px" lg={1.5} md={1} xs={1}>
                  <Typography variant="body2">円</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* isAlaCarteAllowed & unitPriceAlaCarte*/}
            <Grid container item spacing={5} direction="row">
              {values?.course?.type !== 'MOUSSE' && (
                <Grid container item lg={6} md={12} xs={12}>
                  <Grid item xs={12}>
                    <Typography variant="body2">
                      {itemsLocale.isAlaCarteAllowed}
                    </Typography>
                  </Grid>
                  <Grid container item xs={12}>
                    <Grid item>
                      <FormGroup
                        row
                        value={values?.isAlaCarteAllowed}
                        aria-label="isAlaCarteAllowed"
                        name="isAlaCarteAllowed"
                        onChange={handleChange('isAlaCarteAllowed')}
                      >
                        <FormControlLabel
                          label="単品販売を行う"
                          value="allow"
                          alignItems="flex-end"
                          control={
                            <Checkbox
                              checked={values?.isAlaCarteAllowed == 'allow'}
                            />
                          }
                        />
                        <FormControlLabel
                          label="短品販売を行わない"
                          value="notAllow"
                          control={
                            <Checkbox
                              checked={values?.isAlaCarteAllowed == 'notAllow'}
                            />
                          }
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              <Grid
                container
                item
                spacing={5}
                lg={6}
                md={12}
                xs={12}
                direction="row"
                alignItems="flex-end"
              >
                <Grid item lg={10.5} md={11} xs={11}>
                  <CustomTextField
                    error={!isEmpty(errors?.unitPriceAlaCarte)}
                    helperText={errors?.unitPriceAlaCarte ?? ''}
                    fullWidth
                    type="text"
                    label={itemsLocale.unitPriceAlaCarte}
                    value={values?.unitPriceAlaCarte}
                    id="unitPriceAlaCarte"
                    onChange={handleChange('unitPriceAlaCarte')}
                  />
                </Grid>
                <Grid item marginBottom="7.5px" lg={1.5} md={1} xs={1}>
                  <Typography variant="body2">円</Typography>
                </Grid>
              </Grid>
            </Grid>

            {/* minUnitQtyAlaCarte */}
            {values?.course?.type !== 'MOUSSE' && (
              <Grid item xs={4}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  <CustomTextField
                    type="text"
                    label={itemsLocale.minUnitQtyAlaCarte}
                    value={values?.minUnitQtyAlaCarte}
                    id="minUnitQtyAlaCarte"
                    onChange={handleChange('minUnitQtyAlaCarte')}
                  />
                  <Typography variant="body2">
                    以上の場合は単品販売を行う
                  </Typography>
                </Box>
              </Grid>
            )}

            <Grid container item xs={12} justifyContent="center">
              <Grid item>
                <Button type="submit" variant="contained" disabled={disabled}>
                  登録
                </Button>
              </Grid>
            </Grid>

            {values?.course?.type !== 'MOUSSE' && (
              <ItemPacksShipping
                itemPackId={values?.id}
                inventory={values?.inventory}
              />
            )}
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ItemPacksDetail;
