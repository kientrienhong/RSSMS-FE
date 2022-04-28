import React, {useState} from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  Select,
  MenuItem,
} from "@material-ui/core";
import {STYLE_MODAL} from "../../../constant/style";
import * as action from "../../../redux/action/action";
import {connect} from "react-redux";
import {useForm} from "react-hook-form";
import {ErrorHandle} from "../../../utils/ErrorHandle";
import {cancelRequest, updateRequestWithNote} from "../../../apis/Apis";
import CustomAreaInput from "../../../components/CustomAreaInput";
const styleModal = {
  ...STYLE_MODAL,

  width: "25%",
};

function CancelRequest({
  handleClose,
  isOpen,
  showLoading,
  hideLoading,
  userState,
  showSnackbar,
  currentRequest,
  handleExtendSession,
  changeIsLoadRequest,
}) {
  const [status, setStatus] = useState(0);

  const onSubmit = async (data) => {
    try {
      showLoading();

      if (status === 0) {
        const response = await cancelRequest(
          currentRequest.id,
          userState.idToken,
          data.note
        );

        if (response.status === 200) {
          showSnackbar("success", "Hủy yêu cầu thành công");
          changeIsLoadRequest();
        }
      } else {
        const response = await updateRequestWithNote(
          5,
          data.note,
          currentRequest.id,
          userState.idToken
        );
        if (response.status === 200) {
          showSnackbar("success", "Hủy yêu cầu thành công");
          changeIsLoadRequest();
        }
      }

      handleClose();
    } catch (error) {
      ErrorHandle.handle(error, showSnackbar, handleExtendSession);
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  const handleChange = (event) => {
    setStatus(parseInt(event.target.value));
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
            Hủy yêu cầu
          </Typography>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: "2%",
            }}
          >
            <p
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Trạng thái yêu cầu
            </p>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              onChange={handleChange}
            >
              <MenuItem value={0}>Hủy</MenuItem>
              <MenuItem value={5}>Khách không có mặt</MenuItem>
            </Select>
          </Box>
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
    changeIsLoadRequest: () => dispatch(action.changeIsLoadRequest()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CancelRequest);
