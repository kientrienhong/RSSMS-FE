import React from "react";
import { Grid, Item } from "@material-ui/core";
import Storage from "./Storage";
import ConfirmModal from "../../../components/ConfirmModal";

const mapListToGrid = (listStorage, setCurrentId, handleConfirmOpen) =>
  listStorage.map((e) => (
    <Grid item xs={5.94}>
      <Storage
        storage={e}
        setCurrentId={setCurrentId}
        handleConfirmOpen={handleConfirmOpen}
      />
    </Grid>
  ));

export default function ListStorage({
  listStorages,
  onHandleDeleteStorage,
  setListStorages,
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
      }}
    >
      <ConfirmModal
        open={open}
        handleClose={handleClose}
        onHandleYes={onHandleDeleteStorage}
        listData={listStorages}
        setListData={setListStorages}
        id={currentId}
        msg={"Delete storage success!"}
      />
      {mapListToGrid(listStorages, setCurrentId, handleConfirmOpen)}
    </Grid>
  );
}
