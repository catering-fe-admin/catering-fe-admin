import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import dayjs from 'dayjs';
import { isEmpty } from 'lodash';
import forEach from 'lodash/forEach';

import {
  useEditAdminCustomersFacilities,
  usePostAdminCustomersFacilities
} from 'src/hooks/api/useAdminCustomersFacilities';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import ConfirmDialog from '../shared/ConfirmDialog';
import FacilityOrderList from './FacilityOrderList/FacilityOrderList';
import FacilityRegistration from './FacilityRegistration';
import FileManagement from './FileManagement';
import RequestInformation from './RequestInformation';
import RiceSellingPrice from './RiceSellingPrice';
import UnitSellingPrice from './UnitSellingPrice';

const initialPrices = [
  {
    type: 'MORNING',
    price: '',
    logicFirstResident: '',
    logicSecondResident: '',
    logicFirstPrice: '',
    logicSecondPrice: ''
  },
  {
    type: 'NOON',
    price: '',
    logicFirstResident: '',
    logicSecondResident: '',
    logicFirstPrice: '',
    logicSecondPrice: ''
  },
  {
    type: 'NIGHT',
    price: '',
    logicFirstResident: '',
    logicSecondResident: '',
    logicFirstPrice: '',
    logicSecondPrice: ''
  }
];

const initialValues = {
  name: '',
  address: '',
  postalCode: '',
  telephone: '',
  fax: '',
  pic: '',
  email: '',
  totalResident: 0,
  minQty: 0,
  settingMinQtyDate: '',
  settingMinQty: 0,
  pickleQty: 0,
  cornQty: 0,
  isSellRice: true,
  riceLotPrice: 0,
  // mousseUnitPrice: 0,
  isSetting: true,
  prefecture: {},
  customer: {},
  billing: {},
  prices: initialPrices,
  docs: [],
  username: '',
  riceSupplier: {},
  riceDelivery: '0000000',
  kind: {},
  deliveryFrequency: '',
  warehouse: {},
  items: [
    {
      id: null,
      item: {},
      kiloPrice: 0
    }
  ],
  contractAt: ''
};

