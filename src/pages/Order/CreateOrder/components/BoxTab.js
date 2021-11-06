import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import Item from "./Item";

export default function BoxTab({
  listBoxes,
  listServices,
  listAccessory,
  setChoosenProduct,
  setListServices,
  setListBoxes,
  setListAccessory,
  choosenProduct,
}) {
  const mapListItemsToGrid = (listData, setListData) => {
    return listData.map((e, index) => (
      <Grid item xs={4} key={index}>
        <Item
          image={e?.images}
          unit={e.unit}
          type={e.type}
          price={e.price}
          id={e.id}
          typeInt={e.typeInt}
          quantity={e.quantity}
          name={e.name}
          setList={setListData}
          list={listData}
          setChoosenProduct={setChoosenProduct}
          choosenProduct={choosenProduct}
        />
      </Grid>
    ));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        marginTop: "-6.5%",
      }}
    >
      <Typography
        sx={{
          marginBottom: "2%",
        }}
        color="textPrimary"
        variant="h2"
      >
        Item
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "98%",
          marginBottom: "3%",
        }}
      >
        {mapListItemsToGrid(listBoxes, setListBoxes)}
      </Grid>
      <Typography
        sx={{
          marginBottom: "2%",
        }}
        color="textPrimary"
        variant="h2"
      >
        Accessory
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "98%",
          marginBottom: "3%",
        }}
      >
        {mapListItemsToGrid(listAccessory, setListAccessory)}
      </Grid>
      <Typography
        sx={{
          marginBottom: "2%",
        }}
        color="textPrimary"
        variant="h2"
      >
        Services
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "98%",
          marginBottom: "3%",
        }}
      >
        {mapListItemsToGrid(listServices, setListServices)}
      </Grid>
    </Box>
  );
}
