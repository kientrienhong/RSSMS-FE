import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {Typography, Box, Button, Grid} from "@material-ui/core";
import CustomInput from "../../../components/CustomInput";
import CustomAreaInput from "../../../components/CustomAreaInput";
import {connect} from "react-redux";
import * as action from "../../../redux/action/action";
import {createSpace, updateShelf} from "../../../apis/Apis";
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
  isView,
}) {
  const {handleSubmit, control, reset} = useForm();
  const [error, setError] = useState({});

  useEffect(() => {
    reset({
      floorWidth: currentSpace?.floorWidth,
      floorHeight: currentSpace?.floorHeight,
      floorLength: currentSpace?.floorLength,
      name: currentSpace.name,
    });
  }, [currentSpace]);

  const onHandleEditShelf = async (data) => {
    try {
      showLoading();

      const shelf = {
        type: 2,
        name: data.name,
        floorWidth: parseInt(data.floorWidth),
        floorLength: parseInt(data.floorLength),
        floorHeight: parseInt(data.floorHeight),
      };
      await updateShelf(currentSpace.id, shelf, userState.idToken);
      await getData(searchName, page, 4);
      showSnackbar("success", "Cập nhật kho thành công");
      handleClose();
    } catch (e) {
      console.log(e.response);
      setError({msg: e.response.data.error.message});
    } finally {
      hideLoading();
    }
  };

  const onHandleCreateShelf = async (data, areaId) => {
    try {
      showLoading();

      const shelf = {
        type: 1,
        name: data.name,
        floorWidth: parseInt(data.floorWidth),
        floorLength: parseInt(data.floorLength),
        floorHeight: parseInt(data.floorHeight),
      };
      await createSpace(shelf, areaId, userState.idToken);
      await getData(searchName, page, 4);
      showSnackbar("success", "Tạo kho thành công");
      handleClose();
    } catch (e) {
      console.log(e?.response?.data?.error?.message);
      if (e?.response?.data?.error?.message)
        showSnackbar("error", e.response.data.error.message);

      // setError({submit: {msg: e.response.data.error.message}});
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
      }}
    >
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
        <Typography color="black" variant="h2" sx={{textAlign: "left"}}>
          Tên
        </Typography>
        <CustomInput
          control={control}
          rules={{required: "*Vui lòng nhập"}}
          styles={{width: "400px"}}
          name="name"
          label="Tên"
          disabled={isView}
          userInfo={currentSpace?.name}
          inlineStyle={{marginTop: "2%"}}
        />
      </Box>
      <Typography
        color="black"
        variant="h2"
        sx={{textAlign: "left", marginTop: "4%"}}
      >
        Kích thước
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          marginTop: "2%",
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
            name="floorLength"
            disabled={isView}
            label="Chiều dài (m)"
            userInfo={currentSpace?.floorLength}
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
            name="floorWidth"
            disabled={isView}
            label="Chiều rộng (m)"
            userInfo={currentSpace?.floorWidth}
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
            name="floorHeight"
            disabled={isView}
            label="Chiều cao (m)"
            userInfo={currentSpace?.floorHeight}
          />
        </Grid>
      </Grid>

      {error?.submit?.msg ? (
        <p style={{textAlign: "center", color: "red"}}>{error?.submit?.msg}</p>
      ) : null}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "4%",
        }}
      >
        {isView ? (
          <></>
        ) : (
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
        )}

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
