import React, { Fragment } from 'react';
import DatePicker from 'react-datepicker';

import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

import Icon from 'src/@core/components/icon';
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';

import CustomTextField from 'components/mui/text-field';

import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

const priceTypes = [
  { type: 'MORNING', label: '朝' },
  { type: 'NOON', label: '昼' },
  { type: 'NIGHT', label: '夜' }
];

const UnitSellingPrice = ({ values, setValues, handleChange, errors }) => {
  const handleChangePrices = (index, key, value) => {
    const newPrices = cloneDeep(values.prices);
    newPrices[index][key] = value;

    setValues({ ...values, prices: newPrices });
  };

  return (
    <>
      <Grid item xs={12} sx={{ marginTop: '24px' }}>
        <Typography variant="h5">【販売単価】</Typography>
      </Grid>

      <Grid item xs={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <CustomTextField
            error={!isEmpty(errors?.riceLotPrice)}
            helperText={errors?.riceLotPrice ?? ''}
            fullWidth
            type="text"
            label="お米（ロット価格"
            value={values?.riceLotPrice}
            id="riceLotPrice"
            onChange={handleChange('riceLotPrice')}
          />
          <Typography variant="p" sx={{ marginTop: '16px' }}>
            円
          </Typography>
        </Box>
      </Grid>

      {priceTypes.map((type, index) => (
        <Fragment key={index}>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Typography variant="p">{type.label}</Typography>
              <CustomTextField
                error={!isEmpty(errors[`prices[${index}].price`])}
                helperText={errors[`prices[${index}].price`] ?? ''}
                type="text"
                value={values?.prices?.[index]?.price}
                id="price"
                onChange={(e) =>
                  handleChangePrices(index, 'price', e.target.value)
                }
              />
              <Typography variant="p">円</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Typography variant="p" sx={{ visibility: 'hidden' }}>
                朝
              </Typography>
              <CustomTextField
                error={!isEmpty(errors[`prices[${index}].logicFirstResident`])}
                helperText={errors[`prices[${index}].logicFirstResident`] ?? ''}
                type="text"
                value={values?.prices?.[index]?.logicFirstResident}
                id="logicFirstResident"
                onChange={(e) =>
                  handleChangePrices(
                    index,
                    'logicFirstResident',
                    e.target.value
                  )
                }
              />
              <Typography variant="p">人前以上の場合は一律</Typography>
              <CustomTextField
                error={!isEmpty(errors[`prices[${index}].logicSecondResident`])}
                helperText={
                  errors[`prices[${index}].logicSecondResident`] ?? ''
                }
                type="text"
                value={values?.prices?.[index]?.logicSecondResident}
                id="logicSecondResident"
                onChange={(e) =>
                  handleChangePrices(
                    index,
                    'logicSecondResident',
                    e.target.value
                  )
                }
              />
              <Typography variant="p">円</Typography>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <Typography variant="p" sx={{ visibility: 'hidden' }}>
                朝
              </Typography>
              <CustomTextField
                error={!isEmpty(errors[`prices[${index}].logicFirstPrice`])}
                helperText={errors[`prices[${index}].logicFirstPrice`] ?? ''}
                type="text"
                value={values?.prices?.[index]?.logicFirstPrice}
                id="logicFirstPrice"
                onChange={(e) =>
                  handleChangePrices(index, 'logicFirstPrice', e.target.value)
                }
              />
              <Typography variant="p">人前以上の場合は一律</Typography>
              <CustomTextField
                error={!isEmpty(errors[`prices[${index}].logicSecondPrice`])}
                helperText={errors[`prices[${index}].logicSecondPrice`] ?? ''}
                type="text"
                value={values?.prices?.[index]?.logicSecondPrice}
                id="logicSecondPrice"
                onChange={(e) =>
                  handleChangePrices(index, 'logicSecondPrice', e.target.value)
                }
              />
              <Typography variant="p">円</Typography>
            </Box>
          </Grid>
        </Fragment>
      ))}

      <Grid item xs={12}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <CustomTextField
            error={!isEmpty(errors?.minQty)}
            helperText={errors?.minQty ?? ''}
            fullWidth
            type="text"
            label="最低注文数"
            value={values?.minQty}
            id="minQty"
            onChange={handleChange('minQty')}
          />
          <Typography variant="p" sx={{ marginTop: '16px' }}>
            食以上
          </Typography>
        </Box>
      </Grid>

      <Grid container item direction="row" spacing={5}>
        <Grid item md={12} xs={12} lg={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <Checkbox
              checked={values?.isSetting}
              onChange={(e) =>
                setValues({ ...values, isSetting: e.target.checked })
              }
            />
            <DatePickerWrapper sx={{ width: '100%', top: '0px' }}>
              <DatePicker
                isClearable
                selected={values?.settingMinQtyDate}
                showYearDropdown
                showMonthDropdown
                placeholderText="YYYY/MM/DD"
                dateFormat="yyyy/MM/dd"
                customInput={
                  <CustomTextField
                    fullWidth
                    autoComplete="off"
                    error={!isEmpty(errors?.settingMinQtyDate)}
                    helperText={errors?.settingMinQtyDate ?? ''}
                    label=""
                    style={{ top: '0px' }}
                  />
                }
                id="dateFrom"
                onChange={(value) =>
                  setValues({ ...values, settingMinQtyDate: value })
                }
                clearIcon={
                  <IconButton
                    edge="end"
                    onClick={(value) =>
                      setValues({ ...values, settingMinQtyDate: value })
                    }
                  >
                    <Icon fontSize="1.25rem" icon="ic:baseline-clear" />
                  </IconButton>
                }
              />
            </DatePickerWrapper>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Typography variant="p">の配食分からは</Typography>
            <CustomTextField
              error={!isEmpty(errors?.settingMinQty)}
              helperText={errors?.settingMinQty ?? ''}
              fullWidth
              type="text"
              value={values?.settingMinQty}
              id="settingMinQty"
              onChange={handleChange('settingMinQty')}
            />
            <Typography variant="p">食以上</Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default UnitSellingPrice;
