import React, { useState } from "react";
import { Card, Typography, Box, Stack, Pagination } from "@material-ui/core";
import ListShelf from "./ListShelf";
import ConfirmModal from "../../../components/ConfirmModal";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { deleteShelf } from "../../../apis/Apis";
import ShelfModalDetail from "./ShelfModalDetail";
import DetailBoxModal from "./DetailBoxModal";
import { getOrderById } from "../../../apis/Apis";
import MoveBoxModal from "./MoveBoxModal";
import { LIST_NOTE } from "../../../constant/constant";
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
  currentBox,
  storageId,
  userState,
}) {
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openDetailBox, setOpenDetailBox] = useState(false);
  const [orderDetailBox, setOrderDetailBox] = useState({});
  const [openMoveBox, setOpenMoveBox] = useState(false);

  const mapListNote = () =>
    LIST_NOTE.map((e) => (
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
    try {
      await deleteShelf(id, userState.idToken);
      await getData(searchName, page, 6);
    } catch (error) {
      throw error;
    }
  };

  const handleOpenModalDetail = () => {
    setOpenModalDetail(true);
  };

  const handleCloseModalDetail = () => {
    setOpenModalDetail(false);
  };

  const handleOpenDetailBox = async () => {
    try {
      showLoading();
      let order = await getOrderById(currentBox.orderId, userState.idToken);
      setOrderDetailBox(order.data);
      setOpenDetailBox(true);
    } catch (e) {
      console.log(e.response);
    } finally {
      hideLoading();
    }
  };

  const handleCloseDetailBox = () => {
    setOpenDetailBox(false);
  };

  const handleCloseMoveBox = () => {
    setOpenMoveBox(false);
  };

  const handleOpenMoveBox = () => {
    setOpenMoveBox(true);
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
        storage={storage}
        area={area}
        handleOpenDetailBox={handleOpenDetailBox}
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
      <MoveBoxModal
        open={openMoveBox}
        handleClose={handleCloseMoveBox}
        handleCloseDetailBox={handleCloseDetailBox}
      />
      <DetailBoxModal
        open={openDetailBox}
        handleClose={handleCloseDetailBox}
        orderDetailBox={orderDetailBox}
      />
      <Typography color="black" variant="h2" sx={{ textAlign: "left" }}>
        {storage.name} {area.name}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "row" }}>{mapListNote()}</Box>
      <ListShelf
        listShelf={listShelf}
        setCurrentShelf={setCurrentShelf}
        handleOpen={handleOpen}
        setIsHandy={setIsHandy}
        storageId={storageId}
        handleOpenConfirm={handleOpenConfirm}
        isModifyShelf={isModifyShelf}
        handleOpenModalDetail={handleOpenModalDetail}
        handleOpenDetailBox={handleOpenDetailBox}
        handleCloseDetailBox={handleCloseDetailBox}
        storage={storage}
        area={area}
        handleOpenMoveBox={handleOpenMoveBox}
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
const mapStateToProps = (state) => ({
  currentBox: state.order.currentBox,
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AreaDetailView);
