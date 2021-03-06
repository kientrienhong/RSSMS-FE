import React, {useRef, useEffect} from "react";
import {
  Box,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Modal,
  Typography,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import ListStorage from "./components/ListStorage";
import {useForm} from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import {
  getListStorage,
  createStorage,
  updateStorage,
  deleteStorage,
  assignListStaffToStorage,
  getListStaff,
} from "../../apis/Apis";
import {connect} from "react-redux";
import * as action from "../../redux/action/action";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import {STYLE_MODAL} from "../../constant/style";
import AssignStaffModal from "./components/AssignStaffModal";
import {getBase64} from "../../utils/convertImage";
import {ErrorHandle} from "../../utils/ErrorHandle";
let inputFile;
const styleModal = {
  ...STYLE_MODAL,
  width: "70%",
};

const styleBoxInput = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "row",
  alignItems: "flex-start",
  height: "40px",
  width: "440px",
  marginTop: "10%",
};

const handleOnclickImage = () => {
  inputFile.current.click();
};

const styleInput = {marginRight: "2.5%", marginLeft: "2.5%"};

const buildInputFileImage = (storage) => {
  return (
    <Box
      onClick={handleOnclickImage}
      sx={{
        marginTop: "16px",
        height: "400px",
        width: "50%",
        position: "relative",
        border: "solid 1px #000",
      }}
    >
      {storage?.imageUrl === undefined ? (
        <img
          src="/img/imageEdit.png"
          width="50px"
          height="50px"
          alt="imagee"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : (
        <img
          style={{height: "400px", width: "100%"}}
          src={storage?.imageUrl}
          alt="avatar"
        />
      )}
    </Box>
  );
};

function Storages(props) {
  inputFile = useRef(null);
  const {
    showLoading,
    hideLoading,
    showSnackbar,
    storedOrder,
    isLoadingStorage,
    userState,
    handleExtendSession,
  } = props;
  const [open, setOpen] = React.useState(false);
  const [searchName, setSearchName] = React.useState("");
  const [listShowStaffAssigned, setListShowStaffAssigned] = React.useState([]);
  const [listShowStaffUnAssigned, setListShowStaffUnAssigned] = React.useState(
    []
  );
  const [openAssignStaff, setOpenAssignStaff] = React.useState(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: {errors},
  } = useForm();
  const [error, setError] = React.useState({});
  const [listStorages, setListStorages] = React.useState([]);
  const [listStaffAssigned, setListStaffAssigned] = React.useState([]);
  const [listStaffUnAssigned, setListStaffUnAssigned] = React.useState([]);
  const [isEdit, setEdit] = React.useState(false);
  const [storage, setStorage] = React.useState({
    images: [{id: null, url: null}],
  });
  const [page, setPage] = React.useState(1);

  const handleChange = async (event, value) => {
    setPage(value);
  };

  const handleCloseAssignStaff = () => {
    setOpenAssignStaff(false);
    setStorage({avatarFile: undefined, images: [{id: null, url: null}]});
    reset();
  };

  const handleOpenAssignStaff = () => {
    setOpenAssignStaff(true);
  };

  const handleChangeSearchUnAssigned = (event) => {
    let listStaffUnAssignedTemp = [...listStaffUnAssigned];
    listStaffUnAssignedTemp = listStaffUnAssignedTemp.filter((e) =>
      e.name.includes(event.target.value)
    );
    setListShowStaffUnAssigned(listStaffUnAssignedTemp);
  };

  const handleChangeSearchAssigned = (event) => {
    let listShowStaffAssignedTemp = [...listStaffAssigned];
    listShowStaffAssignedTemp = listShowStaffAssignedTemp.filter((e) =>
      e.name.includes(event.target.value)
    );

    setListShowStaffAssigned(listShowStaffAssignedTemp);
  };

  const onHandleDeleteStorage = async (id) => {
    let response;
    try {
      response = await deleteStorage(id, userState.idToken);
      if (listStorages.length === 1) {
        if (page !== 1) {
          setPage(page - 1);
        }
      }
      await getData(searchName, page, 4, userState.idToken);
    } catch (error) {
      throw error;
    }

    return response;
  };

  useEffect(() => {
    const process = async () => {
      try {
        showLoading();
        await getData(searchName, page, 4, userState.idToken);
      } catch (error) {
        console.log(error);
        ErrorHandle.handle(error, showSnackbar, handleExtendSession);
      } finally {
        hideLoading();
      }
    };
    process();
  }, [page, isLoadingStorage]);

  useEffect(() => {
    const searchNameCall = async () => {
      try {
        showLoading();
        await getData(searchName, page, 4, userState.idToken);
      } catch (error) {
        console.log(error);
        ErrorHandle.handle(error, showSnackbar, handleExtendSession);
      } finally {
        hideLoading();
      }
    };

    const timeOut = setTimeout(() => searchNameCall(), 700);

    return () => {
      clearTimeout(timeOut);
    };
  }, [searchName]);

  useEffect(() => {
    const process = async () => {
      if (openAssignStaff === true) {
        let listUserNotAssigned = [];
        try {
          showLoading();
          listUserNotAssigned = await getListStaff(null, userState.idToken);
        } catch (error) {
          console.log(error?.response);
          ErrorHandle.handle(error, showSnackbar, handleExtendSession);

          setListStaffUnAssigned([]);
          setListShowStaffUnAssigned([]);
        }
        try {
          let listUserAssigned = await getListStaff(
            storage.id,
            userState.idToken
          );

          let managerFound = listUserAssigned.data.find(
            (e) => e.roleName === "Manager"
          );
          let newListUserUnAssign;
          if (listUserNotAssigned?.data) {
            newListUserUnAssign = listUserNotAssigned?.data?.filter(
              (e) => e.id !== managerFound?.id
            );
          } else {
            newListUserUnAssign = [];
          }

          setListStaffAssigned(listUserAssigned.data);
          setListShowStaffAssigned(listUserAssigned.data);
          setListStaffUnAssigned(newListUserUnAssign);
          setListShowStaffUnAssigned(newListUserUnAssign);
        } catch (error) {
          console.log(error);
          ErrorHandle.handle(error, showSnackbar, handleExtendSession);

          setListStaffAssigned([]);
          setListShowStaffAssigned([]);
          setListStaffUnAssigned(listUserNotAssigned.data);
          setListShowStaffUnAssigned(listUserNotAssigned.data);
        } finally {
          hideLoading();
        }
      } else {
        setStorage({
          avatarFile: undefined,
          images: [{id: null, url: null}],
        });
        reset();
      }
    };
    reset();

    process();
  }, [openAssignStaff]);

  const onHandleSearch = (e) => {
    setSearchName(e.target.value);
  };

  const [totalPage, setTotalPage] = React.useState(0);
  const handleOpen = (isEdit) => {
    setOpen(true);
    setEdit(isEdit);
  };

  const onHandleAssignUser = async (listAssigned, listUnassigned, storage) => {
    try {
      showLoading();
      await assignListStaffToStorage(
        listAssigned,
        listUnassigned,
        storage,
        userState.idToken
      );
      await getData(searchName, page, 4, userState.idToken);

      hideLoading();
      showSnackbar("success", "Ph??n c??ng th??nh c??ng!");
      setError({});
      handleCloseAssignStaff();
    } catch (error) {
      console.log(error.response);
      ErrorHandle.handle(error, showSnackbar, handleExtendSession);

      setError({
        ...error,
        assignStaff: {
          message: error?.response?.data?.error?.message,
        },
      });
      hideLoading();
    }
  };

  const onHandleCreateStorage = async (data) => {
    let storageTemp = {
      name: data.name,
      height: data.height,
      width: data.width,
      length: data.length,
      address: data.address,
      status: 1,
      image: {
        url: null,
      },
      listStaff: [],
    };
    try {
      showLoading();
      if (!storage.avatarFile) {
        setError({
          ...error,
          avatarFile: {message: "Vui l??ng th??m h??nh ???nh"},
        });
        hideLoading();

        return;
      }
      let base64 = await getBase64(storage.avatarFile);

      storageTemp = {
        ...storageTemp,
        image: {
          file: base64.split(",")[1],
        },
      };
      const response = await createStorage(storageTemp, userState.idToken);
      if (response.status === 200) {
        if (response.status === 200) {
          showSnackbar("success", "T???o kho th??nh c??ng!");
          await getData(searchName, page, 4, userState.idToken);
          handleClose();
          setError({});
        }
        hideLoading();
      }
    } catch (error) {
      console.log(error);
      hideLoading();
    }
  };

  const onHandleUpdateUser = async (data) => {
    let storageTemp = {
      name: data.name,
      height: data.height,
      width: data.width,
      length: data.length,
      address: data.address,
      status: 1,
      image: {
        url: storage?.imageUrl,
      },
      listStaff: [],
    };
    try {
      showLoading();
      let id = storage.id;
      let responseUpdate;
      if (storage.avatarFile !== undefined) {
        let base64 = await getBase64(storage.avatarFile);
        responseUpdate = await updateStorage(
          storageTemp,
          id,
          base64.split(",")[1],
          userState.idToken
        );
        if (responseUpdate.status === 200) {
          showSnackbar("success", "C???p nh???t kho th??nh c??ng!");
          await getData(searchName, page, 4, userState.idToken);
          handleClose();
          hideLoading();
          setError({});
        } else {
          hideLoading();
        }
      } else {
        responseUpdate = await updateStorage(
          storageTemp,
          id,
          "",
          userState.idToken
        );
        if (responseUpdate.status === 200) {
          showSnackbar("success", "C???p nh???t kho th??nh c??ng!");
          await getData(searchName, page, 4, userState.idToken);
          handleClose();
          hideLoading();
          setError({});
        } else {
          hideLoading();
        }
      }
    } catch (error) {
      console.log(error);
      hideLoading();
    }
  };

  const addAssignStaff = (staff) => {
    let listShowStaffAssignedTemp = [...listShowStaffAssigned];
    let listShowStaffUnAssignedTemp = [...listShowStaffUnAssigned];

    let listStaffAssignedTemp = [...listStaffAssigned];
    let listStaffUnAssignedTemp = [...listStaffUnAssigned];

    listStaffAssignedTemp.push(staff);
    listStaffUnAssignedTemp = listStaffUnAssignedTemp.filter(
      (e) => e.id !== staff.id
    );
    listShowStaffAssignedTemp.push(staff);
    listShowStaffUnAssignedTemp = listShowStaffUnAssignedTemp.filter(
      (e) => e.id !== staff.id
    );
    setListStaffAssigned(listStaffAssignedTemp);
    setListStaffUnAssigned(listStaffUnAssignedTemp);
    setListShowStaffAssigned(listShowStaffAssignedTemp);
    setListShowStaffUnAssigned(listShowStaffUnAssignedTemp);
  };

  const removeAssignStaff = (staff) => {
    let listShowStaffAssignedTemp = [...listShowStaffAssigned];
    let listShowStaffUnAssignedTemp = [...listShowStaffUnAssigned];

    let listStaffAssignedTemp = [...listStaffAssigned];
    let listStaffUnAssignedTemp = [...listStaffUnAssigned];

    listStaffUnAssignedTemp.push(staff);
    listStaffAssignedTemp = listStaffAssignedTemp.filter(
      (e) => e.id !== staff.id
    );
    listShowStaffUnAssignedTemp.push(staff);
    listShowStaffAssignedTemp = listShowStaffAssignedTemp.filter(
      (e) => e.id !== staff.id
    );
    setListStaffAssigned(listStaffAssignedTemp);
    setListStaffUnAssigned(listStaffUnAssignedTemp);
    setListShowStaffAssigned(listShowStaffAssignedTemp);
    setListShowStaffUnAssigned(listShowStaffUnAssignedTemp);
  };

  const onSubmit = (data) => {
    if (isEdit === false) {
      onHandleCreateStorage(data);
    } else {
      onHandleUpdateUser(data);
    }
  };
  const handleClose = () => {
    setOpen(false);
    setStorage({avatarFile: undefined, images: [{id: null, url: null}]});
    reset();
  };

  const getData = async (name, page, size) => {
    try {
      showLoading();
      let list = await getListStorage(name, page, size, userState.idToken);
      setListStorages(list.data.data);
      setTotalPage(list.data.metadata.totalPage);
    } catch (e) {
      console.log(e);
      ErrorHandle.handle(e, showSnackbar, handleExtendSession);
    } finally {
      hideLoading();
    }
  };

  const onChangeInputFile = (event) => {
    if (
      event.target.files[0].name.includes(".png") ||
      event.target.files[0].name.includes(".jpg") ||
      event.target.files[0].name.includes(".jpeg")
    ) {
      setStorage({
        ...storage,
        imageUrl: URL.createObjectURL(event.target.files[0]),
        avatarFile: event.target.files[0],
      });
    } else {
      setError({avatarFile: {message: "Vui l??ng ch???n t???p tin h??nh ???nh"}});
    }
  };

  useEffect(() => {
    const getData = async (name, page, size) => {
      try {
        let list = await getListStorage(name, page, size, userState.idToken);
        setListStorages(list.data.data);
        setTotalPage(list.data.metadata.totalPage);
      } catch (e) {}
    };

    const firstCall = async () => {
      try {
        showLoading();
        await getData("", page, 4, userState.idToken);
      } catch (error) {
        ErrorHandle.handle(error, showSnackbar, handleExtendSession);

        console.log(error);
        setListStorages([]);
      } finally {
        hideLoading();
      }
    };
    firstCall();
  }, []);

  const buildInputForm = (
    handleSubmit,
    onSubmit,
    storage,
    setStorage,
    control,
    isEdit,
    handleClose,
    onChangeInputFile,
    errors,
    error
  ) => {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          marginLeft: "5%",
          boxSizing: "border-box",
        }}
      >
        <input
          type="file"
          id="file"
          name="fileImage"
          ref={inputFile}
          onChange={(e) => onChangeInputFile(e, setStorage, storage)}
          style={{display: "none"}}
        />
        <Typography
          color="black"
          variant="h2"
          style={{marginTop: "1%", marginLeft: "3%"}}
        >
          Th??ng tin kho
        </Typography>
        <Box sx={{...styleBoxInput, marginTop: "16px"}}>
          <CustomInput
            control={control}
            rules={{
              required: "*Vui l??ng nh???p",
            }}
            styles={{width: "400px"}}
            name="name"
            label="T??n"
            userInfo={storage.name}
            inlineStyle={styleInput}
          />
        </Box>
        <Box sx={{...styleBoxInput}}>
          <CustomInput
            control={control}
            rules={{
              required: "*Vui l??ng nh???p",
            }}
            styles={{width: "400px"}}
            name="address"
            label="?????a ch???"
            userInfo={storage.address}
            inlineStyle={styleInput}
          />
        </Box>
        <Typography
          color="black"
          variant="h2"
          style={{marginTop: "8%", marginLeft: "3%", marginBottom: "2%"}}
        >
          Th??ng tin k??ch th?????c kho
        </Typography>
        <Box sx={{...styleBoxInput, marginTop: "5%"}}>
          <CustomInput
            control={control}
            rules={{
              required: "*Vui l??ng nh???p",
              pattern: {
                value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                message: "*Vui l??ng nh???p ????ng chi???u r???ng",
              },
            }}
            styles={{width: "120px"}}
            name="width"
            label="Chi???u r???ng (m)"
            userInfo={storage.width}
            inlineStyle={styleInput}
          />
          <CustomInput
            control={control}
            rules={{
              required: "*Vui l??ng nh???p",
              pattern: {
                value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                message: "*Vui l??ng nh???p ????ng chi???u d??i",
              },
            }}
            styles={{width: "120px"}}
            name="length"
            label="Chi???u d??i (m)"
            userInfo={storage.length}
            inlineStyle={styleInput}
          />
          <CustomInput
            control={control}
            rules={{
              required: "*Vui l??ng nh???p",
              pattern: {
                value: /^(0\.(?!00)|(?!0)\d+\.)\d+|^\+?([1-9]\d{0,6})$/,
                message: "*Vui l??ng nh???p chi???u cao",
              },
            }}
            styles={{width: "120px"}}
            name="height"
            label="Chi???u cao (m)"
            userInfo={storage.height}
            inlineStyle={styleInput}
          />
        </Box>

        <p
          style={{
            textAlign: "center",
            color: "red",
            marginTop: "10%",
          }}
        >
          {error?.avatarFile?.message ? error?.avatarFile?.message : ""}
        </p>
        <Box
          sx={{
            width: "200px",
            margin: "1% auto",
            display: "flex",
            marginTop: "10%",
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
            color="primary"
            variant="contained"
            type="submit"
          >
            X??c nh???n
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
            ????ng
          </Button>
        </Box>
      </form>
    );
  };

  const buildModal = () => {
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
          <Box sx={{height: "90%"}}>
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "row",
              }}
            >
              {buildInputFileImage(storage)}
              {buildInputForm(
                handleSubmit,
                onSubmit,
                storage,
                setStorage,
                control,
                isEdit,
                handleClose,
                onChangeInputFile,
                errors,
                error
              )}
            </Box>
          </Box>
        </Box>
      </Modal>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      <AssignStaffModal
        openAssignStaff={openAssignStaff}
        handleCloseAssignStaff={handleCloseAssignStaff}
        listShowStaffAssigned={listShowStaffAssigned}
        addAssignStaff={addAssignStaff}
        removeAssignStaff={removeAssignStaff}
        handleChangeSearchAssigned={handleChangeSearchAssigned}
        listShowStaffUnAssigned={listShowStaffUnAssigned}
        handleChangeSearchUnAssigned={handleChangeSearchUnAssigned}
        error={error}
        onHandleAssignUser={onHandleAssignUser}
        listStaffAssigned={listStaffAssigned}
        listStaffUnAssigned={listStaffUnAssigned}
        storage={storage}
      />
      {buildModal()}
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
          sx={{
            width: "80%",
          }}
          onChange={(e) => onHandleSearch(e)}
          InputProps={{
            style: {height: "45px", backgroundColor: "white"},
            startAdornment: (
              <InputAdornment>
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {userState.roleName === "Admin" ? (
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
              marginLeft: "4px",
            }}
            color="primary"
            variant="contained"
            onClick={() => handleOpen(false)}
          >
            T???o kho
          </Button>
        ) : (
          <></>
        )}
      </Box>
      <ListStorage
        openAssignStaff={openAssignStaff}
        handleOpenAssignStaff={handleOpenAssignStaff}
        listStorages={listStorages}
        onHandleDeleteStorage={onHandleDeleteStorage}
        setListStorages={setListStorages}
        handleOpen={handleOpen}
        setStorage={setStorage}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marignTop: "32px",
        }}
      >
        <Stack spacing={2} sx={{}}>
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        </Stack>
      </Box>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  storedOrder: state.order.storedOrder,
  isLoadingStorage: state.order.isLoadingStorage,
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    handleExtendSession: () => dispatch(action.handleExtendSession()),
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Storages);
