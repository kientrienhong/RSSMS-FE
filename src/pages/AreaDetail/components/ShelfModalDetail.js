import React from "react";
import { Box, Modal, Typography, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import {
  STYLE_MODAL,
  PRIMARY_BLUE,
  SECOND_BLUE,
  PRIMARY_SEMANTIC_GREEN,
  SECOND_SEMANTIC_GREEN,
} from "../../../constant/style";
import { BOX_SIZE, AREA_SIZE } from "../../../constant/constant";
const styleModal = {
  ...STYLE_MODAL,
  width: "90%",
};

function ShelfModalDetail({
  currentShelf,
  open,
  handleClose,
  currentBox,
  storage,
  area,
  setUpCurrentBox,
  placingProducts,
  handleOpenDetailBox,
  openStoredOrderModal,
}) {
  let nameBox;

  const buildBox = () => {
    let size = 12 / currentShelf.boxesInWidth;
    let height = (100 / currentShelf.boxesInHeight) * 4;
    let totalBox = currentShelf.boxesInWidth * currentShelf.boxesInHeight;
    if (totalBox >= 401) {
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
            {currentShelf?.sizeType} x {totalBox} Boxes
          </Typography>
        </Box>
      );
    }
    return currentShelf?.boxes?.map((e, i) => {
      let color = SECOND_BLUE;

      if (e.orderId !== null) {
        color = PRIMARY_BLUE;
      }

      if (currentBox?.id === e.id && currentBox !== undefined) {
        color = PRIMARY_SEMANTIC_GREEN;
      }

      placingProducts.boxes.forEach((ele) => {
        if (e.id === ele.idBox) {
          color = SECOND_SEMANTIC_GREEN;
        }
      });

      if (currentShelf?.type === 0) {
        nameBox =
          currentShelf?.sizeType === "Bolo"
            ? "Bolo"
            : currentShelf?.sizeType?.split(" ")[1];
        nameBox += ` - ${i + 1}`;
      } else {
        nameBox = currentShelf?.sizeType;
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
              setUpCurrentBox({
                ...e,
                areaName: area.name,
                storageName: storage.name,
                storageId: storage.id,
                areaId: area.id,
                shelfName: currentShelf.name,
                shelfType: currentShelf.type,
                nameBox: nameBox,
                boxSize: currentShelf.boxSize,
              });

              if (e.orderId !== null) {
                handleOpenDetailBox();
              } else {
                openStoredOrderModal(false);
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box
            sx={{
              diplay: "flex",
              flexDirection: "column",
              marginRight: "32px",
            }}
          >
            <Typography
              color="black"
              variant="h2"
              sx={{ marginBottom: "16px" }}
            >
              Name: {currentShelf.name}
            </Typography>
            <Typography
              color="black"
              variant="h2"
              sx={{ marginBottom: "16px" }}
            >
              Box size: {currentShelf.sizeType}
            </Typography>
          </Box>
          <Box sx={{ diplay: "flex", flexDirection: "column" }}>
            <Typography
              color="black"
              variant="h2"
              sx={{ marginBottom: "16px" }}
            >
              Amount boxes in width: {currentShelf.boxesInWidth}
            </Typography>
            <Typography
              color="black"
              variant="h2"
              sx={{ marginBottom: "16px" }}
            >
              Amount boxes in width: {currentShelf.boxesInHeight}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ width: "100%", height: "auto" }}>
          <Grid
            container
            spacing={0.5}
            item
            style={{ height: "auto" }}
            xs={12}
            sx={{
              direction: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: "auto",
            }}
          >
            {buildBox()}
          </Grid>
        </Box>
      </Box>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  currentBox: state.order.currentBox,
  placingProducts: state.order.placingProducts,
});

const mapDispatchToProps = (dispatch) => {
  return {
    setUpCurrentBox: (box) => dispatch(action.setUpCurrentBox(box)),
    openStoredOrderModal: (isView) =>
      dispatch(action.openStoredOrderModal(isView)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShelfModalDetail);
