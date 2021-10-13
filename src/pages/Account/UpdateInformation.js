import React, { useEffect, useState, useRef } from "react";
import { Box, Button } from "@material-ui/core";
import CustomAvatar from "../../components/CustomAvatar";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { storageFirebase } from "../../firebase/firebase";
import { updateUser } from "../../apis/Apis";
function UpdateInformation({
  user,
  setUpUser,
  showLoading,
  hideLoading,
  showSnackbar,
}) {
  const [imageFile, setImageFile] = useState({});
  const { handleSubmit, reset, control } = useForm();
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
      roleId: roleId,
      images: [
        {
          id: user?.images[0]?.id,
          url: user?.images[0]?.url,
        },
      ],
    };
    let responseUpdate;
    let id = user.userId;
    showLoading();
    if (imageFile.url) {
      let urlFirebase;
      let name = `user/${id}/avatar.png`;
      const ref = storageFirebase.ref(name);
      const uploadTask = ref.put(imageFile.file);
      uploadTask.on("state_changed", console.log, console.error, async () => {
        urlFirebase = await ref.getDownloadURL();
        responseUpdate = await updateUser(userTemp, id, urlFirebase);
        if (responseUpdate.status === 200) {
          showSnackbar("success", "Update user successful!");
          setUpUser({
            ...user,
            address: data.address,
            name: data.name,
            phone: data.phone,
            images: responseUpdate.data.images,
          });
          hideLoading();
        } else {
          hideLoading();
        }
      });
    } else {
      responseUpdate = await updateUser(userTemp, id, "");
      if (responseUpdate.status === 200) {
        showSnackbar("success", "Update user successful!");
        setUpUser({
          ...user,
          address: data.address,
          name: data.name,
          phone: data.phone,
          images: responseUpdate.data.images,
        });
        hideLoading();
      } else {
        hideLoading();
      }
    }
  };

  let inputFile = useRef(null);

  const handleOnclickAvatar = () => {
    inputFile.current.click();
  };

  const onChangeInputFile = (event) => {
    setImageFile({
      url: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0],
    });
  };

  if (imageFile?.url === undefined) {
    if (user?.images.length === 0) {
      imageUrl = undefined;
    } else {
      imageUrl = user.images[0].url;
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
              label="Name"
              disabled={false}
              userInfo={user.name}
              inlineStyle={styleInput}
            />
            <CustomInput
              control={control}
              rules={{
                required: "Phone required",
                pattern: {
                  value: /[0-9]{10}/,
                  message: "Invalid phone number",
                },
              }}
              styles={{ width: "240px" }}
              name="phone"
              label="Phone"
              userInfo={user.phone}
              inlineStyle={styleInput}
            />
          </Box>
          <Box sx={{ ...styleBoxInput }}>
            <CustomInput
              control={control}
              rules={{ required: "Address required" }}
              styles={{ width: "540px" }}
              name="address"
              label="Address"
              userInfo={user.address}
              inlineStyle={styleInput}
            />
          </Box>
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
              Submit
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