import React from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import {
  PRIMARY_BLUE,
  SECOND_BLUE,
  PRIMARY_SEMANTIC_GREEN,
  SECOND_SEMANTIC_GREEN,
} from "../../../constant/style";
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
  openStoredOrderModal,
  moveBox,
  storageId,
  handleOpenMoveBox,
}) {
  const buildBox = () => {
    let size = 12 / shelf.boxesInWidth;
    let height = (100 / shelf.boxesInHeight) * 1.5;
    let totalBox = shelf.boxesInWidth * shelf.boxesInHeight;
    if (totalBox >= 20) {
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
            {shelf?.sizeType} x {totalBox} Boxes
          </Typography>
        </Box>
      );
    }

    return shelf?.boxes?.map((e, i) => {
      let color = SECOND_BLUE;
      let nameBox;

      if (e?.orderId !== null) {
        color = PRIMARY_BLUE;
      }

      if (currentBox?.id === e.id && currentBox !== undefined) {
        color = PRIMARY_SEMANTIC_GREEN;
      }

      placingProducts?.boxes.forEach((ele) => {
        if (e?.id === ele?.idBox) {
          color = SECOND_SEMANTIC_GREEN;
        }
      });

      if (shelf?.type === 0) {
        nameBox =
          shelf?.sizeType === "Bolo" ? "Bolo" : shelf?.sizeType?.split(" ")[1];
        nameBox += ` - ${i + 1}`;
      } else {
        nameBox = shelf?.sizeType;
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
                  storageId: parseInt(storageId),
                  areaId: area.id,
                  shelfName: shelf.name,
                  shelfType: shelf.type,
                  nameBox: nameBox,
                  productId: shelf.productId,
                  sizeType: shelf.sizeType,
                });
                if (e.orderId !== null) {
                  handleOpenDetailBox();
                } else {
                  if (moveBox === undefined) {
                    openStoredOrderModal(false);
                  } else {
                    handleOpenMoveBox();
                  }
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
  moveBox: state.order.moveBox,
});

const mapDispatchToProps = (dispatch) => {
  return {
    openStoredOrderModal: (isView) =>
      dispatch(action.openStoredOrderModal(isView)),
    setUpCurrentBox: (box) => dispatch(action.setUpCurrentBox(box)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Shelf);
