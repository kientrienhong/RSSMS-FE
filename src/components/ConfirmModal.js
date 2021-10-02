import React from "react";
import { Box, Modal, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../redux/action/action";
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "20%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function ConfirmModal({
  open,
  handleClose,
  onHandleYes,
  id,
  showLoading,
  hideLoading,
  showSnackbar,
  listData,
  setListData,
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
                const response = await onHandleYes(id);
                console.log(response);
                if (response.status === 200) {
                  handleClose();
                  setListData(listData.filter((e) => e.id !== id));
                  showSnackbar({
                    typeSnackbar: "success",
                    msgSnackbar: "Delete user successful!",
                  });
                }
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
    showSnackbar: (msg) => dispatch(action.showSnackbar(msg)),
  };
};
export default connect(null, mapDispatchToProps)(ConfirmModal);
