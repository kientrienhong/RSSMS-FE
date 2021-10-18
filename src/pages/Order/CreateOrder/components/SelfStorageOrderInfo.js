import React, { useState } from "react";
import { Box, TextField, Typography, Card, Divider } from "@material-ui/core";
import { formatCurrency } from "../../../../utils/FormatCurrency";
const styleButtonPlus = {
  width: "26px",
  height: "26px",
  borderRadius: "4px",
  padding: "2%",
  backgroundColor: "#04BFFE",
  color: "white",
  marginRight: "6%",
  marginLeft: "6%",
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
  height: "32px",
  width: "20%",
};

export default function SelfStorageOrderInfo({ choosenProduct }) {
  const [dateStart, setDateStart] = useState({});

  const [dateEnd, setDateEnd] = useState("");
  const [duration, setDuration] = useState(0);

  const handleOnClickMinus = () => {
    if (duration > 0) {
      let newDuration = duration - 1;
      setDuration(newDuration);
      let currentDate = new Date(dateEnd);

      let newDate = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
      setDateEnd(newDate.toLocaleDateString("en-US"));
    }
  };

  const handleOnClickPlus = () => {
    let newDuration = duration + 1;
    setDuration(newDuration);
    let currentDate = new Date(dateEnd);
    let newDate = new Date(currentDate.setMonth(currentDate.getMonth() + 1));
    setDateEnd(newDate.toLocaleDateString("en-US"));
  };

  const handleChangeStartDate = (e) => {
    setDateStart(e.target.value);
    setDateEnd(new Date(e.target.value).toLocaleDateString("en-US"));
  };

  const buildTotalPrice = () => {
    let sum = 0;
    choosenProduct.product.forEach((e) => {
      sum += e.price * e.quantity * duration;
    });
    choosenProduct.accessory.forEach((e) => {
      sum += e.price * e.quantity;
    });
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "4%",
          marginBottom: "4%",
        }}
      >
        <Typography variant="h2" color="black" style={{ marginBottom: "3%" }}>
          Total
        </Typography>
        <Typography variant="h2" color="primary" style={{ marginBottom: "3%" }}>
          {formatCurrency(sum, " đ")}
        </Typography>
      </Box>
    );
  };

  const buildTotalProduct = (value) => {
    let total = choosenProduct[value].reduce(
      (a, b) => {
        console.log(a, b);
        return (
          a.price * a.quantity * duration + b.price * b.quantity * duration
        );
      },
      { price: 0, quantity: 1 }
    );

    let totalNum = isNaN(parseInt(total)) === true ? 0 : parseInt(total);

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marinBottom: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            width: "40%",
          }}
        >
          <Typography
            variant="h2"
            style={{ marginBottom: "3%", marginRight: "8%" }}
          >
            Total
          </Typography>
        </Box>

        <Typography variant="h2" color="primary" style={{ marginBottom: "3%" }}>
          {formatCurrency(parseInt(totalNum), "đ")}
        </Typography>
      </Box>
    );
  };

  const buildTotalEachPartPrice = (value) => {
    let total = choosenProduct[value].reduce(
      (a, b) => {
        return a.price * a.quantity + b.price * b.quantity;
      },
      { price: 0, quantity: 1 }
    );

    let totalNum = isNaN(parseInt(total)) === true ? 0 : parseInt(total);

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marinBottom: "2%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            width: "40%",
          }}
        >
          <Typography
            variant="h2"
            style={{ marginBottom: "3%", marginRight: "8%" }}
          >
            Total
          </Typography>
        </Box>

        <Typography variant="h2" color="primary" style={{ marginBottom: "3%" }}>
          {formatCurrency(parseInt(totalNum), "đ")}
        </Typography>
      </Box>
    );
  };

  const mapListDetailProduct = (listProduct) => {
    return listProduct.map((e) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            width: "40%",
          }}
        >
          <Typography
            variant="h2"
            style={{ marginBottom: "3%", marginRight: "8%" }}
          >
            {e.name}
          </Typography>
          <Typography
            variant="h3"
            color="primary"
            style={{ marginBottom: "3%" }}
          >
            X {e.quantity}
          </Typography>
        </Box>

        <Typography variant="h2" color="primary" style={{ marginBottom: "3%" }}>
          {formatCurrency(e.price * e.quantity * duration, "đ")}
        </Typography>
      </Box>
    ));
  };

  const mapListDetailOthers = (listProduct) => {
    return listProduct.map((e) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
            width: "40%",
          }}
        >
          <Typography
            variant="h2"
            style={{ marginBottom: "3%", marginRight: "8%" }}
          >
            {e.name}
          </Typography>
          <Typography
            variant="h3"
            color="primary"
            style={{ marginBottom: "3%" }}
          >
            X {e.quantity}
          </Typography>
        </Box>

        <Typography variant="h2" color="primary" style={{ marginBottom: "3%" }}>
          {formatCurrency(e.price * e.quantity, "đ")}
        </Typography>
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h2" style={{ marginBottom: "3%" }}>
        Time
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "4%",
          marginBottom: "4%",
        }}
      >
        <Typography variant="h2" style={{ marginBottom: "3%" }}>
          Start renting
        </Typography>
        <TextField
          id="date"
          type="date"
          sx={{ width: 220, marginBottom: "6%" }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeStartDate}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "6%",
          }}
        >
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Duration (months)
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <button style={styleButtonMinus} onClick={handleOnClickMinus}>
              -
            </button>
            <input style={styleInput} value={duration}></input>
            <button style={styleButtonPlus} onClick={handleOnClickPlus}>
              +
            </button>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            End renting
          </Typography>
          <Typography
            variant="h2"
            color="primary"
            style={{ marginBottom: "3%" }}
          >
            {dateEnd}
          </Typography>
        </Box>
      </Card>
      <Typography variant="h2" style={{ marginBottom: "3%" }}>
        Bill
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: "4%",
          marginBottom: "4%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Product
          </Typography>
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Cost
          </Typography>
        </Box>
        <Divider />
        {mapListDetailProduct(choosenProduct.product)}
        <Divider />
        {buildTotalProduct("product")}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "4%",
          }}
        >
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Accessory
          </Typography>
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Cost
          </Typography>
        </Box>
        <Divider />
        {mapListDetailOthers(choosenProduct.accessory)}
        <Divider />
        {buildTotalEachPartPrice("accessory")}
        {buildTotalPrice()}
      </Card>
    </Box>
  );
}
