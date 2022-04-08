import React from "react";
import Shelf from "./Shelf";
import {Typography} from "@material-ui/core";

export default function ListShelf({
  listShelf,
  handleOpen,
  area,
  handleOpenSpace,
  storage,
  handleOpenSelfStorage,
  handleOpenConfirm,
  setDetailFloor,
}) {
  const mapShelf = () => {
    return listShelf.map((e, index) => {
      return (
        <Shelf
          shelf={e}
          id={index}
          area={area}
          storage={storage}
          handleOpenSpace={handleOpenSpace}
          handleOpenSelfStorage={handleOpenSelfStorage}
          handleOpen={handleOpen}
          handleOpenConfirm={handleOpenConfirm}
          setDetailFloor={setDetailFloor}
        />
      );
    });
  };

  return (
    <>
      {listShelf.length > 0 ? (
        mapShelf()
      ) : (
        <Typography
          color="black"
          variant="h2"
          sx={{textAlign: "center", marginTop: "2%"}}
        >
          Chưa có không gian chứa
        </Typography>
      )}
    </>
  );
}
