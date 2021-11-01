import React, { useState } from "react";
import { Box, Typography, Modal, Button } from "@material-ui/core";
import { moveBoxApi } from "../../../apis/Apis";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { STYLE_MODAL } from "../../../constant/style";
const styleModal = {
  ...STYLE_MODAL,
  width: "30%",
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
  const [error, setError] = useState(false);

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
        {error ? <p style={{ color: "red" }}>{error}</p> : null}

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

                if (
                  moveBox.shelfType !== currentBox.shelfType &&
                  moveBox.boxSize !== currentBox.boxSize
                ) {
                  setError("You must move to same size");
                  return;
                }
                let boxTemp = {
                  orderId: moveBox.orderId,
                  boxId: moveBox.boxId,
                  newBoxId: currentBox.id,
                };
                await moveBoxApi(boxTemp);
                setError();
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
            onClick={() => {
              emptyMoveBox();
              handleClose();
            }}
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
