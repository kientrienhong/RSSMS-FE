import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Typography, Box, Button, Grid } from "@material-ui/core";
import CustomInput from "../../../components/CustomInput";
import CustomAreaInput from "../../../components/CustomAreaInput";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { createSpace, updateShelf } from "../../../apis/Apis";
function FormSelfStorage({
  isEdit,
  currentSpace,
  setCurrentSpace,
  getData,
  page,
  showLoading,
  hideLoading,
  showSnackbar,
  areaId,
  searchName,
  handleClose,
  listSelfStorage,
  userState,
}) {
  const { handleSubmit, control } = useForm();
  const [error, setError] = useState({});

  useEffect(() => {}, [currentSpace]);

  const onHandleEditShelf = async (data) => {
    try {
      showLoading();

      const shelf = {
        type: 2,
        name: data.name,
        width: parseInt(data.width),
        height: parseInt(data.height),
        length: parseInt(data.length),
      };
      await updateShelf(currentSpace.id, shelf, userState.idToken);
      await getData(searchName, page, 4);
      showSnackbar("success", "Update storage success");
      handleClose();
    } catch (e) {
      console.log(e.response);
      setError({ msg: e.response.data.error.message });
    } finally {
      hideLoading();
    }
  };

  const onHandleCreateShelf = async (data, areaId) => {
    try {
      showLoading();

      const shelf = {
        type: 2,
        name: data.name,
        width: parseInt(data.width),
        height: parseInt(data.height),
        length: parseInt(data.length),
      };
      await createSpace(shelf, areaId, userState.idToken);
      await getData(searchName, page, 4);
      showSnackbar("success", "Create storage success");
      handleClose();
    } catch (e) {
      console.log(e.response);
      setError({ msg: e.response.data.error.message });
    } finally {
      hideLoading();
    }
  };

  const onSubmit = async (data) => {
    if (isEdit === false) {
      await onHandleCreateShelf(data, areaId);
    } else {
      await onHandleEditShelf(data);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "2%",
        }}
      >
        <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
          Tên
        </Typography>
        <CustomInput
          control={control}
          rules={{ required: "*Vui lòng nhập" }}
          styles={{ width: "400px" }}
          name="name"
          label="Tên"
          userInfo={currentSpace?.name}
          inlineStyle={{ marginTop: "2%" }}
        />
      </Box>
      <Typography
        color="black"
        variant="h2"
        sx={{ textAlign: "left", marginTop: "2%" }}
      >
        Kích thước
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "70%",
          marginTop: "1%",
        }}
      >
        <Grid item xs={4}>
          <CustomInput
            control={control}
            rules={{
              required: "*Vui lòng nhập",
              pattern: {
                value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                message: "*Vui lòng nhập đúng chiều dài",
              },
            }}
            name="length"
            label="Chiều dài (m)"
            userInfo={currentSpace?.length}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomInput
            control={control}
            rules={{
              required: "*Vui lòng nhập",
              pattern: {
                value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                message: "*Vui lòng nhập đúng chiều rộng",
              },
            }}
            name="width"
            label="Chiều rộng (m)"
            userInfo={currentSpace?.width}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomInput
            control={control}
            rules={{
              required: "*Vui lòng nhập",
              pattern: {
                value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                message: "*Vui lòng nhập đúng chiều cao",
              },
            }}
            name="height"
            label="Chiều cao (m)"
            userInfo={currentSpace?.height}
          />
        </Grid>
      </Grid>

      {error?.submit?.msg ? (
        <p style={{ textAlign: "center", color: "red" }}>
          {error?.submit?.msg}
        </p>
      ) : null}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <Button
          color="primary"
          type="submit"
          variant="contained"
          sx={{
            marginRight: "8px",
          }}
        >
          Xác nhận
        </Button>
        <Button
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

export default connect(mapStateToProps, mapDispatchToProps)(FormSelfStorage);
