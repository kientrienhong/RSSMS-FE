import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Typography,
  Box,
  Button,
  FormControl,
  MenuItem,
  TextField,
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
}) {
  const { handleSubmit, control } = useForm();

  const handleChangeSize = (event) => {
    const nameBox = listSelfStorage.find((e) => {
      return e.id === event.target.value;
    }).size;
    setCurrentShelf({
      ...currentShelf,
      productId: event.target.value,
      sizeType: nameBox,
    });
  };

  const buildListCombo = (listSelfStorage) =>
    listSelfStorage?.map((e) => <MenuItem value={e.id}>{e.name}</MenuItem>);

  const onHandleEditShelf = async (data) => {
    try {
      showLoading();
      const shelf = {
        type: currentShelf.type,
        name: data.name,
        note: data.note ? data.note : "",
        boxesInWidth: parseInt(currentShelf.boxesInWidth),
        boxesInHeight: parseInt(currentShelf.boxesInHeight),
        boxSize: currentShelf.boxSize,
        productId: currentShelf.productId,
      };
      await updateShelf(currentShelf.id, shelf);
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
        type: currentShelf.type,
        name: data.name,
        note: data.note,
        boxesInWidth: parseInt(currentShelf.boxesInWidth),
        boxesInHeight: parseInt(currentShelf.boxesInHeight),
        boxSize: currentShelf.boxSize,
        productId: currentShelf.productId,
      };
      await createShelf(shelf, parseInt(areaId));
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
  const [error, setError] = useState({});

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

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(null, mapDispatchToProps)(FormSelfStorage);
