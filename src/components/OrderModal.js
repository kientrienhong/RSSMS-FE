import React from "react";
import {Box, Modal, Tabs, Tab} from "@material-ui/core";
import TabPanel from "./TabPanel";

import InformationOrder from "./InformationOrder";
import ItemTab from "./ItemTab";
import ListInfoHistoryExtension from "./ListInfoHistoryExtension";
const styleModal = {
  position: "absolute",
  top: "6%",
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
          height: "auto",
          maxHeight: "80%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "column",
          pading: "3%",
        }}
      >
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{
              marginBottom: "2%",
            }}
          >
            <Tab label="Thông tin đơn" />
            {currentOrder?.type === 1 ? <Tab label="Đồ đạc" /> : <></>}
            {currentOrder?.orderHistoryExtensions?.length > 0 ? (
              <Tab label="Lịch sử gia hạn" />
            ) : (
              <></>
            )}
          </Tabs>
        </Box>
        <TabPanel
          value={value}
          index={0}
          style={{
            width: "100%",
          }}
          sx={{
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
        {currentOrder?.type === 1 ? (
          <TabPanel
            value={value}
            index={1}
            style={{
              width: "100%",
            }}
            sx={{
              width: "100%",
            }}
          >
            <ItemTab listOrderDetail={currentOrder?.orderDetails} />{" "}
          </TabPanel>
        ) : (
          <></>
        )}

        {currentOrder?.orderHistoryExtensions?.length > 0 ? (
          <TabPanel value={value} index={2}>
            <ListInfoHistoryExtension
              list={currentOrder?.orderHistoryExtensions}
              currentOrder={currentOrder}
            />
          </TabPanel>
        ) : (
          <></>
        )}
      </Box>
    </Modal>
  );
}
