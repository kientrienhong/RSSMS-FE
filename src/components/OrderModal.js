import React from "react";
import {
  Box,
  Modal,
  Tabs,
  Tab,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Button,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import TabPanel from "./TabPanel";

import InformationOrder from "./InformationOrder";
const styleModal = {
  position: "absolute",
  top: "1%",
  right: "10%",
  width: "80%",
  height: "92vh",
  overflow: "hidden",
  overflowY: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function OrderModal({
  open,
  handleClose,
  currentOrder,
  handleSubmit,
  control,
  reset,
  getData,
  page,
  searchId,
}) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          pading: "3%",
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Thông tin đơn" />
            <Tab label="Đồ đạc" />
            <Tab label="Lịch sử gia hạn" />
          </Tabs>
        </Box>
        <TabPanel
          value={value}
          index={0}
          style={{
            width: "100%",
          }}
        >
          <InformationOrder
            currentOrder={currentOrder}
            handleSubmit={handleSubmit}
            control={control}
            reset={reset}
            handleClose={handleClose}
            getData={getData}
            page={page}
            searchId={searchId}
          />
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
        <TabPanel value={value} index={2}></TabPanel>
      </Box>
    </Modal>
  );
}
