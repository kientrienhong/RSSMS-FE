import React, { useState } from "react";
import { Card, Typography, Box, Stack, Pagination } from "@material-ui/core";
import ListShelf from "./ListShelf";
import ConfirmModal from "../../../components/ConfirmModal";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { deleteShelf } from "../../../apis/Apis";
import ShelfModalDetail from "./ShelfModalDetail";
import DetailBoxModal from "./DetailBoxModal";

function AreaDetailView({
  storage,
  listShelf,
  setCurrentShelf,
  handleOpen,
  setIsHandy,
  currentShelf,
  showLoading,
  hideLoading,
  showSnackbar,
  getData,
  searchName,
  page,
  totalPage,
  setPage,
  area,
  isModifyShelf,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openDetailBox, setOpenDetailBox] = useState(false);

  const listNote = [
    { color: "#99E5FE", name: "Available" },
    { color: "#04BFFE", name: "Not available" },
    { color: "#FF615F", name: "Expired" },
    { color: "#FF7C33", name: "Expired soon" },
    { color: "#26FF7B", name: "Selected" },
    { color: "#00993C", name: "Placing" },
  ];

  const mapListNote = () =>
    listNote.map((e) => (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "32px",
            height: "32px",
            borderRadius: "4px",
            marginRight: "4px",
            backgroundColor: e.color,
          }}
        ></Box>
        <p
          style={{
            marginRight: "16px",
            fontWeight: "bold",
          }}
        >
          {e.name}
        </p>
      </Box>
    ));

  const handleChange = async (event, value) => {
    setPage(value);
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleDeleteShelf = async (id) => {
    await deleteShelf(id);
    await getData(searchName, page, 6);
  };

  const handleOpenModalDetail = () => {
    setOpenModalDetail(true);
  };

  const handleCloseModalDetail = () => {
    setOpenModalDetail(false);
  };

  const handleOpenDetailBox = () => {
    setOpenDetailBox(true);
  };

  const handleCloseDetailBox = () => {
    setOpenDetailBox(false);
  };

  return (
    <Card
      style={{ height: "78vh" }}
      sx={{
        margin: "2% 0% 2% 2%",
        display: "flex",
        flexDirection: "column",
        width: "65%",
        height: "78vh",
        padding: "2%",
        alignItems: "flex-start",
      }}
    >
      <ShelfModalDetail
        currentShelf={currentShelf}
        open={openModalDetail}
        handleClose={handleCloseModalDetail}
      />
      <ConfirmModal
        open={openConfirm}
        handleClose={handleCloseConfirm}
        onHandleYes={handleDeleteShelf}
        id={currentShelf.id}
        showLoading={showLoading}
        hideLoading={hideLoading}
        showSnackbar={showSnackbar}
        msg="Delete shelf success"
      />

      <DetailBoxModal open={openDetailBox} handleClose={handleCloseDetailBox} />
      <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
        {storage.name} {area.name}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>{mapListNote()}</Box>
      <ListShelf
        listShelf={listShelf}
        setCurrentShelf={setCurrentShelf}
        handleOpen={handleOpen}
        setIsHandy={setIsHandy}
        handleOpenConfirm={handleOpenConfirm}
        isModifyShelf={isModifyShelf}
        handleOpenModalDetail={handleOpenModalDetail}
        handleOpenDetailBox={handleOpenDetailBox}
        storage={storage}
        area={area}
      />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marignTop: "64px",
        }}
      >
        <Stack spacing={2} sx={{}}>
          <Pagination count={totalPage} page={page} onChange={handleChange} />
        </Stack>
      </Box>
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

export default connect(null, mapDispatchToProps)(AreaDetailView);
