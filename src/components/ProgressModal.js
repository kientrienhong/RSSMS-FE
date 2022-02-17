import React from "react";
import { Box, Modal, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../redux/action/action";
import { STYLE_MODAL } from "../constant/style";
const styleModal = {
  ...STYLE_MODAL,

  width: "20%",
};

function ProgressModal({ handleProgressModal, progressModal }) {
  const handleClose = () => {
    handleProgressModal(false);
  };

  return (
    <Modal
      open={progressModal?.isOpen}
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
          {progressModal?.title}
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
            onClick={() => {
              try {
                progressModal?.yesFunction();
              } catch (error) {
                console.log(error);
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
            onClick={() => progressModal?.noFunction()}
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

const mapStateToProps = (state) => ({
  progressModal: state.application.progressModal,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleProgressModal: (isOpen) =>
      dispatch(action.handleProgressModal(isOpen)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProgressModal);
