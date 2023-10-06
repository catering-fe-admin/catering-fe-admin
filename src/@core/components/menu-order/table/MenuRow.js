import React, { memo } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import CustomTextField from 'components/mui/text-field';

import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Box, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import DropdownCourses from '../../dropdown/DropdownCourses';
import DropdownItems from '../../dropdown/DropdownItems';

const useStyles = makeStyles({
  input: {
    '& input[type=number]': {
      '-moz-appearance': 'textfield'
    },
    '& input[type=number]::-webkit-outer-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    },
    '& input[type=number]::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0
    }
  }
});

const tableCellStyle = { padding: '0 16px', border: '0' };

const MenuRow = memo(
  ({
    isFirstRow,
    isLastRow,
    row,
    idx,
    onChangeTotalServe,
    onClickPlusMinus,
    onChangeTimeSection,
    onChangeCourse,
    onChangeProduct,
    onClickAppend
  }) => {
    const classes = useStyles();

    const { uuid, requireAt, timeSection, items, totalServeQtyGlobal } = row;

    return (
      <>
        <TableRow hover>
          <TableCell padding="none" sx={tableCellStyle}>
            {isFirstRow ? requireAt : ''}
          </TableCell>
          <TableCell padding="none" sx={tableCellStyle}>
            {isFirstRow && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ marginRight: '8px' }}>
                  {timeSection?.name}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => onChangeTimeSection(uuid)}
                  size="small"
                >
                  変更
                </Button>
              </Box>
            )}
          </TableCell>
          <TableCell padding="none" sx={tableCellStyle} align="center">
            {typeof items?.[idx] !== 'undefined' && (
              <DropdownCourses
                defaultValue={{
                  id: items?.[idx]?.item?.course?.id,
                  name: items?.[idx]?.item?.course?.name
                }}
                value={{
                  id: items?.[idx]?.item?.course?.id,
                  name: items?.[idx]?.item?.course?.name
                }}
                onChange={(newValue) => onChangeCourse(uuid, newValue, idx)}
                id={`items-${uuid}`}
              />
            )}
          </TableCell>
          <TableCell padding="none" sx={tableCellStyle} align="center">
            {typeof items?.[idx] !== 'undefined' && (
              <DropdownItems
                defaultValue={{
                  id: items?.[idx]?.item?.id,
                  name: items?.[idx]?.item?.name
                }}
                value={{
                  id: items?.[idx]?.item?.id,
                  name: items?.[idx]?.item?.name
                }}
                onChange={(newValue) => onChangeProduct(uuid, newValue, idx)}
                id={`productName-${idx}`}
                withAdditionalParams
                additionalParams={
                  items?.[idx]?.item?.course?.id
                    ? {
                        courseId: items?.[idx]?.item?.course?.id,
                        type: 'NORMAL'
                      }
                    : null
                }
                disabled={items?.[idx]?.item?.course?.id ? false : true}
              />
            )}
          </TableCell>
          <TableCell padding="none" sx={tableCellStyle}>
            {isFirstRow && (
              <Grid
                container
                spacing={2}
                justifyContent="right"
                alignItems="center"
              >
                <Grid item xs={8}>
                  <CustomTextField
                    fullWidth
                    type="number"
                    inputProps={{ style: { textAlign: 'center' } }}
                    value={totalServeQtyGlobal}
                    defaultValue={totalServeQtyGlobal}
                    id="totalServeQtyGlobal"
                    onChange={(e) => onChangeTotalServe(uuid, e.target.value)}
                    className={classes.input}
                  />
                </Grid>
                <Grid item>食</Grid>
              </Grid>
            )}
          </TableCell>
          <TableCell padding="none" sx={tableCellStyle}>
            <Grid
              container
              justifyContent="right"
              alignItems="center"
              minHeight="70px"
            >
              <Grid item>
                {isFirstRow && (
                  <IconButton onClick={() => onClickPlusMinus(uuid, true)}>
                    <AddOutlinedIcon fontSize="small" />
                  </IconButton>
                )}
              </Grid>
              <Grid item>
                {isFirstRow && (
                  <IconButton onClick={() => onClickPlusMinus(uuid, false)}>
                    <RemoveOutlinedIcon fontSize="small" />
                  </IconButton>
                )}
              </Grid>
            </Grid>
          </TableCell>
        </TableRow>

        {/* Additional Row */}
        {isLastRow && (
          <TableRow>
            <TableCell colSpan={2} align="center" />
            <TableCell colSpan={2} align="center">
              <Button fullWidth onClick={() => onClickAppend(uuid)}>
                <AddOutlinedIcon fontSize="medium" />
              </Button>
            </TableCell>
            <TableCell colSpan={2} align="center" />
          </TableRow>
        )}
      </>
    );
  }
);

MenuRow.displayName = 'MenuRow';

export default MenuRow;
