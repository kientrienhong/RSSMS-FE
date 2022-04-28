import React from "react";
import {Box, Modal, Typography, MenuItem, Button} from "@material-ui/core";
import CustomSelect from "./CustomSelect";
import {useForm} from "react-hook-form";
import {LIST_STATUS_ORDER_SELECT} from "../constant/constant";
import {updateStatusOrder, doneOrder} from "../apis/Apis";
import * as action from "../redux/action/action";
import {connect} from "react-redux";

const styleModal = {
  position: "absolute",
  top: "30%",
  left: "27%",
  width: "50%",
  height: "auto",
  overflow: "hidden",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};
function UpdateOrderModal({
  open,
  handleClose,
  currentOrder,
  userState,
  showLoading,
  hideLoading,
  showSnackbar,
  getData,
  searchId,
  page,
}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm();

  const onSubmit = async (data) => {
    try {
      showLoading();
      let foundRequest = currentOrder?.requests?.find((e) => e.type === 1);
      if (data.status === 5) {
        await doneOrder(
          currentOrder?.id,
          foundRequest.id,
          userState.idToken,
          5
        );
      } else {
        await updateStatusOrder(
          currentOrder?.id,
          data.status,
          userState.idToken
        );
      }

      await getData(searchId, page, 8);
      showSnackbar("success", "Cập nhật tình trạng đơn thành công");
      handleClose();
    } catch (error) {
      console.log(error?.response);
      showSnackbar("error", error?.response?.data?.error?.message);
    } finally {
      hideLoading();
    }
  };
  const buildDropDown = (listSizeStorage) =>
    listSizeStorage.map((e) => <MenuItem value={e.value}>{e.name}</MenuItem>);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            color="black"
            variant="h2"
            style={{
              textAlign: "left",
              marginLeft: "2.5%",
              marginBottom: "10%",
            }}
          >
            Cập nhật tình trạng đơn
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Typography
              color="black"
              variant="h2"
              style={{
                textAlign: "left",
                marginLeft: "2.5%",
                marginBottom: "10%",
              }}
            >
              Tình trạng đơn
            </Typography>
            <CustomSelect
              label="Loại"
              name="status"
              control={control}
              errors={errors}
              defaultValue={currentOrder?.status}
              errorMsg={"*Vui lòng chọn"}
            >
              {buildDropDown(LIST_STATUS_ORDER_SELECT)}
            </CustomSelect>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginRight: "16px",
              }}
              type="submit"
              color="primary"
              variant="contained"
            >
              Xác nhận
            </Button>
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
                marginLeft: "16px",
              }}
              onClick={() => {
                handleClose();
              }}
              color="error"
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateOrderModal);
