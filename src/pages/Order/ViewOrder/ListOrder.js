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
import {
  Checkbox,
  FormControlLabel,
  Modal,
  Typography,
} from "@material-ui/core";
import { Button, TableHead } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import * as action from "../../../redux/action/action";
import { getOrderById, cancelOrder, assignOrder } from "../../../apis/Apis";
import CustomAreaInput from "../../../components/CustomAreaInput";
import { ORDER_STATUS, ORDER_TYPE } from "../../../constant/constant";
import AssignOrderModal from "./AssignOrderModal";
import ConfirmModal from "../../../components/ConfirmModal";
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

const mapListTableHeader = (listHeader, userState) => (
  <TableHead>
    <TableRow sx={{ color: "black" }}>
      {listHeader.map((e) => {
        if (userState.roleName === "Admin") {
          if (e === "Action") {
            return;
          }
        }
        return <TableCell>{e}</TableCell>;
      })}
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

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

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
  showSnackbar,
  userState,
  currentOrder,
}) {
  const classes = useStyles();

  const [rowsPerPage, setRowsPerPage] = React.useState(8);
  const [open, setOpen] = React.useState(false);
  const [currentId, setCurrentId] = React.useState(-1);
  const { handleSubmit, control } = useForm();
  const [openAssign, setOpenAssign] = React.useState(false);
  const handleConfirmOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenAssign = () => {
    setOpenAssign(true);
  };

  const handleCloseAssign = () => {
    setOpenAssign(false);
  };

  const handleDeleteOrder = async (currentId, reason) => {
    let response;
    try {
      if (listOrder.length === 1) {
        if (page !== 1) {
          setPage(page - 1);
        }
      }
      await cancelOrder(currentId, reason, userState.idToken);
      await getData(searchId, page, 8, userState.idToken);
    } catch (error) {
      console.log(error);
    }

    return response;
  };
  const handleClickRow = async (row) => {
    try {
      showLoading();
      let orderTemp = await getOrderById(row.id, userState.idToken);
      console.log(orderTemp.data);
      setOrder(orderTemp.data);
    } catch (e) {
      console.log(e.response);
    } finally {
      hideLoading();
    }
  };

  const handleAssignOrder = async (id) => {
    await assignOrder(
      id,
      userState.staffManageStorages[0].storageId,
      userState.idToken
    );
    handleClose();
    await getData(searchId, page, 8, userState.idToken);
  };

  const onSubmit = async (data) => {
    try {
      showLoading();
      await handleDeleteOrder(currentId, data.reason, userState.idToken);
      handleClose();
      showSnackbar("success", " Cancel order success!");
    } catch (error) {
      console.log(error);
    } finally {
      hideLoading();
    }
  };

  const buildModalCancelOrder = () => {
    return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...styleModal,
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            flexDirection: "column",
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Typography
              color="black"
              variant="h2"
              style={{
                marginTop: "2%",
                textAlign: "left",
                marginBottom: "2%",
              }}
            >
              Are you sure?
            </Typography>
            <CustomAreaInput
              control={control}
              rules={{
                required: "Reason required",
              }}
              styles={{ width: "550px" }}
              name="reason"
              label="Reason"
              userInfo={""}
            />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: "60%",
                  margin: "40px auto 10px auto",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{
                    height: "45px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    marginRight: "6%",
                  }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Yes
                </Button>
                <Button
                  style={{
                    height: "45px",
                    paddingLeft: "16px",
                    paddingRight: "16px",
                  }}
                  onClick={() => handleClose()}
                  color="error"
                  variant="outlined"
                >
                  No
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
    );
  };

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
        {buildModalCancelOrder()}
        {mapListTableHeader(listHeaderName, userState)}
        {userState.roleName === "Manager" ? (
          <AssignOrderModal
            open={openAssign}
            handleClose={handleCloseAssign}
            currentId={currentId}
            currentOrder={currentOrder}
          />
        ) : (
          <ConfirmModal
            open={openAssign}
            handleClose={handleCloseAssign}
            onHandleYes={handleAssignOrder}
            id={currentId}
            showLoading={showLoading}
            hideLoading={hideLoading}
            showSnackbar={showSnackbar}
            msg="Assign order success"
          />
        )}

        <TableBody>
          {listOrder.map((row, index) => {
            let typeOrder = ORDER_TYPE[row.typeOrder];
            let status = ORDER_STATUS[row.status];

            return (
              <TableRow key={row.id}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ color: "black" }}
                  onClick={(e) => {
                    handleOpen(true);

                    handleClickRow(row);
                  }}
                >
                  {row.id}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => {
                    handleOpen(true);

                    handleClickRow(row);
                  }}
                >
                  {row.customerName}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => {
                    handleOpen(true);

                    handleClickRow(row);
                  }}
                >
                  {row.customerPhone}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => {
                    handleOpen(true);

                    handleClickRow(row);
                  }}
                >
                  {row.deliveryAddress}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => {
                    handleOpen(true);

                    handleClickRow(row);
                  }}
                >
                  {typeOrder}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) => {
                    handleOpen(true);

                    handleClickRow(row);
                  }}
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
                  onClick={(e) => {
                    handleOpen(true);

                    handleClickRow(row);
                  }}
                >
                  {status}
                </TableCell>
                {userState.roleName !== "Admin" ? (
                  <TableCell style={{ color: "black" }}>
                    {row.status === 0 ? null : (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                        }}
                      >
                        {row.status === 1 ? (
                          <Button
                            style={{
                              height: "45px",
                              paddingLeft: "16px",
                              paddingRight: "16px",
                              marginRight: "4%",
                            }}
                            onClick={() => {
                              setCurrentId(row.id);
                              handleClickRow(row);
                              handleOpenAssign();
                            }}
                            color="primary"
                            variant="contained"
                          >
                            Assign
                          </Button>
                        ) : null}
                        <Button
                          className={classes.button}
                          onClick={() => {
                            setCurrentId(row.id);
                            handleConfirmOpen();
                          }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    )}
                  </TableCell>
                ) : (
                  <></>
                )}
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

const mapStateToProps = (state) => ({
  userState: state.information.user,
});

const mapDispatchToProps = (dispatch) => {
  return {
    showLoading: () => dispatch(action.showLoader()),
    hideLoading: () => dispatch(action.hideLoader()),
    showSnackbar: (type, msg) => dispatch(action.showSnackbar(type, msg)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ListOrder);
