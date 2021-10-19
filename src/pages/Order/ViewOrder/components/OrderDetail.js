import React from "react";
import { Box, Divider, Typography } from "@material-ui/core";
import { formatCurrency } from "../../../../utils/FormatCurrency";

export default function OrderDetail({ choosenProduct, duration }) {
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
          Total Bill
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
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
    </Box>
  );
}
