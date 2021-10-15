import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
  Card,
} from "@material-ui/core";

const styleButtonPlus = {
  width: "26px",
  height: "26px",
  borderRadius: "4px",
  padding: "2%",
  backgroundColor: "#04BFFE",
  color: "white",
  marginRight: "2%",
  marginLeft: "2%",
  fontSize: "16px",
  fontWeight: "bold",
  border: "none",
  cursor: "pointer",
};

const styleButtonMinus = {
  ...styleButtonPlus,
  color: "#A19FA8",
  backgroundColor: "white",
  border: "1px #A19FA8 solid",
};

const styleInput = {
  border: "1px #A19FA8 solid",
  textAlign: "center",
  borderRadius: "4px",
  width: "50%",
};

export default function SelfStorageItem({
  image,
  name,
  quantity,
  price,
  setList,
  list,
  choosenProduct,
  setChoosenProduct,
}) {
  const handleOnClickMinus = () => {
    console.log(list);
    if (quantity > 0) {
      let quantityTemp = --quantity;
      let listTemp = [...list];
      let index = listTemp.findIndex((e) => e.name === name);
      listTemp[index] = { ...listTemp[index], quantity: quantityTemp };
      setList(listTemp);

      let choosenProductTemp = [...choosenProduct];
      let indexProduct = choosenProductTemp.findIndex((e) => e.name === name);
      if (choosenProductTemp[indexProduct].quantity === 1) {
        choosenProductTemp.splice(indexProduct, 1);
      } else {
        --choosenProductTemp[indexProduct].quantity;
      }
      setChoosenProduct(choosenProductTemp);
    }
  };

  const handleOnClickPlus = () => {
    let quantityTemp = ++quantity;
    let listTemp = [...list];
    let index = listTemp.findIndex((e) => e.name === name);
    listTemp[index] = { ...listTemp[index], quantity: quantityTemp };
    setList(listTemp);

    let choosenProductTemp = [...choosenProduct];
    let indexProduct = choosenProductTemp.findIndex((e) => e.name === name);
    if (indexProduct === -1) {
      choosenProductTemp.push({
        name: name,
        quantity: 1,
        price: price,
      });
    } else {
      ++choosenProductTemp[indexProduct].quantity;
    }
    setChoosenProduct(choosenProductTemp);
  };

  return (
    <Card
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          marginTop: "20px",
          marginBottom: "16%",
          width: "80px",
          height: "80px",
        }}
      />
      <Typography variant="h2" style={{ marginBottom: "3%" }}>
        {name}
      </Typography>
      <Typography color="primary" variant="h2" style={{ marginBottom: "5%" }}>
        {price} đ / month
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "4%",
          marginTop: "3%",
        }}
      >
        <button style={styleButtonMinus} onClick={handleOnClickMinus}>
          -
        </button>
        <input style={styleInput} value={quantity}></input>
        <button style={styleButtonPlus} onClick={handleOnClickPlus}>
          +
        </button>
      </Box>
    </Card>
  );
}