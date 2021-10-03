import React, { useRef, useEffect } from "react";
import {
  Box,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Modal,
  FormControl,
  MenuItem,
  Select,
} from "@material-ui/core";
import PropTypes from "prop-types";
import SearchIcon from "@mui/icons-material/Search";
import ListStorage from "./components/ListStorage";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabPanel from "../../components/TabPanel";
import { useForm } from "react-hook-form";
import CustomInput from "../../components/CustomInput";
import {
  getListStorage,
  createStorage,
  updateStorage,
  deleteStorage,
} from "../../apis/Apis";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import { storageFirebase } from "../../firebase/firebase";

let inputFile;
const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
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
  width: "440px",
  marginTop: "10%",
};

const handleOnclickImage = () => {
  inputFile.current.click();
};

const styleInput = { marginRight: "2.5%", marginLeft: "2.5%" };

const buildInputFileImage = (storage) => {
  return (
    <Box
      onClick={handleOnclickImage}
      sx={{
        marginTop: "16px",
        height: "400px",
        width: "310px",
        position: "relative",
        border: "solid 1px #000",
      }}
    >
      {storage?.images[0]?.url === null ? (
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
          style={{ height: "400px", width: "310px" }}
          src={storage.images[0].url}
          alt="avatar"
        />
      )}
    </Box>
  );
};

const onHandleDeleteStorage = async (id) => {
  let response;
  try {
    response = await deleteStorage(id);
  } catch (error) {
    console.log(error);
  }

  return response;
};

const buildInputForm = (
  handleSubmit,
  onSubmit,
  storage,
  setStorage,
  control,
  isEdit,
  handleClose,
  handleChangeType,
  onChangeInputFile
) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="file"
        id="file"
        name="fileImage"
        ref={inputFile}
        onChange={(e) => onChangeInputFile(e, setStorage, storage)}
        style={{ display: "none" }}
      />

      <Box sx={{ ...styleBoxInput, marginTop: "16px" }}>
        <CustomInput
          control={control}
          rules={{
            required: "Name required",
            // pattern: {
            //   value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            //   message: "Invalid email",
            // },
          }}
          styles={{ width: "400px" }}
          name="name"
          label="Name"
          userInfo={storage.name}
          inlineStyle={styleInput}
        />
      </Box>
      <Box sx={{ ...styleBoxInput }}>
        <CustomInput
          control={control}
          rules={{
            required: "Width required",
            pattern: {
              value: /^\d+$/,
              message: "Invalid width",
            },
          }}
          styles={{ width: "120px" }}
          name="width"
          label="Width (m)"
          userInfo={storage.width}
          inlineStyle={styleInput}
        />
        <CustomInput
          control={control}
          rules={{
            required: "Length required",
            pattern: {
              value: /^\d+$/,
              message: "Invalid length",
            },
          }}
          styles={{ width: "120px" }}
          name="length"
          label="Length (m)"
          userInfo={storage.length}
          inlineStyle={styleInput}
        />
        <CustomInput
          control={control}
          rules={{
            required: "Height required",
            pattern: {
              value: /^\d+$/,
              message: "Invalid height",
            },
          }}
          styles={{ width: "120px" }}
          name="height"
          label="Height (m)"
          userInfo={storage.height}
          inlineStyle={styleInput}
        />
      </Box>
      <Box sx={{ ...styleBoxInput }}>
        <CustomInput
          control={control}
          rules={{
            required: "Address required",
          }}
          styles={{ width: "400px" }}
          name="address"
          label="Address"
          userInfo={storage.address}
          inlineStyle={styleInput}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          marginTop: "10%",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FormControl
          sx={{ m: 1, minWidth: 120, color: "black" }}
          name="roleName"
        >
          <Select value={storage.type} onChange={handleChangeType} displayEmpty>
            <MenuItem value={"Self-Storage"}>Self-Storage</MenuItem>
            <MenuItem value={"Door-to-door"}>Door-to-door</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          width: "200px",
          margin: "2% auto",
          display: "flex",
          marginTop: "6%",
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
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const buildModal = (
  handleSubmit,
  onSubmit,
  storage,
  setStorage,
  control,
  isEdit,
  handleClose,
  handleChangeType,
  open,
  handleChangeTab,
  tabIndex,
  onChangeInputFile
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
        <Box sx={{ borderBottom: 1, border: "none", height: "10%" }}>
          <Tabs
            value={tabIndex}
            onChange={handleChangeTab}
            aria-label="basic tabs example"
          >
            <Tab label="Storage Information" {...a11yProps(0)} />
            <Tab label="Staff list" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <Box sx={{ height: "90%" }}>
          <TabPanel
            style={{ height: "100%", width: "100%" }}
            value={tabIndex}
            index={0}
          >
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
                handleChangeType,
                onChangeInputFile
              )}
            </Box>
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            Item Two
          </TabPanel>
        </Box>
      </Box>
    </Modal>
  );
};

