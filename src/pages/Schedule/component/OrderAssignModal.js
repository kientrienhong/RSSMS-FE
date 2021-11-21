import React from "react";
import { STYLE_MODAL } from "../../../constant/style";
import ListStaff from "../../Storage/components/ListStaff";
import { Box, Modal, Grid, Radio, Typography, Button } from "@material-ui/core";
import { connect } from "react-redux";
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
  showSnackbar,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      style={{
        zIndex: "99999999999 !important",

        width: "70%",
      }}
      sx={{ left: "16%", zIndex: "99999999999 !important" }}
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
            justifyContent: "space-between",
            width: "100%",
            marginTop: "3%",
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
            onClick={() => {
              handleClose();
              showSnackbar("success", "Assign delivery staff success");
            }}
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

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(null, mapDispatchToProps)(OrderAssignModal);
