import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Card, Typography } from "@material-ui/core";
import CustomAvatar from "../../components/CustomAvatar";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import UpdateInformation from "./UpdateInformation";
function Account({ user, showLoading, hideLoading, showSnackbar }) {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "85vh",
        py: 3,
        padding: "1%",
      }}
    >
      <Card
        variant="outlined"
        color="#FFF"
        sx={{
          marginLeft: "2%",
          marginRight: "2%",
          height: "100%",
          width: "96%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          color="black"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginLeft: "2.5%" }}
        >
          Account information
        </Typography>
        <UpdateInformation />
      </Card>
    </Box>
  );
}

export default connect()(Account);
