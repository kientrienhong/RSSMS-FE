import React from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import * as action from "../../redux/action/action";

function LogIn(props) {
  const navigate = useNavigate();

  const submitLogin = async () => {
    props.showLoading();
    props.hideLoading();
    navigate("/app/account", { replace: true });
  };

  const style = {
    boxTextField: {
      width: "60%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      marginBottom: "5%",
    },
  };

  return (
    <Box style={{ display: "relative", width: "100%", height: "100%" }}>
      <Box
        sx={{ display: "flex", flexDirection: "row", alignItems: "flex-start" }}
      >
        <Box sx={{ width: "50%", height: "100%", display: "inline-block" }}>
          <img
            style={{ height: "100vh", width: "100%" }}
            alt="loginBackground"
            src={"/img/loginBackground.png"}
            className="nav__log-in__img"
          ></img>
        </Box>
        <Box
          sx={{
            width: "50%",
            height: "100%",
            display: "inline-block",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              alt="logo"
              style={{ margin: "5% 0%", width: "100px", height: "100px" }}
              src={process.env.PUBLIC_URL + "/img/logo.png"}
              className="nav__log-in__img"
            ></img>
            <Typography color="primary" variant="h1" style={{ margin: "4%" }}>
              Sign in
            </Typography>
            <Box sx={style.boxTextField}>
              <Typography variant="h3" style={{ marginBottom: "4%" }}>
                Email
              </Typography>
              <TextField variant="outlined" />
            </Box>
            <Box sx={style.boxTextField}>
              <Typography variant="h3" style={{ marginBottom: "4%" }}>
                Password
              </Typography>
              <TextField variant="outlined" />
            </Box>
            <Box sx={style.boxTextField}>
              <Button
                style={{ height: "45px" }}
                color="primary"
                onClick={async () => await submitLogin()}
                component="a"
                variant="contained"
              >
                Sign in
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      <LoadingPage />
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
