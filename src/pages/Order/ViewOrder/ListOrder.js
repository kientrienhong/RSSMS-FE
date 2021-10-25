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
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { Button, TableHead } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import ConfirmModal from "../../../components/ConfirmModal";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { getOrderById, cancelOrder } from "../../../apis/Apis";
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
  "ID",
  "Customer name",
  "Customer phone",
  "Address Delivery",
  "Type",
  "Is Paid",
  "Status",
  "Action",
];

const mapListTableHeader = (listHeader) => (
  <TableHead>
    <TableRow sx={{ color: "black" }}>
      {listHeader.map((e) => (
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

function ListOrder({
  reset,
  setOrder,
  handleOpen,
  listOrder,
  page,
  setPage,
  totalOrder,
  searchId,
  getData,
  hideLoading,
  showLoading,
}) {
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [open, setOpen] = React.useState(false);
  const [currentId, setCurrentId] = React.useState(-1);
  const handleConfirmOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDeleteOrder = async (currentId) => {
    let response;
    try {
      if (listOrder.length === 1) {
        if (page !== 1) {
          setPage(page - 1);
        }
      }
      await cancelOrder(currentId);
      await getData(searchId, page, 8);
    } catch (error) {
      console.log(error);
    }

    return response;
  };
  const handleClickRow = async (row) => {
    try {
      showLoading();
      let orderTemp = await getOrderById(row.id);
      setOrder(orderTemp.data);
      handleOpen(true);
    } catch (e) {
      console.log(e.response);
    } finally {
      hideLoading();
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page - 1 > 0 ? Math.max(0, (1 + page) * rowsPerPage - listOrder.length) : 0;

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
        <ConfirmModal
          open={open}
          handleClose={handleClose}
          onHandleYes={handleDeleteOrder}
          id={currentId}
          msg={"Cancel order success!"}
        />
        {mapListTableHeader(listHeaderName)}
        <TableBody>
          {listOrder.map((row, index) => {
            let typeOrder =
              row.typeOrder === 0 ? "Self-Storage" : "Door to door";
            let status;
            if (row.status === 0) {
              status = "Canceled";
            } else if (row.status === 1) {
              status = "Booked";
            } else if (row.status === 2) {
              status = "Paid";
            } else if (row.status === 3) {
              status = "Delivery";
            } else if (row.status === 4) {
              status = "Stored";
            } else if (row.status === 5) {
              status = "Expired";
            }

            return (
              <TableRow key={row.id}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ color: "black" }}
                  onClick={(e) => handleClickRow(row)}
                >
                  {row.id}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => handleClickRow(row)}
                >
                  {row.customerName}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => handleClickRow(row)}
                >
                  {row.customerPhone}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => handleClickRow(row)}
                >
                  {row.deliveryAddress}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => handleClickRow(row)}
                >
                  {typeOrder}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => handleClickRow(row)}
                >
                  <FormControlLabel
                    value="isPaid"
                    control={<Checkbox checked={row.isPaid} disabled={true} />}
                    label="Is Paid"
                    labelPlacement="Is Paid"
                  />
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => handleClickRow(row)}
                >
                  {status}
                </TableCell>
                <TableCell style={{ color: "black" }}>
                  <Button
                    className={classes.button}
                    onClick={() => {
                      setCurrentId(row.id);
                      handleConfirmOpen();
                    }}
                  >
                    Cancel
                  </Button>
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
              count={totalOrder}
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
const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};
export default connect(null, mapDispatchToProps)(ListOrder);