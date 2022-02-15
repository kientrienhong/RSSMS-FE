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
  userState,
  getData,
  startOfWeek,
  endOfWeek,
  listSelectedOrder,
  setListSelectedOrder,
}) {
  const assignOrder = async () => {
    try {
      showLoading();
      const userIds = listStaffAssigned.map((e) => e.id);
      let currentSchedule;
      let listSelectedTime = listSelectedOrder?.map((e) => {
        if (e.isDelivery) {
          currentSchedule = e.deliveryDate;
          return { deliveryTime: e["deliveryTime"], orderId: e["id"] };
        } else {
          currentSchedule = e.returnDate;

          return { deliveryTime: e["returnTime"], orderId: e["id"] };
        }
      });
      const response = await assignSchedule(
        currentSchedule,
        listSelectedTime,
        userIds,
        userState.idToken
      );
      setListSelectedOrder([]);
      await getData(
        startOfWeek,
        endOfWeek,
        new Date(currentSchedule).toISOString()
      );
      handleClose();
      showSnackbar("success", "Assign delivery staff success");
    } catch (e) {
      console.log(e.response);
    } finally {
      hideLoading();
    }
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
          height: "90vh",
        }}
      >
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
        <Box
          sx={{
            width: "100%",
            marginTop: "5%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginTop: "8px",
            }}
            onClick={assignOrder}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
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
