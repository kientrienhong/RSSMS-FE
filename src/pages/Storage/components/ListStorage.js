import React from "react";
import { Grid, Item } from "@material-ui/core";
import Storage from "./Storage";
function createData(
  id,
  name,
  address,
  img,
  size,
  status,
  type,
  remainingTime,
  usage,
  manager
) {
  return {
    id,
    name,
    address,
    img,
    size,
    status,
    type,
    remainingTime,
    usage,
    manager,
  };
}

const listStorage = [
  createData(
    1,
    "Storage 1",
    "12 Kim Bien",
    "test",
    "2m x 10m x 2m",
    "Available",
    "Self-storage",
    "2 years 2 weeks 2 days",
    "",
    "Hong Kien Trien"
  ),
  createData(
    1,
    "Storage 1",
    "12 Kim Bien",
    "test",
    "2m x 10m x 2m",
    "Available",
    "Self-storage",
    "2 years 2 weeks 2 days",
    "",
    "Hong Kien Trien"
  ),
  createData(
    1,
    "Storage 1",
    "12 Kim Bien",
    "test",
    "2m x 10m x 2m",
    "Available",
    "Self-storage",
    "2 years 2 weeks 2 days",
    "",
    "Hong Kien Trien"
  ),
  createData(
    1,
    "Storage 1",
    "12 Kim Bien",
    "test",
    "2m x 10m x 2m",
    "Available",
    "Self-storage",
    "2 years 2 weeks 2 days",
    "",
    "Hong Kien Trien"
  ),
  createData(
    1,
    "Storage 1",
    "12 Kim Bien",
    "test",
    "2m x 10m x 2m",
    "Available",
    "Self-storage",
    "2 years 2 weeks 2 days",
    "",
    "Hong Kien Trien"
  ),
  createData(
    1,
    "Storage 1",
    "12 Kim Bien",
    "test",
    "2m x 10m x 2m",
    "Available",
    "Self-storage",
    "2 years 2 weeks 2 days",
    "",
    "Hong Kien Trien"
  ),
];

const mapListToGrid = (listStorage) =>
  listStorage.map((e) => (
    <Grid item xs={5.94}>
      <Storage storage={e} />
    </Grid>
  ));

export default function ListStorage() {
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
      {mapListToGrid(listStorage)}
    </Grid>
  );
}
