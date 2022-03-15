import React from "react";
import Shelf from "./Shelf";
export default function ListShelf({ listShelf, handleOpen }) {
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const mapShelf = () => {
    return listShelf.map((e, index) => {
      return (
        <Shelf
          shelf={e}
          handleChange={handleChange}
          expanded={expanded}
          id={index}
          handleOpen={handleOpen}
        />
      );
    });
  };

  return <>{mapShelf()}</>;
}
