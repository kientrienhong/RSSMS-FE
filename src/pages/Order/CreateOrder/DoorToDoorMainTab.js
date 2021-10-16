import React, { useState } from "react";
import { Box } from "@material-ui/core";
import Item from "./components/Item";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PropTypes from "prop-types";
import TabPanel from "../../../components/TabPanel";
import BoxTab from "./components/BoxTab";
import AreaTab from "./components/AreaTab";

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function SelfStorageMainTab({
  listBoxes,
  listAreas,
  listServices,
  listAccessory,
  setChoosenProduct,
  setListServices,
  setListBoxes,
  setListAreas,
  setListAccessory,
  choosenProduct,
}) {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleChangeTab = async (event, newtabIndex) => {
    setTabIndex(newtabIndex);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Box sx={{ borderBottom: 1, border: "none", height: "10%" }}>
        <Tabs
          value={tabIndex}
          onChange={handleChangeTab}
          aria-label="basic tabs example"
        >
          <Tab label="Box Items" {...a11yProps(0)} />
          <Tab label="Area Items" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box sx={{ height: "90%" }}>
        <TabPanel value={tabIndex} index={0}>
          <BoxTab
            choosenProduct={choosenProduct}
            setListAccessory={setListAccessory}
            setListServices={setListServices}
            setListBoxes={setListBoxes}
            setChoosenProduct={setChoosenProduct}
            listBoxes={listBoxes}
            listServices={listServices}
            listAccessory={listAccessory}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <AreaTab
            choosenProduct={choosenProduct}
            setListAccessory={setListAccessory}
            setListServices={setListServices}
            setListAreas={setListAreas}
            setChoosenProduct={setChoosenProduct}
            listAreas={listAreas}
            listServices={listServices}
            listAccessory={listAccessory}
          />
        </TabPanel>
      </Box>
    </Box>
  );
}
