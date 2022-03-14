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
  MenuItem,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { MALE, FEMALE, OTHER_GENDER } from "../../constant/constant";

import SearchIcon from "@mui/icons-material/Search";
import ListUsers from "./components/ListUsers";
import CustomAvatar from "../../components/CustomAvatar";
import {
  getListUser,
  createUser,
  updateUser,
  getListRole,
} from "../../apis/Apis";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { Controller, useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import { STYLE_MODAL } from "../../constant/style";
import CustomSelect from "../../components/CustomSelect";
import { getBase64 } from "../../utils/convertImage";
let inputFile;
const styleModal = {
  ...STYLE_MODAL,
  width: "60%",
  height: "auto",
};

const styleBoxInput = {
  display: "flex",
  justifyContent: "flex-start",
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

const onChangeInputFile = (event, setUser, user, setError) => {
  if (
    event.target.files[0].name.includes(".png") ||
    event.target.files[0].name.includes(".jpg") ||
    event.target.files[0].name.includes(".jpeg")
  ) {
    setUser({
      ...user,
      imageUrl: URL.createObjectURL(event.target.files[0]),
      avatarFile: event.target.files[0],
    });
    setError();
  } else {
    setError({ message: "Vui lòng chọn tập tin hình ảnh!" });
  }
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
  errors,
  error,
  gender,
  handleChangeGender,
  setError,
  mapListRoleUser
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
            onChange={(e) => onChangeInputFile(e, setUser, user, setError)}
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
              url={user?.imageUrl}
              isEdit="true"
              onHandleClick={handleOnclickAvatar}
            />
          </Box>

          <Typography
            color="black"
            variant="h2"
            style={{ marginTop: "2%", textAlign: "left", marginLeft: "2.5%" }}
          >
            Thông tin tài khoản
          </Typography>
          <Box sx={{ ...styleBoxInput, marginTop: "2%" }}>
            <CustomInput
              control={control}
              rules={{
                required: "*Vui lòng nhập",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "*Vui lòng mail đúng",
                },
              }}
              styles={{ width: "240px" }}
              name="email"
              label="Email"
              disabled={isEdit}
              userInfo={user.email}
              inlineStyle={styleInput}
            />
            <CustomInput
              control={control}
              rules={{ required: "*Vui lòng nhập" }}
              styles={{ width: "240px" }}
              name="name"
              label="Họ và tên"
              userInfo={user.name}
              inlineStyle={styleInput}
            />
            <CustomInput
              control={control}
              rules={{
                required: "*Vui lòng nhập",
                pattern: {
                  value: /^[0][0-9]{9}$/,
                  message: "*Vui lòng nhập đúng số điện thoại",
                },
              }}
              styles={{ width: "240px" }}
              name="phone"
              label="Số điện thoại"
              userInfo={user.phone}
              inlineStyle={styleInput}
            />
          </Box>
          <Box sx={{ ...styleBoxInput, alignItems: "center" }}>
            <CustomInput
              control={control}
              rules={{ required: "*Vui lòng nhập" }}
              styles={{ width: "370px" }}
              name="address"
              label="Địa chỉ"
              userInfo={user.address}
              inlineStyle={styleInput}
            />
            <Box
              sx={{
                marginLeft: "4%",
                width: "370px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  marginLeft: "2.5%",
                  marginTop: "5%",
                  marginBottom: "0",
                }}
              >
                Giới tính
              </p>
              <FormControl
                component="fieldset"
                sx={{
                  marginLeft: "2.5%",
                }}
              >
                <RadioGroup
                  row
                  aria-label="Giớ tính"
                  name="row-radio-buttons-group"
                  onChange={handleChangeGender}
                  value={gender}
                >
                  <FormControlLabel
                    value={MALE}
                    control={<Radio />}
                    label="Nam"
                  />
                  <FormControlLabel
                    value={FEMALE}
                    control={<Radio />}
                    label="Nữ"
                  />
                  <FormControlLabel
                    value={OTHER_GENDER}
                    control={<Radio />}
                    label="Khác"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          {isEdit === true ? (
            <Box
              sx={{
                ...styleBoxInput,
                alignItems: "center",
                marginLeft: "2%",
                marginTop: "7%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "240px",
                  height: "120px",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    marginLeft: "2.5%",
                    marginTop: "5%",
                  }}
                >
                  Ngày sinh
                </p>
                <CustomInput
                  control={control}
                  rules={{
                    required: "*Vui lòng nhập",
                  }}
                  styles={{ width: "240px" }}
                  name="birthdate"
                  type="date"
                  userInfo={
                    user?.birthdate?.split("T") === undefined
                      ? ""
                      : user?.birthdate?.split("T")[0]
                  }
                  inlineStyle={styleInput}
                />
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                ...styleBoxInput,
                alignItems: "center",
                marginLeft: "2%",
                marginTop: "7%",
              }}
            >
              <Box
                sx={{
                  height: "120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <Controller
                  name="password"
                  control={control}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => {
                    return (
                      <TextField
                        label="Mật khẩu"
                        variant="outlined"
                        inputRef={password}
                        value={value}
                        style={styleInput}
                        inputProps={{ width: "280px" }}
                        onChange={onChange}
                        userInfo={""}
                        error={!!error}
                        helperText={error ? error.message : null}
                        type="password"
                      />
                    );
                  }}
                  rules={{
                    required: "*Vui lòng nhập",
                  }}
                />
              </Box>
              <Box
                sx={{
                  height: "120px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                <CustomInput
                  control={control}
                  rules={{
                    required: "*Vui lòng nhập",
                    validate: (value) => {
                      return (
                        value ===
                          (password.current.value ?? password.current) ||
                        "*Mật khẩu không khớp"
                      );
                    },
                  }}
                  styles={{ width: "280px" }}
                  name="confirmPassword"
                  label="Xác nhận mật khẩu"
                  type="password"
                  inlineStyle={styleInput}
                  userInfo={""}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  width: "240px",
                  height: "120px",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                }}
              >
                <p
                  style={{
                    marginLeft: "2.5%",
                    marginTop: "5%",
                  }}
                >
                  Ngày sinh
                </p>
                <CustomInput
                  control={control}
                  rules={{
                    required: "*Vui lòng nhập",
                  }}
                  styles={{ width: "240px" }}
                  name="birthdate"
                  type="date"
                  userInfo={
                    user?.birthdate?.split("T") === undefined
                      ? ""
                      : user?.birthdate?.split("T")[0]
                  }
                  inlineStyle={styleInput}
                />
              </Box>
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
                    marginBottom: "5%",
                  }}
                >
                  Chức vụ
                </Typography>
                <CustomSelect
                  label="Chức vụ"
                  name="roleId"
                  defaultValue={user?.roleId}
                  control={control}
                  errors={errors}
                  errorMsg={"*Vui lòng chọn"}
                >
                  {mapListRoleUser()}
                </CustomSelect>
              </Box>
            ) : null}
          </Box>
          <p
            style={{
              textAlign: "center",
              color: "red",
            }}
          >
            {error?.message ? error?.message : ""}
          </p>
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
              Xác nhận
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
              Đóng
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

