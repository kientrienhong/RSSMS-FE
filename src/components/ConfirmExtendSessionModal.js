import React from "react";
import {Box, Modal, Button, Typography} from "@material-ui/core";
import {connect} from "react-redux";
import * as action from "../redux/action/action";
import {STYLE_MODAL} from "../constant/style";
import {Navigate, useNavigate} from "react-router";
const styleModal = {
  ...STYLE_MODAL,

  width: "25%",
};

function ConfirmExtendSessionModal({
  showLoading,
  hideLoading,
  showSnackbar,
  isOpenExtendSession,
  handleExtendSession,
  emptyPlacedProduct,
  setUpCurrentStorage,
  setUpOrder,
  setUpUser,
}) {
  const handleClose = () => {
    handleExtendSession(false);
  };
  const navigate = useNavigate();
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
          {"Bạn đã hết phiên đăng nhập. Vui lòng đăng nhập lại"}
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
                await localStorage.removeItem("user");
                emptyPlacedProduct();
                setUpCurrentStorage({});
                setUpOrder({});
                setUpUser({});
                navigate("/", {replace: true});
                handleClose();
              } catch (error) {
                console.log(error);
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
    emptyPlacedProduct: () => dispatch(action.emptyPlacedProduct()),
    setUpCurrentStorage: (storage) =>
      dispatch(action.setUpCurrentStorage(storage)),
    setUpOrder: (order) => dispatch(action.setUpOrder(order)),
    setUpUser: (user) => dispatch(action.setUpUser(user)),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConfirmExtendSessionModal);
