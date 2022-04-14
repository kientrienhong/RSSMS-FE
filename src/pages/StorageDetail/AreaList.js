import React, {useState} from "react";
import {Box, Card, Typography, Button} from "@material-ui/core";
import RowArea from "./RowArea";
import ModalArea from "./ModalArea";
import {useForm} from "react-hook-form";
import {connect} from "react-redux";
import * as action from "../../redux/action/action";
import ConfirmModal from "../../components/ConfirmModal";
import {createArea, deleteArea, updateArea, getArea} from "../../apis/Apis";
import {ErrorHandle} from "../../utils/ErrorHandle";

function AreaList({
  listArea,
  setListArea,
  showLoading,
  hideLoading,
  showSnackbar,
  storageId,
  userState,
}) {
  const {
    handleSubmit,
    control,
    reset,
    formState: {errors},
  } = useForm();

  const mapListToview = (
    setCurrentArea,
    handleOpen,
    deleteArea,
    handleOpenConfirm
  ) =>
    listArea.map((e) => {
      return (
        <RowArea
          area={e}
          key={e.id}
          setCurrentArea={setCurrentArea}
          handleOpen={handleOpen}
          deleteArea={deleteArea}
          handleOpenConfirm={handleOpenConfirm}
          storageId={storageId}
          setIsEdit={setIsEdit}
        />
      );
    });

  const addArea = async (name, description, type, data) => {
    try {
      showLoading();
      await createArea(
        storageId,
        name,
        description,
        type === "Self-Storage" ? 0 : 1,
        {
          width: parseFloat(data.width),
          height: parseFloat(data.height),
          length: parseFloat(data.length),
        },
        userState.idToken
      );
      let listAreaTemp = await getArea(storageId, userState.idToken);

      setListArea(listAreaTemp.data.data);
      showSnackbar("success", "Tạo khu vực thành công!");
      handleClose();
    } catch (error) {
      console.log(error);
      if (error?.response) {
        showSnackbar("error", error?.response?.data?.error?.message);
      }
    } finally {
      hideLoading();
    }
  };

  const editArea = async (name, description, type, data) => {
    try {
      showLoading();
      await updateArea(
        currentArea.id,
        name,
        description,

        type === "Self-Storage" ? 0 : 1,
        {
          width: parseFloat(data.width),
          height: parseFloat(data.height),
          length: parseFloat(data.length),
        },

        userState.idToken
      );

      let listAreaTemp = await getArea(storageId, userState.idToken);
      setListArea(listAreaTemp.data.data);
      showSnackbar("success", "Cập nhật khu vực thành công!");
      handleClose();
    } catch (error) {
      ErrorHandle.handle(error, showSnackbar);
      console.log(error.response);
    } finally {
      hideLoading();
    }
  };

  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentArea, setCurrentArea] = useState({});
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const onSubmit = (data) => {
    if (isEdit === false) {
      addArea(data.name, data.description, data.type, data);
    } else {
      editArea(data.name, data.description, data.type, data);
    }
  };

  const handleOpen = (isEdit) => {
    reset();
    setOpen(true);
    setIsEdit(isEdit);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentArea({});
  };

  const onHandleDeleteArea = async (id) => {
    await deleteArea(id, userState.idToken);
    try {
      let listAreaTemp = await getArea(storageId, userState.idToken);
      setListArea(listAreaTemp.data.data);
      showSnackbar("success", "Xóa khu vực thành công!");
    } catch (error) {
      if (error?.response?.status === 404) {
        setListArea([]);
        showSnackbar("success", "Xóa khu vực thành công!");
      } else {
        throw error;
      }
    }
  };

  return (
    <Card
      sx={{
        margin: "2%",
        display: "flex",
        flexDirection: "column",
        width: "60%",
        height: "68vh",
        padding: "2%",
        alignItems: "center",
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <ModalArea
        open={open}
        handleClose={handleClose}
        currentArea={currentArea}
        handleSubmit={handleSubmit}
        control={control}
        onSubmit={onSubmit}
        isEdit={isEdit}
        errors={errors}
      />
      <ConfirmModal
        open={openConfirm}
        handleClose={handleCloseConfirm}
        onHandleYes={onHandleDeleteArea}
        id={currentArea.id}
        msg={"Xóa khu vực thành công!"}
      />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <Typography color="black" variant="h2">
          Danh sách khu vực
        </Typography>
        {userState.roleName !== "Admin" ? (
          <Button
            style={{
              height: "45px",
              paddingLeft: "16px",
              paddingRight: "16px",
            }}
            color="primary"
            variant="contained"
            onClick={() => {
              handleOpen(false);
              setIsEdit(false);
              setCurrentArea({});
            }}
          >
            Tạo khu vực
          </Button>
        ) : (
          <></>
        )}
      </Box>
      {mapListToview(
        setCurrentArea,
        handleOpen,
        deleteArea,
        handleOpenConfirm,
        storageId
      )}
    </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(AreaList);
