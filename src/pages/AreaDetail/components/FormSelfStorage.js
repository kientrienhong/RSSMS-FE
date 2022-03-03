import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Box,
  Button,
  FormControl,
  MenuItem,
  FormHelperText,
  Select,
} from "@material-ui/core";
import CustomInput from "../../../components/CustomInput";
import CustomAreaInput from "../../../components/CustomAreaInput";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { createShelf, updateShelf } from "../../../apis/Apis";
const styleInput = { marginRight: "5%" };
function FormSelfStorage({
  isEdit,
  currentShelf,
  setCurrentShelf,
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

  const validation = () => {
    let valid = true;
    if (currentShelf?.boxes[0]?.name === undefined) {
      setError({ sizeType: { msg: "*Required" } });
      valid = false;
    }
    return valid;
  };

  useEffect(() => {}, [currentShelf]);

  const handleChangeSize = (event) => {
    const nameBox = listSelfStorage.find((e) => {
      return e.id === event.target.value;
    }).name;
    setCurrentShelf({
      ...currentShelf,
      serviceId: event.target.value,

      productId: event.target.value,
      sizeType: nameBox,
    });
    setError({ ...error, sizeType: undefined });
  };

  const buildListCombo = (listSelfStorage) =>
    listSelfStorage?.map((e) => <MenuItem value={e.id}>{e.name}</MenuItem>);

  const onHandleEditShelf = async (data) => {
    try {
      showLoading();
      const valid = validation();
      if (valid === false) {
        return;
      }

      const shelf = {
        type: currentShelf.type,
        name: data.name,
        note: data.note ? data.note : "",
        boxesInWidth: parseInt(currentShelf.boxesInWidth),
        boxesInHeight: parseInt(currentShelf.boxesInHeight),
        boxSize: currentShelf.boxSize,
        productId: currentShelf.productId,
        serviceId: currentShelf.serviceId,
      };
      await updateShelf(currentShelf.id, shelf, userState.idToken);
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

      const valid = validation();
      if (valid === false) {
        return;
      }

      const shelf = {
        type: currentShelf.type,
        name: data.name,
        note: data.note,
        boxesInWidth: parseInt(currentShelf.boxesInWidth),
        boxesInHeight: parseInt(currentShelf.boxesInHeight),
        boxSize: currentShelf.boxSize,
        serviceId: currentShelf.serviceId,

        productId: currentShelf.productId,
      };
      await createShelf(shelf, areaId, userState.idToken);
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
          marginTop: "4%",
        }}
      >
        <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
          Name
        </Typography>
        <CustomInput
          control={control}
          rules={{ required: "Name is required" }}
          styles={{ width: "400px" }}
          name="name"
          label="Name"
          userInfo={currentShelf.name}
          inlineStyle={{ ...styleInput, marginTop: "4%" }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "4%",
        }}
      >
        <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
          Note
        </Typography>
        <CustomAreaInput
          control={control}
          rules={{ required: "Note is required" }}
          styles={{ width: "400px" }}
          name="note"
          label=""
          userInfo={currentShelf.note}
          inlineStyle={{ ...styleInput, marginTop: "4%" }}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "32px",
        }}
      >
        <Box
          sx={{
            width: "35%",
            display: "flex",
            flexDirection: "column",
            marginRight: "5%",
          }}
        >
          <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
            Self-Storage size
          </Typography>
          <FormControl
            sx={{ m: 1, minWidth: 120, color: "black", margin: "0" }}
            name="boxSize"
            error={error?.sizeType}
          >
            <Select
              value={currentShelf?.productId}
              onChange={handleChangeSize}
              displayEmpty
              sx={{
                marginTop: "11%",
              }}
            >
              {buildListCombo(listSelfStorage)}
            </Select>
            <FormHelperText error={error?.sizeType}>
              {error?.sizeType ? error?.sizeType?.msg : ""}
            </FormHelperText>
          </FormControl>
        </Box>
      </Box>
      {error.msg ? (
        <p style={{ textAlign: "center", color: "red" }}>{error.msg}</p>
      ) : null}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <Button color="primary" type="submit" variant="contained">
          Submit
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
