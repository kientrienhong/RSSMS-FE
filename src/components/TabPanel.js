import React from "react";
import { Box } from "@material-ui/core";
export default function TabPanel(props) {
  const { children, value, index, style, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={style}
    >
      {value === index && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}
