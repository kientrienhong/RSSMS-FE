import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Modal,
  Typography,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import ListUsers from "./components/ListUsers";
import CustomAvatar from "../../components/CustomAvatar";
import { getListUser } from "../../apis/Apis";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CustomInput from "../../components/CustomInput";
let inputFile;

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const styleBoxInput = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "flex-start",
  height: "40px",
  width: "95%",
  marginTop: "8% ",
};

const styleBoxComboBox = {
  display: "flex",
  flexDirection: "column",
  width: "50%",
};

const handleOnclickAvatar = () => {
  inputFile.current.click();
};

const onChangeInputFile = (event, setUser, user) => {
  setUser({
    ...user,
    avatar: URL.createObjectURL(event.target.files[0]),
    avatarFile: event.target.files[0],
  });
};

const styleInput = { marginRight: "2.5%", marginLeft: "2.5%" };

const buildModal = (
  user,
  open,
  handleClose,
  setUser,
  onSubmit,
  handleSubmit,
  control
) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          ...styleModal,
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "column",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            id="file"
            ref={inputFile}
            onChange={(e) => onChangeInputFile(e, setUser, user)}
            style={{ display: "none" }}
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
              url={user.avatar}
              isEdit="true"
              onHandleClick={handleOnclickAvatar}
            />
          </Box>

          <Typography
            color="black"
            variant="h2"
            style={{ marginTop: "2%", textAlign: "left", marginLeft: "2.5%" }}
          >
            Account information
          </Typography>
          <Box sx={{ ...styleBoxInput, marginTop: "2%" }}>
            <CustomInput
              control={control}
              rules={{ required: "Email required" }}
              styles={{ width: "320px" }}
              name="email"
              label="Email"
              userInfo={user.email}
              inlineStyle={styleInput}
            />
            <CustomInput
              control={control}
              rules={{ required: "Name required" }}
              styles={{ width: "280px" }}
              name="name"
              label="Name"
              userInfo={user.name}
              inlineStyle={styleInput}
            />
          </Box>
          <Box sx={{ ...styleBoxInput }}>
            <CustomInput
              control={control}
              rules={{ required: "Address required" }}
              styles={{ width: "400px" }}
              name="address"
              label="Address"
              userInfo={user.address}
              inlineStyle={styleInput}
            />
            <CustomInput
              control={control}
              rules={{ required: "Phone required" }}
              styles={{ width: "160px" }}
              name="phone"
              label="Phone"
              userInfo={user.phone}
              inlineStyle={styleInput}
            />
          </Box>
          <Box sx={{ ...styleBoxInput }}>
            <CustomInput
              control={control}
              rules={{ required: "Password required" }}
              styles={{ width: "240px" }}
              name="password"
              label="Password"
              userInfo={user.password}
              type="password"
              inlineStyle={styleInput}
            />
            <CustomInput
              control={control}
              rules={{ required: "Confirm password required" }}
              styles={{ width: "240px" }}
              name="confirmPassword"
              label="Confirm Password"
              userInfo={user.password}
              type="password"
              inlineStyle={styleInput}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={styleBoxComboBox}>
              <Typography
                color="black"
                variant="h2"
                style={{
                  marginTop: "2%",
                  textAlign: "left",
                  marginLeft: "2.5%",
                }}
              >
                Type
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 120, color: "black" }}>
                <Select
                  value={user.roleName}
                  // onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value={null}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Customer"}>Customer</MenuItem>
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Office Staff"}>Office Staff</MenuItem>
                  <MenuItem value={"Delivery Staff"}>Delivery Staff</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box sx={styleBoxComboBox}>
              <Typography
                color="black"
                variant="h2"
                style={{
                  marginTop: "2%",
                  textAlign: "left",
                  marginLeft: "2.5%",
                }}
              >
                Assign to Storage
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 120, color: "black" }}>
                <Select
                  value={""}
                  // onChange={handleChange}
                  value={user.storageName}
                  displayEmpty
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={"Customer"}>Customer</MenuItem>
                  <MenuItem value={"Manager"}>Manager</MenuItem>
                  <MenuItem value={"Office Staff"}>Office staff</MenuItem>
                  <MenuItem value={"Delivery Staff"}>Delivery staff</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Box
            sx={{
              width: "35%",
              margin: "2% auto",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
              // onClick={() => onHandleSubmit(user)}
              color="primary"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
            <Button
              style={{
                height: "45px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
              onClick={() => handleClose()}
              color="error"
              variant="outlined"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

function Users(props) {
  const onSubmit = (data) => console.log(data);
  const { handleSubmit, reset, control } = useForm();
  const { showLoading, hideLoading } = props;
  inputFile = useRef(null);

  useEffect(() => {
    const getData = async (name, page, size) => {
      let list = await getListUser(name, page, size);
      setListUser(list.data.data);
    };

    const firstCall = async () => {
      try {
        showLoading();
        await getData("", 1, 8);
      } catch (error) {
        console.log(error);
      } finally {
        hideLoading();
      }
    };
    firstCall();
  }, []);

  const [open, setOpen] = React.useState(false);
  const [listUser, setListUser] = React.useState([]);

  const [user, setUser] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUser({});
  };
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      {buildModal(
        user,
        open,
        handleClose,
        setUser,
        onSubmit,
        handleSubmit,
        control
      )}
      <Box
        sx={{
          marginLeft: "2%",
          marginBottom: "1%",
          display: "flex",
          height: "45px",
          flexDirection: "row",
        }}
      >
        <TextField
          hiddenLabel
          sx={{
            width: "80%",
          }}
          InputProps={{
            style: { height: "45px", backgroundColor: "white" },
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ width: "2%" }} />
        <Button
          style={{ height: "45px", paddingLeft: "16px", paddingRight: "16px" }}
          color="primary"
          variant="contained"
          onClick={(e) => {
            setUser({});
            handleOpen();
          }}
        >
          Create user
        </Button>
      </Box>
      <Card
        variant="outlined"
        color="#FFF"
        sx={{ marginLeft: "2%", marginRight: "2%" }}
      >
        <ListUsers
          handleOpen={handleOpen}
          setUser={setUser}
          listUser={listUser}
          reset={reset}
        />
      </Card>
    </Box>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
  };
};
export default connect(null, mapDispatchToProps)(Users);