function Users(props) {
  const [page, setPage] = React.useState(1);
  const [searchName, setSearchName] = React.useState("");
  const [totalUser, setTotalUser] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState({});
  const [listRole, setListRole] = React.useState([]);
  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm();
  let password = useRef({});
  password.current = watch("password", "");

  const { showLoading, hideLoading, showSnackbar, userState } = props;

  const handleChangeGender = (event) => {
    setGender(parseInt(event.target.value));
  };
  inputFile = useRef(null);
  const getData = async (name, page, size) => {
    try {
      showLoading();
      let list = await getListUser(name, page, size, userState.idToken);
      console.log(list);
      setListUser(list.data.data);
      setTotalUser(list.data.metadata.total);
    } catch (error) {
      console.log(error?.response);
      if (error?.response) {
        if (error?.response?.data?.error?.code === 404) {
          setListUser([]);
          setTotalUser(0);
        }
      }
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
    let dob = new Date(data.birthdate);
    let currentYear = new Date();
    if (dob > currentYear) {
      setError({ message: "Vui lòng nhập ngày sau ngày hôm nay" });
      return;
    } else if (currentYear.getFullYear() - dob.getFullYear() < 18) {
      setError({
        message: "\nVui lòng nhập ngày sinh lớn hơn 18 tuổi",
      });
      return;
    }

    if (error?.message?.length > 0) {
      return;
    }
    let userTemp = {
      name: data.name,
      email: data.email,
      address: data.address,
      birthdate: data.birthdate,
      gender: gender,
      phone: data.phone,
      roleId: data.roleId,
      images: {
        url: user?.imageUrl,
      },
    };
    try {
      showLoading();
      let id = user.id;
      let responseUpdate;
      if (user.avatarFile !== undefined) {
        let base64 = await getBase64(user.avatarFile);

        responseUpdate = await updateUser(
          userTemp,
          id,
          base64.split(",")[1],
          userState.idToken
        );
        if (responseUpdate.status === 200) {
          showSnackbar("success", "Cập nhật tài khoản thành công!");
          await getData(searchName, page, 8);
          handleClose();
          hideLoading();
        } else {
          hideLoading();
        }
      } else {
        responseUpdate = await updateUser(userTemp, id, "", userState.idToken);
        if (responseUpdate.status === 200) {
          showSnackbar("success", "Cập nhật tài khoản thành công!");
          await getData(searchName, page, 8);
          handleClose();
          hideLoading();
          setError({});
        } else {
          hideLoading();
        }
      }
    } catch (error) {
      if (error.response) {
        if (error.response.message === "Email is existed") {
          setError({
            message: "Email đã tồn tại",
          });
        } else {
          setError({
            message: error.response.message,
          });
        }
      } else {
        console.log(error);
      }

      hideLoading();
    }
  };

  const onHandleCreateUser = async (data) => {
    let dob = new Date(data.birthdate);
    let currentYear = new Date();
    if (dob > currentYear) {
      setError({ message: "Vui lòng nhập ngày sau ngày hôm nay" });
      return;
    } else if (currentYear.getFullYear() - dob.getFullYear() < 18) {
      setError({
        message: "\nVui lòng nhập ngày sinh lớn hơn 18 tuổi",
      });
      return;
    }

    let avatarLinkObject = null;
    if (user.avatarFile) {
      let base64 = await getBase64(user.avatarFile);
      avatarLinkObject = {
        file: base64.split(",")[1],
      };
    }
    let userTemp = {
      name: data.name,
      password: data.password,
      email: data.email,
      address: data.address,
      gender: gender,
      birthdate: data.birthdate,
      phone: data.phone,
      roleId: data.roleId,
      avatarLink: avatarLinkObject,
    };
    try {
      showLoading();
      const response = await createUser(userTemp, userState.idToken);

      if (response.status === 200) {
        showSnackbar("success", "Tạo tài khoản thành công!");
        await getData(searchName, page, 8);

        handleClose();
        hideLoading();
        setError({});
      }
    } catch (error) {
      console.log(error);
      if (error?.response) {
        if (error?.response?.data?.error?.message === "Email is existed") {
          setError({
            message: "Email đã tồn tại",
          });
        } else {
          setError({
            message: error?.response?.data?.error?.message,
          });
        }
      } else {
        console.log(error);
      }

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

  useEffect(() => {
    if (open) {
      const process = async () => {
        try {
          showLoading();
          const response = await getListRole(userState.idToken);
          setListRole(response.data.data);
          hideLoading();
        } catch (error) {
          console.log(error);
          hideLoading();
        }
      };
      process();
    }
  }, [open]);

  const [listUser, setListUser] = React.useState([]);
  const [isEdit, setEdit] = React.useState(false);
  const [user, setUser] = React.useState({ images: [{ id: null, url: null }] });
  const [gender, setGender] = React.useState(user.gender ?? MALE);

  const mapListRoleUser = () => {
    return listRole?.map((e) => {
      return <MenuItem value={e.id}>{e.name}</MenuItem>;
    });
  };

  const handleOpen = (isEdit) => {
    setOpen(true);
    setEdit(isEdit);
  };
  const handleClose = () => {
    setOpen(false);
    setUser({ avatarFile: undefined, images: [{ id: null, url: null }] });
    setError({});
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
        errors,
        error,
        gender,
        handleChangeGender,
        setError,
        mapListRoleUser
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
          Tạo tài khoản
        </Button>
      </Box>
      <Card
        variant="outlined"
        color="#FFF"
        sx={{ marginLeft: "2%", marginRight: "2%" }}
      >
        {listUser.length > 0 ? (
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
        ) : (
          <Typography
            color="black"
            variant="h5"
            style={{
              textAlign: "center",
              margin: "2% 0",
            }}
          >
            Không tìm thấy tài khoản
          </Typography>
        )}
      </Card>
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
export default connect(mapStateToProps, mapDispatchToProps)(Users);
