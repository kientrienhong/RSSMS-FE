import React from "react";
import {Box, Modal, Typography, Button} from "@material-ui/core";
import {STYLE_MODAL} from "../../../constant/style";
import Schedule from "./Schedule";

export default function ListUnassignOrderModal({
  open,
  handleClose,
  setCurrentOrder,
  listUnassignOrder,
  handleOpenDetailOrder,
  handleOpenAssignTime,
}) {
  const buildListOrder = () => {
    return listUnassignOrder?.map((e, index) => (
      // <Grid item sx={2} >
      <Schedule
        schedule={e}
        key={index}
        setCurrentOrder={setCurrentOrder}
        handleOpen={handleOpenDetailOrder}
        handleOpenAssignTime={handleOpenAssignTime}
      />
      // </Grid>
    ));
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
          ...STYLE_MODAL,
          width: "80%",
          height: "90%",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexDirection: "column",
          padding: "4%",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{
            marginTop: "2%",
            textAlign: "left",
            marginLeft: "2.5%",
            marginBottom: "3%",
          }}
        >
          List unassign return time order
        </Typography>
        <Box
          sx={{
            width: "100%",
            height: "95%",
            overflow: "hidden",
            overflowY: "scroll",
          }}
        >
          {/* <Grid
            container
            spacing={1}
            sx={{
              width: "100%",
            }}
          > */}
          {buildListOrder()}
          {/* </Grid> */}
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            width: "100%",
            marginTop: "32px",
          }}
        >
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            onClick={() => handleClose()}
            color="error"
            variant="outlined"
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
