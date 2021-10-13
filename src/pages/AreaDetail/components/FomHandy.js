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

const styleInput = { marginRight: "5%" };
const styleBoxInput = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "flex-start",
  height: "40px",
  width: "95%",
  marginTop: "8% ",
};

export default function FomHandy({ isEdit, currentShelf, setCurrentShelf }) {
  const { handleSubmit, control, reset } = useForm();
  const handleChangeSize = (event) => {
    setCurrentShelf({ ...currentShelf, boxSize: event.target.value });
  };

  const onHandleCreateShelf = (data) => {
    console.log("==========================");
    console.log(currentShelf);
    console.log(data);
  };

  const onSubmit = (data) => {
    console.log("==========================");
    console.log(currentShelf);
    console.log(data);
  };

  const [inputAmountBox, setInputAmountBox] = useState({
    boxesInHeight: { value: 0 },
    boxesInWidth: { value: 0 },
  });

  const onChangeAmountBox = (e, value) => {
    const inputAmountBoxTemp = { ...inputAmountBox };
    inputAmountBoxTemp[value].value = e.target.value;
    if (!isNaN(e.target.value)) {
      const shelfTemp = { ...currentShelf };
      shelfTemp[value] = e.target.value;
      let boxesTemp = [];
      for (
        let i = 0;
        i < shelfTemp.boxesInWidth * shelfTemp.boxesInHeight;
        i++
      ) {
        boxesTemp.push({});
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
            sx={{ m: 1, minWidth: 120, color: "black", margin: "0" }}
            name="boxSize"
          >
            <Select
              value={currentShelf.boxSize}
              onChange={handleChangeSize}
              displayEmpty
              sx={{
                marginTop: "11%",
              }}
            >
              <MenuItem value={0}>S</MenuItem>
              <MenuItem value={1}>M</MenuItem>
              <MenuItem value={2}>L</MenuItem>
              <MenuItem value={3}>XL</MenuItem>
            </Select>
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
              value={currentShelf.boxesInWidth}
              error={!!inputAmountBox.boxesInWidth.error}
              helperText={
                inputAmountBox.boxesInWidth.error
                  ? inputAmountBox.boxesInWidth.error.message
                  : null
              }
              style={styleInput}
              onChange={(e) => onChangeAmountBox(e, "boxesInWidth")}
              inputProps={{ style: { width: "50px" } }}
            />
            <TextField
              label={"Height"}
              disabled={false}
              variant="outlined"
              value={currentShelf.boxesInHeight}
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
