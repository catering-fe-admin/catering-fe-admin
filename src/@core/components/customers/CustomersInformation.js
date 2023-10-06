import React from 'react';

import cloneDeep from 'lodash/cloneDeep';
import isEmpty from 'lodash/isEmpty';

import Icon from 'components/icon';
import CustomTextField from 'components/mui/text-field';

import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const CustomersInformation = ({
  initialBillings,
  errors,
  setErrors,
  billings,
  setBillings
}) => {
  const appendListBillings = () => {
    const newBillings = cloneDeep(billings);
    newBillings.push(initialBillings[0]);
    setBillings(newBillings);
  };

  const closeListBillings = (idx) => {
    const newBillings = cloneDeep(billings);
    newBillings.splice(idx, 1);
    setBillings(newBillings);
  };

  const onChangeBillings = (key, value, index) => {
    const newBillings = cloneDeep(billings);
    newBillings[index][key] = value;

    setErrors({
      ...errors,
      [`billings[${index}].${key}`]: ''
    });

    setBillings(newBillings);
  };

  return (
    <>
      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}
      >
        <Typography>【請求先情報】</Typography>
      </Box>

      {billings.map((billing, index) => {
        const isEven = index % 2 != 0;

        return (
          <Box
            style={{
              backgroundColor: isEven
                ? 'transparent'
                : 'rgba(47, 43, 61, 0.04)',
              marginLeft: '-1.5rem',
              marginRight: '-1.5rem',
              marginTop: '36px'
            }}
            key={index}
          >
            <Box
              style={{
                paddingLeft: '1.5rem',
                paddingRight: '1.5rem',
                paddingTop: '36px',
                paddingBottom: '24px'
              }}
            >
              <Grid container xs={12} spacing={5} direction="column">
                {index !== 0 && (
                  <Grid item container xs={12} justifyContent="flex-end">
                    <Grid item>
                      <Tooltip title="請求先情報を削除">
                        <IconButton
                          color="error"
                          variant="fill"
                          onClick={() => closeListBillings(index)}
                        >
                          <CancelRoundedIcon fontSize="large" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                )}
                <Grid
                  item
                  lg={6}
                  md={12}
                  xs={12}
                  sx={{ paddingTop: '0px !important' }}
                >
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="請求宛名"
                    error={!isEmpty(errors?.[`billings[${index}].name`])}
                    helperText={errors?.[`billings[${index}].name`] ?? ''}
                    value={billing?.name}
                    onChange={(e) =>
                      onChangeBillings('name', e.target.value, index)
                    }
                  />
                </Grid>
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    type="text"
                    label="〒"
                    value={billing?.postalCode}
                    onChange={(e) =>
                      onChangeBillings('postalCode', e.target.value, index)
                    }
                  />
                </Grid>
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="住所"
                    value={billing?.address} // perlu edit
                    onChange={(e) =>
                      onChangeBillings('address', e.target.value, index)
                    } // perlu edit
                  />
                </Grid>

                <Grid container item direction="row" spacing={5}>
                  <Grid item lg={6} md={12} xs={12}>
                    <CustomTextField
                      fullWidth
                      type="text"
                      label="電話番号"
                      value={billing?.telephone}
                      onChange={(e) =>
                        onChangeBillings('telephone', e.target.value, index)
                      }
                    />
                  </Grid>
                  <Grid item lg={6} md={12} xs={12}>
                    <CustomTextField
                      fullWidth
                      type="text"
                      label="FAX番号"
                      value={billing?.fax}
                      onChange={(e) =>
                        onChangeBillings('fax', e.target.value, index)
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      })}

      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}
      >
        <Tooltip title="Add Billings">
          <IconButton
            color="success"
            variant="contained"
            onClick={appendListBillings}
          >
            <Icon icon="ep:circle-plus-filled" fontSize={50} />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default CustomersInformation;
