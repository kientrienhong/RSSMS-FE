import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import Product from "./Product";
import ProductAdd from "./ProductAdd";
export default function SectionProduct({
  name,
  listProduct,
  handleOpen,
  index,
  setCurrentProduct,
  handleOpenConfirm,
}) {
  const buildGridProduct = () =>
    listProduct?.map((e, i) => (
      <Grid item xs={3} key={i}>
        <Product
          handleOpenConfirm={handleOpenConfirm}
          product={e}
          setCurrentProduct={setCurrentProduct}
          handleOpen={handleOpen}
          index={index}
        />
      </Grid>
    ));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "90%",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        marginLeft: "2%",
        marginBottom: "2%",
      }}
    >
      <Typography
        color="black"
        variant="h2"
        style={{ marginTop: "1%", marginBottom: "2%" }}
      >
        {name}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "90%",
          height: "auto",
        }}
      >
        <Grid item xs={3}>
          <ProductAdd handleOpen={handleOpen} index={index} />
        </Grid>
        {buildGridProduct()}
      </Grid>
    </Box>
  );
}
