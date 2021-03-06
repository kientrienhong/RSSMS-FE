import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import {
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  Grid,
} from "@material-ui/core";
import CustomInput from "../../../components/CustomInput";

import {connect} from "react-redux";
import * as action from "../../../redux/action/action";
import {createSpace, updateShelf} from "../../../apis/Apis";
function FormUnwieldy({
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
  listAreas,
}) {
  const {handleSubmit, control, reset} = useForm();
  const [currentIdService, setCurrentIdService] = useState(
    listAreas?.find((e) => {
      return (
        e.width === currentSpace.floorWidth &&
        e.length === currentSpace.floorLength &&
        e.height === currentSpace.floorHeight
      );
    })?.id
  );
  const [error, setError] = useState({});

  const onHandleEditShelf = async (data) => {
    try {
      showLoading();

      const shelf = {
        type: currentSpace.type,
        name: data.name,
        floorWidth: parseInt(data.floorWidth),
        floorHeight: parseInt(data.floorHeight),
        floorLength: parseInt(data.floorLength),
      };
      await updateShelf(currentSpace.id, shelf, userState.idToken);
      await getData(searchName, page, 4);
      showSnackbar("success", "Update shelf success");
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
        type: currentSpace.type,
        name: data.name,
        floorWidth: parseInt(data.floorWidth),
        floorHeight: parseInt(data.floorHeight),
        floorLength: parseInt(data.floorLength),
      };
      await createSpace(shelf, areaId, userState.idToken);
      await getData(searchName, page, 4);
      showSnackbar("success", "Create shelf success");
      handleClose();
    } catch (e) {
      console.log(e.response);
      setError({msg: e.response.data.error.message});
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

  useEffect(() => {
    reset({
      floorWidth: currentSpace.floorWidth,
      floorHeight: currentSpace.floorHeight,
      floorLength: currentSpace.floorLength,
      name: currentSpace.name,
    });
  }, [currentSpace, reset]);

  const mapListMenu = (listAreas) =>
    listAreas?.map((e) => <MenuItem value={e.id}>{e.name}</MenuItem>);

  const handleChange = (event) => {
    setCurrentIdService(event.target.value);
    let area = listAreas.find((e) => {
      return e.id === event.target.value;
    });
    setCurrentSpace({
      ...currentSpace,
      floorWidth: area.width,
      floorHeight: area.height,
      floorLength: area.length,
    });
    reset({
      floorWidth: area.width,
      floorHeight: area.height,
      floorLength: area.length,
    });
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
          T??n
        </Typography>
        <CustomInput
          control={control}
          rules={{required: "*Vui l??ng nh???p"}}
          styles={{width: "400px"}}
          name="name"
          label="T??n"
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
        Ch???n k??ch th?????c d???ch v???
      </Typography>
      <Select onChange={handleChange} value={currentIdService}>
        {mapListMenu(listAreas)}
      </Select>
      <Typography
        color="black"
        variant="h2"
        sx={{textAlign: "left", marginTop: "2%"}}
      >
        K??ch th?????c
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
              required: "*Vui l??ng nh???p",
              pattern: {
                value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                message: "*Vui l??ng nh???p ????ng chi???u d??i",
              },
            }}
            disabled={isView}
            name="floorLength"
            label="Chi???u d??i (m)"
            userInfo={currentSpace?.floorLength}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomInput
            control={control}
            rules={{
              required: "*Vui l??ng nh???p",
              pattern: {
                value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                message: "*Vui l??ng nh???p ????ng chi???u r???ng",
              },
            }}
            name="floorWidth"
            disabled={isView}
            label="Chi???u r???ng (m)"
            userInfo={currentSpace?.floorWidth}
          />
        </Grid>
        <Grid item xs={4}>
          <CustomInput
            control={control}
            rules={{
              required: "*Vui l??ng nh???p",
              pattern: {
                value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                message: "*Vui l??ng nh???p ????ng chi???u cao",
              },
            }}
            name="floorHeight"
            disabled={isView}
            label="Chi???u cao (m)"
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
            X??c nh???n
          </Button>
        )}

        <Button
          color="error"
          onClick={() => {
            handleClose();
          }}
          variant="outlined"
        >
          ????ng
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

export default connect(mapStateToProps, mapDispatchToProps)(FormUnwieldy);
