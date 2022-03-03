import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import CustomAvatar from "../../components/CustomAvatar";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { storageFirebase } from "../../firebase/firebase";
import { updateUser } from "../../apis/Apis";
import { MALE, FEMALE, OTHER_GENDER } from "../../constant/constant";
import { getBase64 } from "../../utils/convertImage";
function UpdateInformation({
  user,
  setUpUser,
  showLoading,
  hideLoading,
  showSnackbar,
}) {
  const [imageFile, setImageFile] = useState({});
  const { handleSubmit, control } = useForm();
  const [value, setValue] = React.useState(user.gender);
  const [error, setError] = React.useState("");
  const handleChange = (event) => {
    setValue(parseInt(event.target.value));
  };

  let imageUrl;
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
    let dob = new Date(data.birthdate);
    let currentYear = new Date();
    if (dob > currentYear) {
      setError("\nVui lòng nhập ngày trước ngày hôm nay");
    } else if (currentYear.getFullYear() - dob.getFullYear() < 18) {
      setError("\nVui lòng nhập năm sinh lớn hơn 18 tuổi");
    }

    if (error.length > 0) {
      return;
    }

    let roleId;

    if (user.roleName === "Delivery Staff") {
      roleId = 4;
    } else if (user.roleName === "Customer") {
      roleId = 3;
    } else if (user.roleName === "Office Staff") {
      roleId = 5;
    } else if (user.roleName === "Manager") {
      roleId = 2;
    } else {
      roleId = 1;
    }

    let userTemp = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      gender: value,
      birthdate: data.birthdate,
      roleId: roleId,
      images: {
        url: user?.image?.url,
      },
    };
    let responseUpdate;
    let id = user.userId;
    showLoading();
    if (imageFile.url) {
      try {
        let base64 = await getBase64(imageFile.file);
        responseUpdate = await updateUser(
          userTemp,
          id,
          base64.split(",")[1],
          user.idToken
        );
        if (responseUpdate.status === 200) {
          setUpUser({
            ...user,
            address: data.address,
            name: data.name,
            gender: value,
            birthdate: data.birthdate,
            phone: data.phone,
            imageUrl: responseUpdate.data.imageUrl,
          });
          showSnackbar("success", "Cập nhật thông tin thành công!");
        }
        hideLoading();
      } catch (error) {
        console.log(error.response);
        hideLoading();
      }
    } else {
      try {
        responseUpdate = await updateUser(userTemp, id, "", user.idToken);
        console.log(responseUpdate);
        if (responseUpdate.status === 200) {
          showSnackbar("success", "Cập nhật thông tin thành công!");
          setUpUser({
            ...user,
            address: data.address,
            gender: value,
            birthdate: data.birthdate,
            name: data.name,
            phone: data.phone,
            imageUrl: responseUpdate.data.imageUrl,
          });
        }
        hideLoading();
      } catch (error) {
        hideLoading();
      }
    }
  };

  let inputFile = useRef(null);

  const handleOnclickAvatar = () => {
    inputFile.current.click();
  };

  const onChangeInputFile = (event) => {
    if (
      event.target.files[0].name.includes(".png") ||
      event.target.files[0].name.includes(".jpg") ||
      event.target.files[0].name.includes(".jpeg")
    ) {
      setImageFile({
        url: URL.createObjectURL(event.target.files[0]),
        file: event.target.files[0],
      });
      setError("");
    } else {
      setError("Vui lòng chọn tập tin hình ảnh!");
    }
  };

  if (imageFile?.url === undefined) {
    if (user?.imageUrl === null) {
      imageUrl = undefined;
    } else {
      imageUrl = user.imageUrl;
    }
  } else {
    imageUrl = imageFile.url;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: "1%",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            style={{ display: "none" }}
            ref={inputFile}
            onChange={(e) => onChangeInputFile(e)}
          />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CustomAvatar
              url={imageUrl}
              isEdit="true"
              onHandleClick={handleOnclickAvatar}
            />
          </Box>
          <Box sx={{ ...styleBoxInput, marginTop: "2%" }}>
            <CustomInput
              control={control}
              rules={{
                required: "Email required",
              }}
              styles={{ width: "540px" }}
              name="email"
              label="Email"
              disabled={true}
              userInfo={user.email}
              inlineStyle={styleInput}
            />
          </Box>
          <Box sx={{ ...styleBoxInput }}>
            <CustomInput
              control={control}
              rules={{
                required: "Name required",
              }}
              styles={{ width: "300px" }}
              name="name"
              label="Họ và tên"
              disabled={false}
              userInfo={user.name}
              inlineStyle={styleInput}
            />
            <CustomInput
              control={control}
              rules={{
                required: "*Vui lòng nhập",
                pattern: {
                  value: /^[0][0-9]{9}$/,
                  message: "*Vui lòng nhập số điện thoại đúng",
                },
              }}
              styles={{ width: "240px" }}
              name="phone"
              label="Số điện thoại"
              userInfo={user.phone}
              inlineStyle={styleInput}
            />
          </Box>
          <Box sx={{ ...styleBoxInput, justifyContent: "flex-start" }}>
            <CustomInput
              control={control}
              rules={{
                required: "*Vui lòng nhập",
              }}
              styles={{ width: "240px" }}
              name="birthdate"
              type="date"
              label="Ngày sinh"
              userInfo={
                user?.birthdate?.split("T") === undefined
                  ? ""
                  : user?.birthdate?.split("T")[0]
              }
              inlineStyle={styleInput}
            />
          </Box>

          <p style={{ marginLeft: "2.5%", marginTop: "5%" }}>Giới tính</p>
          <FormControl
            component="fieldset"
            sx={{
              marginLeft: "2.5%",
            }}
          >
            <RadioGroup
              row
              aria-label="Giới tính"
              name="row-radio-buttons-group"
              onChange={handleChange}
              value={value}
            >
              <FormControlLabel value={MALE} control={<Radio />} label="Nam" />
              <FormControlLabel value={FEMALE} control={<Radio />} label="Nữ" />
              <FormControlLabel
                value={OTHER_GENDER}
                control={<Radio />}
                label="Khác"
              />
            </RadioGroup>
          </FormControl>
          <Box sx={{ ...styleBoxInput, marginTop: "3%" }}>
            <CustomInput
              control={control}
              rules={{ required: "*Vui lòng nhập" }}
              styles={{ width: "540px" }}
              name="address"
              label="Địa chỉ"
              userInfo={user.address}
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
              marginTop: "7%",
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
              Cập nhật
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    setUpUser: (user) => dispatch(action.setUpUser(user)),
  };
};

const mapStateToProps = (state) => ({
  user: state.information.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInformation);
