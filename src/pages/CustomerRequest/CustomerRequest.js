import React, { useEffect, useState } from "react";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Modal,
  Typography,
  Card,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import ListRequest from "./component/ListRequest";
import { useForm } from "react-hook-form";
import * as action from "../../redux/action/action";
import { connect } from "react-redux";
import {
  getCustomerRequest,
  getRequestDetail,
  assignOrder,
  updateRequestWithNote,
} from "../../apis/Apis";
import { useNavigate } from "react-router";

import ModalCancelDetail from "./component/ModalCancelDetail";
import ModalReturnItem from "./component/ModalReturnItem";
import ModalUpdateIsPaid from "./component/ModalUpdateIsPaid";
import AssignOrderModal from "./component/AssignOrderModal";
import RequestModal from "../../components/RequestModal";
import ConfirmModal from "../../components/ConfirmModal";
import UpdateRequestModal from "../../components/UpdateRequestModal";

function CustomerRequest({
  showLoading,
  hideLoading,
  showSnackbar,
  userState,
  isLoadingRequest,
}) {
  const [listRequest, setListRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [requestDetail, setRequestDetail] = useState({});
  const [error, setError] = useState({});
  const [request, setRequest] = useState({});
  const [page, setPage] = useState(1);
  const [currentRequest, setCurrentRequest] = useState();
  const [openIsPaid, setOpenIsPaid] = useState(false);
  const [openAssignOrder, setOpenAssignOrder] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openUpdateRequest, setOpenUpdateRequest] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(-1);
  const { handleSubmit, control, reset } = useForm();
  const [openAssign, setOpenAssign] = useState(false);
  const navigate = useNavigate();

  const handleOpenUpdateRequest = () => {
    setOpenUpdateRequest(true);
  };

  const handleCloseUpdateRequest = () => {
    setOpenUpdateRequest(false);
  };
  const handleOpenAssign = () => {
    setOpenAssign(true);
  };

  const handleCloseAssign = () => {
    setOpenAssign(false);
  };

  const handleAssignOrder = async (id) => {
    try {
      showLoading();

      await assignOrder(id, userState.storageId, userState.idToken);
      handleCloseAssign();
      await getData("", page, 8, userState.idToken);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    try {
      showLoading();

      getData("", page, 8);
      hideLoading();
    } catch (error) {
      console.log(error);
      hideLoading();
    }
  }, [isLoadingRequest]);

  const handleOpenOrderModal = (request) => {
    setCurrentRequest(request);
    setOpenOrderModal(true);
  };

  const handleCloseOrderModal = () => {
    setCurrentRequest({});
    setOpenOrderModal(false);
  };

  const handleOpenIsPaid = () => {
    setOpenIsPaid(true);
  };

  const handleCloseIsPaid = () => {
    setCurrentRequest({});
    setOpenIsPaid(false);
  };

  const [openCancelOrder, setOpenCancelOrder] = useState(false);
  const handleOpenCancelOrder = () => {
    setOpenCancelOrder(true);
  };

  const handleOpenAssignOrder = () => {
    setOpenAssignOrder(true);
  };

  const handleCloseAssignOrder = () => {
    setOpenAssignOrder(false);
  };

  const handleCloseCancelOrder = () => {
    setCurrentRequest({});
    setOpenCancelOrder(false);
  };
  const [openReturnItem, setOpenReturnItem] = useState(false);
  const handleOpenReturnItem = () => {
    setOpenReturnItem(true);
  };

  const handleCloseReturnItem = () => {
    setCurrentRequest({});
    setOpenReturnItem(false);
  };

  const getData = async (name, page, size) => {
    try {
      showLoading();
      const list = await getCustomerRequest(
        name,
        page,
        size,
        userState.idToken
      );
      console.log(list);
      setListRequest(list.data.data);
      setTotalRequest(list.data.metadata.total);
    } catch (error) {
      console.log(error.response);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        await getData("", page, 8);
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
      }
    };
    firstCall();
  }, []);

  const handleSubmitReport = async (data) => {
    try {
      showLoading();
      const response = await updateRequestWithNote(
        updateStatus,
        data.note,
        request?.id,
        userState.idToken
      );

      console.log(response);
      await getData("", page, 8);
      handleCloseUpdateRequest();
      setUpdateStatus(-1);
    } catch (error) {
      console.log(error.response);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const firstCall = async () => {
      if (currentRequest === undefined) {
        return;
      }

      try {
        showLoading();
        const response = await getRequestDetail(
          currentRequest?.id,
          userState.idToken
        );
        setRequestDetail(response.data);
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
      }
    };
    firstCall();
  }, [currentRequest]);

  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        await getData("", page, 8);
        hideLoading();
      } catch (error) {
        console.log(error);
        hideLoading();
      }
    };
    firstCall();
  }, [page]);
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        py: 3,
      }}
    >
      {userState.roleName === "Manager" ? (
        <AssignOrderModal
          open={openAssignOrder}
          handleClose={handleCloseAssignOrder}
          currentId={request.id}
        />
      ) : (
        <ConfirmModal
          open={openAssign}
          handleClose={handleCloseAssign}
          onHandleYes={handleAssignOrder}
          id={request?.id}
          showLoading={showLoading}
          hideLoading={hideLoading}
          showSnackbar={showSnackbar}
          msg="Xử lý đơn thành công"
          msgTitle="Bạn có muốn phân đơn này vào kho của mình?"
        />
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
          onChange={(e) => {}}
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
          style={{
            height: "45px",
            paddingLeft: "16px",
            paddingRight: "16px",
            marginLeft: "2%",
          }}
          color="primary"
          variant="contained"
          onClick={(e) => {
            navigate("/orders/makingOrder");
          }}
        >
          Tạo yêu cầu tạo đơn
        </Button>
      </Box>
      <UpdateRequestModal
        open={openUpdateRequest}
        handleClose={handleCloseUpdateRequest}
        title={"Báo cáo khách vắng mặt"}
        onSubmit={handleSubmitReport}
      />
      <ModalReturnItem
        open={openReturnItem}
        handleClose={handleCloseReturnItem}
        currentRequest={currentRequest}
        requestDetail={requestDetail}
      />
      <ModalCancelDetail
        open={openCancelOrder}
        handleClose={handleCloseCancelOrder}
        currentRequest={currentRequest}
        requestDetail={requestDetail}
      />
      <ModalUpdateIsPaid
        open={openIsPaid}
        handleClose={handleCloseIsPaid}
        currentRequest={currentRequest}
        requestDetail={requestDetail}
        getData={getData}
        page={page}
      />
      <RequestModal
        open={openOrderModal}
        handleClose={handleCloseOrderModal}
        currentOrder={currentRequest}
        control={control}
        isView={true}
        reset={reset}
      />
      <Card
        variant="outlined"
        color="#FFF"
        sx={{ marginLeft: "2%", marginRight: "2%" }}
      >
        <ListRequest
          setRequest={setRequest}
          setCurrentRequest={setCurrentRequest}
          handleOpenIsPaid={handleOpenIsPaid}
          handleOpenReturnItem={handleOpenReturnItem}
          handleOpenCancelOrder={handleOpenCancelOrder}
          listRequest={listRequest}
          page={page}
          setPage={setPage}
          setUpdateStatus={setUpdateStatus}
          handleOpenOrderModal={handleOpenOrderModal}
          totalRequest={totalRequest}
          getData={getData}
          handleOpenUpdateRequest={handleOpenUpdateRequest}
          handleOpenAssign={handleOpenAssign}
          handleOpenAssignOrder={handleOpenAssignOrder}
        />
      </Card>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
  isLoadingRequest: state.order.isLoadingRequest,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRequest);
