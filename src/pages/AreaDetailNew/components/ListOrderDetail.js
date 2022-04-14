import React from "react";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import moment from "moment";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {Button, TableHead, Typography} from "@material-ui/core";
import {LIST_STATUS_OF_ORDER_DETAIL} from "../../../constant/constant";
import {connect} from "react-redux";
import * as action from "../../../redux/action/action";

function TablePaginationActions(props) {
  const theme = useTheme();
  const {count, page, rowsPerPage, onPageChange} = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{flexShrink: 0, ml: 2.5}}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const mapListTableHeader = (listHeader) => (
  <TableHead>
    <TableRow sx={{color: "black"}}>
      {listHeader.map((e) => (
        <TableCell>{e}</TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const handleClickRow = (row, setCurrentOrderDetail, handleOpenOrderDetail) => {
  setCurrentOrderDetail(row);
  handleOpenOrderDetail();
};

function ListOrderDetail({
  setCurrentOrderDetail,
  handleOpen,
  listOrderDetail,
  page,
  setPage,
  totalOrderDetail,
  searchName,
  getData,
  userState,
  handleOpenOrderDetail,
  addMovingProduct,
  detailFloor,
  showSnackbar,
  placingProducts,
  isMoveOrderDetail,
  storedOrder,
  handleCurrentStoreOrder,
}) {
  let listPlacingProducts = [];
  const listHeaderName =
    detailFloor?.spaceType === 0
      ? [
          "Mã đơn",
          "Hình ảnh",
          "Tên khách hàng",
          "Trạng thái",
          "Thời gian hết hạn",
          "Kích thước thật",
          "Hành động",
        ]
      : [
          "Mã đơn",
          "Tên khách hàng",
          "Trạng thái",
          "Thời gian hết hạn",
          "Kích thước thật",
          "Hành động",
        ];
  if (isMoveOrderDetail) {
    listOrderDetail = listOrderDetail?.map((e) => {
      let indexFound = storedOrder?.products?.findIndex((ele) => {
        return ele.id === e.id;
      });

      if (indexFound !== -1) {
        return {...e, orderStatus: 0};
      }

      return e;
    });
  }

  if (placingProducts) {
    placingProducts?.floors?.forEach((e) => {
      if (e.floorId === detailFloor.id) {
        listPlacingProducts.push(e);
      }
    });
  }

  if (isMoveOrderDetail) {
    listOrderDetail = listOrderDetail?.filter((e) => {
      let indexFound = placingProducts?.floors?.findIndex((ele) => {
        return ele.idOrderDetail === e.id;
      });

      if (indexFound !== -1) {
        return false;
      }

      return true;
    });
  }
  listPlacingProducts = listPlacingProducts.concat(listOrderDetail);

  // Avoid a layout jump when reaching the last page with empty rows.

  return listPlacingProducts.length > 0 ? (
    <TableContainer component={Paper}>
      <Table
        sx={{minWidth: 500, maxHeight: 800}}
        aria-label="custom pagination table"
      >
        {mapListTableHeader(listHeaderName)}
        <TableBody>
          {listPlacingProducts.map((row, index) => {
            return (
              <TableRow key={row?.id}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{color: "black"}}
                  onClick={(e) =>
                    handleClickRow(
                      row,
                      setCurrentOrderDetail,
                      handleOpenOrderDetail
                    )
                  }
                >
                  {row?.orderName}
                </TableCell>
                {detailFloor?.spaceType === 0 ? (
                  <TableCell
                    style={{color: "black"}}
                    onClick={(e) =>
                      handleClickRow(
                        row,
                        setCurrentOrderDetail,
                        handleOpenOrderDetail
                      )
                    }
                  >
                    <img
                      width="40"
                      height="40"
                      src={row?.images[0]?.url}
                      alt="order detail"
                    />
                  </TableCell>
                ) : (
                  <></>
                )}

                <TableCell
                  style={{color: "black"}}
                  onClick={(e) =>
                    handleClickRow(
                      row,
                      setCurrentOrderDetail,
                      handleOpenOrderDetail
                    )
                  }
                >
                  {row?.customerName}
                </TableCell>
                <TableCell
                  style={{
                    color: LIST_STATUS_OF_ORDER_DETAIL[row?.orderStatus]?.color,
                  }}
                  onClick={(e) =>
                    handleClickRow(
                      row,
                      setCurrentOrderDetail,
                      handleOpenOrderDetail
                    )
                  }
                >
                  {LIST_STATUS_OF_ORDER_DETAIL[row?.orderStatus]?.name}
                </TableCell>
                <TableCell
                  style={{color: "black"}}
                  onClick={(e) =>
                    handleClickRow(
                      row,
                      setCurrentOrderDetail,
                      handleOpenOrderDetail
                    )
                  }
                >
                  {moment(new Date(row?.returnDate)).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell
                  style={{color: "black"}}
                  onClick={(e) =>
                    handleClickRow(
                      row,
                      setCurrentOrderDetail,
                      handleOpenOrderDetail
                    )
                  }
                >
                  {row?.width}m x {row?.length}m x {row?.height}m
                </TableCell>
                <TableCell>
                  {row?.orderStatus === 2 ? (
                    <Button
                      style={{
                        height: "45px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                      }}
                      onClick={async () => {
                        if (
                          !isMoveOrderDetail &&
                          (storedOrder?.products?.length > 0 ||
                            placingProducts?.floors?.length > 0)
                        ) {
                          handleCurrentStoreOrder(true);
                          return;
                        }
                        addMovingProduct(row, detailFloor);
                        showSnackbar(
                          "success",
                          "Gỡ món hàng xuống kệ thành công"
                        );
                      }}
                      color="primary"
                      variant="contained"
                      type="submit"
                    >
                      Di chuyển
                    </Button>
                  ) : (
                    <></>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  ) : (
    <Typography
      color="black"
      variant="h2"
      sx={{textAlign: "left", marginBottom: "4%"}}
    >
      Chưa có hàng hóa trên kệ
    </Typography>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
  placingProducts: state.order.placingProducts,
  isMoveOrderDetail: state.order.isMoveOrderDetail,
  isCurrentStoreOrder: state.application.isCurrentStoreOrder,
  storedOrder: state.order.storedOrder,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    handleCurrentStoreOrder: (isOpen) =>
      dispatch(action.handleCurrentStoreOrder(isOpen)),
    addMovingProduct: (orderDetail, oldFloorId) =>
      dispatch(action.addMovingProduct(orderDetail, oldFloorId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListOrderDetail);
