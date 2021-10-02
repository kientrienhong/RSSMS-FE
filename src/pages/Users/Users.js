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
let inputFile;

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "75%",
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
  marginTop: "5% ",
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

const onChangeInput = (e, value, setUser, user) => {
  let tempUser = { ...user };
  tempUser[value] = e.target.value;
  setUser(tempUser);
};

const onHandleSubmit = (user) => {};

const styleInput = { marginRight: "2.5%", marginLeft: "2.5%" };

const buildModal = (user, open, handleClose, setUser) => {
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
        <form>
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
          <Box sx={{ ...styleBoxInput }}>
            <TextField
              variant="outlined"
              label="Email"
              style={styleInput}
              onChange={(e) => onChangeInput(e, "email", setUser, user)}
              defaultValue={user.email}
              inputProps={{
                style: { width: "320px" },
              }}
            />
            <TextField
              variant="outlined"
              label="Name"
              style={styleInput}
              onChange={(e) => onChangeInput(e, "name", setUser, user)}
              defaultValue={user.name}
              inputProps={{
                style: { width: "280px" },
              }}
            />
          </Box>
          <Box sx={{ ...styleBoxInput }}>
            <TextField
              variant="outlined"
              label="Address"
              style={styleInput}
              onChange={(e) => onChangeInput(e, "address", setUser, user)}
              defaultValue={user.address}
              inputProps={{
                style: { width: "400px" },
              }}
            />
            <TextField
              variant="outlined"
              label="Phone"
              style={styleInput}
              onChange={(e) => onChangeInput(e, "phone", setUser, user)}
              defaultValue={user.phone}
              inputProps={{
                style: { width: "160px" },
              }}
            />
          </Box>
          <Box sx={{ ...styleBoxInput }}>
            <TextField
              variant="outlined"
              label="Password"
              style={styleInput}
              onChange={(e) => onChangeInput(e, "password", setUser, user)}
              inputProps={{
                style: { width: "240px" },
              }}
            />
            <TextField
              variant="outlined"
              label="Confirm password"
              onChange={(e) =>
                onChangeInput(e, "confirmPassword", setUser, user)
              }
              style={styleInput}
              inputProps={{
                style: { width: "240px" },
              }}
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
                  value={user.type}
                  // onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem value="">
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
                  value={user.storage}
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
              onClick={() => onHandleSubmit(user)}
              color="primary"
              variant="contained"
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
      console.log(list);
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
  const [user, setUser] = React.useState({});
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      {buildModal(user, open, handleClose, setUser)}
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
        <ListUsers handleOpen={handleOpen} setUser={setUser} />
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
