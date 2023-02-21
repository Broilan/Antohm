import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import React from 'react';

import SettingsAcc from './SettingsAcc';
import SettingsSafety from "./SettingsSafety"
import SettingsNotifs from './SettingsNotifs';
import SettingsChat from './SettingsChat';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function Settings() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
    <div style={{ width: "100%", backgroundColor:"#F2F2F2"}}>
      <Box sx={{ width: "100%", backgroundColor:"#F2F2F2", boxShadow:"0 0 8px" }}>
        <Box sx={{borderColor: 'divider', width: "100%", backgroundColor:"#F2F2F2" }}>
          <Tabs sx={{ backgroundColor:"#F2F2F2" }} value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Account" {...a11yProps(0)} />
            <Tab label="Safety" {...a11yProps(1)} />
            <Tab label="Notifications" {...a11yProps(2)} />
            <Tab label="Chats" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
        <SettingsAcc />
        </TabPanel>
        <TabPanel value={value} index={1}>
        <SettingsSafety />
        </TabPanel>
        <TabPanel value={value} index={2}>
        <SettingsNotifs />
        </TabPanel>
        <TabPanel value={value} index={3}>
        <SettingsChat />
        </TabPanel>
      </Box>
      </div>
    );
  }