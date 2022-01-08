import React from "react";
import { Box, Modal, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../redux/action/action";
import { STYLE_MODAL } from "../constant/style";
const styleModal = {
  ...STYLE_MODAL,

  width: "20%",
};

function ConfirmModal({
  open,
  handleClose,
  onHandleYes,
  id,
  showLoading,
  hideLoading,
  showSnackbar,
  msg,
  msgError,
}) {
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
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{
            marginTop: "2%",
            textAlign: "left",
            marginLeft: "2.5%",
          }}
        >
          Are you sure?
        </Typography>
        <Box
          sx={{
            width: "60%",
            margin: "40px auto 10px auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            onClick={async () => {
              try {
                showLoading();
                let response = await onHandleYes(id);
                handleClose();
                showSnackbar("success", msg);
              } catch (error) {
                console.log(error);
                showSnackbar("error", msgError);
              } finally {
                hideLoading();
              }
            }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Yes
          </Button>
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            onClick={() => handleClose()}
            color="error"
            variant="outlined"
          >
            No
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
export default connect(null, mapDispatchToProps)(ConfirmModal);
