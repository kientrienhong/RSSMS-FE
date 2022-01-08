import React from "react";
import { Box } from "@material-ui/core";
import ItemSidebar from "./ItemSidebar";

export default function ListItemSidebar({ listTime }) {
  const listMapItem = (listMap) => {
    return listMap?.map((e) => <ItemSidebar time={e} />);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "10%",
        marginLeft: "1%",
      }}
    >
      {listMapItem(listTime)}
    </Box>
  );
}
