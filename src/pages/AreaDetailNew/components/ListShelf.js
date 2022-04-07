import React from "react";
import Shelf from "./Shelf";
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

  return <>{mapShelf()}</>;
}
