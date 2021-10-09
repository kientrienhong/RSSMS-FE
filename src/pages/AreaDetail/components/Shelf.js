import React from "react";
import { Box, Grid } from "@material-ui/core";

const buildBox = (shelf) => {
  let size = 12 / shelf.amountWidth;
  let height = 100 / shelf.amountHeight;

  return shelf.boxes.map((e, i) => (
    <Grid item xs={size} sx={{ height: height }}>
      <Box
        sx={{
          backgroundColor: "#99E5FE",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 0.5,
        }}
      >
        <p
          style={{
            fontSize: 18,
            color: "black",
            fontWeight: 700,
          }}
        >
          {shelf.boxSize}
        </p>
      </Box>
    </Grid>
  ));
};

export default function Shelf({ shelf, index }) {
  return (
    <React.Fragment>
      <div
        style={{
          width: "4px",
          borderRadius: 2,
          backgroundColor: "black",
          height: "auto",
          marginRight: "4%",
        }}
      ></div>
      <Grid
        container
        spacing={0.5}
        item
        xs={11}
        sx={{
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {buildBox(shelf)}
      </Grid>
      {index === 2 || index === 5 ? (
        <div
          style={{
            width: "4px",
            borderRadius: 2,
            backgroundColor: "black",
            height: "auto",
            marginLeft: "4%",
          }}
        ></div>
      ) : (
        <></>
      )}
    </React.Fragment>
  );
}
