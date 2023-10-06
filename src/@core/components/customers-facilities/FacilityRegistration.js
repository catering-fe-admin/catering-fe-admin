import React from 'react';
import DatePicker from 'react-datepicker';

import Link from 'next/link';

import dayjs from 'dayjs';
import isEmpty from 'lodash/isEmpty';

import Icon from 'src/@core/components/icon';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import { useGetAdminCustomersDetail } from 'src/hooks/api/useAdminCustomers';
import { useResetPasswordAdminCustomersFacilities } from 'src/hooks/api/useAdminCustomersFacilities';

import CustomTextField from 'components/mui/text-field';

import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import DropdownDeliveryFrequency from '../dropdown/DropdownDeliveryFrequency';
import DropdownFacilityKinds from '../dropdown/DropdownFacilityKinds';
import DropdownPrefectures from '../dropdown/DropdownPrefectures';
import DropdownSuppliers from '../dropdown/DropdownSuppliers';
import DropdownWarehouses from '../dropdown/DropdownWarehouses';

const FacilityRegistration = ({
  values,
  setValues,
  handleChange,
  customerId,
  customerFacilityId,
  isEdit,
  defaultValues,
  errors,
  setShowDialog,
  setCustomerAccount
}) => {
  const { mutate: resetPassword } =
    useResetPasswordAdminCustomersFacilities(customerFacilityId);

  const { data } = useGetAdminCustomersDetail(customerId, {
    enabled: !!customerId
  });

  const arrayRiceDelivery = values.riceDelivery.split('');

  const onChangeRiceDelivery = (index, isChecked) => {
    const arrayRiceDelivery = values.riceDelivery.split('');
    arrayRiceDelivery[index] = isChecked ? '1' : '0';

    const stringRiceDelivery = arrayRiceDelivery.join('');

    setValues({ ...values, riceDelivery: stringRiceDelivery });
  };

  const onClickResetPassword = () => {
    resetPassword(null, {
      onSuccess: (data) => {
        setShowDialog(true);
        setCustomerAccount({
          username: data?.data?.username,
          password: data?.data?.password,
          message: 'Password reset successful'
        });
      }
    });
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '24px'
        }}
      >
        <Typography variant="h5" sx={{ paddingLeft: '24px' }}>
          施設登録
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link href={`/menu-order?customerFacilityId=${customerFacilityId}`}>
            <Button variant="contained" color="info">
              献立注文
            </Button>
          </Link>

          {/* Mousse Order */}
          <Link
            href={`/single-order/mousse/customer/${customerId}/facilities/${customerFacilityId}`}
          >
            <Button variant="contained" color="info">
              ムース注文
            </Button>
          </Link>

          {/* Single Item Menu Order */}
          <Link
            href={`/single-order/normal/customer/${customerId}/facilities/${customerFacilityId}`}
          >
            <Button variant="contained" color="info">
              単品注文
            </Button>
          </Link>

          {/* Rice Order */}
          <Link
            href={`/single-order/rice/customer/${customerId}/facilities/${customerFacilityId}`}
          >
            <Button variant="contained" color="info">
              お米注文
            </Button>
          </Link>
        </Box>
      </Box>

      {isEdit && (
        <>
          <Grid item lg={6} md={12} xs={12}>
            <CustomTextField
              fullWidth
              type="text"
              label="顧客CD"
              value={data?.data?.code}
              id="code"
              disabled
            />
          </Grid>

          <Grid item lg={6} md={12} xs={12}>
            <CustomTextField
              fullWidth
              type="text"
              label="施設CD"
              value={values?.code}
              id="code"
              disabled
            />
          </Grid>
        </>
      )}

      <Grid item lg={6} md={12} xs={12}>
        <CustomTextField
          error={!isEmpty(errors?.name)}
          helperText={errors?.name ?? ''}
          fullWidth
          type="text"
          label="施設名"
          value={values?.name}
          id="name"
          onChange={handleChange('name')}
        />
      </Grid>

      <Grid item lg={6} md={12} xs={12}>
        <DropdownFacilityKinds
          error={!isEmpty(errors?.kind)}
          helperText={errors?.kind ?? ''}
          defaultValue={defaultValues?.kind}
          value={values?.kind}
          onChange={handleChange('kind')}
        />
      </Grid>

      <Grid container item direction="row" spacing={5}>
        <Grid item md={12} xs={12} lg={6}>
          <DatePickerWrapper sx={{ width: '100%' }}>
            <DatePicker
              isClearable
              selected={
                values?.contractAt
                  ? new Date(values?.contractAt?.split('/').join('-'))
                  : null
              }
              showYearDropdown
              showMonthDropdown
              placeholderText="YYYY/MM/DD"
              dateFormat="yyyy/MM/dd"
              customInput={
                <CustomTextField
                  fullWidth
                  autoComplete="off"
                  error={!isEmpty(errors?.contractAt)}
                  helperText={errors?.contractAt ?? ''}
                  label="契約開始日"
                />
              }
              id="dateFrom"
              onChange={(value) =>
                setValues({
                  ...values,
                  contractAt: value ? dayjs(value).format('YYYY-MM-DD') : null
                })
              }
              clearIcon={
                <IconButton
                  edge="end"
                  onClick={(value) =>
                    setValues({ ...values, contractAt: value })
                  }
                >
                  <Icon fontSize="1.25rem" icon="ic:baseline-clear" />
                </IconButton>
              }
            />
          </DatePickerWrapper>
        </Grid>
      </Grid>

      <Grid item lg={6} md={12} xs={12}>
        <DropdownPrefectures
          error={!isEmpty(errors?.prefecture)}
          helperText={errors?.prefecture ?? ''}
          defaultValue={defaultValues?.prefecture}
          value={values?.prefecture}
          onChange={handleChange('prefecture')}
        />
      </Grid>

      <Grid item lg={6} md={12} xs={12}>
        <CustomTextField
          error={!isEmpty(errors?.postalCode)}
          helperText={errors?.postalCode ?? ''}
          type="text"
          label="〒"
          value={values?.postalCode}
          id="postalCode"
          onChange={handleChange('postalCode')}
        />
      </Grid>

      <Grid item lg={6} md={12} xs={12}>
        <CustomTextField
          error={!isEmpty(errors?.address)}
          helperText={errors?.address ?? ''}
          fullWidth
          type="text"
          label="住所"
          value={values?.address}
          id="address"
          onChange={handleChange('address')}
        />
      </Grid>

      <Grid container item direction="row" spacing={5}>
        <Grid item xs={6}>
          <CustomTextField
            error={!isEmpty(errors?.telephone)}
            helperText={errors?.telephone ?? ''}
            fullWidth
            type="text"
            label="電話番号"
            value={values?.telephone}
            id="telephone"
            onChange={handleChange('telephone')}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            error={!isEmpty(errors?.fax)}
            helperText={errors?.fax ?? ''}
            fullWidth
            type="text"
            label="FAX番号"
            value={values?.fax}
            id="fax"
            onChange={handleChange('fax')}
          />
        </Grid>
      </Grid>

      <Grid container item direction="row" spacing={5}>
        <Grid item xs={6}>
          <CustomTextField
            error={!isEmpty(errors?.pic)}
            helperText={errors?.pic ?? ''}
            fullWidth
            type="text"
            label="担当者名"
            value={values?.pic}
            id="pic"
            onChange={handleChange('pic')}
          />
        </Grid>
        <Grid item xs={6}>
          <CustomTextField
            error={!isEmpty(errors?.email)}
            helperText={errors?.email ?? ''}
            fullWidth
            type="email"
            label="担当者メールアドレス"
            value={values?.email}
            id="email"
            onChange={handleChange('email')}
          />
        </Grid>
      </Grid>

      <Grid container item direction="row" spacing={5}>
        <Grid item xs={6}>
          <CustomTextField
            error={!isEmpty(errors?.username)}
            helperText={errors?.username ?? ''}
            fullWidth
            type="text"
            label="ログイン ID"
            value={values?.username}
            id="username"
            onChange={handleChange('username')}
          />
        </Grid>
      </Grid>

      {isEdit && (
        <Box
          sx={{
            marginTop: '16px',
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Button
            variant="contained"
            color="success"
            onClick={onClickResetPassword}
          >
            {/* Reset Password */}
            パスワード再発行
          </Button>
        </Box>
      )}

      <Grid item xs={4}>
        <CustomTextField
          error={!isEmpty(errors?.totalResident)}
          helperText={errors?.totalResident ?? ''}
          fullWidth
          type="text"
          label="入所者数人"
          value={values?.totalResident}
          id="totalResident"
          onChange={handleChange('totalResident')}
        />
      </Grid>
      <Grid item xs={4}>
        <CustomTextField
          error={!isEmpty(errors?.pickleQty)}
          helperText={errors?.pickleQty ?? ''}
          fullWidth
          type="text"
          label="漬物"
          value={values?.pickleQty}
          id="pickleQty"
          onChange={handleChange('pickleQty')}
        />
      </Grid>
      <Grid item xs={4}>
        <CustomTextField
          error={!isEmpty(errors?.cornQty)}
          helperText={errors?.cornQty ?? ''}
          fullWidth
          type="text"
          label="コーン"
          value={values?.cornQty}
          id="cornQty"
          onChange={handleChange('cornQty')}
        />
      </Grid>

      <Grid container item direction="row" spacing={5}>
        <Grid item xs={6}>
          <DropdownWarehouses
            error={!isEmpty(errors?.warehouse)}
            helperText={errors?.warehouse ?? ''}
            defaultValue={defaultValues?.warehouse}
            value={values?.warehouse}
            onChange={handleChange('warehouse')}
          />
        </Grid>
        <Grid item xs={6}>
          <DropdownDeliveryFrequency
            error={!isEmpty(errors?.deliveryFrequency)}
            helperText={errors?.deliveryFrequency ?? ''}
            defaultValue={defaultValues?.deliveryFrequency}
            value={values?.deliveryFrequency}
            onChange={handleChange('deliveryFrequency')}
          />
        </Grid>

        <Grid item xs={6}>
          お米販売
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={values?.isSellRice}
                onClick={() => setValues({ ...values, isSellRice: true })}
              />
              する
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Checkbox
                checked={!values?.isSellRice}
                onClick={() => setValues({ ...values, isSellRice: false })}
              />
              しない
            </Box>
          </Box>
        </Grid>

        <Grid item xs={6} />

        <Grid item xs={6}>
          <DropdownSuppliers
            error={!isEmpty(errors?.riceSupplier)}
            helperText={errors?.riceSupplier ?? ''}
            label="米業者"
            type="RICE"
            defaultValue={defaultValues?.riceSupplier}
            value={values?.riceSupplier}
            onChange={handleChange('riceSupplier')}
          />
        </Grid>

        <Grid item xs={6}>
          納品曜日
          <div>
            <Checkbox
              checked={arrayRiceDelivery[0] == '1'}
              onChange={(e) => onChangeRiceDelivery(0, e.target.checked)}
            />
            月
            <Checkbox
              checked={arrayRiceDelivery[1] == '1'}
              onChange={(e) => onChangeRiceDelivery(1, e.target.checked)}
            />
            火
            <Checkbox
              checked={arrayRiceDelivery[2] == '1'}
              onChange={(e) => onChangeRiceDelivery(2, e.target.checked)}
            />
            水
            <Checkbox
              checked={arrayRiceDelivery[3] == '1'}
              onChange={(e) => onChangeRiceDelivery(3, e.target.checked)}
            />
            木
            <Checkbox
              checked={arrayRiceDelivery[4] == '1'}
              onChange={(e) => onChangeRiceDelivery(4, e.target.checked)}
            />
            金
            <Checkbox
              checked={arrayRiceDelivery[5] == '1'}
              onChange={(e) => onChangeRiceDelivery(5, e.target.checked)}
            />
            土
            <Checkbox
              checked={arrayRiceDelivery[6] == '1'}
              onChange={(e) => onChangeRiceDelivery(6, e.target.checked)}
            />
            日
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default FacilityRegistration;
