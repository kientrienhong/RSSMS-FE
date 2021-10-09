import React from "react";
import { Grid, Box } from "@material-ui/core";
import Shelf from "./Shelf";

const mapListToGrid = (listShelf) =>
  listShelf.map((e, i) => (
    <Grid
      container
      sx={{ height: "30%", padding: 0, margin: 0, width: "33%" }}
      key={i}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4 style={{ marginRight: "8px" }}>{e.name}</h4>
          <img
            src="/img/edit.png"
            alt="edit"
            style={{
              marginRight: "2%",
              cursor: "pointer",
              width: "18px",
              height: "18px",
            }}
          />
          <img
            src="/img/delete.png"
            alt="edit"
            style={{
              marginRight: "2%",
              cursor: "pointer",
              width: "18px",
              height: "18px",
            }}
          />
          <img
            src="/img/info.png"
            alt="edit"
            style={{ cursor: "pointer", width: "18px", height: "18px" }}
          />
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Shelf shelf={e} index={i} />
        </Box>
      </Box>
    </Grid>
  ));

export default function ListShelf({ listShelf }) {
  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "90%",
      }}
    >
      {mapListToGrid(listShelf)}
    </Grid>
  );
}
