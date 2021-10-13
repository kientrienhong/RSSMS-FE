import React from "react";
import { Grid, Box } from "@material-ui/core";
import Shelf from "./Shelf";

export default function ListShelf({ listShelf, setCurrentShelf, handleOpen }) {
  const handleOnClickEdit = (shelf) => {
    setCurrentShelf(shelf);
    handleOpen(true);
  };

  const handleOnClickDelete = (shelf) => {
    setCurrentShelf(shelf);
  };

  const handleOnClickSeeMore = (shelf) => {
    setCurrentShelf(shelf);
    handleOpen(true);
  };

  const mapListToGrid = (listShelf, setCurrentShelf) =>
    listShelf.map((e, i) => (
      <Grid
        container
        sx={{ height: "50%", padding: 0, margin: 0, width: "33%" }}
        key={i}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            height: "100%",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              height: "20%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h4 style={{ marginRight: "8px" }}>{e.name}</h4>
            <img
              src="/img/edit.png"
              alt="edit"
              style={{
                marginRight: "2%",
                cursor: "pointer",
                width: "18px",
                height: "18px",
              }}
              onClick={() => handleOnClickEdit(e)}
            />
            <img
              src="/img/delete.png"
              alt="edit"
              style={{
                marginRight: "2%",
                cursor: "pointer",
                width: "18px",
                height: "18px",
              }}
              onClick={() => handleOnClickDelete(e)}
            />
            <img
              src="/img/info.png"
              alt="edit"
              style={{ cursor: "pointer", width: "18px", height: "18px" }}
              onClick={() => handleOnClickSeeMore(e)}
            />
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              height: "80%",
              flexDirection: "row",
            }}
          >
            <Shelf shelf={e} index={i} />
          </Box>
        </Box>
      </Grid>
    ));

  return (
    <Grid
      container
      sx={{
        width: "100%",
        height: "95%",
        marginBottom: "16px",
      }}
    >
      {mapListToGrid(listShelf, setCurrentShelf)}
    </Grid>
  );
}
