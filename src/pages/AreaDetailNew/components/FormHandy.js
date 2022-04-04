import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {
  Typography,
  Box,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Select,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import CustomInput from "../../../components/CustomInput";
import {connect} from "react-redux";
import * as action from "../../../redux/action/action";
import {createSpace, updateShelf} from "../../../apis/Apis";

function FormHandy({
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
  userState,
  isView,
}) {
  const {handleSubmit, control, reset} = useForm();

  const [error, setError] = useState({});

  const onHandleCreateShelf = async (data, areaId) => {
    try {
      showLoading();
      const shelf = {
        type: currentSpace.type,
        name: data.name,
        floorWidth: parseInt(data.floorWidth),
        floorHeight: parseInt(data.floorHeight),
        floorLength: parseInt(data.floorLength),
        numberOfFloor: parseInt(data.numberOfFloor),
      };
      await createSpace(shelf, areaId, userState.idToken);
      await getData(searchName, page, 4);
      showSnackbar("success", "Tạo kệ thành công");
      setError({});
      handleClose();
    } catch (e) {
      console.log(e.response);
      setError({submit: {msg: e.response.data.error.message}});
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    reset({
      floorWidth: currentSpace.floorWidth,
      floorHeight: currentSpace.floorHeight,
      floorLength: currentSpace.floorLength,
      name: currentSpace.name,
      numberOfFloor: currentSpace?.floorLength,
    });
  }, [currentSpace]);

  const onHandleEditShelf = async (data) => {
    try {
      showLoading();
      const shelf = {
        type: currentSpace.type,
        name: data.name,
        floorWidth: parseInt(data.floorWidth),
        floorHeight: parseInt(data.floorHeight),
        floorLength: parseInt(data.floorLength),
        numberOfFloor: parseInt(data.numberOfFloor),
      };
      await updateShelf(currentSpace.id, shelf, userState.idToken);
      await getData(searchName, page, 4);
      showSnackbar("success", "Cập nhật kệ thành công");
      handleClose();
    } catch (e) {
      console.log(e.response);
      setError({submit: {msg: e.response.data.error.message}});
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
        sx={{textAlign: "left", marginTop: "2%"}}
      >
        Kích thước của 1 tầng
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "90%",
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
            disabled={isView}
            name="floorLength"
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
            disabled={isView}
            name="floorWidth"
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
            disabled={isView}
            name="floorHeight"
            label="Chiều cao (m)"
            userInfo={currentSpace?.floorHeight}
          />
        </Grid>
      </Grid>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "2%",
        }}
      >
        <Box sx={{width: "60%", display: "flex", flexDirection: "column"}}>
          <Typography color="black" variant="h2" sx={{textAlign: "left"}}>
            Số tầng của kệ
          </Typography>
          <CustomInput
            control={control}
            rules={{
              required: "*Vui lòng nhập",
              pattern: {
                value: /^[1-9]+[0-9]*$/,
                message: "*Vui lòng nhập đúng số tầng",
              },
            }}
            disabled={isView}
            name="numberOfFloor"
            label="Số tầng của kệ"
            userInfo={currentSpace?.numberOfFloor}
            inlineStyle={{marginTop: "3%", width: "180px"}}
          />
        </Box>
      </Box>
      {error?.submit?.msg ? (
        <p style={{textAlign: "center", color: "red"}}>{error?.submit?.msg}</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormHandy);
