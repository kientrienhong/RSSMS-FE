import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Card, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import UpdateInformation from "./UpdateInformation";
import ChangePassword from "./ChangePassword";
function Account({ user }) {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "auto",
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
        <Typography
          color="black"
          variant="h2"
          style={{ marginTop: "2%", textAlign: "left", marginLeft: "2.5%" }}
        >
          Change password
        </Typography>
        <ChangePassword userId={user.userId} />
      </Card>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  user: state.information.user,
});

export default connect(mapStateToProps, null)(Account);
