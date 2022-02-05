import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import Item from "./components/Item";
export default function SelfStorageMainTab({
  listStorages,
  listAccessory,
  setChoosenProduct,
  setListStorages,
  setListAccessory,
  choosenProduct,
}) {
  const mapListStoragesToGrid = (listData, setListData) => {
    return listData?.map((e, index) => {
      return (
        <Grid item xs={4} key={index}>
          <Item
            image={e?.images}
            unit={e.unit}
            type={e.type}
            typeInt={e.typeInt}
            id={e.id}
            price={e.price}
            quantity={e.quantity}
            name={e.name}
            setList={setListData}
            list={listData}
            setChoosenProduct={setChoosenProduct}
            choosenProduct={choosenProduct}
          />
        </Grid>
      );
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Typography
        sx={{
          marginBottom: "2%",
        }}
        color="textPrimary"
        variant="h2"
      >
        Storage
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "98%",
          height: "auto",
          marginBottom: "2%",
        }}
      >
        {mapListStoragesToGrid(listStorages, setListStorages)}
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
        }}
      >
        {mapListStoragesToGrid(listAccessory, setListAccessory)}
      </Grid>
    </Box>
  );
}