const onHandleCreateStorage = async (
  data,
  typeName,
  showLoading,
  hideLoading,
  showSnackbar,
  handleClose,
  setListStorages,
  listStorages,
  storage
) => {
  console.log(typeName);
  let type;
  if (typeName === "Self-Storage") {
    type = 0;
  } else if (typeName === "Door-to-door") {
    type = 1;
  }

  let size = `${data.width}m x ${data.length}m x ${data.height}m`;

  let storageTemp = {
    name: data.name,
    size: size,
    address: data.address,
    status: 1,
    type: type,
    images: [
      {
        url: null,
      },
    ],
    listStaff: [],
  };
  try {
    console.log(storageTemp);
    showLoading();

    const response = await createStorage(storageTemp);
    if (response.status === 200) {
      let id = response.data.id;
      let urlFirebase;
      let name = `storages/${id}/avatar.png`;

      const ref = storageFirebase.ref(name);
      const uploadTask = ref.put(storage.avatarFile);
      uploadTask.on("state_changed", console.log, console.error, async () => {
        urlFirebase = await ref.getDownloadURL();
        let responseUpdate = await updateStorage(
          response.data,
          id,
          urlFirebase
        );
        if (responseUpdate.status === 200) {
          showSnackbar({
            typeSnackbar: "success",
            msgSnackbar: "Create storage successful!",
          });
          handleClose();
          let newListStorages = [...listStorages];
          let newImages = [
            {
              id: response.data.images[0].id,
              url: urlFirebase,
            },
          ];
          let newStorages = { ...response.data, images: newImages };
          console.log(newStorages);
          newListStorages.unshift(newStorages);
          setListStorages(newListStorages);
        }
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoading();
  }
};

function Storages(props) {
  inputFile = useRef(null);
  const { showLoading, hideLoading, showSnackbar } = props;

  const [open, setOpen] = React.useState(false);
  const { handleSubmit, reset, control, watch } = useForm();
  const [listStorages, setListStorages] = React.useState([]);
  const [storage, setStorage] = React.useState({
    images: [{ id: null, url: null }],
  });
  const handleOpen = (isEdit) => {
    setOpen(true);
    setEdit(isEdit);
  };
  const onSubmit = (data) => {
    if (isEdit === false) {
      onHandleCreateStorage(
        data,
        type,
        showLoading,
        hideLoading,
        showSnackbar,
        handleClose,
        setListStorages,
        listStorages,
        storage
      );
    } else {
    }
  };
  const handleClose = () => {
    setOpen(false);
    setStorage({ avatarFile: undefined, images: [{ id: null, url: null }] });
    reset();
  };
  const [tabIndex, setTabIndex] = React.useState(0);
  const [isEdit, setEdit] = React.useState(false);
  const [type, setType] = React.useState("");

  const handleChangeTab = (event, newtabIndex) => {
    setTabIndex(newtabIndex);
  };

  const onChangeInputFile = (event) => {
    setStorage({
      ...storage,
      images: [
        {
          id: storage?.images[0]?.id,
          url: URL.createObjectURL(event.target.files[0]),
        },
      ],
      avatarFile: event.target.files[0],
    });
  };

  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  useEffect(() => {
    const getData = async (name, page, size) => {
      let list = await getListStorage(name, page, size);
      setListStorages(list.data.data);
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

  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      {buildModal(
        handleSubmit,
        onSubmit,
        storage,
        setStorage,
        control,
        isEdit,
        handleClose,
        handleChangeType,
        open,
        handleChangeTab,
        tabIndex,
        onChangeInputFile
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
          onClick={() => handleOpen(false)}
        >
          Create storage
        </Button>
      </Box>
      <ListStorage
        listStorages={listStorages}
        onHandleDeleteStorage={onHandleDeleteStorage}
        setListStorages={setListStorages}
      />
    </Box>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (msg) => dispatch(action.showSnackbar(msg)),
  };
};

export default connect(null, mapDispatchToProps)(Storages);
