import React from "react";
import Shelf from "./Shelf";
export default function ListShelf({ listShelf }) {
  const [expanded, setExpanded] = React.useState(false);
  console.log(listShelf);
  const handleChange = (panel) => (event, isExpanded) => {
    console.log(isExpanded, panel);
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
        />
      );
    });
  };

  return <>{mapShelf()}</>;
}
