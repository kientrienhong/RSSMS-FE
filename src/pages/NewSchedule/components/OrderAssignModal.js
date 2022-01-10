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
    // try {
    //   showLoading();
    //   let dateStart = new Date(currentListSchedule.StartTime);
    //   let dateEnd = new Date(currentListSchedule.EndTime);
    //   let dateSchedule = dateStart.toISOString().split("T")[0];
    //   dateStart = dateStart.toLocaleString("en-US", {
    //     hour: "numeric",
    //     hour12: true,
    //   });
    //   dateEnd = dateEnd.toLocaleString("en-US", {
    //     hour: "numeric",
    //     hour12: true,
    //   });
    //   dateStart = dateStart.split(" ").join("").toLowerCase();
    //   dateEnd = dateEnd.split(" ").join("").toLowerCase();
    //   const deliveryTime = `${dateStart} - ${dateEnd}`;
    //   const userIds = listStaffAssigned.map((e) => e.id);
    //   const response = await assignSchedule(
    //     currentOrder.id,
    //     dateSchedule,
    //     deliveryTime,
    //     userIds,
    //     userState.idToken
    //   );
    //   const currentListScheduleTemp = { ...currentListSchedule };
    //   const indexFound = currentListScheduleTemp.ListOrder.findIndex(
    //     (e) => e.id === currentOrder.id
    //   );
    //   currentListScheduleTemp.ListOrder[indexFound].listStaffDelivery =
    //     response.data[0].users;
    //   setCurrentListSchedule(currentListScheduleTemp);
    //   await getData(startOfWeek, endOfWeek);
    //   handleClose();
    //   showSnackbar("success", "Assign delivery staff success");
    // } catch (e) {
    //   console.log(e.response);
    // } finally {
    //   hideLoading();
    // }
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
            listStaff={[]}
            isAssigned={true}
            name="Staffs belong to this storage"
            addAssignStaff={addAssignStaff}
            removeAssignStaff={removeAssignStaff}
            onHandleSearch={handleChangeSearchAssigned}
          />
          <ListStaff
            listStaff={[]}
            isAssigned={false}
            name="Staffs are not assigned yet"
            addAssignStaff={addAssignStaff}
            removeAssignStaff={removeAssignStaff}
            onHandleSearch={handleChangeSearchUnAssigned}
          />
        </Box>
        {currentOrder?.status === 2 ? (
          <Box
            sx={{
              width: "100%",
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
