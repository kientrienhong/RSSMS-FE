import React, {useRef, useState} from "react";
import {connect} from "react-redux";
import * as action from "../../redux/action/action";
import {Controller, useForm} from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import {Box, Button, TextField} from "@material-ui/core";
import {changePassword} from "../../apis/Apis";
import {ErrorHandle} from "../../utils/ErrorHandle";
function ChangePassword({
  showLoading,
  hideLoading,
  showSnackbar,
  userId,
  userState,
  handleExtendSession,
}) {
  const {handleSubmit, control, watch} = useForm();
  const [error, setError] = useState("");
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

  const styleInput = {marginRight: "2.5%", marginLeft: "2.5%"};
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
      showSnackbar("success", "Thay đổi mật khẩu thành công!");
    } catch (e) {
      ErrorHandle.handle(error, showSnackbar, handleExtendSession);

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
        <Box sx={{...styleBoxInput, marginTop: "2%"}}>
          <CustomInput
            control={control}
            rules={{
              required: "*Vui lòng nhập",
            }}
            styles={{width: "300px"}}
            name="oldPassword"
            label="Mật khẩu cũ"
            disabled={false}
            type="password"
            userInfo={""}
            inlineStyle={styleInput}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              required: "*Vui lòng nhập",
            }}
            render={({field: {onChange, value}, fieldState: {error}}) => {
              return (
                <TextField
                  label="Mật khẩu mới"
                  variant="outlined"
                  inputRef={password}
                  value={value}
                  style={styleInput}
                  inputProps={{style: {width: "300px"}}}
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
              required: "*Vui lòng nhập",
              validate: (value) => {
                return (
                  value === (password.current.value ?? password.current) ||
                  "*Mật khẩu không khớp"
                );
              },
            }}
            styles={{width: "300px"}}
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            type="password"
            userInfo={""}
            inlineStyle={styleInput}
          />
        </Box>
        {error?.length > 0 ? (
          <p style={{color: "red", textAlign: "center", marginTop: "36px"}}>
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
            Xác nhận
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
    handleExtendSession: (isOpen) =>
      dispatch(action.handleExtendSession(isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
