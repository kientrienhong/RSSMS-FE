import React from "react";
import { Box, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";

export default function CircularProgressWithLabel(props) {
  return (
    <Box
      sx={{ position: "relative", display: "inline-flex", margin: "0 auto" }}
    >
      <CircularProgress variant="determinate" {...props} size={96} />
      <Box
        sx={{
          top: "50%",
          left: "50%",
          position: "absolute",
          transform: "translate(-50%, -50%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p
          style={{ fontSize: "20px", display: "inline-block", margin: "0" }}
        >{`${Math.round(props.value)}%`}</p>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   * @default 0
   */
  value: PropTypes.number.isRequired,
};
