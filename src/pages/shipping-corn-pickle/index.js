import { useState } from 'react';

import ShippingTable from 'src/@core/components/shipping-menu/table/ShippingTable';
import FilterShippingSingle from 'src/@core/components/shipping-single/FilterShippingSingle';
import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Grid, Tab } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const TYPE = 'ADD';

const ShippingSingle = () => {
  const [params, setParams] = useState({
    type: TYPE,
    customerFacility: {},
    workAtFrom: getFormattedParamsDate(firstDateCurrentMonth),
    workAtTo: getFormattedParamsDate(lastDateCurrentMonth)
  });
  const [value, setValue] = useState('all');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="出荷管理ページ（コーンと漬物）" />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterShippingSingle
              value={value}
              setParams={setParams}
              tabValue={value}
              type={TYPE}
            />
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="lab API tabs example"
                  >
                    <Tab label="全部" value="all" />
                    <Tab label="本日" value="current" />
                    <Tab label="本日完了" value="old" />
                  </TabList>
                </Box>
                <TabPanel value="all">
                  <ShippingTable
                    type="all"
                    params={params}
                    tabValue={value}
                    showGenerateBtn={false}
                    disableSelectCategory
                    dateKey="work"
                  />
                </TabPanel>
                <TabPanel value="current">
                  <ShippingTable
                    type="current"
                    params={params}
                    tabValue={value}
                    showGenerateBtn={false}
                    disableSelectCategory
                    dateKey="work"
                  />
                </TabPanel>
                <TabPanel value="old">
                  <ShippingTable
                    type="old"
                    params={params}
                    tabValue={value}
                    showGenerateBtn={false}
                    disableSelectCategory
                    dateKey="work"
                  />
                </TabPanel>
              </TabContext>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ShippingSingle;
