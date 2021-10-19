import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import Item from "./Item";

export default function AreaTab({
  listAreas,
  listServices,
  listAccessory,
  setChoosenProduct,
  setListServices,
  setListAreas,
  setListAccessory,
  choosenProduct,
}) {
  const mapListItemsToGrid = (listData, setListData) => {
    return listData.map((e, index) => (
      <Grid item xs={4} key={index}>
        <Item
          image={e.image}
          type={e.type}
          price={e.price}
          typeInt={e.typeInt}
          id={e.id}
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
        Area
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "98%",
          marginBottom: "3%",
        }}
      >
        {mapListItemsToGrid(listAreas, setListAreas)}
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
