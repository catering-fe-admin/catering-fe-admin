import { useState } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import forEach from 'lodash/forEach';
import isEmpty from 'lodash/isEmpty';

import { getTemperatureLocale } from 'src/@core/utils/temperatureUtils';
import queries from 'src/consts/queries';
import {
  useEditAdminItems,
  usePostAdminItems
} from 'src/hooks/api/useAdminItems';

import Allergens from 'components/allergens/Allergens';
import DropdownCourses from 'components/dropdown/DropdownCourses';
import DropdownServes from 'components/dropdown/DropdownServes';
import DropdownSuppliers from 'components/dropdown/DropdownSuppliers';
import DropdownTemperature from 'components/dropdown/DropdownTemperature';
import CustomTextField from 'components/mui/text-field';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';

const itemsLocale = {
  code: '品目CD',
  type: '商品種類',
  name: '品目名',
  course: 'カテゴリー',
  kiloPrice: 'キロ価格',
  kiloOnLot: 'ロット (KG)',
  minKiloOrder: '最低受注数 (KG)',
  unitQtyOnServe: '一人前容量',
  cookMethod: '調理方法',
  deadline: '納期',
  temperature: '温度帯',
  supplier: '仕入先'
};

const ItemsDetail = ({ id, defaultValue = { type: 'NORMAL' } }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [values, setValues] = useState({
    ...defaultValue,
    temperature: getTemperatureLocale(defaultValue?.temperature)
  });
  const [errors, setErrors] = useState({});
  const { mutate: postItems } = usePostAdminItems({ withToastError: false });
  const [disabled, setDisabled] = useState(false);

  const { mutate: editItems } = useEditAdminItems(id, {
    withToastError: false
  });

  const listTypes = [
    {
      label: '献立メニュー',
      value: 'NORMAL'
    },
    {
      label: 'ムース食',
      value: 'MOUSSE'
    },
    {
      label: 'お米',
      value: 'RICE'
    }
  ];

  const getListInputVisibility = () => {
    if (values?.type === 'NORMAL') {
      return [
        'code',
        'type',
        'course',
        'name',
        'unitQtyOnServe',
        'allergens',
        'cookMethod',
        'deadline',
        'temperature',
        'supplier'
      ];
    }

    if (values?.type === 'MOUSSE') {
      return [
        'code',
        'type',
        'course',
        'name',
        'cookMethod',
        'temperature',
        'supplier'
      ];
    }

    if (values?.type === 'RICE') {
      return [
        'code',
        'type',
        'course',
        'name',
        'supplier',
        'kiloPrice',
        'kiloOnLot',
        'minKiloOrder'
      ];
    }
  };

  const listInputVisibility = getListInputVisibility();

  const handleChange = (prop) => (event) => {
    const value = event?.target?.value ?? event;

    const newErrors = { [prop]: '' };
    const newValues = { [prop]: value || '' };

    if (prop == 'type') {
      newErrors.supplier = '';
      newValues.supplier = '';
      defaultValue.supplier = {};
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...newErrors
    }));

    setValues({ ...values, ...newValues });
  };

  const handleChangeAllergens = (event) => {
    const allergenId = event?.target?.value;

    if (values?.allergens?.find((e) => e?.allergen?.id == allergenId)) {
      setValues({
        ...values,
        allergens: values?.allergens?.filter(
          (e) => e?.allergen?.id != allergenId
        )
      });
    } else {
      setValues({
        ...values,
        allergens: [
          ...(values?.allergens || []),
          { allergen: { id: allergenId } }
        ]
      });
    }
  };

  const validateFields = () => {
    const newErrors = {};

    const nonEmptyValues = {
      code: values?.code,
      name: values?.name,
      course: values?.course,
      supplier: values?.supplier
    };

    if (values?.type == 'RICE') {
      nonEmptyValues.kiloPrice = values?.kiloPrice;
    }

    forEach(nonEmptyValues, (value, key) => {
      if (isEmpty(value)) {
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
      name,
      unitQtyOnServe,
      serve,
      cookMethod,
      deadline,
      course,
      supplier,
      temperature,
      allergens,
      type,
      kiloPrice,
      kiloOnLot,
      minKiloOrder
    } = values || {};

    const formattedAllergens = allergens?.map((e) => ({
      allergen: {
        id: e?.allergen?.id
      }
    }));

    const payloadBody = {
      NORMAL: {
        code,
        name,
        unitQtyOnServe: parseFloat(unitQtyOnServe),
        serve: { id: serve?.id },
        cookMethod,
        deadline,
        course: { id: course?.id },
        supplier: { id: supplier?.id },
        temperature: getTemperatureLocale(temperature, 'id'),
        type,
        allergens: formattedAllergens,

        // hidden input
        kiloPrice: 0,
        kiloOnLot: 0,
        minKiloOrder: 0
      },
      MOUSSE: {
        code,
        name,
        cookMethod,
        course: { id: course?.id },
        supplier: { id: supplier?.id },
        temperature: getTemperatureLocale(temperature, 'id'),
        type,

        // hidden input
        allergens: [],
        kiloPrice: 0,
        kiloOnLot: 0,
        minKiloOrder: 0,
        deadline: '',
        unitQtyOnServe: null,
        serve: {}
      },
      RICE: {
        code,
        name,
        supplier: { id: supplier?.id },
        type,
        course: { id: course?.id },
        kiloPrice,
        kiloOnLot,
        minKiloOrder,

        // hidden input
        cookMethod: '',
        deadline: '',
        temperature: '',
        allergens: [],
        unitQtyOnServe: null,
        serve: {}
      }
    };

    const formattedValues = payloadBody[values?.type];

    const mutateFn = id ? editItems : postItems;
    setDisabled(true);
    mutateFn(formattedValues, {
      onSuccess: () => {
        setDisabled(false);
        queryClient.removeQueries(queries.adminItems._def);
        router.push('/items');
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
            {listInputVisibility?.includes('code') && (
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
            )}

            {/* Type */}
            {listInputVisibility?.includes('type') && (
              <Grid item lg={6} md={12} xs={12}>
                {itemsLocale.type}
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}
                >
                  {listTypes.map((type, index) => (
                    <Box
                      sx={{ display: 'flex', alignItems: 'center' }}
                      key={index}
                    >
                      <Checkbox
                        checked={values?.type === type.value}
                        onClick={() => handleChange('type')(type.value)}
                      />
                      {type.label}
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}

            {/* Category ( Courses ) */}
            {listInputVisibility?.includes('course') && (
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <DropdownCourses
                    error={!isEmpty(errors?.course)}
                    helperText={errors?.course ?? ''}
                    defaultValue={defaultValue?.course}
                    value={values?.course}
                    onChange={handleChange('course')}
                    label={itemsLocale.course}
                  />
                </Grid>
              </Grid>
            )}

            {/* Name */}
            {listInputVisibility?.includes('name') && (
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    error={!isEmpty(errors?.name)}
                    helperText={errors?.name ?? ''}
                    fullWidth
                    type="text"
                    label={itemsLocale.name}
                    value={values?.name}
                    id="name"
                    onChange={handleChange('name')}
                  />
                </Grid>
              </Grid>
            )}

            {listInputVisibility?.includes('kiloPrice') && (
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    error={!isEmpty(errors?.kiloPrice)}
                    helperText={errors?.kiloPrice ?? ''}
                    fullWidth
                    type="number"
                    label={itemsLocale.kiloPrice}
                    value={values?.kiloPrice}
                    id="kiloPrice"
                    onChange={handleChange('kiloPrice')}
                  />
                </Grid>
              </Grid>
            )}

            {listInputVisibility?.includes('kiloOnLot') && (
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label={itemsLocale.kiloOnLot}
                    value={values?.kiloOnLot}
                    id="kiloOnLot"
                    onChange={handleChange('kiloOnLot')}
                  />
                </Grid>
              </Grid>
            )}

            {listInputVisibility?.includes('minKiloOrder') && (
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label={itemsLocale.minKiloOrder}
                    value={values?.minKiloOrder}
                    id="minKiloOrder"
                    onChange={handleChange('minKiloOrder')}
                  />
                </Grid>
              </Grid>
            )}

            {/* Serve Capacity */}
            {listInputVisibility?.includes('unitQtyOnServe') && (
              <Grid
                container
                item
                direction="row"
                spacing={5}
                alignItems="flex-end"
              >
                <Grid item lg={3} md={6} xs={6}>
                  <CustomTextField
                    fullWidth
                    type="number"
                    label={itemsLocale.unitQtyOnServe}
                    value={values?.unitQtyOnServe}
                    id="unitQtyOnServe"
                    onChange={handleChange('unitQtyOnServe')}
                  />
                </Grid>
                <Grid item lg={3} md={6} xs={6}>
                  <DropdownServes
                    defaultValue={defaultValue?.serve}
                    value={values?.serve}
                    onChange={handleChange('serve')}
                  />
                </Grid>
              </Grid>
            )}

            {/* Allergen */}
            {listInputVisibility?.includes('allergens') && (
              <Grid container item direction="row">
                <Allergens
                  value={values?.allergens}
                  onChange={handleChangeAllergens}
                />
              </Grid>
            )}

            {/* Cook Method */}
            {listInputVisibility?.includes('cookMethod') && (
              <Grid container item direction="row">
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    multiline
                    rows={9}
                    type="text"
                    label={itemsLocale.cookMethod}
                    value={values?.cookMethod}
                    id="cookMethod"
                    onChange={handleChange('cookMethod')}
                  />
                </Grid>
              </Grid>
            )}

            {/* Deadline */}
            {listInputVisibility?.includes('deadline') && (
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label={itemsLocale.deadline}
                    value={values?.deadline}
                    id="deadline"
                    onChange={handleChange('deadline')}
                  />
                </Grid>
              </Grid>
            )}

            {/* Temperature */}
            {listInputVisibility?.includes('temperature') && (
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <DropdownTemperature
                    defaultValue={getTemperatureLocale(
                      defaultValue?.temperature
                    )}
                    value={values?.temperature}
                    onChange={handleChange('temperature')}
                    label={itemsLocale.temperature}
                  />
                </Grid>
              </Grid>
            )}

            {/* Supplier */}
            {listInputVisibility?.includes('supplier') && (
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <DropdownSuppliers
                    withAdditionalParams
                    additionalParams={{
                      type: values?.type
                    }}
                    error={!isEmpty(errors?.supplier)}
                    helperText={errors?.supplier ?? ''}
                    defaultValue={defaultValue?.supplier}
                    value={values?.supplier}
                    onChange={handleChange('supplier')}
                    label={itemsLocale.supplier}
                  />
                </Grid>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button type="submit" variant="contained" disabled={disabled}>
                登録
              </Button>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  );
};

export default ItemsDetail;
