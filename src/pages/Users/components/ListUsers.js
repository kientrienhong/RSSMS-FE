import * as React from "react";
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

const listHeaderName = ["Name", "Email", "Phone", "Storage", "Type", "Action"];

function createData(id, name, email, avatar, phone, storage, type) {
  return { id, name, email, avatar, phone, storage, type };
}

const rows = [
  createData(
    1,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Customer"
  ),
  createData(
    2,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Office Staff"
  ),
  createData(
    3,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Delivery Staff"
  ),
  createData(
    4,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Customer"
  ),
  createData(
    5,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Customer"
  ),
  createData(
    6,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Customer"
  ),
  createData(
    7,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Customer"
  ),
  createData(
    8,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Customer"
  ),
  createData(
    9,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Customer"
  ),
  createData(
    10,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Customer"
  ),
  createData(
    11,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Customer"
  ),
  createData(
    12,
    "Hong Kien Trien",
    "kientrienhong@gmal.com",
    "test",
    "0777457504",
    "Storage 1",
    "Customer"
  ),
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

export default function ListUsers() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row, index) => {
            return (
              <TableRow key={row.id}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ color: "black" }}
                >
                  {row.name}
                </TableCell>
                <TableCell style={{ color: "black" }}>{row.email}</TableCell>
                <TableCell style={{ color: "black" }}>{row.phone}</TableCell>
                <TableCell style={{ color: "black" }}>{row.storage}</TableCell>
                <TableCell style={{ color: "black" }}>{row.type}</TableCell>
                <TableCell style={{ color: "black" }}>
                  <Button sx={{ backgroundColor: "#CE0200", color: "white" }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
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
