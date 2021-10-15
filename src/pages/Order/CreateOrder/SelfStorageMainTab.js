import React from "react";
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Typography,
  Grid,
  Card,
} from "@material-ui/core";
import SelfStorageItem from "./components/SelfStorageItem";
export default function SelfStorageMainTab() {
  const listStorages = [
    {
      name: "Storage 2m2",
      price: "600,000",
      image: "/img/storage2m2.png",
      quantity: 0,
    },
    {
      name: "Storage 4m2",
      price: "1,000,000",
      image: "/img/storage4m2.png",
      quantity: 0,
    },
    {
      name: "Storage 8m2",
      price: "1,600,000",
      image: "/img/storage8m2.png",
      quantity: 0,
    },
    {
      name: "Storage 16m2",
      price: "2,800,000",
      image: "/img/storage16m2.png",
      quantity: 0,
    },
  ];

  const listAccessory = [
    {
      name: "Tape",
      price: "25,000",
      image: "/img/tape.png",
      quantity: 0,
    },
    {
      name: "Locker",
      price: "165,000",
      image: "/img/locker.png",
      quantity: 0,
    },
    {
      name: "Carton box",
      price: "30,000",
      image: "/img/carton.png",
      quantity: 0,
    },
    {
      name: "PE Foam",
      price: "25,000",
      image: "/img/peFoam.png",
      quantity: 0,
    },
    {
      name: "Bubble Wrap",
      price: "25,000",
      image: "/img/bubbleWrap.png",
      quantity: 0,
    },
    {
      name: "PE strech film",
      price: "150,000",
      image: "/img/PEstretchfilm.png",
      quantity: 0,
    },
  ];

  const mapListStoragesToGrid = (listData) => {
    return listData.map((e, index) => (
      <Grid item xs={4} key={index}>
        <SelfStorageItem
          image={e.image}
          price={e.price}
          quantity={e.quantity}
          name={e.name}
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
        {mapListStoragesToGrid(listStorages)}
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
          height: "630px",
        }}
      >
        {mapListStoragesToGrid(listAccessory)}
      </Grid>
    </Box>
  );
}
