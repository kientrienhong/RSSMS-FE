import React from "react";
import { Box, Modal, Typography, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
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
}) {
  let nameBox;
  if (currentShelf?.type === 0) {
    if (currentShelf?.boxSize === 0) {
      nameBox = "Bolo";
    } else if (currentShelf?.boxSize === 1) {
      nameBox = "S";
    } else if (currentShelf?.boxSize === 2) {
      nameBox = "M";
    } else if (currentShelf?.boxSize === 3) {
      nameBox = "L";
    } else if (currentShelf?.boxSize === 4) {
      nameBox = "XL";
    }
  } else {
    if (currentShelf?.boxSize === 0) {
      nameBox = "0.5m2";
    } else if (currentShelf?.boxSize === 1) {
      nameBox = "1m2";
    } else if (currentShelf?.boxSize === 2) {
      nameBox = "2m2";
    } else if (currentShelf?.boxSize === 3) {
      nameBox = "3m2";
    }
  }

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
            {nameBox} x {totalBox} Boxes
          </Typography>
        </Box>
      );
    }
    return currentShelf?.boxes?.map((e, i) => {
      let color = "#99E5FE";

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

      let nameBoxPrint = nameBox;
      if (currentShelf?.type === 0) {
        nameBoxPrint += ` - ${i + 1}`;
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
            }}
          >
            <p
              style={{
                fontSize: "auto",
                color: "black",
                fontWeight: 700,
              }}
            >
              {nameBoxPrint}
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
              Box size: {nameBox}
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ShelfModalDetail);
