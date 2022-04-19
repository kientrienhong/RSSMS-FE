import React, {useEffect, useState} from "react";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Card,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import ListRequest from "./component/ListRequest";
import {useForm} from "react-hook-form";
import * as action from "../../redux/action/action";
import {connect} from "react-redux";
import {
  getCustomerRequest,
  getRequestDetail,
  assignOrder,
  updateRequestWithNote,
} from "../../apis/Apis";
import {LIST_STATUS_REQUEST} from "../../constant/constant";
import ModalCancelDetail from "./component/ModalCancelDetail";
import ModalReturnItem from "./component/ModalReturnItem";
import ModalUpdateIsPaid from "./component/ModalUpdateIsPaid";
import AssignOrderModal from "./component/AssignOrderModal";
import RequestModal from "../../components/RequestModal";
import ConfirmModal from "../../components/ConfirmModal";
import UpdateRequestModal from "../../components/UpdateRequestModal";
import MultipleSelectCheckmarks from "../../components/MultipleSelectCheckmarks";
import {ErrorHandle} from "../../utils/ErrorHandle";

function CustomerRequest({
  showLoading,
  hideLoading,
  showSnackbar,
  userState,
  isLoadingRequest,
  handleExtendSession,
}) {
  const [listRequest, setListRequest] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [requestDetail, setRequestDetail] = useState({});
  const [request, setRequest] = useState({});
  const [page, setPage] = useState(1);
  const [currentRequest, setCurrentRequest] = useState();
  const [openIsPaid, setOpenIsPaid] = useState(false);
  const [openAssignOrder, setOpenAssignOrder] = useState(false);
  const [openOrderModal, setOpenOrderModal] = useState(false);
  const [openUpdateRequest, setOpenUpdateRequest] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(-1);
  const {control, reset} = useForm();
  const [openAssign, setOpenAssign] = useState(false);
  const [currentFilter, setCurrentFilter] = useState([]);
  const handleOpenUpdateRequest = () => {
    setOpenUpdateRequest(true);
  };

  const handleChangeFilter = (event) => {
    const {
      target: {value},
    } = event;
    setCurrentFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
  }, [isLoadingRequest, hideLoading, showLoading, page]);

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
      setListRequest(list.data.data);
      setTotalRequest(list.data.metadata.total);
    } catch (error) {
      ErrorHandle.handle(error, showSnackbar, handleExtendSession);
      console.log(error.response);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    const firstCall = async () => {
      try {
        showLoading();
        let currentFilterTemp = undefined;
        if (currentFilter.length > 0) {
          currentFilterTemp = currentFilter.join("&RequestStatus=");
        }
        const list = await getCustomerRequest(
          "",
          page,
          8,
          userState.idToken,
          currentFilterTemp
        );
        setListRequest(list.data.data);
        setTotalRequest(list.data.metadata.total);
      } catch (error) {
        console.log(error.response);
      } finally {
        hideLoading();
      }
    };
    firstCall();
  }, [currentFilter]);

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
        console.log(error.response);
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
          alignItems: "center",
        }}
      >
        <TextField
          hiddenLabel
          sx={{
            width: "80%",
          }}
          onChange={(e) => {}}
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
        <MultipleSelectCheckmarks
          handleChange={handleChangeFilter}
          currentData={currentFilter}
          listData={LIST_STATUS_REQUEST}
          name={"Lọc theo tình trạng"}
        />
      </Box>
      <UpdateRequestModal
        open={openUpdateRequest}
        handleClose={handleCloseUpdateRequest}
        title={updateStatus === 0 ? "Hủy yêu cầu" : "Báo cáo khách vắng mặt"}
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
        sx={{marginLeft: "2%", marginRight: "2%"}}
      >
        {listRequest.length > 0 ? (
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
        ) : (
          <Typography
            color="black"
            variant="h5"
            style={{
              textAlign: "center",
              margin: "2% 0",
            }}
          >
            Không tìm yêu cầu nào
          </Typography>
        )}
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
    handleExtendSession: (isOpen) =>
      dispatch(action.handleExtendSession(isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomerRequest);
