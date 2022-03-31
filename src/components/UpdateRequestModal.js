import React from "react";
import { Box, Modal, Button, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../redux/action/action";
import { STYLE_MODAL } from "../constant/style";
import { useForm } from "react-hook-form";
import CustomAreaInput from "../components/CustomAreaInput";
const styleModal = {
  ...STYLE_MODAL,

  width: "25%",
};
const styleInput = { marginRight: "2.5%", marginLeft: "2.5%" };

function UpdateRequestModal({ open, handleClose, onSubmit, title }) {
  const { handleSubmit, control } = useForm();

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
          height: "auto",
          maxHeight: "80%",
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          pading: "3%",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{
            marginBottom: "8%",
          }}
        >
          {title}
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CustomAreaInput
            control={control}
            rules={{
              required: "*Vui lòng nhập",
            }}
            styles={{ width: "400px" }}
            name="note"
            label="Ghi chú"
            disabled={false}
            userInfo={""}
            inlineStyle={styleInput}
          />
          <Box
            sx={{
              display: "flex",
              marginTop: "8%",
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              style={{
                height: "45px",
                width: "40%",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
              color="primary"
              type="submit"
              variant="contained"
            >
              Xác nhận
            </Button>
            <Button
              style={{
                height: "45px",
                width: "30%",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginLeft: "16px",
              }}
              color="error"
              onClick={() => {
                handleClose();
              }}
              variant="outlined"
            >
              Đóng
            </Button>
          </Box>
        </form>
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
export default connect(null, mapDispatchToProps)(UpdateRequestModal);
