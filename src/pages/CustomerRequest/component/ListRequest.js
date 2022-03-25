import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
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
import { Button, TableHead } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  LIST_TYPE_REQUEST,
  LIST_STATUS_REQUEST,
} from "../../../constant/constant";
import ConfirmModal from "../../../components/ConfirmModal";
import { deleteUser } from "../../../apis/Apis";
import { connect } from "react-redux";
import { getRequestDetail } from "../../../apis/Apis";
function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

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
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
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
  "Mã",
  "Tên khách hàng",
  "Số điện thoại",
  "Loại",
  "Trạng thái",
  "Hành động",
];

const mapListTableHeader = (listHeader) => (
  <TableHead>
    <TableRow sx={{ color: "black" }}>
      {listHeader?.map((e) => (
        <TableCell>{e}</TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const useStyles = makeStyles({
  button: {
    backgroundColor: "#CE0200",
    color: "white",
    "&:hover": {
      backgroundColor: "#FF615F",
      color: "white",
    },
  },
});
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
}) {
  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page - 1 > 0
      ? Math.max(0, (1 + page) * rowsPerPage - listRequest.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        {mapListTableHeader(listHeaderName)}
        <TableBody>
          {listRequest?.map((row, index) => {
            console.log(row);
            return (
              <TableRow key={row.id}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ color: "black" }}
                >
                  {row.id}
                </TableCell>
                <TableCell style={{ color: "black" }}>
                  {row.customerName}
                </TableCell>
                <TableCell style={{ color: "black" }}>
                  {row.customerPhone}
                </TableCell>

                <TableCell style={{ color: "black" }}>
                  {LIST_TYPE_REQUEST[row.type].name}
                </TableCell>
                <TableCell style={{ color: "black" }}>
                  {LIST_STATUS_REQUEST[row.status].name}
                </TableCell>
                <TableCell style={{ color: "black" }}>
                  <Button
                    onClick={async () => {
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
                    Xem thêm
                  </Button>
                  {row.type === 1 && row.status === 1 ? (
                    <Button
                      onClick={() => {
                        setRequest(row);
                        handleOpenAssignOrder();
                      }}
                      style={{
                        height: "45px",
                        paddingLeft: "16px",
                        paddingRight: "16px",
                        marginRight: "4%",
                      }}
                      color="primary"
                      variant="contained"
                    >
                      Xử lý đơn
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

export default connect(mapStateToProps, null)(ListRequest);
