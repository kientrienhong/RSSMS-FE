import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Box,
  Button,
  FormControl,
  MenuItem,
  TextField,
  Select,
  FormHelperText,
} from "@material-ui/core";
import CustomInput from "../../../components/CustomInput";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { createShelf, updateShelf } from "../../../apis/Apis";
const styleInput = { marginRight: "5%" };
const styleBoxInput = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "flex-start",
  height: "40px",
  width: "95%",
  marginTop: "6% ",
};

function FormHandy({
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
  listBoxes,
  userState,
}) {
  const { handleSubmit, control, reset } = useForm();
  const handleChangeSize = (event) => {
    let nameBox = listBoxes.find((e) => {
      return e.id === event.target.value;
    }).name;

    let boxes = [];
    if (currentShelf.boxes) {
      boxes = [...currentShelf.boxes];
    }
    boxes = boxes.map((e, i) => {
      return {
        ...e,
        name: `${nameBox} - ${i + 1}`,
      };
    });
    setCurrentShelf({
      ...currentShelf,
      boxes: boxes,
      productId: event.target.value,
      sizeType: nameBox,
      serviceId: event.target.value,
    });
    setError({ ...error, sizeType: undefined });
    return nameBox;
  };

  const [error, setError] = useState({});
  const validation = () => {
    let valid = true;
    if (currentShelf?.boxes[0]?.name === undefined) {
      setError({ sizeType: { msg: "*Required" } });
      valid = false;
    }
    const inputAmountBoxTemp = { ...inputAmountBox };
    if (inputAmountBoxTemp.boxesInHeight.value === "") {
      inputAmountBoxTemp.boxesInHeight.error = {
        message: "*Required",
      };
      setInputAmountBox({ ...inputAmountBox, inputAmountBoxTemp });
      valid = false;
    }
    if (inputAmountBoxTemp.boxesInWidth.value === "") {
      inputAmountBoxTemp.boxesInWidth.error = {
        message: "*Required",
      };
      setInputAmountBox({ ...inputAmountBox, inputAmountBoxTemp });
      valid = false;
    }
    return valid;
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
        note: data.note ? data.note : "",
        boxesInWidth: parseInt(currentShelf.boxesInWidth),
        boxesInHeight: parseInt(currentShelf.boxesInHeight),
        boxSize: currentShelf.boxSize,
        productId: currentShelf.productId,
      };
      await createShelf(shelf, areaId, userState.idToken);
      await getData(searchName, page, 4);
      showSnackbar("success", "Create shelf success");
      setError({});
      handleClose();
    } catch (e) {
      console.log(e.response);
      setError({ submit: { msg: e.response.data.error.message } });
    } finally {
      hideLoading();
    }
  };

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
        serviceId: currentShelf.serviceId,
        productId: currentShelf.productId,
      };
      await updateShelf(currentShelf.id, shelf, userState.idToken);
      await getData(searchName, page, 4);
      showSnackbar("success", "Update shelf success");
      handleClose();
    } catch (e) {
      console.log(e.response);
      setError({ submit: { msg: e.response.data.error.message } });
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

  const [inputAmountBox, setInputAmountBox] = useState({
    boxesInHeight: { value: "" },
    boxesInWidth: { value: "" },
  });

  useEffect(() => {
    if (currentShelf?.boxesInHeight)
      setInputAmountBox({
        boxesInHeight: { value: currentShelf?.boxesInHeight?.toString() },
        boxesInWidth: { value: currentShelf?.boxesInWidth?.toString() },
      });
  }, [currentShelf]);

  const onChangeAmountBox = (e, value) => {
    const inputAmountBoxTemp = { ...inputAmountBox };
    inputAmountBoxTemp[value].value = e.target.value;
    if (!isNaN(e.target.value)) {
      let shelfTemp = { ...currentShelf };
      if (shelfTemp.serviceId) {
        shelfTemp = {
          ...shelfTemp,
          sizeType: handleChangeSize({
            target: {
              value: shelfTemp.serviceId,
            },
          }),
        };
      }
      shelfTemp[value] = e.target.value;
      let boxesTemp = [];
      for (
        let i = 0;
        i < shelfTemp.boxesInWidth * shelfTemp.boxesInHeight;
        i++
      ) {
        boxesTemp.push({
          name: `${shelfTemp.sizeType} - ${i + 1}`,
        });
      }
      shelfTemp.boxes = boxesTemp;

      setCurrentShelf(shelfTemp);
      inputAmountBoxTemp[value].error = undefined;
      setInputAmountBox(inputAmountBoxTemp);
    } else {
      inputAmountBoxTemp[value].error = {
        message: "Invalid number",
      };
      setInputAmountBox(inputAmountBoxTemp);
    }
  };

  const buildListCombo = (listBoxes) =>
    listBoxes?.map((e) => <MenuItem value={e.id}>{e.name}</MenuItem>);

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
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginTop: "32px",
          marginBottom: "32px",
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
            Box size
          </Typography>
          <FormControl
            error={error?.sizeType}
            sx={{ m: 1, minWidth: 120, color: "black", margin: "0" }}
            name="boxSize"
          >
            <Select
              value={currentShelf?.serviceId}
              onChange={handleChangeSize}
              displayEmpty
              sx={{
                marginTop: "11%",
              }}
            >
              {buildListCombo(listBoxes)}
            </Select>
            <FormHelperText error={error?.sizeType}>
              {error?.sizeType ? error?.sizeType?.msg : ""}
            </FormHelperText>
          </FormControl>
        </Box>
        <Box sx={{ width: "60%", display: "flex", flexDirection: "column" }}>
          <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
            Amount of box on the shelf
          </Typography>
          <Box
            sx={{
              ...styleBoxInput,
              justifyContent: "flex-start",
            }}
          >
            <TextField
              label={"Width"}
              disabled={false}
              variant="outlined"
              value={currentShelf?.boxesInWidth}
              error={!!inputAmountBox.boxesInWidth.error}
              helperText={
                inputAmountBox.boxesInWidth.error
                  ? inputAmountBox.boxesInWidth.error.message
                  : null
              }
              style={{ ...styleInput, marginBottom: "8px" }}
              onChange={(e) => onChangeAmountBox(e, "boxesInWidth")}
              inputProps={{ style: { width: "50px" } }}
            />
            <TextField
              label={"Height"}
              disabled={false}
              variant="outlined"
              value={currentShelf?.boxesInHeight}
              error={!!inputAmountBox.boxesInHeight.error}
              helperText={
                inputAmountBox.boxesInHeight.error
                  ? inputAmountBox.boxesInHeight.error.message
                  : null
              }
              style={styleInput}
              onChange={(e) => onChangeAmountBox(e, "boxesInHeight")}
              inputProps={{ style: { width: "50px" } }}
            />
          </Box>
        </Box>
      </Box>
      {error?.submit?.msg ? (
        <p style={{ textAlign: "center", color: "red" }}>
          {error?.submit?.msg}
        </p>
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

export default connect(mapStateToProps, mapDispatchToProps)(FormHandy);
