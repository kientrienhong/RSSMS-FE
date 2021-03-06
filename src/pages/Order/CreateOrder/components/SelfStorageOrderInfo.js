import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Card,
  Divider,
  Button,
} from "@material-ui/core";
import { formatCurrency } from "../../../../utils/FormatCurrency";
import { connect } from "react-redux";
import * as action from "../../../../redux/action/action";

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

function SelfStorageOrderInfo({ choosenProduct, setUpOrder, onHandleOpen }) {
  const [error, setError] = useState({});

  const [dateStart, setDateStart] = useState();

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

  const totalPrice = () => {
    let sum = 0;
    choosenProduct.product.forEach((e) => {
      sum += e.price * e.quantity * duration;
    });
    choosenProduct.accessory.forEach((e) => {
      sum += e.price * e.quantity;
    });
    return sum;
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
          T???ng ????n
        </Typography>
        <Typography variant="h2" color="primary" style={{ marginBottom: "3%" }}>
          {formatCurrency(sum, " ??")}
        </Typography>
      </Box>
    );
  };

  const buildTotalProduct = (value) => {
    let total = choosenProduct[value].reduce(
      (a, b) => {
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
            T???ng
          </Typography>
        </Box>

        <Typography variant="h2" color="primary" style={{ marginBottom: "3%" }}>
          {formatCurrency(parseInt(totalNum), "??")}
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
            T???ng
          </Typography>
        </Box>

        <Typography variant="h2" color="primary" style={{ marginBottom: "3%" }}>
          {formatCurrency(parseInt(totalNum), "??")}
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
          {formatCurrency(e.price * e.quantity * duration, "??")}
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
          {formatCurrency(e.price * e.quantity, "??")}
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
        marginRight: "5%",
      }}
    >
      <Typography variant="h2" style={{ marginBottom: "3%" }}>
        Th???i gian
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
          Ng??y b???t ?????u
        </Typography>
        <TextField
          id="date"
          type="date"
          error={!!error?.dateStart}
          helperText={error?.dateStart?.message}
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
            Th???i h???n (th??ng)
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
            Ng??y k???t th??c
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
            D???ch v???
          </Typography>
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Gi?? ti???n
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
            Ph??? ki???n
          </Typography>
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Gi?? ti???n
          </Typography>
        </Box>
        <Divider />
        {mapListDetailOthers(choosenProduct.accessory)}
        <Divider />
        {buildTotalEachPartPrice("accessory")}
        {buildTotalPrice()}
      </Card>
      <p
        style={{
          color: "red",
          textAlign: "center",
          margin: "8px, 0px 8px 0px",
        }}
      >
        {error?.duration}
      </p>
      <p style={{ color: "red", textAlign: "center" }}>{error?.product}</p>

      <Button
        style={{ height: "45px", paddingLeft: "16px", paddingRight: "16px" }}
        color="primary"
        variant="contained"
        onClick={(e) => {
          setUpOrder({
            dateEnd: dateEnd,
            dateStart: dateStart,
            duration: duration,
            choosenProduct: choosenProduct,
            type: 0,
            totalPrice: totalPrice(),
          });
          let errorTemp = {};
          if (!dateStart) {
            errorTemp = {
              dateStart: {
                message: "*Vui l??ng nh???p",
              },
            };
          } else if (dateStart < new Date().toISOString().split("T")[0]) {
            errorTemp = {
              dateStart: {
                message: "*Vui l??ng ch???n ng??y sau ng??y h??m nay!",
              },
            };
          }

          if (duration === 0) {
            errorTemp.duration = "Vui l??ng ch???n th???i h???n";
          }

          if (
            choosenProduct.product.length === 0 &&
            choosenProduct.accessory.length === 0
          ) {
            errorTemp.product = "Vui l??ng ch???n d???ch v???";
          }

          if (Object.keys(errorTemp).length === 0) {
            setError();
            onHandleOpen();
          } else {
            setError(errorTemp);
          }
        }}
      >
        Ti???p theo
      </Button>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUpOrder: (order) => dispatch(action.setUpOrder(order)),
  };
};

export default connect(null, mapDispatchToProps)(SelfStorageOrderInfo);
