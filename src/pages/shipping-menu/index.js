import { useState } from 'react';

import FilterShippingMenu from 'src/@core/components/shipping-menu/FilterShippingMenu';
import ShippingTable from 'src/@core/components/shipping-menu/table/ShippingTable';
import {
  firstDateCurrentMonth,
  getFormattedParamsDate,
  lastDateCurrentMonth
} from 'src/@core/utils/helper';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Box, Grid, Tab } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

const ShippingMenu = () => {
  const [params, setParams] = useState({
    type: 'MENU',
    customerFacility: {},
    requireAtFrom: getFormattedParamsDate(firstDateCurrentMonth),
    requireAtTo: getFormattedParamsDate(lastDateCurrentMonth),
    menuDate: {
      id: 1,
      value: 'require',
      key: 'Menu Date'
    }
  });
  const [value, setValue] = useState('all');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="出荷管理ページ（献立）" />
          <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
            <FilterShippingMenu setParams={setParams} tabValue={value} />
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange}>
                    <Tab label="全部" value="all" />
                    <Tab label="本日" value="current" />
                    <Tab label="本日完了" value="old" />
                  </TabList>
                </Box>
                <TabPanel value="all">
                  <ShippingTable type="all" params={params} tabValue={value} />
                </TabPanel>
                <TabPanel value="current">
                  <ShippingTable
                    type="current"
                    params={params}
                    tabValue={value}
                  />
                </TabPanel>
                <TabPanel value="old">
                  <ShippingTable type="old" params={params} tabValue={value} />
                </TabPanel>
              </TabContext>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ShippingMenu;