const CustomersFacilitiesDetail = ({ isEdit, defaultValues }) => {
  const router = useRouter();
  const customerId = router.query.id;
  const customerFacilityId = router.query.facility_id;

  const [values, setValues] = useState(
    isEdit ? { ...defaultValues } : initialValues
  );

  const [showDialog, setShowDialog] = useState(false);
  const [customerAccount, setCustomerAccount] = useState(null);
  const [errors, setErrors] = useState({});
  const [disabled, setDisabled] = useState(false);

  const { mutate: createCustomersFacilities } =
    usePostAdminCustomersFacilities();
  const { mutate: editCustomersFacilities } = useEditAdminCustomersFacilities(
    defaultValues?.id
  );

  const redirectUser = () => {
    router.back();
  };

  const inventoriesLocale = {
    name: '施設名',
    address: '住所',
    postalCode: '〒',
    telephone: '電話番号',
    fax: 'FAX番号',
    pic: '担当者名',
    email: '担当者メールアドレス',
    totalResident: '入所者数人',
    minQty: '最低注文数',
    settingMinQtyDate: '最低数量日付の設定',
    settingMinQty: '最低数量の設定',
    pickleQty: '漬物',
    cornQty: 'コーン',
    isSellRice: 'する',
    riceLotPrice: 'お米（ロット価格',
    // mousseUnitPrice: 'mousseUnitPrice',
    // isSetting: 'isSetting',
    prefecture: '都道府県',
    customer: 'customer',
    billing: '【請求情報】',
    docs: 'docs',
    username: 'ログイン ID',
    riceSupplier: '米業者',
    riceDelivery: '納品曜日',
    kind: '施設種類',
    deliveryFrequency: '配送頻度',
    warehouse: '倉庫名',
    'prices[0].price': '価格',
    'prices[1].price': '価格',
    'prices[2].price': '価格',
    'prices[0].logicFirstResident': '最初の居住者',
    'prices[1].logicFirstResident': '最初の居住者',
    'prices[2].logicFirstResident': '最初の居住者',
    'prices[0].logicSecondResident': '第二居住者',
    'prices[1].logicSecondResident': '第二居住者',
    'prices[2].logicSecondResident': '第二居住者',
    'prices[0].logicFirstPrice': '初価格',
    'prices[1].logicFirstPrice': '初価格',
    'prices[2].logicFirstPrice': '初価格',
    'prices[0].logicSecondPrice': 'セカンドプライス',
    'prices[1].logicSecondPrice': 'セカンドプライス',
    'prices[2].logicSecondPrice': 'セカンドプライス',
    contractAt: '契約開始日'
  };

  const validateFields = () => {
    const newErrors = {};
    const priceErrors = {};

    const nonEmptyValues = {
      name: values?.name,
      address: values?.address,
      postalCode: values?.postalCode,
      telephone: values?.telephone,
      fax: values?.fax,
      pic: values?.pic,
      email: values?.email,
      totalResident: values?.totalResident,
      minQty: values?.minQty,
      settingMinQtyDate: values?.settingMinQtyDate,
      settingMinQty: values?.settingMinQty,
      pickleQty: values?.pickleQty,
      cornQty: values?.cornQty,
      riceLotPrice: values?.riceLotPrice,
      // mousseUnitPrice: values?.mousseUnitPrice,
      // isSetting: values?.isSetting,
      prefecture: values?.prefecture,
      customer: values?.customer,
      billing: values?.billing,
      username: values?.username,
      riceSupplier: values?.riceSupplier?.id,
      riceDelivery: values?.riceDelivery,
      kind: values?.kind,
      deliveryFrequency: values?.deliveryFrequency,
      warehouse: values?.warehouse,
      contractAt: values?.contractAt
    };

    forEach(nonEmptyValues, (value, key) => {
      if (value == null) {
        newErrors[key] = `${inventoriesLocale[key]} は必須です。`;
      }
    });

    values.prices.forEach((value, index) => {
      if (value.price == null || value.price == '') {
        priceErrors[`prices[${index}].price`] = `${
          inventoriesLocale[`prices[${index}].price`]
        } は必須です。`;
      }
      if (value.logicFirstResident == null || value.logicFirstResident == '') {
        priceErrors[`prices[${index}].logicFirstResident`] = `${
          inventoriesLocale[`prices[${index}].logicFirstResident`]
        } は必須です。`;
      }
      if (
        value.logicSecondResident == null ||
        value.logicSecondResident == ''
      ) {
        priceErrors[`prices[${index}].logicSecondResident`] = `${
          inventoriesLocale[`prices[${index}].logicSecondResident`]
        } は必須です。`;
      }
      if (value.logicFirstPrice == null || value.logicFirstPrice == '') {
        priceErrors[`prices[${index}].logicFirstPrice`] = `${
          inventoriesLocale[`prices[${index}].logicFirstPrice`]
        } は必須です。`;
      }
      if (value.logicSecondPrice == null || value.logicSecondPrice == '') {
        priceErrors[`prices[${index}].logicSecondPrice`] = `${
          inventoriesLocale[`prices[${index}].logicSecondPrice`]
        } は必須です。`;
      }
    });

    setErrors({ ...newErrors, ...priceErrors });

    return isEmpty({ ...newErrors, ...priceErrors });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    const isValid = validateFields();

    if (!isValid) return;

    setDisabled(true);
    const formData = new FormData();

    const {
      name,
      address,
      postalCode,
      telephone,
      fax,
      pic,
      email,
      totalResident,
      minQty,
      settingMinQtyDate,
      settingMinQty,
      pickleQty,
      cornQty,
      isSellRice,
      riceLotPrice,
      mousseUnitPrice,
      isSetting,
      prefecture,
      customer,
      billing,
      prices,
      docs,
      username,
      riceSupplier,
      riceDelivery,
      kind,
      deliveryFrequency,
      warehouse,
      items,
      contractAt
    } = values;

    formData.append('name', name);
    formData.append('address', address);
    formData.append('postalCode', postalCode);
    formData.append('telephone', telephone);
    formData.append('fax', fax);
    formData.append('pic', pic);
    formData.append('email', email);
    formData.append('totalResident', totalResident);
    formData.append('minQty', minQty);
    formData.append(
      'settingMinQtyDate',
      settingMinQtyDate ? dayjs(settingMinQtyDate).format('YYYY-MM-DD') : null
    );
    formData.append('settingMinQty', settingMinQty);
    formData.append('pickleQty', pickleQty);
    formData.append('cornQty', cornQty);
    formData.append('isSellRice', isSellRice);
    formData.append('riceLotPrice', riceLotPrice || 0);
    formData.append('mousseUnitPrice', mousseUnitPrice || 0);
    formData.append('isSetting', isSetting);

    formData.append('prefecture.id', prefecture?.id || null);
    formData.append('customer.id', customer?.id || null);
    formData.append('billing.id', billing?.id || null);

    // Append Prices
    prices.forEach((price, index) => {
      price?.id && formData.append(`prices[${index}].id`, price.id);
      formData.append(`prices[${index}].type`, price.type);
      formData.append(`prices[${index}].price`, price.price);
      formData.append(
        `prices[${index}].logicFirstResident`,
        price.logicFirstResident
      );
      formData.append(
        `prices[${index}].logicSecondResident`,
        price.logicSecondResident
      );

      formData.append(
        `prices[${index}].logicFirstPrice`,
        price.logicFirstPrice
      );
      formData.append(
        `prices[${index}].logicSecondPrice`,
        price.logicSecondPrice
      );
    });

    // Append Docs
    docs.forEach((doc, index) => {
      doc.id && formData.append(`docs[${index}].id`, doc.id);
      doc.file && formData.append(`docs[${index}].file`, doc.file);
    });

    // // Append Items
    items
      .filter((item) => !isEmpty(item?.item))
      ?.forEach((item, index) => {
        item.id && formData.append(`items[${index}].id`, item.id);
        formData.append(`items[${index}].item.id`, item.item.id);
        formData.append(
          `items[${index}].kiloPrice`,
          parseFloat(item.kiloPrice)
        );
      });

    formData.append('username', username);
    formData.append('riceSupplier.id', riceSupplier?.id || null);
    formData.append('riceDelivery', riceDelivery);
    formData.append('kind.id', kind.id);

    formData.append('deliveryFrequency', deliveryFrequency);
    formData.append('warehouse.id', warehouse.id);
    formData.append('contractAt', dayjs(contractAt).format('YYYY-MM-DD'));

    const mutateFn = isEdit
      ? editCustomersFacilities
      : createCustomersFacilities;

    mutateFn(formData, {
      onSuccess: (data) => {
        if (data?.data) {
          if (isEdit) {
            redirectUser();

            return;
          }

          setShowDialog(true);
          setCustomerAccount({
            username: data?.data?.username,
            password: data?.data?.password,
            message: '施設アカウント作成されました'
          });
          setDisabled(false);
        }
      }
    });
  };

  const handleChange = (prop) => (event) => {
    const value = event?.target?.value ?? event;

    setValues({ ...values, [prop]: value });
  };

  useEffect(() => {
    if (customerId) {
      setValues({
        ...values,
        customer: {
          id: customerId
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerId]);

  return (
    <Card>
      <ConfirmDialog
        show={showDialog}
        setShow={setShowDialog}
        title={customerAccount?.message}
        description={
          <>
            <Typography>ログインID: {customerAccount?.username}</Typography>
            <Typography>パスワード: {customerAccount?.password}</Typography>
          </>
        }
        onClickClose={isEdit ? undefined : redirectUser}
        showButton={false}
      />
      <CardContent>
        <form onSubmit={onSubmit}>
          <Grid container xs={12} spacing={5} direction="column">
            <FacilityRegistration
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              customerId={values?.customer?.id}
              customerFacilityId={customerFacilityId}
              isEdit={isEdit}
              defaultValues={defaultValues}
              errors={errors}
              setShowDialog={setShowDialog}
              setCustomerAccount={setCustomerAccount}
            />
            <UnitSellingPrice
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              errors={errors}
            />
            <RiceSellingPrice
              values={values}
              setValues={setValues}
              errors={errors}
            />

            <RequestInformation
              values={values}
              customerId={customerId}
              defaultValues={defaultValues}
              handleChange={handleChange}
              errors={errors}
            />
            <FileManagement values={values} setValues={setValues} />
            <FacilityOrderList />
          </Grid>

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

export default CustomersFacilitiesDetail;
