import React, { useState } from "react";
import { Card, Typography, Box, Stack, Pagination } from "@material-ui/core";
import ListShelf from "./ListShelf";
import ConfirmModal from "../../../components/ConfirmModal";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { deleteShelf } from "../../../apis/Apis";

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
}) {
  const [openConfirm, setOpenConfirm] = useState(false);

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

  return (
    <Card
      style={{ height: "73vh" }}
      sx={{
        margin: "2%",
        display: "flex",
        flexDirection: "column",
        width: "65%",
        height: "75vh",
        padding: "2%",
        alignItems: "flex-start",
      }}
    >
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
      <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
        {storage.name}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}></Box>
      <ListShelf
        listShelf={listShelf}
        setCurrentShelf={setCurrentShelf}
        handleOpen={handleOpen}
        setIsHandy={setIsHandy}
        handleOpenConfirm={handleOpenConfirm}
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
