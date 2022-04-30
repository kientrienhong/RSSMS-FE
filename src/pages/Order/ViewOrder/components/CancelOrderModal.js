import React, {useState} from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Select,
  MenuItem,
} from "@material-ui/core";
import {STYLE_MODAL} from "../../../../constant/style";
import * as action from "../../../../redux/action/action";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {ErrorHandle} from "../../../../utils/ErrorHandle";
import {cancelOrder, doneOrder} from "../../../../apis/Apis";
import CustomAreaInput from "../../../../components/CustomAreaInput";
const styleModal = {
  ...STYLE_MODAL,

  width: "25%",
};

function CancelOrderModal({
  handleClose,
  isOpen,
  showLoading,
  hideLoading,
  userState,
  showSnackbar,
  currentOrder,
  handleExtendSession,
  changeIsLoadOrder,
}) {
  const onSubmit = async (data) => {
    try {
      showLoading();
      let response;
      if (
        currentOrder.status === 2 ||
        currentOrder.status === 3 ||
        currentOrder.status === 4
      ) {
        const request = currentOrder.requests.find((e) => e.type === 1);
        response = await doneOrder(
          currentOrder.id,
          request.id,
          userState.idToken,
          0
        );
      }
      response = await cancelOrder(
        currentOrder.id,
        data.note,
        userState.idToken
      );

      if (response.status === 200) {
        showSnackbar("success", "Hủy đơn thành công");
        changeIsLoadOrder();
      }

      handleClose();
    } catch (error) {
      ErrorHandle.handle(error, showSnackbar, handleExtendSession);
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  const {handleSubmit, control} = useForm();

  return (
    <Modal
      open={isOpen}
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
          width: "40%",
          flexDirection: "column",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
          }}
        >
          <Typography
            color="black"
            variant="h2"
            style={{
              marginTop: "2%",
              textAlign: "center",
            }}
          >
            Hủy đơn
          </Typography>

          <p
            style={{
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            Ghi chú
          </p>
          <CustomAreaInput
            control={control}
            rules={{}}
            styles={{width: "700px"}}
            name="note"
            inlineStyle={{}}
          />
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
        </form>
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
    handleExtendSession: (type, msg) =>
      dispatch(action.handleExtendSession(type, msg)),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    changeIsLoadOrder: () => dispatch(action.changeIsLoadOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelOrderModal);
