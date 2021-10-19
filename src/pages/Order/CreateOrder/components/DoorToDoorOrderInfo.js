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
import { useNavigate } from "react-router";
import { connect } from "react-redux";
import * as action from "../../../../redux/action/action";
function DoorToDoorOrderInfo({ choosenProduct, setUpOrder }) {
  const navigate = useNavigate();

  const [timeDelivery, setTimeDelivery] = useState({});

  const [isCustomerDelivery, setIsCustomerDelivery] = React.useState(false);
  const [dateDelivery, setDateDelivery] = useState();
  const [dateReturn, setDateReturn] = useState();
  const [duration, setDuration] = useState(0);
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
          {formatCurrency(e.price * e.quantity * months, "đ")}
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
          Total
        </Typography>
        <Typography variant="h2" color="primary" style={{ marginBottom: "3%" }}>
          {formatCurrency(sum, " đ")}
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
            Total
          </Typography>
        </Box>

        <Typography variant="h2" color="primary" style={{ marginBottom: "3%" }}>
          {formatCurrency(parseInt(totalNum), "đ")}
        </Typography>
      </Box>
    );
  };

  const listTime = [
    { name: "8am - 10am", isAvailable: true },
    { name: "10am - 12am", isAvailable: true },
    { name: "12pm - 14pm", isAvailable: true },
    { name: "14am - 16pm", isAvailable: true },
    { name: "18am - 20am", isAvailable: true },
  ];

  const mapListTime = (time, setTime) =>
    listTime.map((e, index) => (
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
        }}
      >
        <FormControlLabel
          value="isCustomerDelivery"
          control={
            <Checkbox checked={isCustomerDelivery} onChange={handleChange} />
          }
          label="Customer delivery by themselves"
          labelPlacement="Customer delivery by themselves"
        />
        <Typography variant="h2" style={{ marginBottom: "3%" }}>
          Delivery Date Time
        </Typography>
        <TextField
          id="date"
          type="date"
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
          Return Date Time
        </Typography>
        <TextField
          id="date"
          type="date"
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
            Duration
          </Typography>
          <Typography
            variant="h2"
            color="primary"
            style={{ marginBottom: "3%" }}
          >
            {duration} days
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
        <Box
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
        {buildTotalEachPartPrice("services")}
        {buildTotalPrice()}
      </Card>
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
          navigate("/orders/inputInfor");
        }}
      >
        Next
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
