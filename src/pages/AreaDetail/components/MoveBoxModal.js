import React from "react";
import { Box, Grid, Typography, Modal, Button } from "@material-ui/core";
import { moveBoxApi } from "../../../apis/Apis";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function MoveBoxModal({
  open,
  handleClose,
  showLoading,
  hideLoading,
  showSnackbar,
  emptyMoveBox,
  changeIsLoadShelf,
  currentBox,
  moveBox,
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
          Are you want to move to this position?
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
              marginRight: "4%",
            }}
            onClick={async () => {
              try {
                showLoading();
                let boxTemp = { ...moveBox, newBoxId: currentBox.id };
                console.log(boxTemp);
                await moveBoxApi(boxTemp);
                showSnackbar("success", "Move success");
                emptyMoveBox();
                handleClose();
              } catch (e) {
                console.log(e);
              } finally {
                hideLoading();
                changeIsLoadShelf();
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
              marginRight: "4%",
            }}
            onClick={() => handleClose()}
            color="error"
            variant="outlined"
          >
            No
          </Button>
          <Button
            style={{
              height: "45px",
              width: "200px",
            }}
            sx={{ width: "auto" }}
            onClick={() => handleClose()}
            color="error"
            variant="contained"
          >
            Cancel moving box
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  currentBox: state.order.currentBox,
  moveBox: state.order.moveBox,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    emptyMoveBox: () => dispatch(action.emptyMoveBox()),
    changeIsLoadShelf: () => dispatch(action.changeIsLoadShelf()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoveBoxModal);
