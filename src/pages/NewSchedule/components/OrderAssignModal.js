import React from "react";
import {STYLE_MODAL} from "../../../constant/style";
import ListStaff from "../../Storage/components/ListStaff";
import {Box, Modal, Button} from "@material-ui/core";
import {connect} from "react-redux";
import {assignSchedule} from "../../../apis/Apis";

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
  listScheduleWholeWeek,
}) {
  const assignOrder = async () => {
    try {
      showLoading();
      const userIds = listStaffAssigned.map((e) => e.id);
      let currentSchedule;
      let listSelectedTime = listSelectedOrder?.map((e) => {
        let remainingRequest = 0;

        listScheduleWholeWeek[
          new Date(e.deliveryDate).toLocaleDateString("en-US")
        ].listSchedule
          .get(e.deliveryTime)
          .filter((eF) => eF.id !== e.id)
          .forEach((e1) => {
            if (!e1.listStaffDelivery) {
              remainingRequest++;
            }
          });

        return {
          scheduleTime: e.deliveryTime,
          orderId: e.orderId,
          requestId: e.id,
          requestRemain: remainingRequest,
          deliveryAddress: e.deliveryAddress,
        };
      });
      currentSchedule = listSelectedOrder[0]?.deliveryDate;
      await assignSchedule(
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
      showSnackbar("success", "Phân công thành công");
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
        height: "auto",
        width: "86%",
      }}
      sx={{left: "7%", top: "0%", zIndex: "9999999 !important"}}
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
          width: "80%",
          height: "auto",
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
            name="Số nhân viên được phân công"
            addAssignStaff={addAssignStaff}
            removeAssignStaff={removeAssignStaff}
            onHandleSearch={handleChangeSearchAssigned}
          />
          <ListStaff
            listStaff={listShowStaffUnAssigned}
            isAssigned={false}
            name="Số nhân viên chưa được phân công"
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
            alignItems: "center",
          }}
        >
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            onClick={assignOrder}
            color="primary"
            variant="contained"
          >
            Xác nhận
          </Button>
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginLeft: "3%",
            }}
            onClick={handleClose}
            color="error"
            variant="outlined"
          >
            Đóng
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
