import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Card,
  Checkbox,
  FormControlLabel,
  Divider,
  Button,
} from "@material-ui/core";
import TagSelection from "./TagSelection";
import { formatCurrency } from "../../../../utils/FormatCurrency";
import { connect } from "react-redux";
import * as action from "../../../../redux/action/action";
import { LIST_TIME } from "../../../../constant/constant";
function DoorToDoorOrderInfo({ choosenProduct, setUpOrder, onHandleOpen }) {
  const [timeDelivery, setTimeDelivery] = useState({});

  const [isCustomerDelivery, setIsCustomerDelivery] = React.useState(false);
  const [dateDelivery, setDateDelivery] = useState();
  const [dateReturn, setDateReturn] = useState();
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState({});
  const handleChange = (event) => {
    setIsCustomerDelivery(event.target.checked);
    setTimeDelivery({});
  };

  const handleChangeDeliveryDate = (e) => {
    setDateDelivery(e.target.value);
    if (dateDelivery !== undefined || dateReturn !== undefined) {
      let parseDateReturn = new Date(dateReturn);
      let parseDateDelivery = new Date(e.target.value);
      let diffTime = parseDateReturn.getTime() - parseDateDelivery.getTime();
      let diffDays = diffTime / (1000 * 3600 * 24);
      setDuration(diffDays);
    }
  };

  const handleChangeReturnDate = (e) => {
    setDateReturn(e.target.value);
    if (dateDelivery !== undefined || dateReturn !== undefined) {
      let parseDateReturn = new Date(e.target.value);
      let parseDateDelivery = new Date(dateDelivery);
      let diffTime = parseDateReturn.getTime() - parseDateDelivery.getTime();
      let diffDays = diffTime / (1000 * 3600 * 24);
      setDuration(diffDays);
    }
  };

  const mapListDetailProduct = (listProduct) => {
    let months = Math.ceil(duration / 30);

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
          {formatCurrency(e.price * e.quantity * months, "??")}
        </Typography>
      </Box>
    ));
  };

  const buildTotalPrice = () => {
    let months = Math.ceil(duration / 30);

    let sum = 0;
    choosenProduct.product.forEach((e) => {
      sum += e.price * e.quantity * months;
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

  const totalPriceProduct = () => {
    let months = Math.ceil(duration / 30);

    let sum = 0;
    choosenProduct.product.forEach((e) => {
      sum += e.price * e.quantity * months;
    });
    choosenProduct.accessory.forEach((e) => {
      sum += e.price * e.quantity;
    });
    return sum;
  };

  const buildTotalProduct = (value) => {
    let months = Math.ceil(duration / 30);

    let total = choosenProduct[value].reduce(
      (a, b) => {
        return a.price * a.quantity * months + b.price * b.quantity * months;
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

  const mapListTime = (time, setTime) =>
    LIST_TIME.map((e, index) => (
      <Grid item xs={4} key={index}>
        <TagSelection
          tag={e}
          currentTag={time}
          setCurrentTag={setTime}
          setIsCustomerDelivery={setIsCustomerDelivery}
        />
      </Grid>
    ));

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
        }}
      >
        <FormControlLabel
          value="isCustomerDelivery"
          control={
            <Checkbox checked={isCustomerDelivery} onChange={handleChange} />
          }
          label="Kh??ch t??? v???n chuy???n"
          labelPlacement="Customer delivery by themselves"
        />
        <Typography variant="h2" style={{ marginBottom: "3%" }}>
          Th???i gian l???y h??ng
        </Typography>
        <TextField
          id="date"
          type="date"
          error={!!error?.dateDelivery}
          helperText={error?.dateDelivery?.message}
          sx={{ width: 220, marginBottom: "16px" }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChangeDeliveryDate}
        />
        <Grid
          container
          spacing={2}
          sx={{
            width: "98%",
            marginBottom: "3%",
          }}
        >
          {mapListTime(timeDelivery, setTimeDelivery)}
        </Grid>
        <Typography variant="h2" style={{ marginBottom: "3%" }}>
          Ng??y tr??? h??ng
        </Typography>
        <TextField
          id="date"
          type="date"
          error={!!error?.dateReturn}
          helperText={error?.dateReturn?.message}
          sx={{ width: 220, marginBottom: "16px" }}
          onChange={handleChangeReturnDate}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Th???i h???n
          </Typography>
          <Typography
            variant="h2"
            color="primary"
            style={{ marginBottom: "3%" }}
          >
            {duration} ng??y
          </Typography>
        </Box>
      </Card>
      <Typography variant="h2" style={{ marginBottom: "3%", marginTop: "2%" }}>
        H??a ????n
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
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "4%",
          }}
        >
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Services
          </Typography>
          <Typography variant="h2" style={{ marginBottom: "3%" }}>
            Cost
          </Typography>
        </Box>
        <Divider />
        {mapListDetailOthers(choosenProduct.services)}
        <Divider />
        {buildTotalEachPartPrice("services")} */}
        {buildTotalPrice()}
      </Card>
      <p style={{ color: "red", textAlign: "center" }}>{error?.time}</p>
      <p style={{ color: "red", textAlign: "center" }}>{error?.product}</p>
      <Button
        style={{ height: "45px", paddingLeft: "16px", paddingRight: "16px" }}
        color="primary"
        variant="contained"
        onClick={(e) => {
          setUpOrder({
            timeDelivery: timeDelivery,
            isCustomerDelivery: isCustomerDelivery,
            dateDelivery: dateDelivery,
            dateReturn: dateReturn,
            duration: duration,
            choosenProduct: choosenProduct,
            type: 1,
            totalPrice: totalPriceProduct(),
          });
          let errorTemp = {};
          if (!dateDelivery) {
            errorTemp = {
              dateDelivery: {
                message: "*Vui l??ng nh???p",
              },
            };
          }
          if (!dateReturn) {
            errorTemp = {
              ...errorTemp,
              dateReturn: {
                message: "*Vui l??ng nh???p",
              },
            };
          }

          if (!timeDelivery.name && isCustomerDelivery === false) {
            errorTemp.time =
              "Vui l??ng ch???n kh??ch t??? v???n chuy???n ho???c ch???n gi??? v???n chuy???n";
          }

          if (
            choosenProduct.product.length === 0 &&
            choosenProduct.accessory.length === 0 &&
            choosenProduct.services.length === 0
          ) {
            errorTemp.product = "Vui l??ng ch???n d???ch v???";
          }

          if (Object.keys(errorTemp).length === 0) {
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

export default connect(null, mapDispatchToProps)(DoorToDoorOrderInfo);
