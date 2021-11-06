import React from "react";
import { Box, Typography, Card } from "@material-ui/core";
import { formatCurrency } from "../../../utils/FormatCurrency";
export default function Product({
  product,
  setCurrentProduct,
  index,
  handleOpen,
  handleOpenConfirm,
}) {
  const handleOnClickEdit = () => {
    setCurrentProduct(product);
    handleOpen(true, index);
  };

  const handleOnClickDelete = () => {
    setCurrentProduct(product);
    handleOpenConfirm();
  };

  const handleOnClickSeeMore = () => {};

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "4% 2% 6% 2%",
      }}
    >
      <img
        src={product?.images[0]?.url}
        alt={product?.name}
        width="80px"
        height="80px"
        style={{
          margin: "0 auto 4% auto",
        }}
      />
      <Typography
        color="black"
        variant="h2"
        style={{ marginTop: "3%", marginLeft: "3%" }}
      >
        {product?.name}
      </Typography>
      <p style={{ marginLeft: "3%", marginTop: "3%" }}>
        {product?.description}
      </p>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "3%",
        }}
      >
        <Typography color="primary" variant="h3" style={{ marginLeft: "3%" }}>
          {formatCurrency(product?.price, "đ")} / {product?.unit}
        </Typography>
        <Box
          sx={{
            width: "30%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src="/img/edit.png"
            alt="edit"
            style={{
              marginRight: "4%",
              cursor: "pointer",
              width: "18px",
              height: "18px",
            }}
            onClick={() => handleOnClickEdit()}
          />
          <img
            src="/img/delete.png"
            alt="edit"
            style={{
              marginRight: "4%",
              cursor: "pointer",
              width: "18px",
              height: "18px",
            }}
            onClick={() => handleOnClickDelete()}
          />
          <img
            src="/img/info.png"
            alt="edit"
            style={{ cursor: "pointer", width: "18px", height: "18px" }}
            onClick={() => handleOnClickSeeMore()}
          />
        </Box>
      </Box>
    </Card>
  );
}
