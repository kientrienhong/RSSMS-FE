import React, { useEffect, useRef } from "react";
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
import {
  getListUser,
  createUser,
  updateUser,
  getListStorage,
} from "../../apis/Apis";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { storageFirebase } from "../../firebase/firebase";
import { ROLE_USER } from "../../constant/constant";
import { STYLE_MODAL } from "../../constant/style";

let inputFile;
const styleModal = {
  ...STYLE_MODAL,
  width: "40%",
  height: "auto",
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
  marginTop: "2%",
};

const handleOnclickAvatar = () => {
  inputFile.current.click();
};

const onChangeInputFile = (event, setUser, user) => {
  setUser({
    ...user,
    images: [
      {
        id: user?.images[0]?.id,
        url: URL.createObjectURL(event.target.files[0]),
      },
    ],
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
  control,
  isEdit,
  password,
  handleChangeRole,
  listStorage,
  handleChangeStorageCB
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
        <input type="hidden" name="id" value={user.id} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="file"
            id="file"
            name="fileImage"
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
              url={user?.images[0]?.url}
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
              rules={{
                required: "Email required",
                // pattern: {
                //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                //   message: "Invalid email",
                // },
              }}
              styles={{ width: "540px" }}
              name="email"
              label="Email"
              disabled={isEdit}
              userInfo={user.email}
              inlineStyle={styleInput}
            />
          </Box>
          <Box sx={{ ...styleBoxInput }}>
            <CustomInput
              control={control}
              rules={{ required: "Name required" }}
              styles={{ width: "240px" }}
              name="name"
              label="Name"
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
          {isEdit === true ? null : (
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
                rules={{
                  required: "Confirm password required",
                  validate: (value) =>
                    value === password.current || "The passwords do not match",
                }}
                styles={{ width: "240px" }}
                name="confirmPassword"
                label="Confirm Password"
                userInfo={user.password}
                type="password"
                inlineStyle={styleInput}
              />
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginTop: "5%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {isEdit === false ? (
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
                <FormControl
                  sx={{ m: 1, minWidth: 120, color: "black" }}
                  name="roleName"
                >
                  <Select
                    value={user.roleName}
                    onChange={handleChangeRole}
                    displayEmpty
                  >
                    <MenuItem value={"Customer"}>Customer</MenuItem>
                    <MenuItem value={"Manager"}>Manager</MenuItem>
                    <MenuItem value={"Office Staff"}>Office Staff</MenuItem>
                    <MenuItem value={"Delivery Staff"}>Delivery Staff</MenuItem>
                  </Select>
                </FormControl>
                {/* <CustomSelect
                name={"roleName"}
                value={user.roleName || " "}
                control={control}
                options={listRoleOption}
                rules={{ required: "Type required" }}
              /> */}
              </Box>
            ) : null}
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
  const [role, setRole] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [searchName, setSearchName] = React.useState("");
  const [totalUser, setTotalUser] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [listStorage, setListStorage] = React.useState([]);
  const [storageCB, setStorageCB] = React.useState({});
  const handleChangeRole = (event) => {
    setRole(event.target.value);
    console.log(ROLE_USER[event.target.value]);
  };

  const handleChangeStorageCB = (event) => {
    setStorageCB(event.target.value);
  };
  const { handleSubmit, reset, control, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const { showLoading, hideLoading, showSnackbar } = props;
  inputFile = useRef(null);
  const getData = async (name, page, size) => {
    try {
      showLoading();
      let list = await getListUser(name, page, size);
      setListUser(list.data.data);
      setTotalUser(list.data.metadata.total);
    } catch (error) {
      console.log(error.response);
    } finally {
      hideLoading();
    }
  };

  const onHandleSearch = (e) => {
    setSearchName(e.target.value);
    setTimeout(async () => {
      await getData(e.target.value, 1, 8);
      setSearchName(e.target.value);
    }, 700);
  };

  const onHandleUpdateUser = async (data) => {
    let roleName = ROLE_USER[role];
    let userTemp = {
      name: data.name,
      email: data.email,
      address: data.address,
      phone: data.phone,
      roleId: roleName,
      storageId: storageCB,
      images: [
        {
          id: user?.images[0]?.id,
          url: user?.images[0]?.url,
        },
      ],
    };
    try {
      showLoading();
      let id = user.id;
      let responseUpdate;
      if (user.avatarFile !== undefined) {
        let urlFirebase;
        let name = `user/${id}/avatar.png`;
        const ref = storageFirebase.ref(name);
        const uploadTask = ref.put(user.avatarFile);
        uploadTask.on("state_changed", console.log, console.error, async () => {
          urlFirebase = await ref.getDownloadURL();
          responseUpdate = await updateUser(userTemp, id, urlFirebase);
          if (responseUpdate.status === 200) {
            showSnackbar("success", "Update user successful!");
            await getData(searchName, page, 8);
            handleClose();
            hideLoading();
          } else {
            hideLoading();
          }
        });
      } else {
        responseUpdate = await updateUser(userTemp, id, "");
        if (responseUpdate.status === 200) {
          showSnackbar("success", "Update user successful!");
          await getData(searchName, page, 8);
          handleClose();
          hideLoading();
        } else {
          hideLoading();
        }
      }
    } catch (error) {
      console.log(error);
      hideLoading();
    }
  };

  const onHandleCreateUser = async (data) => {
    let roleName = ROLE_USER[role];
    let userTemp = {
      name: data.name,
      password: data.password,
      email: data.email,
      address: data.address,
      phone: data.phone,
      roleId: roleName,
      storageId: storageCB,
      avatarLink: null,
    };
    try {
      showLoading();

      const response = await createUser(userTemp);
      if (response.status === 200) {
        let id = response.data.id;
        let urlFirebase;
        let name = `user/${id}/avatar.png`;
        const ref = storageFirebase.ref(name);
        let uploadTask;
        uploadTask = ref.put(user.avatarFile);
        uploadTask.on("state_changed", console.log, console.error, async () => {
          urlFirebase = await ref.getDownloadURL();
          let responseUpdate = await updateUser(response.data, id, urlFirebase);
          if (responseUpdate.status === 200) {
            showSnackbar("success", "Create user successful!");
            await getData(searchName, page, 8);

            handleClose();
            hideLoading();
          } else hideLoading();
        });
      }
    } catch (error) {
      console.log(error);
      hideLoading();
    }
  };

  const onSubmit = (data) => {
    if (isEdit === false) {
      onHandleCreateUser(data);
    } else {
      onHandleUpdateUser(data);
    }
  };
  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        await getData(searchName, page, 8);
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
      }
    };
    firstCall();
  }, []);

  useEffect(() => {
    const process = async () => {
      if (open === true) {
        try {
          showLoading();
          let listStorage = await getListStorage("", 1, -1);
          setListStorage(listStorage.data.data);
          hideLoading();
        } catch (error) {
          console.log(error);
          hideLoading();
        }
      }
    };
    process();
  }, [open]);

  useEffect(() => {
    const process = async () => {
      try {
        showLoading();
        await getData(searchName, page, 8);
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
      }
    };
    process();
  }, [page]);

  const [listUser, setListUser] = React.useState([]);
  const [isEdit, setEdit] = React.useState(false);
  const [user, setUser] = React.useState({ images: [{ id: null, url: null }] });
  const handleOpen = (isEdit) => {
    setOpen(true);
    setEdit(isEdit);
  };
  const handleClose = () => {
    setOpen(false);
    setUser({ avatarFile: undefined, images: [{ id: null, url: null }] });
    reset();
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
        control,
        isEdit,
        password,
        handleChangeRole,
        listStorage,
        handleChangeStorageCB
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
          onChange={(e) => onHandleSearch(e)}
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
            setUser({ images: [{ id: null, url: null }] });
            handleOpen(false);
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
          getData={getData}
          reset={reset}
          searchName={searchName}
          setListUser={setListUser}
          page={page}
          setPage={setPage}
          totalUser={totalUser}
        />
      </Card>
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
export default connect(null, mapDispatchToProps)(Users);
