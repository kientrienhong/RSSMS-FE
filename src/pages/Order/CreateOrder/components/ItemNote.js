import React from "react";
import { Box, Typography, Card, TextField } from "@material-ui/core";
import { formatCurrency } from "../../../../utils/FormatCurrency";
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

export default function ItemNote({
  image,
  unit,
  name,
  quantity,
  price,
  setList,
  list,
  id,
  choosenProduct,
  setChoosenProduct,
  type,
  typeInt,
}) {
  let currentIndexProduct = list.findIndex((e) => e.id === id);

  const mapCustomInput = () => {
    let result = [];

    for (let i = 0; i < list[currentIndexProduct].quantity; i++) {
      let choosenProductTemp = { ...choosenProduct };
      let currentProductInChooseProduct = choosenProductTemp["product"].find(
        (ele) => ele.idOfList === `${id}-${i + 1}`
      );

      result.push(
        <TextField
          sx={{
            marginBottom: "8px",
          }}
          disabled={false}
          multiline
          rows={2}
          label="Mô tả"
          rowsMax={4}
          variant="outlined"
          value={currentProductInChooseProduct.note}
          onChange={(event) => {
            currentProductInChooseProduct.note = event.target.value;
            setChoosenProduct(choosenProductTemp);
          }}
          type={type}
          error={!!currentProductInChooseProduct.error}
          helperText={
            currentProductInChooseProduct.error
              ? currentProductInChooseProduct.error.message
              : null
          }
        />
      );
    }
    return result;
  };

  const handleOnClickMinus = () => {
    if (quantity > 0) {
      let quantityTemp = --quantity;
      let listTemp = [...list];
      let index = listTemp.findIndex((e) => e.name === name);
      listTemp[index] = { ...listTemp[index], quantity: quantityTemp };
      setList(listTemp);

      let choosenProductTemp = { ...choosenProduct };

      let indexFoundChoosenProduct = choosenProductTemp[type].findIndex(
        (e) => e.idOfList === `${id}-${quantity + 1}`
      );
      if (indexFoundChoosenProduct !== -1) {
        choosenProductTemp[type].splice(indexFoundChoosenProduct, 1);
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

    let choosenProductTemp = { ...choosenProduct };

    choosenProductTemp[type].push({
      name: name,
      quantity: 1,
      price: price,
      type: type,
      id: id,
      typeInt: typeInt,
      note: "",
      idOfList: id + "-" + quantityTemp,
    });
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
        src={image ? image : undefined}
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
        {`${formatCurrency(price, "đ")} / ${unit}`}
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
      {mapCustomInput()}
    </Card>
  );
}
