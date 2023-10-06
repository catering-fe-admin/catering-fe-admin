import { useState } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import upperCase from 'lodash/upperCase';

import queries from 'src/consts/queries';
import {
  useEditAdminSuppliers,
  usePostAdminSuppliers
} from 'src/hooks/api/useAdminSuppliers';

import CustomTextField from 'components/mui/text-field';
import SupplierPurchaseOrderDetail from 'components/supplier-purchase-order/SupplierPurchaseOrderDetail';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

import DropdownClosingType from '../dropdown/DropdownClosingType';
import DropdownPaymentType from '../dropdown/DropdownPaymentType';
import DropdownPrefectures from '../dropdown/DropdownPrefectures';
import RiceDeliveryDate from './RiceDeliveryDate';
import SupplierDeliveryDate from './SupplierDeliveryDate';
import SupplierInformation from './SupplierInformation';

const initialValues = {
  name: '',
  address: '',
  postalCode: '',
  telephone: '',
  fax: '',
  pic: '',
  deliveryDay: '',
  prefecture: {},
  type: 'NORMAL',
  paymentType: '',
  closingType: {},
  delivery: '0000000'
};

const initialSupplierInformation = [
  {
    name: '',
    address: '',
    postalCode: '',
    telephone: '',
    fax: '',
    pic: ''
  }
];

const SupplierDetail = ({ isEdit, defaultValues }) => {
  const router = useRouter();
  const type = router.query.type;

  const queryClient = useQueryClient();

  const [values, setValues] = useState(isEdit ? defaultValues : initialValues);
  const [supplierInformation, setSupplierInformation] = useState(
    isEdit ? defaultValues?.points : initialSupplierInformation
  );
  const [disabled, setDisabled] = useState(false);

  const { mutate: createSuppliers } = usePostAdminSuppliers();
  const { mutate: editSuppliers } = useEditAdminSuppliers(defaultValues?.id);

  const handleChange = (prop) => (event) => {
    const value = event?.target?.value ?? event;

    setValues({ ...values, [prop]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formattedValues = {
      ...values,
      type: upperCase(type),
      prefecture: {
        id: values.prefecture.id
      },
      closingType: values?.closingType?.id,
      paymentType: values?.paymentType?.id,
      points: [...supplierInformation]
    };

    const mutateFn = isEdit ? editSuppliers : createSuppliers;
    setDisabled(true);
    mutateFn(formattedValues, {
      onSuccess: () => {
        setDisabled(false);
        queryClient.removeQueries(queries.adminSuppliers._def);
        router.push(`/supplier/${type}`);
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader title="仕入先ー　詳細ページ" />
        <CardContent>
          <form onSubmit={onSubmit}>
            <Grid container xs={12} spacing={5} direction="column">
              {/* Code */}
              {isEdit && (
                <Grid container item direction="row">
                  <Grid item lg={6} md={12} xs={12}>
                    <CustomTextField
                      fullWidth
                      type="text"
                      label="仕入先CD"
                      value={values?.code}
                      id="code"
                      disabled
                    />
                  </Grid>
                </Grid>
              )}

              {/* Supplier Name */}
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="仕入先名"
                    value={values?.name}
                    id="name"
                    onChange={handleChange('name')}
                  />
                </Grid>
              </Grid>

              {/* Prefectures */}
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <DropdownPrefectures
                    defaultValue={defaultValues?.prefecture}
                    value={values?.prefecture}
                    onChange={handleChange('prefecture')}
                  />
                </Grid>
              </Grid>

              {/* Postal Code */}
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    type="text"
                    label="〒"
                    value={values?.postalCode}
                    id="postalCode"
                    onChange={handleChange('postalCode')}
                  />
                </Grid>
              </Grid>

              {/* Address */}
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="住所"
                    value={values?.address}
                    id="address"
                    onChange={handleChange('address')}
                  />
                </Grid>
              </Grid>

              {/* Telephone and Fax Number */}
              <Grid container item direction="row" spacing={5}>
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="電話番号"
                    value={values?.telephone}
                    id="telephone"
                    onChange={handleChange('telephone')}
                  />
                </Grid>
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="FAX番号"
                    value={values?.fax}
                    id="fax"
                    onChange={handleChange('fax')}
                  />
                </Grid>
              </Grid>

              {/* Name Person */}
              <Grid container item direction="row">
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="担当者名"
                    value={values?.pic}
                    id="pic"
                    onChange={handleChange('pic')}
                  />
                </Grid>
              </Grid>

              {/* Telephone and Fax Number */}
              <Grid container item direction="row" spacing={5}>
                <Grid item lg={4} md={12} xs={12}>
                  <DropdownClosingType
                    defaultValue={defaultValues?.closingType}
                    value={values?.closingType}
                    onChange={handleChange('closingType')}
                  />
                </Grid>
                <Grid item lg={4} md={12} xs={12}>
                  <DropdownPaymentType
                    defaultValue={defaultValues?.paymentType}
                    value={values?.paymentType}
                    onChange={handleChange('paymentType')}
                  />
                </Grid>
                <Grid item lg={4} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="number"
                    label="納品リードタイム"
                    value={values?.deliveryDay}
                    id="deliveryDay"
                    onChange={handleChange('deliveryDay')}
                  />
                </Grid>
              </Grid>

              {type === 'rice' && (
                <RiceDeliveryDate values={values} setValues={setValues} />
              )}
            </Grid>

            <SupplierInformation
              initialSupplierInformation={initialSupplierInformation}
              supplierInformation={supplierInformation}
              setSupplierInformation={setSupplierInformation}
              type={type}
            />

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

      {isEdit && type === 'mousse' && (
        <SupplierDeliveryDate supplierId={defaultValues?.id} />
      )}

      {isEdit && <SupplierPurchaseOrderDetail supplierId={values?.id} />}
    </>
  );
};

export default SupplierDetail;
