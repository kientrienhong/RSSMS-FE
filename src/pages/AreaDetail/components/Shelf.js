import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
function Shelf({
  shelf,
  index,
  lengthList,
  isModifyShelf,
  handleOpenDetailBox,
  setUpCurrentBox,
  currentBox,
  storage,
  area,
  placingProducts,
}) {
  const buildBox = () => {
    let size = 12 / shelf.boxesInWidth;
    let height = (100 / shelf.boxesInHeight) * 1.5;
    let totalBox = shelf.boxesInWidth * shelf.boxesInHeight;
    if (totalBox >= 20) {
      let nameBox;
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
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Typography color="black" variant="h2" sx={{ textAlign: "center" }}>
            {nameBox} x {totalBox} Boxes
          </Typography>
        </Box>
      );
    }

    return shelf?.boxes?.map((e, i) => {
      let color = "#99E5FE";
      let nameBox;

      if (e.orderId !== null) {
        color = "#04BFFE";
      }

      if (currentBox?.id === e.id && currentBox !== undefined) {
        color = "#26FF7B";
      }

      placingProducts.boxes.forEach((ele) => {
        if (e.id === ele.idBox) {
          color = "#00993C";
        }
      });

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
            onClick={() => {
              if (isModifyShelf === false) {
                setUpCurrentBox({
                  ...e,
                  areaName: area.name,
                  storageName: storage.name,
                  storageId: storage.id,
                  areaId: area.id,
                  shelfName: shelf.name,
                  shelfType: shelf.type,
                  nameBox: nameBox,
                  boxSize: shelf.boxSize,
                });
                if (e.orderId !== null) {
                  handleOpenDetailBox();
                } else {
                }
              }
            }}
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
      {index === lengthList - 1 || index === 2 || index === 5 ? (
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

const mapStateToProps = (state) => ({
  currentBox: state.order.currentBox,
  placingProducts: state.order.placingProducts,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUpCurrentBox: (box) => dispatch(action.setUpCurrentBox(box)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shelf);
