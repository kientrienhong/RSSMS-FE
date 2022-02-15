import React from "react";
import { Box, Typography } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function ListInfoHistoryExtension({ list, currentOrder }) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography
        color="black"
        variant="h2"
        sx={{
          marginBottom: "16px",
        }}
      >
        Order History extension
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
        }}
      >
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, maxHeight: 500 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Request Id</TableCell>
                <TableCell>Old return date</TableCell>
                <TableCell>New return date</TableCell>
                <TableCell>
                  Difference ({currentOrder.type === 0 ? "Month(s)" : "Day(s)"})
                </TableCell>
                <TableCell>Date Paid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list?.map((row) => {
                let oldReturnDate = new Date(row.oldReturnDate);
                let returnDate = new Date(row.returnDate);
                let paidDate = new Date(row.paidDate);
                var differenceInTime =
                  returnDate.getTime() - oldReturnDate.getTime();

                // To calculate the no. of days between two dates
                var difference = differenceInTime / (1000 * 3600 * 24);
                return (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.requestId}
                    </TableCell>
                    <TableCell>
                      {oldReturnDate.toLocaleDateString("en-US")}
                    </TableCell>
                    <TableCell>
                      {returnDate.toLocaleDateString("en-US")}
                    </TableCell>
                    <TableCell>{difference}</TableCell>
                    <TableCell>
                      {paidDate === "Invalid Date"
                        ? "Not yet"
                        : paidDate.toLocaleDateString("en-US")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
