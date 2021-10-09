import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../Loading/LoadingPage";
import * as action from "../../redux/action/action";
import { login } from "../../apis/Apis";
function LogIn(props) {
  const [isValid, setValid] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [input, setInput] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const submitLogin = async () => {
    props.showLoading();
    try {
      const response = await login(input.email, input.password);
      if (response.code === 404) {
        setValid(false);
        setErrorMsg("Invalid username or password");
      } else {
        navigate("/app/account", { replace: true });
      }
    } catch (e) {
      console.log(e);
      setValid(false);
      setErrorMsg("Invalid username or password");
    } finally {
      props.hideLoading();
    }
  };

  const handleOnChange = (e, value) => {
    let inputTemp = { ...input };
    inputTemp[`${value}`] = e.target.value;
    setInput(inputTemp);
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
              <TextField
                variant="outlined"
                onChange={(e) => handleOnChange(e, "email")}
              />
            </Box>
            <Box sx={style.boxTextField}>
              <Typography variant="h3" style={{ marginBottom: "1%" }}>
                Password
              </Typography>

              <TextField
                type="password"
                variant="outlined"
                onChange={(e) => handleOnChange(e, "password")}
              />
            </Box>
            {isValid === false ? (
              <p style={{ color: "red" }}>{errorMsg}</p>
            ) : null}

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
    logIn: (user) => dispatch(action.logIn(user)),
  };
};

export default connect(null, mapDispatchToProps)(LogIn);
