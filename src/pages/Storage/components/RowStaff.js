import React from "react";
import { Box, Typography, Avatar } from "@material-ui/core";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

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
        marginBottom: "8px",
      }}
    >
      <HtmlTooltip
        title={
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                marginRight: "8px",
              }}
            >
              <Avatar
                src={staff?.images[0]?.url}
                sx={{
                  width: 80,
                  height: 80,
                }}
              />
            </Box>
            <Box>
              <Typography color="black" variant="h5">
                {staff.name}
              </Typography>
              <p>{staff.phone}</p>
              <p>{staff.address}</p>
            </Box>
          </Box>
        }
      >
        <Box
          sx={{
            width: "40%",
          }}
        >
          <p color="primary">{staff.name}</p>
        </Box>
      </HtmlTooltip>
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
