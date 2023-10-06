import React from 'react';
import DatePicker from 'react-datepicker';

import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import queries from 'src/consts/queries';
import {
  useDeleteAdminSuppliersHoliday,
  useGetAdminSuppliersHoliday,
  usePostAdminSuppliersHoliday
} from 'src/hooks/api/useAdminSuppliers';

import { Box, Grid, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

import CustomTextField from '../mui/text-field';

const SupplierDeliveryDate = ({ supplierId }) => {
  const queryClient = useQueryClient();

  const { data } = useGetAdminSuppliersHoliday(supplierId);
  const { mutate: postSupplierHoliday } =
    usePostAdminSuppliersHoliday(supplierId);
  const { mutate: deleteSupplierHoliday } =
    useDeleteAdminSuppliersHoliday(supplierId);

  const listHolidayDate = data?.data?.map((d) => d?.holidayAt);

  const handleChangeDeliveryDate = (newValue) => {
    const newDate = dayjs(newValue).format('YYYY-MM-DD');

    const body = {
      holidayAt: newDate
    };

    const queryFn = listHolidayDate?.includes(newDate)
      ? deleteSupplierHoliday
      : postSupplierHoliday;

    queryFn(body, {
      onSuccess: () => {
        queryClient.refetchQueries(
          queries.adminSuppliers.holiday(supplierId).queryKey
        );
      }
    });
  };

  const highlightDates = (date) => {
    const formatDate = dayjs(date).format('YYYY-MM-DD');

    if (listHolidayDate?.includes(formatDate)) {
      return 'delivery-date';
    }

    return '';
  };

  return (
    <Box sx={{ marginBottom: '350px' }}>
      <Box
        sx={{
          background: 'white',
          width: 'min-content',
          whiteSpace: 'nowrap',
          padding: '8px 16px',
          borderRadius: '4px',
          boxShadow: 1,
          marginTop: '24px'
        }}
      >
        <Typography variant="h5">【出荷不可日】</Typography>
      </Box>
      <DatePickerWrapper sx={{}}>
        <DatePicker
          open
          popperPlacement="bottom-start"
          popperModifiers={[
            {
              name: 'flip',
              options: {
                fallbackPlacements: ['bottom'],
                allowedAutoPlacements: ['bottom'] // by default, all the placements are allowed
              }
            }
          ]}
          customInput={<CustomTextField fullWidth sx={{ display: 'none' }} />}
          showYearDropdown
          showMonthDropdown
          placeholderText="YYYY/MM/DD"
          dateFormat="yyyy/MM/dd"
          id="date"
          onChange={(newDate) => handleChangeDeliveryDate(newDate)}
          dayClassName={highlightDates}
        />
      </DatePickerWrapper>
    </Box>
  );
};

export default SupplierDeliveryDate;
