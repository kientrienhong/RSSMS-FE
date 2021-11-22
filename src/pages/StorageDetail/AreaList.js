import React, { useState } from "react";
import { Box, Card, Typography, Button } from "@material-ui/core";
import RowArea from "./RowArea";
import ModalArea from "./ModalArea";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as action from "../../redux/action/action";
import ConfirmModal from "../../components/ConfirmModal";
import { createArea, deleteArea, updateArea, getArea } from "../../apis/Apis";

function AreaList({
  listArea,
  setListArea,
  showLoading,
  hideLoading,
  showSnackbar,
  storageId,
}) {
  const { handleSubmit, control, reset } = useForm();

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

  const addArea = async (name, description) => {
    try {
      showLoading();
      await createArea(parseInt(storageId), name, description);
      let listAreaTemp = await getArea(parseInt(storageId));

      setListArea(listAreaTemp.data.data);
      showSnackbar("success", "Create area success!");
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
      handleClose();
    }
  };

  const editArea = async (name, description) => {
    try {
      showLoading();
      await updateArea(parseInt(currentArea.id), name, description);
      let listAreaTemp = await getArea(parseInt(storageId));
      setListArea(listAreaTemp.data.data);
      showSnackbar("success", "Update area success!");
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
      handleClose();
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
      addArea(data.name, data.description);
    } else {
      editArea(data.name, data.description);
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
    try {
      showLoading();
      await deleteArea(id);
      let listAreaTemp = await getArea(storageId);
      setListArea(listAreaTemp.data.data);
      showSnackbar("success", "Delete area success!");
    } catch (error) {
      console.log(error.message);
      if (error.message === "Request failed with status code 404") {
        setListArea([]);
      }
    } finally {
      hideLoading();
      handleClose();
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
      />
      <ConfirmModal
        open={openConfirm}
        handleClose={handleCloseConfirm}
        onHandleYes={onHandleDeleteArea}
        id={currentArea.id}
        msg={"Delete area success!"}
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
          List area
        </Typography>
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
          }}
        >
          Create area
        </Button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(null, mapDispatchToProps)(AreaList);
