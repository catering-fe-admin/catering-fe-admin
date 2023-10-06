import React, { useState } from 'react';

import cloneDeep from 'lodash/cloneDeep';

import Icon from 'components/icon';
import CustomTextField from 'components/mui/text-field';

import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const SupplierInformation = ({
  initialSupplierInformation,
  supplierInformation,
  setSupplierInformation,
  type
}) => {
  const appendListSupplier = () => {
    const newSupplierInformation = cloneDeep(supplierInformation);
    newSupplierInformation.push(initialSupplierInformation[0]);
    setSupplierInformation(newSupplierInformation);
  };

  const onChangeSupplierInformation = (key, value, index) => {
    const newSupplierInformation = cloneDeep(supplierInformation);
    newSupplierInformation[index][key] = value;
    setSupplierInformation(newSupplierInformation);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '24px'
        }}
      >
        <Typography>【発注先情報】</Typography>
      </Box>

      {supplierInformation.map((supplier, index) => {
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
                <Grid
                  item
                  lg={6}
                  md={12}
                  xs={12}
                  sx={{ paddingTop: '0px !important' }}
                >
                  <CustomTextField
                    type="text"
                    label="〒"
                    value={supplier?.postalCode}
                    onChange={(e) =>
                      onChangeSupplierInformation(
                        'postalCode',
                        e.target.value,
                        index
                      )
                    }
                  />
                </Grid>
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="住所"
                    value={supplier?.address}
                    onChange={(e) =>
                      onChangeSupplierInformation(
                        'address',
                        e.target.value,
                        index
                      )
                    }
                  />
                </Grid>
                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="発注先名"
                    value={supplier?.name}
                    onChange={(e) =>
                      onChangeSupplierInformation('name', e.target.value, index)
                    }
                  />
                </Grid>

                <Grid container item direction="row" spacing={5}>
                  <Grid item lg={6} md={12} xs={12}>
                    <CustomTextField
                      fullWidth
                      type="text"
                      label="電話番号"
                      value={supplier?.telephone}
                      onChange={(e) =>
                        onChangeSupplierInformation(
                          'telephone',
                          e.target.value,
                          index
                        )
                      }
                    />
                  </Grid>
                  <Grid item lg={6} md={12} xs={12}>
                    <CustomTextField
                      fullWidth
                      type="text"
                      label="FAX番号"
                      value={supplier?.fax}
                      onChange={(e) =>
                        onChangeSupplierInformation(
                          'fax',
                          e.target.value,
                          index
                        )
                      }
                    />
                  </Grid>
                </Grid>

                <Grid item lg={6} md={12} xs={12}>
                  <CustomTextField
                    fullWidth
                    type="text"
                    label="担当者名"
                    value={supplier?.pic}
                    onChange={(e) =>
                      onChangeSupplierInformation('pic', e.target.value, index)
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      })}

      <Box
        sx={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}
      >
        <Tooltip title="Add Supplier Information">
          <IconButton
            color="success"
            variant="contained"
            onClick={appendListSupplier}
          >
            <Icon icon="ep:circle-plus-filled" fontSize={50} />
          </IconButton>
        </Tooltip>
      </Box>
    </>
  );
};

export default SupplierInformation;
