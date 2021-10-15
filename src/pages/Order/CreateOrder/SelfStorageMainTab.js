import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import SelfStorageItem from "./components/SelfStorageItem";
export default function SelfStorageMainTab({
  listStorages,
  listAccessory,
  setChoosenProduct,
  setListStorages,
  setListAccessory,
  choosenProduct,
}) {
  const mapListStoragesToGrid = (listData, setListData) => {
    return listData.map((e, index) => (
      <Grid item xs={4} key={index}>
        <SelfStorageItem
          image={e.image}
          type={e.type}
          price={e.price}
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
          height: "630px",
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
