import React from "react";
import { Box, Grid } from "@material-ui/core";

export default function Shelf({ shelf, index, currentBox, setCurrentBox }) {
  const buildBox = () => {
    let size = 12 / shelf.boxesInWidth;
    let height = (100 / shelf.boxesInHeight) * 1.5;

    return shelf?.boxes?.map((e, i) => {
      let color = "#99E5FE";
      let nameBox;
      if (currentBox.id === e.id) {
        color = "#26FF7B";
      }

      if (shelf?.type === 0) {
        if (shelf?.boxSize === 0) {
          nameBox = "S";
        } else if (shelf?.boxSize === 1) {
          nameBox = "M";
        } else if (shelf?.boxSize === 2) {
          nameBox = "L";
        } else if (shelf?.boxSize === 3) {
          nameBox = "XL";
        }
        nameBox += `- ${i + 1}`;
      } else {
        if (shelf?.boxSize === 0) {
          nameBox = "0.5m2";
        } else if (shelf?.boxSize === 1) {
          nameBox = "1m2";
        } else if (shelf?.boxSize === 2) {
          nameBox = "2m2";
        } else if (shelf?.boxSize === 3) {
          nameBox = "3m2";
        }
      }

      return (
        <Grid item xs={size}>
          <Box
            sx={{
              backgroundColor: color,
              width: "100%",
              height: { height },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: 0,
              borderRadius: 0.5,
            }}
            onClick={() => setCurrentBox(e)}
          >
            <p
              style={{
                fontSize: "auto",
                color: "black",
                fontWeight: 700,
              }}
            >
              {nameBox}
            </p>
          </Box>
        </Grid>
      );
    });
  };

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
        style={{ height: "auto" }}
        xs={11}
        sx={{
          direction: "row",
          justifyContent: "space-between",
          alignItems: "center",
          height: "auto",
        }}
      >
        {buildBox()}
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
