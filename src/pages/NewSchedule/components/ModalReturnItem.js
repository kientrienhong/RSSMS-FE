import React from "react";
import {Box, Modal, Button, Typography} from "@material-ui/core";
import {STYLE_MODAL} from "../../../constant/style";
import {connect} from "react-redux";
import {updateIsPaidRequest} from "../../../apis/Apis";
import * as action from "../../../redux/action/action";
const styleModal = {
  ...STYLE_MODAL,
  width: "50%",
};

function ModalReturnItem({
  open,
  handleClose,
  currentRequest,
  userState,
  showLoading,
  hideLoading,
  showSnackbar,
  requestDetail,
}) {
  const buildInformation = (title, value) => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          height: "40px",
        }}
      >
        <Typography
          color="black"
          variant="h4"
          sx={{
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <p style={{fontSize: "18px"}}>{value}</p>
      </Box>
    );
  };

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
          Detail Return Order Request
        </Typography>
        <Box
          sx={{
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Typography
            color="black"
            variant="h2"
            style={{
              marginTop: "2%",
              textAlign: "left",
            }}
          >
            Order information
          </Typography>
          {buildInformation("Id:", `#${currentRequest?.id}`)}
          {buildInformation("Created Date:", `${requestDetail?.createdDate}`)}
          {buildInformation("Return date:", `${requestDetail?.returnDate}`)}
          {buildInformation("Return time:", `${requestDetail?.returnTime}`)}
          {buildInformation(
            "Return address:",
            `${requestDetail?.returnAddress}`
          )}
        </Box>
        <Button
          style={{
            height: "45px",
            paddingLeft: "16px",
            paddingRight: "16px",
          }}
          onClick={async () => {
            try {
              showLoading();
              const response = await updateIsPaidRequest(
                currentRequest.id,
                userState.idToken
              );
              console.log(response);
              showSnackbar("success", "Update success");
            } catch (error) {
              console.log(error?.response);
            } finally {
              hideLoading();
            }
          }}
          color="primary"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalReturnItem);
