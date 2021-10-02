import React, { useEffect } from "react";
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

const mapListTableHeader = (listHeader) => (
  <TableHead>
    <TableRow sx={{ color: "black" }}>
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
    email: row.email,
    avatar: row.avatar,
    phone: row.phone,
    storageName: row.storageName,
    roleName: row.roleName,
    address: row.address,
  };

  setUser(user);
  handleOpen();
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
export default function ListUsers({ reset, setUser, handleOpen, listUser }) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(8);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - listUser.length) : 0;

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
          {listUser.map((row, index) => {
            return (
              <TableRow key={row.id}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ color: "black" }}
                  onClick={(e) =>
                    handleClickRow(row, setUser, handleOpen, reset)
                  }
                >
                  {row.name}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) =>
                    handleClickRow(row, setUser, handleOpen, reset)
                  }
                >
                  {row.email}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) =>
                    handleClickRow(row, setUser, handleOpen, reset)
                  }
                >
                  {row.phone}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) =>
                    handleClickRow(row, setUser, handleOpen, reset)
                  }
                >
                  {row.storageName}
                </TableCell>
                <TableCell
                  style={{ color: "black" }}
                  onClick={(e) =>
                    handleClickRow(row, setUser, handleOpen, reset)
                  }
                >
                  {row.roleName}
                </TableCell>
                <TableCell style={{ color: "black" }}>
                  <Button className={classes.button}>Delete</Button>
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
              count={listUser.length}
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

{
  /* <TableBody>
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
        onClick={(e) => handleClickRow(row, setUser, handleOpen)}
      >
        {row.name}
      </TableCell>
      <TableCell
        style={{ color: "black" }}
        onClick={(e) => handleClickRow(row, setUser, handleOpen)}
      >
        {row.email}
      </TableCell>
      <TableCell
        style={{ color: "black" }}
        onClick={(e) => handleClickRow(row, setUser, handleOpen)}
      >
        {row.phone}
      </TableCell>
      <TableCell
        style={{ color: "black" }}
        onClick={(e) => handleClickRow(row, setUser, handleOpen)}
      >
        {row.storage}
      </TableCell>
      <TableCell
        style={{ color: "black" }}
        onClick={(e) => handleClickRow(row, setUser, handleOpen)}
      >
        {row.type}
      </TableCell>
      <TableCell style={{ color: "black" }}>
        <Button className={classes.button}>Delete</Button>
      </TableCell>
    </TableRow>
  );
})} */
}
