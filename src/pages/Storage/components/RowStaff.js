import React from "react";
import { Box } from "@material-ui/core";
export default function RowStaff({
  staff,
  isAssigned,
  addAssignStaff,
  removeAssignStaff,
}) {
  const style = {
    marginLeft: "16px",
    cursor: "pointer",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "40%",
        }}
      >
        <p>{staff.name}</p>
      </Box>
      <Box
        sx={{
          width: "40%",
        }}
      >
        <p>{staff.roleName}</p>
      </Box>
      <Box
        sx={{
          width: "20%",
        }}
      >
        {isAssigned === true ? (
          <img
            src="/img/minus.png"
            alt="minus"
            width="20px"
            height="20px"
            style={style}
            onClick={() => removeAssignStaff(staff)}
          />
        ) : (
          <img
            src="/img/plus.png"
            alt="plus"
            width="20px"
            height="20px"
            style={style}
            onClick={() => addAssignStaff(staff)}
          />
        )}
      </Box>
    </Box>
  );
}
