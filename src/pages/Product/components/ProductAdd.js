import React from "react";

export default function ProductAdd({ handleOpen }) {
  return (
    <div
      onClick={() => handleOpen()}
      style={{
        borderRadius: "4px",
        backgroundColor: "#FFF",
        display: "flex",
        flexDirection: "column",
        padding: "2%",
        justifyContent: "center",
        alignItems: "center",
        height: "93%",
        border: "dashed 3px #716F7D",
        cursor: "pointer",
      }}
    >
      <img src="/img/plus.png" alt="plus" width="40px" height="40px" />
    </div>
  );
}
