import React from "react";
import { Box, Modal, Typography, Grid } from "@material-ui/core";

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

export default function ShelfModalDetail({
  currentShelf,
  open,
  setCurrentBox,
  handleClose,
  currentBox,
}) {
  const buildBox = () => {
    let size = 12 / currentShelf.boxesInWidth;
    let height = (100 / currentShelf.boxesInHeight) * 4;
    let totalBox = currentShelf.boxesInWidth * currentShelf.boxesInHeight;
    if (totalBox >= 401) {
      let nameBox;
      if (currentShelf?.type === 0) {
        if (currentShelf?.boxSize === 0) {
          nameBox = "S";
        } else if (currentShelf?.boxSize === 1) {
          nameBox = "M";
        } else if (currentShelf?.boxSize === 2) {
          nameBox = "L";
        } else if (currentShelf?.boxSize === 3) {
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
      let nameBox;
      if (currentBox?.id === e.id && currentBox !== undefined) {
        color = "#26FF7B";
      }

      if (currentShelf?.type === 0) {
        if (currentShelf?.boxSize === 0) {
          nameBox = "S";
        } else if (currentShelf?.boxSize === 1) {
          nameBox = "M";
        } else if (currentShelf?.boxSize === 2) {
          nameBox = "L";
        } else if (currentShelf?.boxSize === 3) {
          nameBox = "XL";
        }
        nameBox += `- ${i + 1}`;
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
              setCurrentBox(e);
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
