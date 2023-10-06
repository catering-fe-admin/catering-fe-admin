import { useState } from 'react';

import { useRouter } from 'next/router';

import { useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';

import queries from 'src/consts/queries';
import {
  useEditAdminCustomers,
  usePostAdminCustomers
} from 'src/hooks/api/useAdminCustomers';

import CustomTextField from 'components/mui/text-field';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';

import ListCustomersFacilities from '../customers-facilities/ListCustomersFacilities';
import DropdownPrefectures from '../dropdown/DropdownPrefectures';
import CustomersInformation from './CustomersInformation';

const initialValues = {
  name: '',
  address: '',
  postalCode: '',
  telephone: '',
  fax: '',
  prefecture: {},
  picLead: '',
  picFirst: '',
  picSecond: '',
  picThird: ''
};

const initialBillings = [
  {
    name: '',
    address: '',
    postalCode: '',
    telephone: '',
    fax: ''
  }
];

const CustomersDetail = ({ isEdit, defaultValues }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [values, setValues] = useState(isEdit ? defaultValues : initialValues);

  const [billings, setBillings] = useState(
    isEdit ? defaultValues?.billings : initialBillings
  );
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  const { mutate: createCustomers } = usePostAdminCustomers();
  const { mutate: editCustomers } = useEditAdminCustomers(defaultValues?.id);

  const handleChange = (prop) => (event) => {
    const value = event?.target?.value ?? event;

    setValues({ ...values, [prop]: value });
  };

  const validateFields = () => {
    const newErrors = {};
    const billingsErrors = {};

    billings?.forEach((billing, index) => {
      if (isEmpty(billing?.name)) {
        billingsErrors[`billings[${index}].name`] = '請求宛名は必須です。';
      }
    });

    setErrors({ ...newErrors, ...billingsErrors });

    return isEmpty({ ...newErrors, ...billingsErrors });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const isValid = validateFields();
    if (!isValid) return;

    setDisabled(true);
    const body = {
      ...values,
      prefecture: {
        id: values.prefecture.id
      },
      billings
    };

    const mutateFn = isEdit ? editCustomers : createCustomers;

    mutateFn(body, {
      onSuccess: () => {
        queryClient.removeQueries(queries.adminPrefectures._def);
        router.push('/customers');
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader title="新規顧客登録" />
        <CardContent>
          <form onSubmit={onSubmit}>
            <Grid container spacing={5}>
              {/* Code */}
              {isEdit && (
                <Grid item xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="顧客CD"
                    value={values?.code}
                    id="code"
                    disabled
                  />
                </Grid>
              )}

              {/* Customer Name */}
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="text"
                  label="顧客名"
                  value={values?.name}
                  id="name"
                  onChange={handleChange('name')}
                />
              </Grid>

              {/* Prefectures */}
              <Grid item xs={12}>
                <DropdownPrefectures
                  defaultValue={defaultValues?.prefecture}
                  value={values?.prefecture}
                  onChange={handleChange('prefecture')}
                />
              </Grid>

              {/* Postal Code */}
              <Grid item xs={12}>
                <CustomTextField
                  type="text"
                  label="〒"
                  value={values?.postalCode}
                  id="postalCode"
                  onChange={handleChange('postalCode')}
                />
              </Grid>

              {/* Address */}
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="text"
                  label="住所"
                  value={values?.address}
                  id="address"
                  onChange={handleChange('address')}
                />
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

              {/* Pic Lead  */}
              <Grid item xs={12}>
                <CustomTextField
                  fullWidth
                  type="text"
                  label="代表者名"
                  value={values?.picLead}
                  id="picLead"
                  onChange={handleChange('picLead')}
                />
              </Grid>

              {/* Person 1 - 3 */}
              <Grid container item direction="row" spacing={5}>
                <Grid item lg={4} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="担当者名1"
                    value={values?.picFirst}
                    id="picFirst"
                    onChange={handleChange('picFirst')}
                  />
                </Grid>
                <Grid item lg={4} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="担当者名2"
                    value={values?.picSecond}
                    id="picSecond"
                    onChange={handleChange('picSecond')}
                  />
                </Grid>
                <Grid item lg={4} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="担当者名3"
                    value={values?.picThird}
                    id="picThird"
                    onChange={handleChange('picThird')}
                  />
                </Grid>
              </Grid>
            </Grid>

            <CustomersInformation
              initialBillings={initialBillings}
              errors={errors}
              setErrors={setErrors}
              billings={billings}
              setBillings={setBillings}
            />

            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" disabled={disabled}>
                  保存
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {isEdit && <ListCustomersFacilities />}
    </>
  );
};

export default CustomersDetail;
