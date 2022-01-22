import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { Box, Button, TextField } from "@material-ui/core";
import { changePassword } from "../../apis/Apis";
function ChangePassword({
  showLoading,
  hideLoading,
  showSnackbar,
  userId,
  userState,
}) {
  const { register, handleSubmit, control, watch, reset } = useForm();
  const [error, setError] = useState("");
  const [errorPassword, setErrorPassword] = useState({});
  const password = useRef({});
  password.current = watch("password", "");
  const styleBoxInput = {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    height: "40px",
    width: "95%",
    marginTop: "8% ",
  };

  const styleInput = { marginRight: "2.5%", marginLeft: "2.5%" };
  const onSubmit = async (data) => {
    try {
      showLoading();
      await changePassword(
        userId,
        data.oldPassword,
        data.password,
        data.confirmPassword,
        userState.idToken
      );
      showSnackbar("success", "Change password successful!");
    } catch (e) {
      if (e?.response?.data?.error?.message) {
        setError(e?.response?.data?.error?.message);
      }
    } finally {
      hideLoading();
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ ...styleBoxInput, marginTop: "2%" }}>
          <CustomInput
            control={control}
            rules={{
              required: "Old password required",
            }}
            styles={{ width: "300px" }}
            name="oldPassword"
            label="Old Password"
            disabled={false}
            type="password"
            userInfo={""}
            inlineStyle={styleInput}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password required",
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => {
              return (
                <TextField
                  label="Password"
                  variant="outlined"
                  inputRef={password}
                  value={value}
                  style={styleInput}
                  inputProps={{ style: { width: "300px" } }}
                  onChange={onChange}
                  type="password"
                  error={!!error}
                  helperText={error ? error.message : null}
                />
              );
            }}
          />
          <CustomInput
            control={control}
            rules={{
              required: "Confirm password required",
              validate: (value) => {
                console.log(value);
                console.log(password.current);
                return (
                  value === password.current || "The passwords do not match"
                );
              },
            }}
            styles={{ width: "300px" }}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            userInfo={""}
            inlineStyle={styleInput}
          />
        </Box>
        {error?.length > 0 ? (
          <p style={{ color: "red", textAlign: "center", marginTop: "36px" }}>
            {error}
          </p>
        ) : null}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5%",
            marginBottom: "5%",
          }}
        >
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            color="primary"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
