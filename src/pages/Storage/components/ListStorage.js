import React from "react";
import { Grid, Item } from "@material-ui/core";
import Storage from "./Storage";

const mapListToGrid = (listStorage) =>
  listStorage.map((e) => (
    <Grid item xs={5.94}>
      <Storage storage={e} />
    </Grid>
  ));

export default function ListStorage({ listStorages }) {
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
      {mapListToGrid(listStorages)}
    </Grid>
  );
}
