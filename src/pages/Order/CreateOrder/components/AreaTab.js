import React from "react";
import { Box, Typography, Grid } from "@material-ui/core";
import Item from "./Item";
import ItemNote from "./ItemNote";

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
  const mapLitsItemNote = (listData, setListData) => {
    return listData?.map((e, index) => (
      <Grid item xs={4} key={index}>
        <ItemNote
          product={e}
          image={e?.imageUrl}
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

  const mapListItemsToGrid = (listData, setListData) => {
    return listData.map((e, index) => (
      <Grid item xs={4} key={index}>
        <Item
          type={e.type}
          image={e?.imageUrl}
          unit={e.unit}
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
        marginTop: "2.5%",
        width: "100%",
      }}
    >
      <Typography
        sx={{
          marginBottom: "2%",
        }}
        color="textPrimary"
        variant="h2"
      >
        Dịch vụ
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          width: "98%",
          marginBottom: "3%",
        }}
      >
        {mapLitsItemNote(listAreas, setListAreas)}
      </Grid>
      <Typography
        sx={{
          marginBottom: "2%",
        }}
        color="textPrimary"
        variant="h2"
      >
        Phụ kiện
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
    </Box>
  );
}
