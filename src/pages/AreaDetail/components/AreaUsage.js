import React from "react";
import { Box, Card, Typography, CircularProgress } from "@material-ui/core";
import PropTypes from "prop-types";

function CircularProgressWithLabel(props) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p>{`${Math.round(props.value)}%`}</p>
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

export default function AreaUsage({ area }) {
  return (
    <Card
      sx={{
        width: "100%",
        height: "35%",
        marginLeft: "1%",
        display: "flex",
        flexDirection: "column",
        marginRight: "3%",
        alignItems: "center",
        justifyAligns: "space-between",
        padding: "2%",
      }}
    >
      <CircularProgressWithLabel
        value={area.usage}
        width="80px"
        height="80px"
        sx={{ marginBottom: "8px", marginTop: "16px" }}
      />
      <Typography
        color="black"
        variant="h2"
        sx={{ textAlign: "left", marginBottom: "16px" }}
      >
        Boxes Used
      </Typography>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          marginBottom: "4%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Not available</p>
          <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
            0
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p>Available</p>
          <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
            {area.totalBox}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
}
