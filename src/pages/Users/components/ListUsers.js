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
import {makeStyles} from "@material-ui/styles";
import ConfirmModal from "../../../components/ConfirmModal";
import {deleteUser} from "../../../apis/Apis";
import {connect} from "react-redux";
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
  "H??? v?? t??n",
  "Email",
  "S??? ??i???n tho???i",
  "Kho",
  "Ch???c v???",
  "Thao t??c",
];

const mapListTableHeader = (listHeader) => (
  <TableHead>
    <TableRow sx={{color: "black"}}>
      {listHeader.map((e) => (
        <TableCell>{e}</TableCell>
      ))}
    </TableRow>
  </TableHead>
);

const handleClickRow = (row, setUser, handleOpen, reset) => {
  reset();
  const user = {
    id: row.id,
    name: row.name,
    gender: row.gender,
    birthdate: row.birthdate,
    email: row.email,
    avatar: row.avatar,
    phone: row.phone,
    storageId: row.storageId,
    storageName: row.storageName,
    roleName: row.roleName,
    address: row.address,
    imageUrl: row.imageUrl,
  };

  setUser(user);
  handleOpen(true);
};
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
function ListUsers({
  reset,
  setUser,
  handleOpen,
  listUser,
  page,
  setPage,
  totalUser,
  searchName,
  getData,
  userState,
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
  const handleDeleteUser = async (id) => {
    let response;
    response = await deleteUser(id, userState.idToken);
    if (listUser.length === 1) {
      if (page !== 1) {
        setPage(page - 1);
      }
    }
    await getData(searchName, page, 8);

    return response;
  };
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
        <ConfirmModal
          open={open}
          handleClose={handleClose}
          onHandleYes={handleDeleteUser}
          id={currentId}
          msg={"X??a t??i kho???n th??nh c??ng!"}
        />
        {mapListTableHeader(listHeaderName)}
        <TableBody>
          {listUser.map((row, index) => {
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" style={{color: "black"}}>
                  {row.name}
                </TableCell>
                <TableCell style={{color: "black"}}>{row.email}</TableCell>
                <TableCell style={{color: "black"}}>{row.phone}</TableCell>
                <TableCell style={{color: "black"}}>
                  {/* {row?.staffManageStorages[0]?.storageName} */}
                </TableCell>
                <TableCell style={{color: "black"}}>{row.roleName}</TableCell>
                <TableCell style={{color: "black"}}>
                  <Button
                    onClick={async () => {
                      handleClickRow(row, setUser, handleOpen, reset);
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
                  <Button
                    className={classes.button}
                    onClick={() => {
                      setCurrentId(row.id);
                      handleConfirmOpen();
                    }}
                  >
                    X??a
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
              count={totalUser}
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

export default connect(mapStateToProps, null)(ListUsers);
