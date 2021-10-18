import React from "react";
import { Grid } from "@material-ui/core";
import Storage from "./Storage";
import ConfirmModal from "../../../components/ConfirmModal";

const mapListToGrid = (
  listStorage,
  setCurrentId,
  handleConfirmOpen,
  setStorage,
  handleOpen
) =>
  listStorage.map((e) => (
    <Grid item xs={5.94} key={e.id}>
      <Storage
        storage={e}
        setCurrentId={setCurrentId}
        handleConfirmOpen={handleConfirmOpen}
        setStorage={setStorage}
        handleOpen={handleOpen}
      />
    </Grid>
  ));

export default function ListStorage({
  listStorages,
  onHandleDeleteStorage,
  setListStorages,
  handleOpen,
  setStorage,
}) {
  const [open, setOpen] = React.useState(false);
  const [currentId, setCurrentId] = React.useState(-1);

  const handleConfirmOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  return (
    <Grid
      container
      spacing={2}
      sx={{
        marginLeft: "2%",
        width: "98%",
        height: "630px",
      }}
    >
      <ConfirmModal
        open={open}
        handleClose={handleClose}
        onHandleYes={onHandleDeleteStorage}
        id={currentId}
        msg={"Delete storage success!"}
      />
      {mapListToGrid(
        listStorages,
        setCurrentId,
        handleConfirmOpen,
        setStorage,
        handleOpen
      )}
    </Grid>
  );
}
