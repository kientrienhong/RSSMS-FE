import React, { useRef } from "react";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { Box, Button } from "@material-ui/core";
import { changePassword } from "../../apis/Apis";
function ChangePassword({ showLoading, hideLoading, showSnackbar, userId }) {
  const { handleSubmit, control, watch } = useForm();
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
      await changePassword(userId, data.password, data.confirmPassword);
      showSnackbar("success", "Change password successful!");
    } catch (e) {
      console.log(e);
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
              required: "Password required",
            }}
            styles={{ width: "300px" }}
            name="password"
            label="Password"
            disabled={false}
            type="password"
            userInfo={""}
            inlineStyle={styleInput}
          />
          <CustomInput
            control={control}
            rules={{
              required: "Confirm password required",
              validate: (value) =>
                value === password.current || "The passwords do not match",
            }}
            styles={{ width: "300px" }}
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            userInfo={""}
            inlineStyle={styleInput}
          />
        </Box>
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

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(null, mapDispatchToProps)(ChangePassword);
