import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

import fileDownload from 'js-file-download';
import pickBy from 'lodash/pickBy';

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker';
import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';
import {
  getAdminCustomerDeliveriesDeliver,
  getAdminCustomerDeliveriesExportDeliverySlip,
  getAdminCustomerDeliveriesExportInstruction
} from 'src/client/adminCustomerDeliveriesClient';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import CustomDateInput from '../bulletins/bulletins-detail/CustomDateInput';
import DropdownCustomerFacilities from '../dropdown/DropdownCustomerFacilities';
import DropdownMenuDate from '../dropdown/DropdownMenuDate';

const FilterShippingList = ({ setParams, tabValue }) => {
  const [filter, setFilter] = useState({
    type: 'MENU',
    customerFacility: {},
    requireAtFrom: firstDateCurrentMonth,
    requireAtTo: lastDateCurrentMonth,
    menuDate: {
      id: 1,
      value: 'require',
      label: '献立日',
      key: 'Menu Date'
    }
  });

  const handleChange = (prop) => (event) => {
    const value = event?.target?.value ?? event;

    setFilter({ ...filter, [prop]: value });
  };

  const getParams = () => {
    const { type, customerFacility, requireAtFrom, requireAtTo, menuDate } =
      filter || {};

    const dateFromKey = {
      require: 'requireAtFrom',
      work: 'workAtFrom',
      delivery: 'deliveryAtFrom'
    };

    const dateToKey = {
      require: 'requireAtTo',
      work: 'workAtTo',
      delivery: 'deliveryAtTo'
    };

    const params =
      pickBy(
        {
          type: type,
          customerFacility: customerFacility,
          menuDate: menuDate,
          [dateFromKey?.[menuDate?.value]]:
            getFormattedParamsDate(requireAtFrom),
          [dateToKey?.[menuDate?.value]]: getFormattedParamsDate(requireAtTo)
        },
        (value) => !!value
      ) || {};

    return params;
  };

  const handleSearch = (e) => {
    e?.preventDefault();

    const params = getParams();
    setParams(params);
  };

  const handleDownloadShippingSlip = async () => {
    const params = getParams();

    Object.keys(params).map((key) => {
      if (!params[key]) {
        delete params[key];
      }

      delete params['menuDate'];
      delete params['customerFacility'];
    });

    const { data } = await getAdminCustomerDeliveriesExportDeliverySlip({
      ...params,
      customerFacilityId: filter?.customerFacility?.id
    });
    if (data) {
      fileDownload(data, '献立出荷指示.zip');
    }
  };

  const handleDownloadShippingInstruction = async () => {
    const params = getParams();

    // Remove empty object value
    Object.keys(params).map((key) => {
      if (!params[key]) {
        delete params[key];
      }
      delete params['menuDate'];
      delete params['customerFacility'];
    });

    const { data } = await getAdminCustomerDeliveriesDeliver({
      ...params,
      customerFacilityId: filter?.customerFacility?.id
    });

    if (data?.message === 'OPERATION.DELIVER.SUCCESS') {
      const { data } = await getAdminCustomerDeliveriesExportInstruction(
        params
      );
      if (data) {
        fileDownload(data, '献立出荷指示.csv');
      }
    }
  };

  const defaultDateBasedTab = {
    all: {
      requireAtFrom: filter?.requireAtFrom,
      requireAtTo: filter?.requireAtTo
    },
    current: {
      requireAtFrom: new Date(),
      requireAtTo: new Date()
    },
    old: {
      requireAtFrom: null,
      requireAtTo: new Date()
    }
  };

  useEffect(() => {
    setFilter({
      ...filter,
      requireAtFrom: defaultDateBasedTab?.[tabValue]?.requireAtFrom,
      requireAtTo: defaultDateBasedTab?.[tabValue]?.requireAtTo
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue]);

  return (
    <Grid container spacing={5} padding="24px">
      <Grid item container spacing={5} alignItems="flex-end">
        {/* Filter Shipping List */}
        <Grid item lg={3} md={3} xs={12}>
          <DropdownMenuDate
            label="献立日"
            defaultValue={filter?.menuDate}
            value={filter?.menuDate}
            onChange={handleChange('menuDate')}
          />
        </Grid>
        <Grid item container spacing={5} md={7} lg={7}>
          {/* Filter Start Shipping */}
          <Grid item md={3} lg={3} xs={12}>
            <DatePickerWrapper>
              <DatePicker
                id="requireAtFrom"
                showYearDropdown
                showMonthDropdown
                selected={filter?.requireAtFrom}
                placeholderText="YYYY/MM/DD"
                dateFormat="yyyy/MM/dd"
                onChange={handleChange('requireAtFrom')}
                customInput={<CustomDateInput fullWidth label="献立日" />}
                disabled={tabValue === 'current' || tabValue === 'old'}
              />
            </DatePickerWrapper>
          </Grid>

          <Grid
            item
            lg={0.35}
            md={0.35}
            marginBottom={1}
            display={{ xs: 'none', lg: 'block', md: 'block' }}
          >
            〜
          </Grid>

          {/* Filter End Shipping */}
          <Grid item md={3} lg={3} xs={12}>
            <DatePickerWrapper>
              <DatePicker
                id="requireAtTo"
                showYearDropdown
                showMonthDropdown
                selected={filter?.requireAtTo}
                placeholderText="YYYY/MM/DD"
                dateFormat="yyyy/MM/dd"
                onChange={handleChange('requireAtTo')}
                customInput={<CustomDateInput fullWidth />}
                disabled={tabValue === 'current' || tabValue === 'old'}
              />
            </DatePickerWrapper>
          </Grid>
        </Grid>
        <Grid item md={2} lg={2} xs={2}>
          <Button
            fullWidth
            color="warning"
            variant="contained"
            size="small"
            onClick={handleDownloadShippingSlip}
          >
            納品書 一括ダウンロード
          </Button>
        </Grid>
      </Grid>

      <Grid item container spacing={5} alignItems="flex-end">
        <Grid item lg={10} md={10} xs={12}>
          <Grid item md={5} lg={5} xs={12}>
            <DropdownCustomerFacilities
              defaultValue={filter?.customerFacility}
              value={filter?.customerFacility}
              onChange={handleChange('customerFacility')}
            />
          </Grid>
        </Grid>
        <Grid item md={2} lg={2} xs={2}>
          <Button
            fullWidth
            color="warning"
            variant="contained"
            size="small"
            onClick={handleDownloadShippingInstruction}
          >
            発送指示書 CSVダウンロード
          </Button>
        </Grid>
      </Grid>

      <Grid item container xs={12} justifyContent="center">
        <Grid item xs={2}>
          <Button
            fullWidth
            color="warning"
            variant="contained"
            onClick={handleSearch}
          >
            検索
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FilterShippingList;
