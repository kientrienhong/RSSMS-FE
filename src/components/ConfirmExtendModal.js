import React from "react";
import {Box, Modal, Button, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import * as action from "../redux/action/action";
import {STYLE_MODAL} from "../constant/style";
const styleModal = {
  ...STYLE_MODAL,

  width: "25%",
};

function ConfirmExtendSessionModal({
  onHandleYes,
  id,
  showLoading,
  hideLoading,
  showSnackbar,
  msg,
  msgTitle,
  isOpenExtendSession,
  handleExtendSession,
}) {
  const handleClose = () => {
    handleExtendSession(false);
  };

  return (
    <Modal
      open={isOpenExtendSession}
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
          {msgTitle ? msgTitle : "Bạn đã chắc chắn?"}
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
              marginRight: "16%",
            }}
            onClick={async () => {
              try {
                showLoading();
                await onHandleYes(id);
                handleClose();
                showSnackbar("success", msg);
              } catch (error) {
                console.log(error);

                console.log(error?.response);
                showSnackbar("error", error?.response?.data?.error?.message);
              } finally {
                hideLoading();
              }
            }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Xác nhận
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
            Không
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  isOpenExtendSession: state.application.isOpenExtendSession,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    handleExtendSession: (isOpen) =>
      dispatch(action.handleExtendSession(isOpen)),

    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmExtendSessionModal);
