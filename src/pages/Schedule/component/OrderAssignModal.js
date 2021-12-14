import React from "react";
import { STYLE_MODAL } from "../../../constant/style";
import ListStaff from "../../Storage/components/ListStaff";
import { Box, Modal, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { assignSchedule } from "../../../apis/Apis";

import * as action from "../../../redux/action/action";
const styleModal = STYLE_MODAL;

function OrderAssignModal({
  open,
  handleClose,
  removeAssignStaff,
  addAssignStaff,
  handleChangeSearchAssigned,
  handleChangeSearchUnAssigned,
  listShowStaffAssigned,
  listShowStaffUnAssigned,
  listStaffAssigned,
  showSnackbar,
  showLoading,
  hideLoading,
  currentOrder,
  currentListSchedule,
  userState,
  setCurrentListSchedule,
  getData,
  startOfWeek,
  endOfWeek,
}) {
  const assignOrder = async () => {
    try {
      showLoading();
      let dateStart = new Date(currentListSchedule.StartTime);
      let dateEnd = new Date(currentListSchedule.EndTime);
      let dateSchedule = dateStart.toISOString().split("T")[0];
      dateStart = dateStart.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });
      dateEnd = dateEnd.toLocaleString("en-US", {
        hour: "numeric",
        hour12: true,
      });
      dateStart = dateStart.split(" ").join("").toLowerCase();
      dateEnd = dateEnd.split(" ").join("").toLowerCase();
      const deliveryTime = `${dateStart} - ${dateEnd}`;
      const userIds = listStaffAssigned.map((e) => e.id);
      const response = await assignSchedule(
        currentOrder.id,
        dateSchedule,
        deliveryTime,
        userIds,
        userState.idToken
      );
      const currentListScheduleTemp = { ...currentListSchedule };
      const indexFound = currentListScheduleTemp.ListOrder.findIndex(
        (e) => e.id === currentOrder.id
      );
      currentListScheduleTemp.ListOrder[indexFound].listStaffDelivery =
        response.data[0].users;
      setCurrentListSchedule(currentListScheduleTemp);
      await getData(startOfWeek, endOfWeek);
      handleClose();
      showSnackbar("success", "Assign delivery staff success");
    } catch (e) {
      console.log(e.response);
    } finally {
      hideLoading();
    }
  };

  const buildInfoValue = (title, value) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          margin: 0,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography color="black" variant="h3">
          {title}
        </Typography>
        <p
          style={{
            textAlign: "right",
          }}
        >
          {value}
        </p>
      </Box>
    );
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        height: "50%",
        width: "86%",
      }}
      sx={{ left: "7%", top: "25%", zIndex: "9999999 !important" }}
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "80%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "48%",
              marginRight: "2%",
            }}
          >
            {buildInfoValue("Order Id: ", `#${currentOrder?.id}`)}
            {buildInfoValue("Customer name: ", currentOrder?.customerName)}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "48%",
            }}
          >
            {buildInfoValue("Customer phone: ", currentOrder?.customerPhone)}
            {currentOrder.isDelivery === true
              ? buildInfoValue(
                  "Delivery return: ",
                  currentOrder?.addressDelivery
                )
              : buildInfoValue("Address return: ", currentOrder?.addressReturn)}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <ListStaff
            listStaff={listShowStaffAssigned}
            isAssigned={true}
            name="Staffs belong to this storage"
            addAssignStaff={addAssignStaff}
            removeAssignStaff={removeAssignStaff}
            onHandleSearch={handleChangeSearchAssigned}
          />
          <ListStaff
            listStaff={listShowStaffUnAssigned}
            isAssigned={false}
            name="Staffs are not assigned yet"
            addAssignStaff={addAssignStaff}
            removeAssignStaff={removeAssignStaff}
            onHandleSearch={handleChangeSearchUnAssigned}
          />
        </Box>
        {currentOrder.status === 2 ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginTop: "4%",
              }}
              onClick={assignOrder}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderAssignModal);
