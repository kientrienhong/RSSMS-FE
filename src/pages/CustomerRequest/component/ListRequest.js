import React from "react";
import PropTypes from "prop-types";
import {useTheme} from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import {Button, TableHead} from "@material-ui/core";
import {ErrorHandle} from "../../../utils/ErrorHandle";

import moment from "moment";
import {
  LIST_TYPE_REQUEST,
  LIST_STATUS_REQUEST,
  STATUS_REQUEST_CUSTOMER_ABSENT,
  STATUS_REQUEST_DELIVERING,
  STATUS_REQUEST_CANCEL,
  STATUS_REQUEST_FINISHED,
} from "../../../constant/constant";
import {connect} from "react-redux";
import {getRequestDetail} from "../../../apis/Apis";
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

const listHeaderName = [
  "T??n kh??ch h??ng",
  "S??? ??i???n tho???i",
  "Ng??y giao",
  "Khung gi??? giao",
  "Kho",
  "Lo???i",
  "Tr???ng th??i",
  "H??nh ?????ng",
];

const mapListTableHeader = (listHeader) => (
  <TableHead>
    <TableRow sx={{color: "black"}}>
      {listHeader?.map((e) => (
        <TableCell>{e}</TableCell>
      ))}
    </TableRow>
  </TableHead>
);

function ListRequest({
  setRequest,
  handleOpen,
  listRequest,
  page,
  setPage,
  totalRequest,
  setCurrentRequest,
  handleOpenIsPaid,
  handleOpenReturnItem,
  handleOpenCancelOrder,
  searchName,
  getData,
  userState,
  handleOpenAssignOrder,
  handleOpenOrderModal,
  handleOpenAssign,
  setUpdateStatus,
  handleOpenUpdateRequest,
  showSnackbar,
  handleExtendSession,
}) {
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 500}} aria-label="custom pagination table">
        {mapListTableHeader(listHeaderName)}
        <TableBody>
          {listRequest?.map((row, index) => {
            return (
              <TableRow key={row.id}>
                <TableCell style={{color: "black"}}>
                  {row.customerName}
                </TableCell>
                <TableCell style={{color: "black"}}>
                  {row.customerPhone}
                </TableCell>
                <TableCell style={{color: "black"}}>
                  {moment(new Date(row?.deliveryDate)).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell style={{color: "black"}}>
                  {row.deliveryTime}
                </TableCell>
                <TableCell style={{color: "black"}}>
                  {row?.storageName === null
                    ? "Ch??a ???????c ph??n ????n"
                    : row?.storageName}
                </TableCell>
                <TableCell style={{color: "black"}}>
                  {LIST_TYPE_REQUEST[row.type].name}
                </TableCell>
                <TableCell
                  style={{
                    color: LIST_STATUS_REQUEST[row.status].color,
                    fontWeight: "bold",
                  }}
                >
                  {LIST_STATUS_REQUEST[row.status].name}
                </TableCell>
                <TableCell style={{color: "black"}}>
                  <Button
                    onClick={async () => {
                      try {
                        const response = await getRequestDetail(
                          row.id,
                          userState.idToken
                        );

                        setCurrentRequest(response.data);
                        if (row.type === 2) {
                          handleOpenIsPaid();
                        } else if (row.type === 3) {
                          handleOpenCancelOrder();
                        } else if (row.type === 1) {
                          handleOpenOrderModal(response.data);
                        } else {
                          handleOpenReturnItem();
                        }
                      } catch (e) {
                        ErrorHandle.handle(
                          e,
                          showSnackbar,
                          handleExtendSession
                        );

                        console.log(e?.response);
                      }
                    }}
                    style={{
                      height: "45px",
                      paddingLeft: "16px",
                      paddingRight: "16px",
                      marginRight: "4%",
                    }}
                    color="success"
                    variant="contained"
                    type="submit"
                  >
                    Xem th??m
                  </Button>
                  {row.status === STATUS_REQUEST_DELIVERING ? (
                    <Button
                      onClick={() => {
                        setRequest(row);
                        setCurrentRequest(row);
                        setUpdateStatus(STATUS_REQUEST_CUSTOMER_ABSENT);
                        handleOpenCancelOrder();
                      }}
                      style={{
                        height: "45px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        marginRight: "4%",
                      }}
                      color="error"
                      variant="outlined"
                    >
                      H???y y??u c???u
                    </Button>
                  ) : row.status !== STATUS_REQUEST_CANCEL &&
                    row.status !== STATUS_REQUEST_FINISHED ? (
                    <Button
                      onClick={() => {
                        setRequest(row);
                        setCurrentRequest(row);

                        setUpdateStatus(STATUS_REQUEST_CANCEL);
                        handleOpenCancelOrder();
                      }}
                      style={{
                        height: "45px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        marginRight: "4%",
                      }}
                      color="error"
                      variant="outlined"
                    >
                      H???y y??u c???u
                    </Button>
                  ) : (
                    <></>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10]}
              colSpan={3}
              count={totalRequest}
              rowsPerPage={rowsPerPage}
              page={page - 1}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = (state) => ({
  userState: state.information.user,
});
const mapDispatchToProps = (dispatch) => {
  return {
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
    handleExtendSession: (type, msg) =>
      dispatch(action.handleExtendSession(type, msg)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListRequest);
